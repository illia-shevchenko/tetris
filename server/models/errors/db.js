/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import CustomError from './custom';

export default class DbError extends CustomError {
    /**
     * Error for Database Errors. sets status to 400.
     * Set 'type' to 'db'
     * @param {string} message Message of the error
     * @param {*} [data] Data to attach
     */
    constructor(message, data) {
        super(message, 400, data, 'db');
    }
}