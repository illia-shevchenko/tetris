/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


define(['Squire'], function (Squire) {
    var FigureMock = function (settings) {
            this.settings = settings;
        },

        figures = [
            [{
                points: [
                    1, 1,
                    1, 1],
                width: 2
            }]];

    describe('Figures Factory', function () {
        var injector,
            figuresFactory;

        beforeEach(function (done) {
            injector = new Squire();
            injector.mock({
                figure : FigureMock
            })
                .require(['figures-factory'], function (figuresFactoryLoaded) {
                    figuresFactory = figuresFactoryLoaded;
                    done();
                });
        });

        afterEach(function () {
            injector.remove();
            figuresFactory = null;
        });

        it('should create instances of Figure class with', function () {
            expect(figuresFactory.getFigure(figures, 0, 0)).toEqual(jasmine.any(FigureMock));
        });

        it('should set coordinates properly', function () {
            expect(figuresFactory.getFigure(figures, 2, 2).settings).toEqual(jasmine.objectContaining({
                left: 1,
                top : 0
            }));
        });

        it('should set allowedConfigurations properly', function () {
            expect(figuresFactory.getFigure(figures, 0, 0).settings.allowedConfigurations).toEqual(figures[0]);
        });

        it('should set startIndex properly', function () {
            expect(figuresFactory.getFigure(figures, 0, 0).settings.startIndex).toBe(0);
        });

        it('should set pointsValue properly', function () {
            expect(figuresFactory.getFigure(figures, 0, 0).settings.pointsValue).toBe(1);
        });
    });
});