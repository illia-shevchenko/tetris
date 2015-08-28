/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';


/**
 * set up
 */
let express  = require('express'),
    app      = express(),
    mongoose = require('mongoose'),
    port     = process.env.PORT || 8080,
    database = require('./config/database'),
    bodyParser = require('body-parser'),
    router     = require('./server/routes.js');
/**
 * configuration
 */
if (database.url) {
    mongoose.connect(database.url);
}

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({
    extended: 'true'
}));

app.use(bodyParser.json());

/**
 * routes
 */
app.use('/', router);
/**
 * listen (start app with node server.js)
 */
app.listen(port);