/**
 * Created by Illia_Shevchenko on 08.09.2015.
 */
'use strict';


//import mongoose from 'mongoose';
//import mockgoose from 'mockgoose';
//import proxyquire from 'proxyquire';

//mockgoose(mongoose);


import mongooseMock from 'mongoose-mock';
import sinon from 'sinon';


/**
 * Add mocks which is not existed in the mongooseMock v0.4.0
 */
let oldSchema = mongooseMock.Schema,

    getPromisedStub = (Obj) => {
        let result = Obj,
            stub = () => {
                return Promise.resolve(result);
            };

        if (typeof Obj === 'function') {
            result = new Obj();
        }

        return stub;
    };

mongooseMock.Schema = () => {
    let oldMock = oldSchema(),
        Mock = function () {
            /**
             * We need to redefine some logic in constructor
             */
            oldMock.apply(this, arguments);

            this.save = sinon.stub().returns(this);
        };

    //Copy all static properties
    Object.assign(Mock, oldMock);

    Mock.findOne = getPromisedStub(Mock);
    sinon.spy(Mock, 'findOne');

    Mock.eachPath = sinon.stub();

    return Mock;
};

export default mongooseMock;