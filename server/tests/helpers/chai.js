/**
 * Created by Illia_Shevchenko on 03.09.2015.
 */
'use strict';


let chai = require('chai');

chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;