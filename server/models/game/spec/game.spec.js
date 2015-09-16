/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/

import mongooseMock from '../../../tests/helpers/mockgoose.js'; //there are some additional manipulations on it
import proxyquire from 'proxyquire';


describe('Game model', () => {
    var Game;

    beforeEach(() => {
        Game = proxyquire('../../game', { mongoose: mongooseMock });
    });

    describe('create and save', () => {
    });


    describe('remove by id', () => {
        afterEach(() => {
            Game.remove.reset();
        });

        it('should find documents to remove', function () {
            Game.removeById('coolId');
            //using expect(Game.remove).calledOnce make both WebStorm and ESLint crazy
            expect(Game.remove.calledOnce).to.equal(true);
            expect(Game.remove.getCall(0).args[0]).to.containSubset({
                _id: 'coolId'
            });
        });
    });

    describe('update by id', () => {
        let newGame = {
            nextFigure: {
                top: 1,
                left: 1,
                width: 1,
                points: [0]
            },
            figure: {
                top: 2,
                left: 2,
                width: 2,
                points: [0, 0]
            },
            field: {
                top: 0,
                left: 0,
                width: 10,
                points: new Array(10).fill(1)
            },
            score: 10,
            user : 'tester'
        };

        afterEach(() => {
            Game.findOne.reset();
        });

        it('should find document, update it and save', (done) => {
            Game.updateById('coolId', newGame)
                .then((game) => {
                    expect(Game.findOne.calledOnce).to.equal(true);
                    expect(Game.findOne.getCall(0).args[0]).to.containSubset({
                        _id: 'coolId'
                    });

                    expect(game).to.containSubset(newGame);
                    expect(game.save.calledOnce).to.equal(true);
                    done();
                });
        });
    });
});