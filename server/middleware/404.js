/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


const CustomError = require('../models/errors/custom');

module.exports = function(req, res, next) {
    let err = new CustomError('Not Found', 404);
    next(err);
};