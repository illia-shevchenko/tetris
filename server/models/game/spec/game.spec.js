/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

import mongooseMock from '../../../tests/helpers/mockgoose.js'; //there are some additional manipulations on it
import proxyquire from 'proxyquire';

/** @test {GameModel} */
describe('Game model', () => {
    var Game;

    beforeEach(() => {
        Game = proxyquire('../../game', { mongoose: mongooseMock });
    });

    /** @test {GameModel#findByQuery} */
    describe('query', () => {
        describe('query with proper parameters', () => {
            let result;

            beforeEach(() => {
                result = Game.findByQuery();
            });

            it('should call find', () => {
                //using expect(Game.find).calledOnce makes both WebStorm and ESLint crazy
                expect(Game.find.calledOnce).to.equal(true);
            });

            it('should be a promise', () => {
                expect(result.then).to.be.a('function');
            });
        });

        describe('default parameters', () => {
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
    describe('query with count', () => {
        let result;

        beforeEach(() => {
            result = Game.queryWithCount({
                q: 'filter',
                min: 11,
                max: 222
            });
        });

        it('should call for count', () => {
            expect(Game.count.calledOnce).to.equal(true);
        });

        it('should call find', () => {
            expect(Game.find.calledOnce).to.equal(true);
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
    describe('remove by id', () => {
        beforeEach(() => {
            Game.removeById('coolId');
        });

        afterEach(() => {
            Game.remove.reset();
        });

        it('should call remove with proper parameters', function () {
            expect(Game.remove.calledOnce).to.equal(true);
            expect(Game.remove.getCall(0).args[0]).to.containSubset({
                _id: 'coolId'
            });
        });
    });

    /** @test {GameModel#updateById} */
    describe('update by id', () => {
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
            expect(Game.findOne.calledOnce).to.equal(true);
            expect(Game.findOne.getCall(0).args[0]).to.containSubset({
                _id: 'coolId'
            });
        });

        it('should update and save', (done) => {
            result.then((game) => {
                expect(game).to.containSubset(newGame);
                expect(game.save.calledOnce).to.equal(true);
                done();
            });
        });
    });
});