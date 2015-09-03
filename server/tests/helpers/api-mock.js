/**
 * Created by Illia_Shevchenko on 03.09.2015.
 */
'use strict';


let app     = require('../../../server'),
    request = require('supertest');

global.request = request(app);