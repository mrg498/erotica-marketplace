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

exports.getStoryDetails = (req, res, next) => {
	const storyId = req.params.storyId;
	Story.findById(storyId)
		.then((story) => {
			const dateFormat = story.date.toLocaleDateString();
			// const dateFormat = `${month} ${date} ${year}`;
			res.render("creator/story-details", {
				pageTitle: "Story Details",
				creatorLoggedIn: req.session.creatorLoggedIn,
				story: story,
				dateFormat: dateFormat
			});
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

exports.postEditStory = (req,res,next) => {
	const storyId = req.body.storyId;
	const title = req.body.title;
	const body = req.body.body;
	const audioFile = req.body.audioFile;
	const updatedStory = {
		title: title,
		body: body,
		audioFile: audioFile
	}
	Story.findByIdAndUpdate(storyId, updatedStory, {new: true})
	.then(updatedDoc => {
		console.log("updated Story", updatedDoc);
		res.redirect(`/creator/story-details/${storyId}`);
	})
	.catch(err=>{
		console.log(err);
	});
}

exports.postDeleteStory = (req, res, next) => {
	const storyId = req.body.storyId;
	console.log("Delete Story route");
	Story.findByIdAndDelete(storyId)
		.then((deletedStory) => {
			console.log("deleted Story", deletedStory);
			res.redirect("/creator/dashboard");
		})
		.catch((err) => {
			console.log(err);
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
