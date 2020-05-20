const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const dotenv = require('dotenv');
const firebase = require('firebase-admin')
const serviceAccount = require("./serviceAccountKey.json");

//init firebaseDB
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://illumi-176f9.firebaseio.com"
});

const db = firebase.database();

dotenv.config({path: './config.env'});

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const port = parseInt(process.env.PORT) || 8000;

app.listen(port, () => {
    console.log(`Server runnng in ${process.env.NODE_ENV} mode on port ${port}`);
})