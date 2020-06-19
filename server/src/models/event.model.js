const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    location : {
        type: String,
        required: false
    },
    time : {
        type: String,
        required: false
    },
    serverID : {
        type: String,
        required: true
    },
});

const register = mongoose.model('event', eventSchema);
module.exports = register;