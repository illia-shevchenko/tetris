/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import CustomError from './custom';

export default class HttpError extends CustomError {
    /**
     * Error for Http Errors. sets status to 4xx with 400 default.
     * Set 'type' to 'http'
     * @param {string} message Message of the error
     * @param {number} status Status of the error. can be 4xx format. Otherwise set to 400
     * @param {*} data Data to attach
     */
    constructor(message, status, data) {
        if (!status || status < 400 || status >= 500) {
            status = 400;
        }

        super(message, status, data, 'http');
    }
}