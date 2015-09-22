/**
 * Created by Illia_Shevchenko on 22.09.2015.
 */
'use strict';


/**
 * A module representing http factory to create http calls
 * @module http
 */
define(['lodash', 'bluebird'], function (_, Promise) {
    /**
     * Creates http cal with given parameters
     * @param {Object} settings Settings for call
     * @param {string} [settings.url = 'http://localhost'] Url to call
     * @param {string} [settings.method] Http method - 'GET', 'POST' etc
     * @param {Object} [settings.headers] SObject where key is header name and value is i's value
     * @param {string} [settings.user] User name for a call
     * @param {string} [settings.password] Password for the call
     * @returns {Promise} Promise for request. Cancelable.
     * @alias module:http
     */
    var http = function (settings) {
            var xhr = {
                    responseHeaders: {}
                },
                
                promise = new Promise(function (resolve, reject) {
                    /**
                     * Creates response data object
                     * @returns {{responseHeaders: *, statusText: *, response, request: Object, status: *}}
                     */
                    xhr.getResponseData = function (status, headers, body) {
                        var response = body;

                        if (typeof body === 'string') {
                            try {
                                response = JSON.parse(body);
                            } catch (error) {
                                response = body;
                            }
                        }

                        return {
                            responseHeaders: headers,
                            statusText     : httpStatusCodes[status] || 'Bad Request',

                            response: response,
                            request : settings,
                            status  : status
                        };
                    };

                    promise.respondError = function (status, headers, body) {
                        reject(xhr.getResponseData(status, headers, body));
                    };

                    promise.respondTimeout = function (status, headers, body) {
                        reject(xhr.getResponseData(status, headers, body));
                    };

                    xhr.addEventListener('load', function () {
                        var responseData = xhr.getResponseData.call(this);

                        if (responseData.status >= 400) { //only status codes form 400 treated as errors
                            return reject(responseData);
                        }

                        resolve(responseData);
                    });

                    promise.respond = function (status, headers, body) {
                        var responseData = xhr.getResponseData(status, headers, body);

                        if (responseData.status >= 400) { //only status codes form 400 treated as errors
                            return reject(responseData);
                        }

                        resolve(responseData);
                    };
                })
                    .cancellable()
                    .catch(Promise.CancellationError, function (error) {
                        return Promise.reject(error);
                    });

            _.defaults(settings, {
                headers: {},
                method : 'GET',
                url    : 'http://localhost'
            });

            setHeaders(xhr, settings.headers || {});

            return promise;
        },


    /**
     * @typedef {Object} http~config Configuration object for http shortcuts
     * @property {Object} headers Object where key is header name and value is i's value
     * @property {string} settings.user User name for a call
     * @property {string} settings.password Password for the call
     */


        /**
         * Method for creating shortcuts with body
         * @param {string} url Url to call
         * @param {string} method Http method - 'GET', 'POST' etc
         * @param {Object} data Data to set as request body
         * @param {http~config} config
         */
        httpMethodWithBody = function (method, url, data, config) {
            var settings = _.assign({}, config, {
                method: method,
                url   : url,
                data  : data
            });

            return http(settings);
        },


        /**
         * Method for creating shortcuts without body
         * @param {string} url Url to call
         * @param {string} method Http method - 'GET', 'POST' etc
         * @param {http~config} config
         */
        httpMethod = function (method, url, config) {
            return httpMethodWithBody(method, url, null, config);
        },


        /**
         * Sets headers to xhr
         * @param {Object} xhr Xhr object set headers to
         * @param {Object} headers Object where key is header name and value is i's value
         */
        setHeaders = function (xhr, headers) {
            xhr.headers = headers;
        };


    /**
     * Shortcut method for 'GET' request
     * @function
     * @param {string} url Url to call
     * @param {Object} [params] Parameters for call
     * @returns {Promise} Promise for request
     */
    http.get = httpMethod.bind(http, 'GET');

    /**
     * Shortcut method for 'DELETE' request
     * @method delete
     * @param {string} url Url to call
     * @param {Object} [params] Parameters for call
     * @returns {Promise} Promise for request
     */
    http['delete'] = httpMethod.bind(http, 'DELETE');

    /**
     * Shortcut method for 'HEAD' request
     * @function
     * @param {string} url Url to call
     * @param {Object} [params] Parameters for call
     * @returns {Promise} Promise for request
     */
    http.head = httpMethod.bind(http, 'HEAD');

    /**
     * Shortcut method for 'POST' request
     * @function
     * @param {string} url Url to call
     * @param {Object} data Data to set as request body
     * @param {Object} [params] Parameters for call
     * @returns {Promise} Promise for request
     */
    http.post = httpMethodWithBody.bind(http, 'POST');

    /**
     * Shortcut method for 'PUT' request
     * @function
     * @param {string} url Url to call
     * @param {Object} data Data to set as request body
     * @param {Object} [params] Parameters for call
     * @returns {Promise} Promise for request
     */
    http.put = httpMethodWithBody.bind(http, 'PUT');

    var httpStatusCodes = {
        100: 'Continue',
        101: 'Switching Protocols',
        200: 'OK',
        201: 'Created',
        202: 'Accepted',
        203: 'Non-Authoritative Information',
        204: 'No Content',
        205: 'Reset Content',
        206: 'Partial Content',
        300: 'Multiple Choice',
        301: 'Moved Permanently',
        302: 'Found',
        303: 'See Other',
        304: 'Not Modified',
        305: 'Use Proxy',
        307: 'Temporary Redirect',
        400: 'Bad Request',
        401: 'Unauthorized',
        402: 'Payment Required',
        403: 'Forbidden',
        404: 'Not Found',
        405: 'Method Not Allowed',
        406: 'Not Acceptable',
        407: 'Proxy Authentication Required',
        408: 'Request Timeout',
        409: 'Conflict',
        410: 'Gone',
        411: 'Length Required',
        412: 'Precondition Failed',
        413: 'Request Entity Too Large',
        414: 'Request-URI Too Long',
        415: 'Unsupported Media Type',
        416: 'Requested Range Not Satisfiable',
        417: 'Expectation Failed',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
        501: 'Not Implemented',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout',
        505: 'HTTP Version Not Supported'
    };
    
    return http;
});