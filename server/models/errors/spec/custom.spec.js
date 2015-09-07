/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

import CustomError from '../custom';

describe('CustomError', function () {
    it('should provide default parameters', function () {
        let custom = new CustomError('message');

        expect(custom).to.containSubset({
            message: 'message',
            data: '',
            type: 'unknown',
            status: 400
        });
    });

    it('should set error properties parameters', function () {
        let custom = new CustomError('custom message', 500, { foo: 'bar' }, 'internal');

        expect(custom).to.containSubset({
            message: 'custom message',
            data: {
                foo: 'bar'
            },
            type: 'internal',
            status: 500
        });
    });

    it('should properly be converted to a string with using prefix parameter and also set errorMessage property', function () {
        let custom = new CustomError('it was used not properly', 500, '', 'internal', 'Thrown');
        expect(custom.toString()).to.equal('Thrown error: it was used not properly');
        expect(custom.errorMessage).to.equal('Thrown error: it was used not properly');
    });

    it('should set error properties parameters and also set errorMessage property', function () {
        let custom = new CustomError('it was your fault', 500, '', 'internal');
        expect(custom.toString()).to.equal('Internal error: it was your fault');
        expect(custom.errorMessage).to.equal('Internal error: it was your fault');
    });
});