/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
//
define(['Squire'], function (Squire) {
    var FigureMock = function (settings) {
        //this.allowedConfigurations = settings.allowedConfigurations;
    };

    FigureMock.prototype = {
        constructor: FigureMock
    };

    describe('Figures Factory', function () {
        var injector,
            figuresFactory;

        beforeEach(function (done) {
            injector = new Squire();
            injector.mock('figure', FigureMock)
                .require(['figures-factory'], function (figuresFactoryLoaded) {
                    figuresFactory = figuresFactoryLoaded;
                    done();
                });
        });

        afterEach(function () {
            injector.remove();
            figuresFactory = null;
        });

        it('should create instances of Figure class', function () {
            expect(figuresFactory.getFigure()).toEqual(jasmine.any(FigureMock));
        });
    });
});