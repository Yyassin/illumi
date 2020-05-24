const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const dotenv = require('dotenv');

const database = require('./config/database')
const apiLock = require('./src/utilities/apiLock')
const accessValidate = require('./src/register/register.controller').validate

// routes
const core_route = require('./src/core/core.route');
const register_route = require('./src/register/register.route');

dotenv.config({path: './config.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiLock.check);

app.use('/api/core', accessValidate, core_route);
app.use('/api/auth', register_route);

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const port = parseInt(process.env.PORT) || 8000;

app.listen(port, () => {
    console.log(`Server runnng in ${process.env.NODE_ENV} mode on port ${port}`);
})