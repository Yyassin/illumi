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
    startDate : {
        type: String,
        required: false
    },
    startTime : {
        type: String,
        required: false
    },
    endDate : {
        type: String,
        required: false
    },
    endTime : {
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