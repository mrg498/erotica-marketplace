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
	upVotes: {
		type: Number,
		default: 0
	},
	downVotes: {
		type: Number,
		default: 0
	},
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
