/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/
/*global request, testEnd*///see helpers/

describe('API', () => {
    describe('GET api/about', () => {
        it('should returns 200 OK and proper text', done => {
            request.get('/api/about')
                .expect(200, 'Here is cool api version 0.0.0-pre-alfa')
                .end(testEnd(done));
        });
    });
});
