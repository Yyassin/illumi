const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    role_filter : {
        type: String,
        required: false
    },
    pageID : {
        type: String,
        required: true
    },
});

const register = mongoose.model('room', roomSchema);
module.exports = register;