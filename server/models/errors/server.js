/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

let CustomError = require('./custom');

class ServerError extends CustomError {
    constructor(message, data) {
        super(message, 500, data, 'server', 'Server internal');
    }
}

module.exports = ServerError;