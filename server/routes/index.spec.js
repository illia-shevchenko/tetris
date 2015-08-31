/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


describe('Hello world', function () {
    var baseUrl = 'http://localhost:8080/api/about',
        request = require('request');

    describe('GET api/', function () {

        it('should be', function () {
            expect(0).toBe(0);
        });
        it('should returns 200 OK and proper text', function (done) {
            request.get(baseUrl, function (err, response, body) {
                console.log(arguments);
                expect(response.statusCode).toBe(200);
                //expect(body).toBe('Here is cool api verson 0.0.0-pre-alfa');
                done();
            });
        });

    });
});