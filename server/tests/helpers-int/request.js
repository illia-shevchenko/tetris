/**
 * Created by Illia_Shevchenko on 03.09.2015.
 */
'use strict';


import request from 'supertest';

if (process.env.NODE_IS_RUN) {
    global.request = request(`http://localhost:${process.env.PORT || 8080}`);
} else {
    global.request = request(require('../../../server'));
}