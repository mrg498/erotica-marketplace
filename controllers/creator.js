const ObjectID = require('mongodb').ObjectID;

const Creator = require("../models/creator");
const Story = require("../models/story");

exports.getDashboard = (req, res, next) => {
	// console.log(req.session);
	const creatorId = req.session.userId;
	Creator.findById(creatorId)
	.then((creator) => {
		res.render("creator/dashboard", {
			pageTitle: "Creator Dashboard",
			creator: creator,
			creatorLoggedIn: req.session.creatorLoggedIn
		});
	})
	.catch(err => {
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
	const story = new Story({
		title: title,
		creatorId: creatorId
	});
	story
		.save()
		.then((result) => {
			res.redirect("/creator/upload-story");
		})
		.catch((err) => {
			console.log(err);
		});
};
