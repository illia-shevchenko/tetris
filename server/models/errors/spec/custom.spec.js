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

        console.log(Object.keys(custom));
        expect(custom.errorMessage).to.equal('message');
        expect(custom.data).to.equal('');
        expect(custom.type).to.equal('unknown');
        expect(custom.status).to.equal(400);

        //expect(custom.toString()).toEqual('');
    });
});
