const mongoose = require("mongoose");
const config = require("./keys")

// MongoDB connection
mongoose.connect(config.database.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true})
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.error(err))