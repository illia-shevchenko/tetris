/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

describe('GAME api', function () {
    const baseUrl = 'http://localhost:8080/api/game';
    let   request = require('request');


    describe('GET api/game/:q', function () {
        const url = baseUrl + '/search_string';

        it('should returns 200 OK and list of games', function (done) {
            console.log('request');
            request.get(url, function (err, response, body) {
                console.log('response');
                expect(response.statusCode).toBe(300);
                expect(body).toEqual('Here your list: search_string');
                done();
            });
        });
    });
});
