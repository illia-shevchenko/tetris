/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/


let CustomError = require('../custom');

describe('CustomError', function () {
    it('should provide default parameters', function () {
        let custom = new CustomError('message');

        expect(custom.errorMessage).toEqual('message');
        expect(custom.data).toEqual('');
        expect(custom.type).toEqual('unknown');
        expect(custom.status).toBe(400);

        //expect(custom.toString()).toEqual('');
    });
});
