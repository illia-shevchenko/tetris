/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


class CustomError extends Error {
    constructor(message, status = 400, data = '', type = 'unknown', pre = null) {
        super(message);

        //TODO: We can't use just super for there becase of babel does not work properly with this @see http://stackoverflow.com/questions/30402287/extended-errors-do-not-have-message-or-stack-trace
        pre = pre !== null ? pre : type;
        this.name = pre.charAt(0).toUpperCase() + pre.slice(1) + ' error';
        this.message = message;


        this.data = data;
        this.errorMessage = this.toString();
        this.type = type;
        this.status = status;

        Object.defineProperty(this, 'name', {
            enumerable: false
        });
    }
}


module.exports = CustomError;