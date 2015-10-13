/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

import mongooseMock from '../../../tests/helpers/mongoose-mock.js'; //there are some additional manipulations on it
import proxyquire from 'proxyquire';

/** @test {GameModel} */
describe('Game model', () => {
    var Game;

    beforeEach(() => {
        Game = proxyquire('../../game', { mongoose: mongooseMock });
    });

    /** @test {GameModel#findByQuery} */
    describe('Find by query', () => {
        describe('Query with proper parameters', () => {
            let result;

            beforeEach(() => {
                result = Game.findByQuery();
            });

            it('should call find', () => {
                return expect(Game.find).have.been.calledOnce;
            });

            it('should be a promise', () => {
                expect(result.then).to.be.a('function');
            });
        });

        describe('Default parameters', () => {
            beforeEach(() => {
                Game.findByQuery();
            });

            afterEach(() => {
                Game.find.reset();
            });

            it('should set "null" as default q', () => {
                //@todo: how to do this?
            });
        });
    });

    /** @test {GameModel#queryWithCount} */
    describe('Find by query with count', () => {
        let result;

        beforeEach(() => {
            result = Game.queryWithCount();
        });

        it('should call for count', () => {
            return expect(Game.count).have.been.calledOnce;
        });

        it('should call find', () => {
            return expect(Game.find).have.been.calledOnce;
        });

        it('should be a promise', () => {
            expect(result.then).to.be.a('function');
        });

        it('should return object with count and games array on promise resolving', (done) => {
            result.then((found) => {
                expect(found.count).to.be.a('number');
                expect(found.games).to.be.instanceOf(Array);
                done();
            });
        });
    });

    /** @test {GameModel#removeById} */
    describe('Remove by id', () => {
        beforeEach(() => {
            Game.removeById('coolId');
        });

        afterEach(() => {
            Game.remove.reset();
        });

        it('should call remove with proper parameters', function () {
            expect(Game.remove.getCall(0).args[0]).to.containSubset({
                _id: 'coolId'
            });
            return expect(Game.remove).have.been.calledOnce;
        });
    });

    /** @test {GameModel#updateById} */
    describe('Update by id', () => {
        let newGame = {
                nextFigure: {
                    top   : 1,
                    left  : 1,
                    width : 1,
                    points: [0]
                },
                figure: {
                    top   : 2,
                    left  : 2,
                    width : 2,
                    points: [0, 0]
                },
                field: {
                    top   : 0,
                    left  : 0,
                    width : 10,
                    points: new Array(10).fill(1)
                },
                score: 10,
                user : 'tester'
            },
            result;

        beforeEach(() => {
            result = Game.updateById('coolId', newGame);
        });

        afterEach(() => {
            Game.findOne.reset();
        });

        it('should call find one game with given id', () => {
            expect(Game.findOne.getCall(0).args[0]).to.containSubset({
                _id: 'coolId'
            });
            return expect(Game.findOne).have.been.calledOnce;
        });

        it('should update and save', (done) => {
            result.then((game) => {
                expect(game).to.containSubset(newGame);
                return expect(game.save).have.been.calledOnce && done();
            });
        });
    });
});