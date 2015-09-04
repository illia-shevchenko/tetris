/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

let HttpError = require('../http'),
    CustomError = require('../custom');

describe('HttpError', function () {
    it('should provide "http" type', function () {
        let custom = new HttpError('connection failed');

        expect(custom.type).to.equal('http');
    });

    it('should change statuses out of range 400 to 499 to 400', function () {
        let custom = new HttpError('connection failed', 500);
        expect(custom.status).to.equal(400);

        custom = new HttpError('connection failed', 300);
        expect(custom.status).to.equal(400);

        custom = new HttpError('connection failed');
        expect(custom.status).to.equal(400);
    });

    it('should extend CustomError class', function () {
        let custom = new HttpError('connection failed', 500);
        expect(custom).to.be.instanceof(CustomError);
    });

    it('should set data and message from given parameters', function () {
        let custom = new HttpError('connection failed', 0, { foo: 'bar' });

        expect(custom).to.containSubset({
            message: 'connection failed',
            data: {
                foo: 'bar'
            }
        });
    });
});
