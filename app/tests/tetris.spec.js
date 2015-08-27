/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';

define(['tetris'], function (Tetris) {
    describe('Tetris', function () {
        var tetris,
            settings,
            figure,
            nextFigureFlag = false,
            nextFigure,
            fieldMap = {},
            figureMap = {},
            nextFigureMap = {},
            downFigureMap = {};

        beforeEach(function () {
            figure = {
                moveLeft : function () { return figureMap; },
                moveRight: function () { return figureMap; },
                moveDown : function () { return figureMap; },
                rotate   : function () { return figureMap; },
                getMap   : function () { return figureMap; },
                setMap   : function () {},
                setOffsetPosition: function () {}
            };

            nextFigure = {
                moveDown : function () { return nextFigureMap; },
                getMap   : function () { return nextFigureMap; },
                setMap   : function () {},
                setOffsetPosition: function () {}
            };

            settings = {
                canvas : {
                    addElement   : function () {},
                    removeElement: function () {},
                    updateElement: function () {},
                    getSizes     : function () { return {width: 10, height: 20}; }
                },
                preview: {
                    addElement   : function () {},
                    updateElement: function () {},
                    removeElement: function () {},
                    getSizes     : function () { return {width: 6, height: 6}; }
                },
                field: {
                    checkOverSize: function () {},
                    checkOverlay : function () {},
                    clear   : function () {},
                    layMap  : function () {},
                    setMap  : function () {},
                    getMap  : function () { return fieldMap; }
                },
                onNewFigure : function () {
                    nextFigureFlag = !nextFigureFlag;
                    return nextFigureFlag ? figure : nextFigure;
                },
                onScoreChanges: function () {},
                onFinish    : function () {}
            };

            tetris = new Tetris(settings);
        });

        describe('Creating', function () {
            beforeEach(function () {
                spyOn(settings.canvas, 'addElement');
                spyOn(settings.canvas, 'getSizes').and.callThrough();
                spyOn(settings.preview, 'addElement');
                spyOn(settings.preview, 'getSizes').and.callThrough();

                spyOn(figure, 'setOffsetPosition');
                spyOn(nextFigure, 'setOffsetPosition');

                spyOn(tetris, 'onNewFigure').and.callThrough();
                tetris.start();
            });

            it('should call to add field map to the canvas on start', function () {
                expect(settings.canvas.addElement).toHaveBeenCalledWith(fieldMap);
            });

            it('should call to new figure and add figure map to he canvas on start', function () {
                expect(tetris.onNewFigure.calls.count()).toBe(2);

                expect(settings.preview.getSizes).toHaveBeenCalled();
                expect(nextFigure.setOffsetPosition).toHaveBeenCalledWith({
                    x: 6,
                    y: 6,
                    yCenter: true
                });
                expect(settings.preview.addElement).toHaveBeenCalled();

                expect(settings.canvas.getSizes).toHaveBeenCalled();
                expect(figure.setOffsetPosition).toHaveBeenCalledWith({
                    x: 10,
                    y: 1
                });
                expect(settings.canvas.addElement).toHaveBeenCalledWith(figureMap);
            });
        });

        describe('Restarting', function () {
            it('should clear canvas, field and preview, remove current figure and start game from the beginning', function () {
                tetris.start();

                spyOn(settings.canvas, 'removeElement');
                spyOn(settings.canvas, 'updateElement');
                spyOn(settings.preview, 'removeElement');
                spyOn(settings.field, 'clear');
                spyOn(tetris, 'start');

                tetris.restart();

                expect(settings.canvas.removeElement).toHaveBeenCalledWith(figureMap);
                expect(settings.field.clear).toHaveBeenCalled();
                expect(settings.canvas.updateElement).toHaveBeenCalledWith(fieldMap);
                expect(settings.preview.removeElement).toHaveBeenCalledWith(nextFigureMap);
                expect(tetris.start).toHaveBeenCalled();
            });
        });

        describe('Playing', function () {
            beforeEach(function () {
                tetris.start();
                spyOn(figure, 'setMap');
                spyOn(settings.canvas, 'updateElement');
            });

            afterEach(function () {
                figure.setMap.calls.reset();
                settings.canvas.updateElement.calls.reset();
            });

            describe('Moving figures', function () {
                describe('Methods on success map checks', function () {
                    beforeEach(function () {
                        spyOn(settings.field, 'checkOverlay').and.callFake(function () {
                            return false;
                        });
                    });

                    var testSuit = function () {
                        expect(settings.field.checkOverlay).toHaveBeenCalledWith(figureMap);
                        expect(figure.setMap).toHaveBeenCalledWith(figureMap);
                        expect(settings.canvas.updateElement).toHaveBeenCalledWith(figureMap);
                    };

                    it('should call down, checkOverlay, setMap and updateElement', function () {
                        spyOn(figure, 'moveDown').and.callThrough();

                        tetris.down();
                        expect(figure.moveDown).toHaveBeenCalled();
                        testSuit();
                    });

                    it('should call left, checkOverlay, setMap and updateElement', function () {
                        spyOn(figure, 'moveLeft').and.callThrough();

                        tetris.left();
                        expect(figure.moveLeft).toHaveBeenCalled();
                        testSuit();
                    });

                    it('should call right, checkOverlay, setMap and updateElement', function () {
                        spyOn(figure, 'moveRight').and.callThrough();

                        tetris.right();
                        expect(figure.moveRight).toHaveBeenCalled();
                        testSuit();
                    });

                    it('should call rotate, checkOverlay, setMap and updateElement', function () {
                        spyOn(figure, 'rotate').and.callThrough();

                        tetris.rotate();
                        expect(figure.rotate).toHaveBeenCalled();
                        testSuit();
                    });
                });

                describe('Methods on failed map checks', function () {
                    beforeEach(function () {
                        spyOn(settings.field, 'checkOverlay').and.callFake(function () { return true; });
                    });

                    var testSuit = function () {
                        expect(settings.field.checkOverlay).toHaveBeenCalledWith(figureMap);
                        expect(figure.setMap).not.toHaveBeenCalled();
                        expect(settings.canvas.updateElement).not.toHaveBeenCalled();
                    };

                    it('should not call setMap and updateElement on trying moveDown figure', function () {
                        spyOn(figure, 'moveDown').and.callThrough();

                        tetris.down();
                        expect(figure.moveDown).toHaveBeenCalled();
                        testSuit();
                    });

                    it('should not call setMap and updateElement on trying moveLeft figure', function () {
                        spyOn(figure, 'moveLeft').and.callThrough();

                        tetris.left();
                        expect(figure.moveLeft).toHaveBeenCalled();
                        testSuit();
                    });

                    it('should not call setMap and updateElement on trying moveRight figure', function () {
                        spyOn(figure, 'moveRight').and.callThrough();

                        tetris.right();
                        expect(figure.moveRight).toHaveBeenCalled();
                        testSuit();
                    });

                    it('should not call setMap and updateElement on trying rotate figure', function () {
                        spyOn(figure, 'rotate').and.callThrough();

                        tetris.rotate();
                        expect(figure.rotate).toHaveBeenCalled();
                        testSuit();
                    });
                });
            });

            describe('Ticks', function () {
                describe('Tick process', function () {
                    beforeEach(function () {
                        spyOn(figure, 'moveDown').and.callFake(function () { return downFigureMap; });
                        spyOn(figure, 'getMap').and.callFake(function ()   { return figureMap;     });

                        spyOn(settings.field, 'checkOverlay');
                        spyOn(settings.field, 'checkOverSize');

                        tetris.tick();
                    });

                    afterEach(function () {
                        settings.field.checkOverlay.calls.reset();
                        settings.field.checkOverSize.calls.reset();
                        figure.moveDown.calls.reset();
                        figure.getMap.calls.reset();
                    });

                    it('should call for moveDown map and check it for overlaying', function () {
                        expect(figure.moveDown).toHaveBeenCalled();
                        expect(settings.field.checkOverlay).toHaveBeenCalledWith(downFigureMap);
                    });

                    it('should call for current map and check it for oversizing', function () {
                        expect(figure.getMap).toHaveBeenCalled();
                        expect(settings.field.checkOverSize).toHaveBeenCalledWith(figureMap);
                    });
                });


                describe('Methods on map checks with lay resolution', function () {
                    beforeEach(function () {
                        spyOn(settings.field, 'checkOverlay').and.callFake(function () { return true; });
                        spyOn(settings.field, 'checkOverSize').and.callFake(function () { return false; });
                        spyOn(settings.field, 'layMap').and.callFake(function () {
                            return 15;
                        });

                        spyOn(settings.canvas, 'addElement');
                        spyOn(settings.canvas, 'removeElement');

                        spyOn(settings.preview, 'addElement');
                        spyOn(settings.preview, 'removeElement');

                        spyOn(tetris, 'onNewFigure').and.callThrough();
                        tetris.tick();
                    });

                    afterEach(function () {
                        settings.field.layMap.calls.reset();

                        settings.canvas.addElement.calls.reset();
                        settings.canvas.removeElement.calls.reset();

                        settings.preview.addElement.calls.reset();
                        settings.preview.removeElement.calls.reset();

                        tetris.onNewFigure.calls.reset();
                    });

                    it('should not call setMap but should remove figure from canvas, lay it with proper result and update field on canvas on tick', function () {
                        expect(figure.setMap).not.toHaveBeenCalled();
                        expect(settings.canvas.removeElement).toHaveBeenCalledWith(figureMap);
                        expect(settings.field.layMap).toHaveBeenCalledWith(figureMap);

                        expect(settings.canvas.updateElement).toHaveBeenCalledWith(fieldMap);

                        expect(settings.preview.removeElement).toHaveBeenCalled();
                        expect(settings.preview.addElement).toHaveBeenCalled();

                        expect(tetris.onNewFigure).toHaveBeenCalled();
                        expect(settings.canvas.addElement).toHaveBeenCalledWith(figureMap);
                    });
                });

                describe('Finish resolution', function () {
                    beforeEach(function () {
                        spyOn(settings.field, 'checkOverlay').and.callFake(function () { return true; });
                        spyOn(settings.field, 'checkOverSize').and.callFake(function () { return true; });

                        spyOn(settings.field, 'layMap').and.callFake(function () {});
                        spyOn(settings.canvas, 'addElement');
                        spyOn(settings.canvas, 'removeElement');
                        spyOn(tetris, 'onFinish');
                        spyOn(tetris, 'onNewFigure');
                    });

                    afterEach(function () {
                        settings.field.layMap.calls.reset();

                        settings.canvas.addElement.calls.reset();
                        settings.canvas.removeElement.calls.reset();

                        tetris.onFinish.calls.reset();
                        tetris.onNewFigure.calls.reset();
                    });

                    it('should not call anything except onFinish with number 0 as only parameter for finish scores', function () {
                        tetris.tick();
                        expect(figure.setMap).not.toHaveBeenCalled();
                        expect(settings.canvas.removeElement).not.toHaveBeenCalled();
                        expect(settings.field.layMap).not.toHaveBeenCalled();

                        expect(settings.canvas.updateElement).not.toHaveBeenCalled();
                        expect(tetris.onNewFigure).not.toHaveBeenCalled();
                        expect(settings.canvas.addElement).not.toHaveBeenCalled();

                        expect(tetris.onFinish).toHaveBeenCalledWith(0);
                    });
                });
            });
        });

        describe('Scores', function () {
            beforeEach(function () {
                spyOn(settings.field, 'checkOverlay').and.callFake(function () { return true; });
                spyOn(settings.field, 'checkOverSize').and.callFake(function () { return false; });
                spyOn(tetris, 'onScoreChanges');
                tetris.setBaseScore(100);
                tetris.start();
            });

            afterEach(function () {
                tetris.onScoreChanges.calls.reset();
            });

            it('should call onScoreChanges on line striking with proper value', function () {
                spyOn(settings.field, 'layMap').and.callFake(function () { return 1; });

                tetris.tick();
                expect(tetris.onScoreChanges).toHaveBeenCalledWith(100);
            });

            it('should consider stricken lines count', function () {
                spyOn(settings.field, 'layMap').and.callFake(function () { return 3; });

                tetris.tick();
                expect(tetris.onScoreChanges).toHaveBeenCalledWith(900);
            });
        });

        describe('Game state', function () {
            beforeEach(function () {
                tetris.start();
            });

            it('should be able to get current gae state as an object - figure, nextFigure, field and state', function () {
                expect(tetris.getState()).toEqual({
                    nextFigure: nextFigureMap,
                    figure: figureMap,
                    field : fieldMap,
                    score : 0
                });
            });

            it('should be able to set game state from an object', function () {
                var newFigureMap = { points: [1, 2, 3] },
                    newNextFigureMap = { points: [14, 15, 16]},
                    newFieldMap = { points: [27, 28, 29] };

                spyOn(settings.canvas, 'updateElement');
                spyOn(settings.preview, 'updateElement');

                spyOn(settings.field, 'setMap').and.callFake(function (map) {
                    fieldMap.points = map.points;
                });

                spyOn(figure, 'setMap').and.callFake(function (map) {
                    figureMap.points = map.points;
                });

                spyOn(nextFigure, 'setMap').and.callFake(function (map) {
                    nextFigureMap.points = map.points;
                });

                tetris.setState({
                    nextFigure: newNextFigureMap,
                    figure: newFigureMap,
                    field : newFieldMap,
                    score : 100
                });

                expect(settings.canvas.updateElement).toHaveBeenCalledWith(jasmine.objectContaining(newFieldMap));
                expect(settings.canvas.updateElement).toHaveBeenCalledWith(jasmine.objectContaining(newFigureMap));
                expect(settings.preview.updateElement).toHaveBeenCalledWith(jasmine.objectContaining(newNextFigureMap));

                //to check scores setting we need to force game finishing
                spyOn(settings.field, 'checkOverlay').and.callFake(function () { return true; });
                spyOn(settings.field, 'checkOverSize').and.callFake(function () { return true; });
                spyOn(tetris, 'onFinish');

                tetris.tick();
                expect(tetris.onFinish).toHaveBeenCalledWith(100);

                nextFigureMap = {};
                figureMap = {};
                fieldMap = {};
            });
        });
    });
});