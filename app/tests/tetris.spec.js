/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';

define(['tetris'], function (Tetris) {
    describe('Tetris', function () {
        var tetris,
            settings,
            figure,
            fieldMap = {},
            figureMap = {};

        beforeEach(function () {
            figure = {
                moveLeft : function () { return figureMap; },
                moveRight: function () { return figureMap; },
                moveDown : function () { return figureMap; },
                rotate   : function () { return figureMap; },
                getMap   : function () { return figureMap; },
                setMap   : function () {}
            };


            settings = {
                canvas : {
                    addElement   : function () {},
                    removeElement: function () {},
                    updateElement: function () {}
                },
                field: {
                    checkMap: function () {},
                    layMap  : function () {},
                    getMap  : function () { return fieldMap; }
                },
                onNewFigure : function () { return figure; },
                onLineStrike: function () {}
            };

            tetris = new Tetris(settings);
        });

        describe('Creating', function () {
            beforeEach(function () {
                spyOn(settings.canvas, 'addElement');
                spyOn(tetris, 'onNewFigure').and.callThrough();
            });

            it('should call fo new figure on start', function () {
                tetris.start();
                expect(settings.canvas.addElement).toHaveBeenCalledWith(fieldMap);
                expect(tetris.onNewFigure).toHaveBeenCalled();
                expect(settings.canvas.addElement).toHaveBeenCalledWith(figureMap);
            });
        });

        describe('Moving figures', function () {
            beforeEach(function () {
                tetris.start();

                spyOn(figure, 'moveLeft').and.callThrough();
                spyOn(figure, 'moveRight').and.callThrough();
                spyOn(figure, 'moveDown').and.callThrough();
                spyOn(figure, 'rotate').and.callThrough();
                spyOn(figure, 'setMap');
                spyOn(settings.canvas, 'updateElement');
            });

            describe('Methods on success map checks', function () {
                beforeEach(function () {
                    settings.field.checkMap = function () { return 1; };
                    spyOn(settings.field, 'checkMap').and.callThrough();
                });

                it('should call down, checkMap, setMap and updateElement', function () {
                    tetris.down();
                    expect(figure.moveDown).toHaveBeenCalled();
                    expect(settings.field.checkMap).toHaveBeenCalledWith(figureMap);
                    expect(figure.setMap).toHaveBeenCalledWith(figureMap);
                    expect(settings.canvas.updateElement).toHaveBeenCalledWith(figureMap);
                });

                it('should call left, checkMap, setMap and updateElement', function () {
                    tetris.left();
                    expect(figure.moveLeft).toHaveBeenCalled();
                    expect(settings.field.checkMap).toHaveBeenCalledWith(figureMap);
                    expect(figure.setMap).toHaveBeenCalledWith(figureMap);
                    expect(settings.canvas.updateElement).toHaveBeenCalledWith(figureMap);
                });

                it('should call right, checkMap, setMap and updateElement', function () {
                    tetris.right();
                    expect(figure.moveRight).toHaveBeenCalled();
                    expect(settings.field.checkMap).toHaveBeenCalledWith(figureMap);
                    expect(figure.setMap).toHaveBeenCalledWith(figureMap);
                    expect(settings.canvas.updateElement).toHaveBeenCalledWith(figureMap);
                });

                it('should call rotate, checkMap, setMap and updateElement', function () {
                    tetris.rotate();
                    expect(figure.rotate).toHaveBeenCalled();
                    expect(settings.field.checkMap).toHaveBeenCalledWith(figureMap);
                    expect(figure.setMap).toHaveBeenCalledWith(figureMap);
                    expect(settings.canvas.updateElement).toHaveBeenCalledWith(figureMap);
                });
            });

            describe('Methods on failed map checks', function () {
                beforeEach(function () {
                    settings.field.checkMap = function () { return 0; };
                });

                it('should not call setMap and updateElement on trying moveDown figure', function () {
                    tetris.down();
                    expect(figure.setMap).not.toHaveBeenCalled();
                    expect(settings.canvas.updateElement).not.toHaveBeenCalled();
                });

                it('should not call setMap and updateElement on trying moveLeft figure', function () {
                    tetris.left();
                    expect(figure.setMap).not.toHaveBeenCalled();
                    expect(settings.canvas.updateElement).not.toHaveBeenCalled();
                });

                it('should not call setMap and updateElement on trying moveRight figure', function () {
                    tetris.right();
                    expect(figure.setMap).not.toHaveBeenCalled();
                    expect(settings.canvas.updateElement).not.toHaveBeenCalled();
                });

                it('should not call setMap and updateElement on trying rotate figure', function () {
                    tetris.rotate();
                    expect(figure.setMap).not.toHaveBeenCalled();
                    expect(settings.canvas.updateElement).not.toHaveBeenCalled();
                });
            });

            describe('Methods on map checks with lay resolution', function () {
                beforeEach(function () {
                    settings.field.checkMap = function () { return 2; };
                    settings.field.layMap = function () { return 1; };

                    spyOn(settings.field, 'layMap').and.callThrough();
                    spyOn(settings.canvas, 'addElement');
                    spyOn(settings.canvas, 'removeElement');
                    spyOn(tetris, 'onLineStrike');
                    spyOn(tetris, 'onNewFigure').and.callThrough();
                });

                it('should not call setMap but should remove figure from canvas, lay it with proper result and update field on canvas on moveDown figure', function () {
                    tetris.down();
                    expect(figure.setMap).not.toHaveBeenCalled();
                    expect(settings.canvas.removeElement).toHaveBeenCalledWith(figureMap);
                    expect(settings.field.layMap).toHaveBeenCalledWith(figureMap);
                    expect(tetris.onLineStrike).toHaveBeenCalledWith(1);

                    expect(settings.canvas.updateElement).toHaveBeenCalledWith(fieldMap);
                    expect(tetris.onNewFigure).toHaveBeenCalled();
                    expect(settings.canvas.addElement).toHaveBeenCalledWith(figureMap);
                });

                it('should not call setMap but should remove figure from canvas, lay it with proper result and update field on canvas on moveLeft figure', function () {
                    tetris.left();
                    expect(figure.setMap).not.toHaveBeenCalled();
                    expect(settings.canvas.removeElement).toHaveBeenCalledWith(figureMap);
                    expect(settings.field.layMap).toHaveBeenCalledWith(figureMap);
                    expect(tetris.onLineStrike).toHaveBeenCalledWith(1);

                    expect(settings.canvas.updateElement).toHaveBeenCalledWith(fieldMap);
                    expect(tetris.onNewFigure).toHaveBeenCalled();
                    expect(settings.canvas.addElement).toHaveBeenCalledWith(figureMap);
                });

                it('should not call setMap but should remove figure from canvas, lay it with proper result and update field on canvas on moveRight figure', function () {
                    tetris.right();
                    expect(figure.setMap).not.toHaveBeenCalled();
                    expect(settings.canvas.removeElement).toHaveBeenCalledWith(figureMap);
                    expect(settings.field.layMap).toHaveBeenCalledWith(figureMap);
                    expect(tetris.onLineStrike).toHaveBeenCalledWith(1);

                    expect(settings.canvas.updateElement).toHaveBeenCalledWith(fieldMap);
                    expect(tetris.onNewFigure).toHaveBeenCalled();
                    expect(settings.canvas.addElement).toHaveBeenCalledWith(figureMap);
                });

                it('should not call setMap but should remove figure from canvas, lay it with proper result and update field on canvas on rotate figure', function () {
                    tetris.rotate();
                    expect(figure.setMap).not.toHaveBeenCalled();
                    expect(settings.canvas.removeElement).toHaveBeenCalledWith(figureMap);
                    expect(settings.field.layMap).toHaveBeenCalledWith(figureMap);
                    expect(tetris.onLineStrike).toHaveBeenCalledWith(1);

                    expect(settings.canvas.updateElement).toHaveBeenCalledWith(fieldMap);
                    expect(tetris.onNewFigure).toHaveBeenCalled();
                    expect(settings.canvas.addElement).toHaveBeenCalledWith(figureMap);
                });
            });
        });
    });
});