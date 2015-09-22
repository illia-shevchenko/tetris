/**
 * Created by Illia_Shevchenko on 17.09.2015.
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
     * @see https://github.com/petkaantonov/bluebird/blob/master/API.md#cancellable---promise
     * @alias module:http
     */
    var http = function (settings) {
            var xhr = new XMLHttpRequest();

            _.defaults(settings, {
                headers: {},
                method : 'GET',
                url    : 'http://localhost'
            });

            xhr.open(settings.method, settings.url, true, settings.user, settings.password);
            setHeaders(xhr, settings.headers || {});

            return new Promise(function (resolve, reject) {
                /**
                 * Creates response data object
                 * @returns {{responseHeaders: *, statusText: *, response, request: Object, status: *}}
                 */
                var getResponseData = function () {
                    var response = this.response;

                    if (typeof this.response === 'string') {
                        try {
                            response = JSON.parse(this.response);
                        } catch (error) {
                            response = this.response;
                        }
                    }

                    return {
                        responseHeaders: getResponseHeaders(xhr),
                        statusText     : this.statusText,

                        response: response,
                        request : settings,
                        status  : this.status
                    };
                };

                xhr.addEventListener('error', function () {
                    reject(getResponseData.call(this));
                });

                xhr.addEventListener('timeout', function () {
                    reject(getResponseData.call(this));
                });

                xhr.addEventListener('load', function () {
                    var responseData = getResponseData.call(this);

                    if (responseData.status >= 400) { //only status codes form 400 treated as errors
                        return reject(responseData);
                    }

                    resolve(responseData);
                });

                xhr.send(settings.data);
            })
                .cancellable()
                .catch(Promise.CancellationError, function (error) {
                    xhr.abort();
                    return Promise.reject(error);
                });
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
         * @param {XMLHttpRequest} xhr Xhr object set headers to
         * @param {Object} headers Object where key is header name and value is i's value
         */
        setHeaders = function (xhr, headers) {
            Object.keys(headers).forEach(function (key) {
                xhr.setRequestHeader(key, headers[key]);
            });
        },


        /**
         * Gets response headers from xhr
         * @param {XMLHttpRequest} xhr Xhr object set headers from
         * @returns {Object} Object where key is header name and value is i's value
         */
        getResponseHeaders = function (xhr) {
            return xhr.getAllResponseHeaders()
                .split('\r\n')
                .reduce(function (headers, header) {
                    var headerArr = header.split(': '),
                        key = headerArr[0];

                    if (key) {
                        headers[key] = headerArr[1];
                    }
                    return headers;
                }, {});
        };


    /**
     * Shortcut method for 'GET' request
     * @function
     * @param {string} url Url to call
     * @param {Object} [params] Parameters for call
     * @returns {Promise} Promise for request
     */
    http.get       = httpMethod.bind(http, 'GET');

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
    http.head      = httpMethod.bind(http, 'HEAD');

    /**
     * Shortcut method for 'POST' request
     * @function
     * @param {string} url Url to call
     * @param {Object} data Data to set as request body
     * @param {Object} [params] Parameters for call
     * @returns {Promise} Promise for request
     */
    http.post      = httpMethodWithBody.bind(http, 'POST');

    /**
     * Shortcut method for 'PUT' request
     * @function
     * @param {string} url Url to call
     * @param {Object} data Data to set as request body
     * @param {Object} [params] Parameters for call
     * @returns {Promise} Promise for request
     */
    http.put       = httpMethodWithBody.bind(http, 'PUT');

    return http;
});