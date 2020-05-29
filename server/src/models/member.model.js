const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    role : {
        type: String,
        required: true
    },
    serverID : {
        type: String,
        required: true
    },
    userID : {
        type: String,
        required: true
    }
});
const register = mongoose.model('member', memberSchema);
module.exports = register;