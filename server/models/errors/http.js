/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

let CustomError = require('./custom');

class HttpError extends CustomError {
    constructor(message, status, data) {
        if (!status || status < 400 || status >= 500) {
            status = 400;
        }

        super(message, status, data, 'http');
    }
}

module.exports = HttpError;