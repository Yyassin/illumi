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
        default: 'https://images-platform.99static.com//rQ20qavEFmVRazKkSzI0jmA7l50=/654x67:1154x567/fit-in/590x590/projects-files/33/3395/339514/fd6c37dc-e06c-4af0-9616-bf1d1217b8ba.png',
        type: String,
        required: false
    }
});
const register = mongoose.model('server', serverSchema);
module.exports = register;