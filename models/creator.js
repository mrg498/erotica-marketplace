const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const creatorSchema = new Schema({
    displayName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Creator', creatorSchema);