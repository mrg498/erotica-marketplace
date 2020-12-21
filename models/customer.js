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
	}
});

module.exports = mongoose.model("Customer", customerSchema);
