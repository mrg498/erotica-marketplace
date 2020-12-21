//maybe not having a user
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	cart: {
		items: [
			{
				storyId: {
					type: Schema.Types.ObjectId,
					ref: "Story",
					required: true
				}
			}
		]
	}
});

module.exports = mongoose.model("User", userSchema);
