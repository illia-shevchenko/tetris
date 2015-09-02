/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/


define(['figure'], function (Figure) {
    describe('Figure', function () {
        var figure;

        beforeEach(function () {
            figure = new Figure({
                left: 2,
                top : 4,
                allowedConfigurations: [{
                    points: [
                        0, 1,
                        0, 1,
                        0, 1,
                        0, 1],
                    width: 2
                }, {
                    points: [
                        0, 0, 0, 0,
                        1, 1, 1, 1],
                    width : 4
                }],
                configurationIndex: 1,
                pointsValue: 3
            });
        });


        describe('Init', function () {
            it('should be in init position, points and width', function () {
                expect(figure.getMap()).toEqual({
                    left  : 2,
                    top   : 4,
                    width : 4,
                    points: [
                        0, 0, 0, 0,
                        3, 3, 3, 3
                    ],
                    hash  : jasmine.any(Number)
                });
            });

            it('should set index to zero if it is greater than allowedConfigurations length', function () {
                figure = new Figure({
                    allowedConfigurations: [{
                        points: [
                            0, 1,
                            0, 1,
                            0, 1,
                            0, 1],
                        width: 2
                    }, {
                        points: [
                            0, 0, 0, 0,
                            1, 1, 1, 1],
                        width : 4
                    }],
                    configurationIndex: 3
                });

                expect(figure.getMap().points).toEqual([0, 1,
                    0, 1,
                    0, 1,
                    0, 1]);
            });

            it('should set index to zero if it is less than 0', function () {
                figure = new Figure({
                    allowedConfigurations: [{
                        points: [
                            0, 1,
                            0, 1,
                            0, 1,
                            0, 1],
                        width: 2
                    }, {
                        points: [
                            0, 0, 0, 0,
                            1, 1, 1, 1],
                        width : 4
                    }],
                    configurationIndex: -1
                });

                expect(figure.getMap().points).toEqual([0, 1,
                    0, 1,
                    0, 1,
                    0, 1]);
            });
        });


        describe('Rotate', function () {
            it('should return second position with the same coordinates for rotation', function () {
                expect(figure.rotate()).toEqual({
                    left  : 2,
                    top   : 4,
                    width : 2,
                    points: [
                        0, 3,
                        0, 3,
                        0, 3,
                        0, 3
                    ],
                    hash  : jasmine.any(Number)
                });
            });

            it('should return first position with the same coordinates for double rotation', function () {
                figure.setMap(figure.rotate());

                expect(figure.rotate()).toEqual({
                    left  : 2,
                    top   : 4,
                    width : 4,
                    points: [
                        0, 0, 0, 0,
                        3, 3, 3, 3
                    ],
                    hash  : jasmine.any(Number)
                });
            });
        });

        describe('Move', function () {
            describe('Down', function () {
                it('should return the same points and width but new top coordinate', function () {
                    expect(figure.moveDown()).toEqual({
                        left  : 2,
                        top   : 5,
                        width : 4,
                        points: [
                            0, 0, 0, 0,
                            3, 3, 3, 3
                        ],
                        hash  : jasmine.any(Number)
                    });
                });
            });

            describe('Left', function () {
                it('should return the same points and width but new left coordinate', function () {
                    expect(figure.moveLeft()).toEqual({
                        left  : 1,
                        top   : 4,
                        width : 4,
                        points: [
                            0, 0, 0, 0,
                            3, 3, 3, 3
                        ],
                        hash  : jasmine.any(Number)
                    });
                });
            });

            describe('Right', function () {
                it('should return the same points and width but new left coordinate', function () {
                    expect(figure.moveRight()).toEqual({
                        left  : 3,
                        top   : 4,
                        width : 4,
                        points: [
                            0, 0, 0, 0,
                            3, 3, 3, 3
                        ],
                        hash  : jasmine.any(Number)
                    });
                });
            });
        });

        describe('Set position', function () {
            it('should set position at the center', function () {
                figure.setOffsetPosition({
                    x: 6,
                    y: 6,
                    yCenter: true
                });

                expect(figure.getMap()).toEqual(jasmine.objectContaining({
                    left: 1,
                    top : 2
                }));
            });
            it('should set position at the center', function () {
                figure.setOffsetPosition({
                    x: 5,
                    y: 5,
                    yCenter: true
                });

                expect(figure.getMap()).toEqual(jasmine.objectContaining({
                    left: 0,
                    top : 1
                }));
            });

            it('should set position above the center', function () {
                figure.setOffsetPosition();

                expect(figure.getMap()).toEqual(jasmine.objectContaining({
                    top : -2
                }));
            });
        });
    });
});