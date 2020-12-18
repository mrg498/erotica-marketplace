const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String
	},
	audioFile: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	creatorId: {
		type: Schema.Types.ObjectId,
		ref: "Creator",
		required: true
	},
	upVotes: Number,
	downVotes: Number,
	comments: [
		{
			customerId: {
				type: Schema.Types.ObjectId,
				ref: "Customer",
				required: true
			},
			body: String,
			date: {
				type: Date,
				default: Date.now
			}
		}
	]
});

module.exports = mongoose.model("Story", storySchema);
