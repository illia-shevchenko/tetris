/**
 * Created by Illia_Shevchenko on 17.09.2015.
 */
'use strict';


define(['lodash', 'bluebird'], function (_, bluebird) {
    var http = function (settings) {
            console.log(typeof bluebird);
            console.log(settings);
        },

        httpMethodWithBody = function (method, url, data, config) {
            var settings = _.assign({}, config, {
                method: method,
                url   : url,
                data  : data
            });

            return http(settings);
        },

        httpMethod = function (method, url, config) {
            httpMethodWithBody(method, url, null, config);
        };

    http.get       = httpMethod.bind(null, 'GET');
    http['delete'] = httpMethod.bind(http, 'DELETE');
    http.put       = httpMethod.bind(http, 'PUT');
    http.head      = httpMethod.bind(http, 'HEAD');
    http.post      = httpMethodWithBody.bind(http, 'POST');

    return http;
});