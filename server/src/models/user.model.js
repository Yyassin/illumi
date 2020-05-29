const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: false
    },
    thumbnail : {
        type: String,
        required: false
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message'
        }
    ]
});
const register = mongoose.model('user', userSchema, "auth");
module.exports = register;