/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

import HttpError from'../http';
import CustomError from '../custom';

describe('HttpError', () => {
    it('should provide "http" type', () => {
        let custom = new HttpError('connection failed');

        expect(custom.type).to.equal('http');
    });

    it('should change statuses out of range 400 to 499 to 400', () => {
        let custom = new HttpError('connection failed', 500);
        expect(custom.status).to.equal(400);

        custom = new HttpError('connection failed', 300);
        expect(custom.status).to.equal(400);

        custom = new HttpError('connection failed');
        expect(custom.status).to.equal(400);
    });

    it('should extend CustomError class', () => {
        let custom = new HttpError('connection failed', 500);
        expect(custom).to.be.instanceof(CustomError);
    });

    it('should set data and message from given parameters', () => {
        let custom = new HttpError('connection failed', 0, { foo: 'bar' });

        expect(custom).to.containSubset({
            message: 'connection failed',
            data: {
                foo: 'bar'
            }
        });
    });
});