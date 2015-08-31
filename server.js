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
    routes     = require('./server/routes');
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
app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.send('Error!');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.send('Error!');
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});
});
/**
 * listen (start app with node server.js)
 */
app.listen(port);