/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

let CustomError = require('./custom');

class ServerError extends CustomError {
    constructor(message, status, data) {
        if (!status || status < 500 || status >= 600) {
            status = 500;
        }

        super(message, status, data, 'server', 'Server internal');
    }
}

module.exports = ServerError;