/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
define(['figure'], function (Figure) {
    describe('Figure', function () {
        var figure;

        beforeEach(function () {
            figure = new Figure({
                left: 2,
                top : 4,
                allowedConfigurations: [{
                    points: [0, 1,
                             0, 1,
                             0, 1,
                             0, 1],
                    width: 2
                }, {
                    points: [0, 0, 0, 0,
                             1, 1, 1, 1],
                    width : 4
                }],
                configurationIndex: 1,
                pointsValue: 3
            });
        });


        describe('Init', function () {
            it('should be in init position, points and width', function () {
                var map = figure.getMap();
                expect(map.points).toEqual([
                    0, 0, 0, 0,
                    3, 3, 3, 3
                ]);

                expect(map.left).toBe(2);
                expect(map.top).toBe(4);
                expect(map.width).toBe(4);
            });
        });


        describe('Rotate', function () {
            it('should return second position with the same coordinates for rotation', function () {
                var map = figure.rotate();

                expect(map.points).toEqual([
                    0, 3,
                    0, 3,
                    0, 3,
                    0, 3
                ]);

                expect(map.left).toBe(2);
                expect(map.top).toBe(4);
                expect(map.width).toBe(2);
            });
        });

        describe('Move', function () {
            describe('Down', function () {
                it('should return the same points and width but new top coordinate', function () {
                    var map = figure.moveDown();

                    expect(map.points).toEqual([
                        0, 0, 0, 0,
                        3, 3, 3, 3
                    ]);

                    expect(map.left).toBe(2);
                    expect(map.top).toBe(5);
                    expect(map.width).toBe(4);
                });
            });

            describe('Left', function () {
                it('should return the same points and width but new left coordinate', function () {
                    var map = figure.moveLeft();

                    expect(map.points).toEqual([
                        0, 0, 0, 0,
                        3, 3, 3, 3
                    ]);

                    expect(map.left).toBe(1);
                    expect(map.top).toBe(4);
                    expect(map.width).toBe(4);
                });
            });

            describe('Right', function () {
                it('should return the same points and width but new left coordinate', function () {
                    var map = figure.moveRight();

                    expect(map.points).toEqual([
                        0, 0, 0, 0,
                        3, 3, 3, 3
                    ]);

                    expect(map.left).toBe(3);
                    expect(map.top).toBe(4);
                    expect(map.width).toBe(4);
                });
            });
        });
    });
});