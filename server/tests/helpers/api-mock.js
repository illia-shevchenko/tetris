/**
 * Created by Illia_Shevchenko on 03.09.2015.
 */
'use strict';


let app     = require('../../../server'),
    request = require('supertest');

global.request = request(app);//request('http://localhost:' + process.env.PORT || 8080); //todo: pass host address or need to use mock via env variables