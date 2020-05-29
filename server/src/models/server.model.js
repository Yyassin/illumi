const mongoose = require("mongoose");

const serverSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    outline : {
        type: String,
        required: false
    },
    thumbnail : {
        type: String,
        required: false
    }
});
const register = mongoose.model('server', serverSchema);
module.exports = register;