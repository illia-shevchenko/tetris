/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

let ServerError = require('../server'),
    CustomError = require('../custom');

describe('ServerError', function () {
    it('should provide "server" type', function () {
        let custom = new ServerError('model error');

        expect(custom.type).to.equal('server');
    });

    it('should change statuses out of range 500 to 599 to 500', function () {
        let custom = new ServerError('model error', 400);
        expect(custom.status).to.equal(500);

        custom = new ServerError('model error', 600);
        expect(custom.status).to.equal(500);

        custom = new ServerError('model error');
        expect(custom.status).to.equal(500);
    });

    it('should extend CustomError class', function () {
        let custom = new ServerError('model error', 500);
        expect(custom).to.be.instanceof(CustomError);
    });

    it('should set properly string representing starts with "Server internal"', function () {
        let custom = new ServerError('model error');
        expect(custom.errorMessage).to.match(/^Server internal/);
    });
    
    it('should set data and message from given parameters', function () {
        let custom = new ServerError('model error', 0, { foo: 'bar' });

        expect(custom).to.containSubset({
            message: 'model error',
            data: {
                foo: 'bar'
            }
        });
    });
});
