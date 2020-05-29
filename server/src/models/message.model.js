const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    userId : {
        type: String,
        required: true
    },
    roomId : {
        type: String,
        required: true
    }
});
const register = mongoose.model('message', messageSchema);
module.exports = register;