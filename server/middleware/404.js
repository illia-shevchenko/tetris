/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


module.exports = function(req, res, next) {
    const CustomError = require('../models/errors/custom');
    let err = new CustomError('Not Found', 404);

    next(err);
};