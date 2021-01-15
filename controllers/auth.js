//used for hashing passwords
const bcrypt = require("bcryptjs");

//auto send email from app
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Creator = require("../models/creator");

exports.getCreatorLogin = (req, res, next) => {
	res.render("creator/login", {
		pageTitle: "Creator Login"
	});
};

exports.postCreatorLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	return Creator.findOne({ email: email })
		.then((creator) => {
			if (!creator) {
				req.flash("error", "Invalid email or password. Try again!");
				return req.session.save((err) => {
					res.redirect("/auth/creator-login");
				});
			}
			bcrypt
				.compare(password, creator.password)
				.then((doesMatch) => {
					if (!doesMatch) {
						req.flash("error", "Invalid email or password. Try again!");
						return req.session.save((err) => {
							res.redirect("/auth/creator-login");
						});
					}
					req.session.creatorLoggedIn = true;
					req.session.userId = creator._id;
					req.session.save((err) => {
						res.redirect("/creator/dashboard");
					});
				})
				.catch((err) => {
					return res.redirect("/auth/creator-login");
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCreatorLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect("/");
	});
};

exports.getCreatorSignup = (req, res, next) => {
	res.render("creator/signup", {
		pageTitle: "Creator Signup"
	});
};

exports.postCreatorSignup = (req, res, next) => {
	const displayName = req.body.displayName;
	const email = req.body.email;
	const password = req.body.password;
	let userExists;
	// does user with email already exist?
	Creator.findOne({ email: email })
		.then((doc) => {
			if (doc) {
				userExists = true;
				req.flash("error", "Sorry! A creator is already using this email.");
				return;
			}
			return Creator.findOne({ displayName: displayName });
		})
		// does user with display name already exist?
		.then((doc) => {
			if (doc) {
				userExists = true;
				req.flash("error", "Sorry! A creator is already using this display name.");
				return;
			}
			// hash the password before saving to database
			return bcrypt.hash(password, 12);
		})
		// create user with hashed password
		.then((hashedPassword) => {
			if (userExists) {
				return;
			}
			const creator = new Creator({
				displayName: displayName,
				email: email,
				password: hashedPassword
			});

			return creator.save();
		})
		.then((result) => {
			if (userExists) {
				console.log("User already exists");
				return req.session.save((err) => {
					res.redirect("/auth/creator-signup");
				});
			}
			console.log("created new user");
			const emailMsg = {
				to: email, // Change to your recipient
				from: "miles.grossenbacher@gmail.com", // Change to your verified sender
				subject: "Welcome to Haven!",
				text: "Your haven account was created successfully!",
				html: "<strong>Your haven account was created successfully!</strong>"
			};
			sgMail
				.send(emailMsg)
				.then(() => {
					console.log("Email sent");
				})
				.catch((error) => {
					console.error(error);
				});

			res.redirect("/auth/creator-login");
		})
		.catch((err) => {
			console.log(err);
		});
};
