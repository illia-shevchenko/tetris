/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
define(['field'], function (Field) {
    describe('Field', function () {
        var field;

        beforeEach(function () {
            field = new Field({
                width : 5,
                height: 5
            });
        });

        describe('Init', function () {
            it('should be init with zero left and top, and proper points', function () {
                var map = field.getMap();

                expect(map.left).toBe(0);
                expect(map.top).toBe(0);
                expect(map.points).toEqual([
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0]);
            });
        });

        describe('Check maps with empty field', function () {
            it('should successfully check maps that suits free space', function () {
                var result = field.checkMap({
                    left: 0,
                    top : 0,
                    points: [
                        0, 0, 0, 0,
                        2, 2, 2, 2],
                    width : 4
                });

                expect(result).toBeTruthy();
            });

            it('should successfully check maps that have unsuitable sizes but internally suits free space', function () {
                var result = field.checkMap({
                    left: 3,
                    top : 0,
                    points: [
                        0, 0, 0, 0,
                        0, 2, 2, 0],
                    width : 4
                });

                expect(result).toBeTruthy();
            });

            it('should reject maps with negative left position', function () {
                var result = field.checkMap({
                    left: -1,
                    top : 0,
                    points: [
                        0, 0, 0, 0,
                        2, 2, 2, 2],
                    width : 4
                });

                expect(result).toBeFalsy();
            });

            it('should successfully check maps with negative left position but internally suits free space', function () {
                var result = field.checkMap({
                    left: -1,
                    top : 0,
                    points: [
                        0, 0, 0, 0,
                        0, 2, 2, 0],
                    width : 4
                });

                expect(result).toBeTruthy();
            });

            it('should reject maps unsuitable by top position', function () {
                var result = field.checkMap({
                    left: 0,
                    top : 4,
                    points: [
                        0, 2, 0, 0,
                        2, 2, 2, 2],
                    width : 4
                });

                expect(result).toBeFalsy();
            });

            it('should successfully check maps with negative left position but internally suits free space', function () {
                var result = field.checkMap({
                    left: 0,
                    top : 3,
                    points: [
                        0, 2, 0, 0,
                        0, 2, 2, 0,
                        0, 0, 0, 0],
                    width : 4
                });

                expect(result).toBeTruthy();
            });
        });

        describe('Filling fields', function () {
            beforeEach(function () {
                field.layMap({
                    left: -1,
                    top : 2,
                    points: [
                        0, 0, 0, 0, 0,
                        0, 2, 2, 0, 0,
                        0, 2, 2, 2, 0],
                    width : 5
                });
            });

            describe('Empty field', function () {
                it('should lay map properly on empty field', function () {
                    expect(field.getMap().points).toEqual([
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        2, 2, 0, 0, 0,
                        2, 2, 2, 0, 0
                    ]);
                });
            });

            describe('Not empty field', function () {
                it('should reject maps which does not suit not empty field', function () {
                    var result = field.checkMap({
                        left: 0,
                        top : 1,
                        points: [
                            0, 0, 0, 0,
                            0, 3, 3, 0,
                            0, 3, 3, 0],
                        width : 4
                    });

                    expect(result).toBeFalsy();
                });

                it('should lay map properly on not empty field', function () {
                    field.layMap({
                        left: 1,
                        top : 1,
                        points: [
                            0, 0, 0, 0,
                            0, 3, 3, 0,
                            0, 3, 3, 0],
                        width : 4
                    });

                    expect(field.getMap().points).toEqual([
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 3, 3, 0,
                        2, 2, 3, 3, 0,
                        2, 2, 2, 0, 0
                    ]);
                });
            });


            describe('Strike lines', function () {
                it('should strike lines after having one fulfilled', function () {
                    field.layMap({
                        left: 1,
                        top : 2,
                        points: [
                            0, 0, 0, 0,
                            0, 3, 3, 0,
                            0, 0, 3, 3],
                        width : 4
                    });

                    expect(field.getMap().points).toEqual([
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        2, 2, 3, 3, 0
                    ]);
                });
            });
        });
    });
});