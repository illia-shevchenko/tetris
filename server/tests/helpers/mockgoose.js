/**
 * Created by Illia_Shevchenko on 08.09.2015.
 */
'use strict';


//import mongoose from 'mongoose';
//import mockgoose from 'mockgoose';
import mongooseMock from 'mongoose-mock';
import proxyquire from 'proxyquire';

//mockgoose(mongoose);

global.proxyquire = function (module) {
    return proxyquire(module, { mongoose: mongooseMock });
};