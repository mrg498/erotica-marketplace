const Story = require("../models/story");

exports.getUploadStory = (req, res, next) => {
	res.render("creator/upload-story", {
		pageTitle: "Upload Story"
	});
};

exports.postUploadStory = (req, res, next) => {
	const title = req.body.title;
	const story = new Story({
		title: title
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
