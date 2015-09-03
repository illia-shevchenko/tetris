/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/
/*global request, testEnd*///see helpers/

describe('GAME api', function () {
    describe('GET api/game/:q', function () {
        it('should returns 200 OK and list of games', function (done) {
            request.get('/api/game/search_string')
                .expect(200, 'Here your list: search_string')
                .end(testEnd(done));
        });
    });
});
