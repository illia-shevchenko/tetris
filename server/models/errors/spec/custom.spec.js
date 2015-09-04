/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

let CustomError = require('../custom'),
    expect = require('chai').expect;

describe('CustomError', function () {
    it('should provide default parameters', function () {
        let custom = new CustomError('message');

        expect(custom).to.containSubset({
            errorMessage: 'message',
            data: '',
            type: 'unknown',
            status: 400
        });
    });

    it('should set error properties parameters', function () {
        let custom = new CustomError('custom message', 500, { foo: 'bar' }, 'internal');

        expect(custom).to.containSubset({
            errorMessage: 'custom message',
            data: {
                foo: 'bar'
            },
            type: 'internal',
            status: 500
        });
    });
});
