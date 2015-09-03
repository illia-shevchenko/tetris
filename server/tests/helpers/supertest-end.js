/**
 * Created by Illia_Shevchenko on 03.09.2015.
 */
'use strict';
/**
 * Provides helper for integration Supertest with testing frameworks Mocha or Jasmine
 * @param done
 * @returns {Function}
 * @see https://github.com/jasmine/jasmine-npm/issues/31
 */

global.testEnd = function (done) {
    return function (err) {
        if (!err) {
            return done();
        }

        //for Jasmine framework
        if (typeof done.fail === 'function') {
            return done.fail(err);
        }

        done(err);
    };
};