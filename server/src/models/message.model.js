const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    },
    memberID : {
        type: String,
        required: true
    },
    roomID : {
        type: String,
        required: true
    }
});
const register = mongoose.model('message', messageSchema);
module.exports = register;