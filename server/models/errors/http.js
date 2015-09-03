/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

let CustomError = require('./custom');

class HttpError extends CustomError {
    constructor(message, data) {
        super(message, 400, data, 'http');
    }
}

module.exports = HttpError;