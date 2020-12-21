const Story = require("../models/story");

exports.getStories = (req, res, next) => {
	res.render("admin/stories", {
		pageTitle: "Admin Stories"
	});
};
