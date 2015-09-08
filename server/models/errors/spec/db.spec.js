/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

import DbError from'../db';
import CustomError from '../custom';

describe('DbError', () => {
    it('should provide "db" type', () => {
        let error = new DbError('Property validation');

        expect(error.type).to.equal('db');
    });

    it('should set "status" to 400', () => {
        let error = new DbError('model error');
        expect(error.status).to.equal(400);
    });

    it('should extend CustomError class', () => {
        let error = new DbError('connection failed');
        expect(error).to.be.instanceof(CustomError);
    });

    it('should set data and message from given parameters', () => {
        let error = new DbError('connection failed', { foo: 'bar' });

        expect(error).to.containSubset({
            message: 'connection failed',
            data: {
                foo: 'bar'
            }
        });
    });
});