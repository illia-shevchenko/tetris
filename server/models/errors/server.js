/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import CustomError from './custom';

export default class ServerError extends CustomError {
    /**
     * Error for Http Errors. sets status to 5xx with 500 default.
     * Set 'type' to 'server' and 'prefix' to 'Server internal'
     * @class
     * @extends {CustomError}
     * @param {string} message Message of the error
     * @param {number} status Status of the error. can be 5xx format. Otherwise set to 500
     * @param {*} data Data to attach
     */
    constructor(message, status, data) {
        if (!status || status < 500 || status >= 600) {
            status = 500;
        }

        super(message, status, data, 'server', 'Server internal');
    }
}