/**
 * Created by Illia_Shevchenko on 08.09.2015.
 */
'use strict';


import mongooseMock from 'mongoose-mock';
import sinon from 'sinon';


/**
 * Add mocks which is not existed in the mongooseMock v0.4.0
 */
let oldSchema = mongooseMock.Schema,

    getPromisedStub = (Obj, mixin) => {
        let result = Obj,
            stub = () => {
                return Object.assign(Promise.resolve(result), mixin);
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
        },
        arrayOfMocks = new Array(5).fill(new Mock()),
        queryForFindMock = {};

    /**
     * Copy all static properties to new Mock
     */
    Object.assign(Mock, oldMock);

    Mock.findOne = getPromisedStub(Mock);
    sinon.spy(Mock, 'findOne');


    /**
     * Trick with find - it should return Query with .then method and given methods which returns the same
     */
    queryForFindMock.or     = getPromisedStub(arrayOfMocks, queryForFindMock);
    queryForFindMock.select = getPromisedStub(arrayOfMocks, queryForFindMock);

    Mock.find = getPromisedStub(arrayOfMocks, queryForFindMock);
    sinon.spy(Mock, 'find');


    Mock.count = sinon.stub().returns(Math.random());
    Mock.eachPath = sinon.stub();

    return Mock;
};

export default mongooseMock;