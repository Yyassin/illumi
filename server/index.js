// imported modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// graphQL componenets
const graphql_http = require('express-graphql')
const graphql_schema = require('./src/graphql/schema')
const graphql_resolvers = require('./src/graphql/resolvers/root.resolver')

const database = require('./config/database')
const docs_route = require('./src/docs/docs.route')
const apiLock = require('./src/middleware/apiLock')
const validate = require('./src/middleware/validate')

dotenv.config({path: './config.env'});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiLock.check);

// static views for docs rendering
app.set("views", path.join(__dirname, "src/docs/views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "src/docs/views/partials")))
app.use(docs_route);

app.use('/api', graphql_http( (req, res) => (
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