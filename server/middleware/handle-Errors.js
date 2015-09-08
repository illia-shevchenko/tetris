/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


const CustomError = require('../models/errors/custom');
module.exports = function (err, req, res, next) { //eslint-disable-line no-unused-vars
    if (!(err instanceof CustomError)) {
        res.status(500)
            .send(err.toString());
        return;
    }

    res.status(err.status)
        .send(JSON.stringify(err));
};