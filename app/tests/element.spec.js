/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


define(['element'], function (GameElement) {
    describe('GameElement', function () {
        var gameElement;

        beforeEach(function () {
            gameElement = new GameElement({
                left: 2,
                top : 2,
                width: 4
            });
        });

        describe('Get map', function () {
            it('should be able to get map object', function () {
                expect(gameElement.getMap()).toEqual({
                    left  : 2,
                    top   : 2,
                    width : 4,
                    points: [],
                    hash  : jasmine.any(Number)
                });
            });
        });

        describe('Set map', function () {
            var hash;

            beforeEach(function () {
                hash = gameElement.getMap().hash;
            });

            it('should be able to set left and top, while others should not be changed', function () {
                gameElement.setMap({
                    left: 5,
                    top : 8
                });

                expect(gameElement.getMap()).toEqual({
                    left : 5,
                    top  : 8,
                    width: 4,
                    points:[],
                    hash  : hash
                });
            });

            it('should be able to change points and width if they are correct', function () {
                gameElement.setMap({
                    width : 3,
                    points: [
                        0, 1, 5,
                        2, 3, 6]
                });

                expect(gameElement.getMap()).toEqual({
                    left : 2,
                    top  : 2,
                    width: 3,
                    points:[
                        0, 1, 5,
                        2, 3, 6],
                    hash  : hash
                });
            });

            it('should throw error if points length does not suit width', function () {
                var func = function () {
                    gameElement.setMap({
                        width : 4,
                        points: [
                            0, 1, 5,
                            2, 3, 6]
                    });
                };

                expect(func).toThrowError('Width (4) does not suit points length (6)');
            });

            it('should not change hash', function () {
                gameElement.setMap({
                    hash     : new Date().valueOf()
                });

                expect(gameElement.getMap()).toEqual({
                    left : 2,
                    top  : 2,
                    width: 4,
                    points:[],
                    hash  : hash
                });
            });
        });

        describe('Private methods', function () {

        });
    });
});