/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/


describe('API', function () {
    const baseUrl = 'http://localhost:8080/api';
    let   request = require('request');


    describe('GET api/about', function () {
        const url = baseUrl + '/about';

        it('should returns 200 OK and proper text', function (done) {
            request.get(url, function (err, response, body) {
                expect(response.statusCode).toBe(200);
                expect(body).toEqual('Here is cool api version 0.0.0-pre-alfa');
                done();
            });
        });
    });
});
