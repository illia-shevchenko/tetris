/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


class CustomError extends Error {
    constructor(message, status = 400, data = '', type = 'unknown', pre = '') {
        const prefix = pre || type.charAt(0).toUpperCase() + type.slice(1);

        super(`${prefix} error: ${message}`);

        this.data = data;
        this.errorMessage = message;
        this.type = type;
        this.status = status;
    }

    toString() {
        return JSON.stringify({
            errorMessage: this.errorMessage,
            data: this.data,
            type: this.type
        });
    }
}

module.exports = CustomError;