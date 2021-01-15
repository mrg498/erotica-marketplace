const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
	displayName: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
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

module.exports = mongoose.model("Customer", customerSchema);
