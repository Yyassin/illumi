const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    role_filter : {
        type: String,
        required: false
    }
});
const register = mongoose.model('room', roomSchema);
module.exports = register;