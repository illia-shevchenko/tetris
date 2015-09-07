/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import CustomError from './custom';

export default class ServerError extends CustomError {
    constructor(message, status, data) {
        if (!status || status < 500 || status >= 600) {
            status = 500;
        }

        super(message, status, data, 'server', 'Server internal');
    }
}