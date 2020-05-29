const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: false
    },
    video : {
        type: String,
        required: false
    },
    content : {
        type: String,
        required: false
    },
    tag : {
        type: String,
        required: false
    },
    serverID : {
        type: String,
        required: true
    },
});
const register = mongoose.model('page', pageSchema);
module.exports = register;