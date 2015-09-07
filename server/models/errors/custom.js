/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


export default class CustomError extends Error {
    /**
     * Custom error class to use in application to send as response if any error occurred
     * Creates Error with Prefix or type capitilized. Standart toString behaviour is set to 'errorMessage' property
     * @param {string} message Message of the error. Is using to create Error
     * @param {number} [status=400] Status to set to response
     * @param {*} [data=''] Data to attach to teh response
     * @param {string} [type='unknown'] Type of the error. Also used in 'name' property of the error to generate string representation of the error
     * @param {string} [pre=null] Prefix used in 'name' property of the error to generate string representation of the error
     */
    constructor(message, status = 400, data = '', type = 'unknown', pre = null) {
        super(message);

        //TODO: We can't use just super for there because of babel does not work properly with this @see http://stackoverflow.com/questions/30402287/extended-errors-do-not-have-message-or-stack-trace
        pre = pre !== null ? pre : type;
        /**
         * Holds name of the error. @see Error specification
         * @type {string}
         */
        this.name = pre.charAt(0).toUpperCase() + pre.slice(1) + ' error';
        /**
         * Holds message of the error. @see Error specification
         * @type {string}
         */
        this.message = message;

        /**
         * Holds data
         * @type {*}
         */
        this.data = data;

        /**
         * Holds string default representation of the error: [name] error: [message]
         * @type {string}
         */
        this.errorMessage = this.toString();
        /**
         * Holds type of the error
         * @type {string}
         */
        this.type = type;
        /**
         * Holds status to set to the response
         * @type {number}
         */
        this.status = status;

        Object.defineProperty(this, 'name', {
            enumerable: false
        });
    }
}