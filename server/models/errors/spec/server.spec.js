/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

import ServerError from '../server';
import CustomError from '../custom';

describe('ServerError', () => {
    it('should provide "server" type', () => {
        let error = new ServerError('model error');

        expect(error.type).to.equal('server');
    });

    it('should change statuses out of range 500 to 599 to 500', () => {
        let error = new ServerError('model error', 400);
        expect(error.status).to.equal(500);

        error = new ServerError('model error', 600);
        expect(error.status).to.equal(500);

        error = new ServerError('model error');
        expect(error.status).to.equal(500);
    });

    it('should extend CustomError class', () => {
        let error = new ServerError('model error', 500);
        expect(error).to.be.instanceof(CustomError);
    });

    it('should set properly string representing starts with "Server internal"', () => {
        let error = new ServerError('model error');
        expect(error.errorMessage).to.match(/^Server internal/);
    });
    
    it('should set data and message from given parameters', () => {
        let error = new ServerError('model error', 0, { foo: 'bar' });

        expect(error).to.containSubset({
            message: 'model error',
            data: {
                foo: 'bar'
            }
        });
    });
});