/**
 * Created by Illia_Shevchenko on 03.09.2015.
 */
'use strict';


let chai = require('chai'),
    chaiSubset = require('chai-subset');

chai.config.includeStack = true;
chai.use(chaiSubset);

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;