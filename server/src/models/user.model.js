const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        required: false , 
        type: String
    },
    thumbnail : {
        default: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        required: false , 
        type: String
    }
});
const register = mongoose.model('user', userSchema, "auth");
module.exports = register;