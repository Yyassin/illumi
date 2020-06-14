const mongoose = require("mongoose");

const inviteSchema = mongoose.Schema({
    senderID : {
        type: String,
        required: true
    },
    targetID : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    }
});
const register = mongoose.model('invite', inviteSchema);
module.exports = register;