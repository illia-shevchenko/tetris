/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';


/**
 * set up
 */
let serverDir  = `./${process.env.NODE_DEST || 'server'}`,
    mwDir      = `${serverDir}/middleware`,

    express    = require('express'),
    app        = express(),
    mongoose   = require('mongoose'),
    port       = process.env.PORT || 8080,
    database   = require('./config/database'),
    bodyParser = require('body-parser');
/**
 * configuration
 */
mongoose.connect(database.url);



app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({
    extended: 'true'
}));

app.use(bodyParser.json());

/**
 * routes
 */
app.use('/', require(`${serverDir}/routes`));


app.use(require(`${mwDir}/404`));
app.use(require(`${mwDir}/handle-errors`));
/**
 * listen (start app with node server.js)
 */
app.listen(port);
module.exports = app;