/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


module.exports = function (app) {
    const CustomError = require('../models/errors/custom');

    app.use(function (err, req, res) {
        if (!(err instanceof CustomError)) {
            err = new CustomError('Error!', 500, err);
        }

        res.status(err.status || 500);
        res.send(err);
    });
};