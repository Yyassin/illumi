// imported modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const dotenv = require('dotenv');

// graphQL componenets
const graphql_http = require('express-graphql')
const graphql_schema = require('./src/graphql/schema')
const graphql_resolvers = require('./src/graphql/resolvers/root.resolver')

const database = require('./config/database')
const apiLock = require('./src/middleware/apiLock')
const validate = require('./src/middleware/validate')

dotenv.config({path: './config.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiLock.check);

app.use('/graphql', validate, graphql_http( (req, res) => (
    {
        schema: graphql_schema,
        rootValue: graphql_resolvers,
        graphiql: true,
        context: { body: req.body.token, res: res }
    }
)))

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const port = parseInt(process.env.PORT) || 8000;

app.listen(port, () => {
    console.log(`Server runnng in ${process.env.NODE_ENV} mode on port ${port}`);
})