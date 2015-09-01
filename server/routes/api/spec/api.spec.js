/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


describe('Hello world', function () {
    const baseUrl = 'http://localhost:8080/api/about';
    let   request = require('request');


    describe('GET api/', function () {
        it('should be', function () {
            expect(1).toBe(1);
        });

        it('should returns 200 OK and proper text', function (done) {
            console.log('Request server');
            request.get(baseUrl, function (err, response, body) {
                expect(response.statusCode).toBe(300);
                expect(body).toEqual('Here is cool api version 0.0.0-pre-alfa');
                done();
            });
        });
    });
});
