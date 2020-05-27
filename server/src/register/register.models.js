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
});
const register = mongoose.model('user', userSchema, "auth");
module.exports = register;