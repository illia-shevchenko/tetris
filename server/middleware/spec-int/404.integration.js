/**
 * Created by Illia_Shevchenko on 04.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/
/*global request, testEnd*///see helpers/

describe('404 Not Found', function () {
    describe('GET api/not_existing_endpoint', function () {
        it('should returns 404 error with some error object', function (done) {
            request.get('/api/not_existing_endpoint')
                .expect(404, {})
                .end(testEnd(done));
        });
    });
});
