const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
	title: String,
	author: String,
	body: String,
	date: {
		type: Date,
		default: Date.now
	},
	creatorId: {
		type: Schema.Types.ObjectId,
		ref: "Creator",
		required: true
	}
});

module.exports = mongoose.model("Story", storySchema);
