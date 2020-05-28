const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const dotenv = require('dotenv');

const database = require('./config/database')
const accessValidate = require('./src/register/register.controller').validate
const apiLock = require('./src/middleware/apiLock')
const validate = require('./src/middleware/validate')

// graphQL componenets
const graphql_http = require('express-graphql')
const graphql_schema = require('./src/graphql/schema')
const graphql_resolvers = require('./src/graphql/resolvers/resolver')

// routes
const core_route = require('./src/core/core.route');
const register_route = require('./src/register/register.route');

dotenv.config({path: './config.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiLock.check);
app.use(validate)

// app.use((req, res, next)=> {
//     console.log(req.body)
//     next()
// })

app.use('/graphql', graphql_http( (req, res) => (
    {
        schema: graphql_schema,
        rootValue: graphql_resolvers,
        graphiql: true,
        context: { body: req.body.token, res: res }
    }
)))

// app.use('/api/core', accessValidate, core_route);
// app.use('/api/auth', register_route);

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const port = parseInt(process.env.PORT) || 8000;

app.listen(port, () => {
    console.log(`Server runnng in ${process.env.NODE_ENV} mode on port ${port}`);
})