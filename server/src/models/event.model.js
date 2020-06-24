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
    thumbnail : {
        default: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80',
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