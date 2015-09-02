/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/


define(['Squire'], function (Squire) {
    /**
     * @type {Class}
     */
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
            expect(figuresFactory.getFigure(figures)).toEqual(jasmine.any(FigureMock));
        });

        it('should set allowedConfigurations properly', function () {
            expect(figuresFactory.getFigure(figures).settings.allowedConfigurations).toEqual(figures[0]);
        });

        it('should set startIndex properly', function () {
            expect(figuresFactory.getFigure(figures).settings.startIndex).toBe(0);
        });

        it('should set pointsValue properly', function () {
            expect(figuresFactory.getFigure(figures).settings.pointsValue).toBe(1);
        });
    });
});