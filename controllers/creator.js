const ObjectID = require("mongodb").ObjectID;

const Creator = require("../models/creator");
const Story = require("../models/story");

exports.getDashboard = (req, res, next) => {
	// console.log(req.session);
	let creatorId = req.session.userId;
	let creator;
	Creator.findById(creatorId)
		.then((c) => {
			if (c) {
				creator = c;
				creatorId = c.id;
			}
			return Story.find({ creatorId: creatorId });
		})
		.then((stories) => {
			// console.log(creator);
			// console.log(stories);
			res.render("creator/dashboard", {
				pageTitle: "Creator Dashboard",
				creator: creator,
				stories: stories,
				creatorLoggedIn: req.session.creatorLoggedIn
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getUploadStory = (req, res, next) => {
	res.render("creator/upload-story", {
		pageTitle: "Upload Story",
		creatorLoggedIn: req.session.creatorLoggedIn
	});
};

exports.postUploadStory = (req, res, next) => {
	const title = req.body.title;
	const creatorId = req.session.userId;
	const body = req.body.body;
	const audioFile = req.body.audioFile;
	const story = new Story({
		title: title,
		creatorId: creatorId,
		body: body,
		audioFile: audioFile
	});
	story
		.save()
		.then((result) => {
			res.redirect("/creator/dashboard");
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/creator/dashboard");
		});
};

exports.getEditStory = (req, res, next) => {
	const storyId = req.params.storyId;
	// console.log(storyId);
	Story.findById(storyId)
		.then((story) => {
			res.render("creator/edit-story", {
				pageTitle: "Upload Story",
				creatorLoggedIn: req.session.creatorLoggedIn,
				story: story
			});
		})
		.catch((err) => {
			console.log(err);
			res.redirect("/creator/dashboard");
		});
};

exports.getManagePayment = (req, res, next) => {
	res.render("creator/manage-payment", {
		pageTitle: "Manage Payment",
		creatorLoggedIn: req.session.creatorLoggedIn
	});
};

exports.getEditProfile = (req, res, next) => {
	res.render("creator/edit-profile", {
		pageTitle: "Edit Profile",
		creatorLoggedIn: req.session.creatorLoggedIn
	});
};
