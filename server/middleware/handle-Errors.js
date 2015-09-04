/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


const CustomError = require('../models/errors/custom');
module.exports = function (err, req, res, next) { //eslint-disable-line no-unused-vars
    if (!(err instanceof CustomError)) {
        err = new CustomError('Error!', 500, err);
    }

    res.status(err.status || 500)
        .send(JSON.stringify(err));
};