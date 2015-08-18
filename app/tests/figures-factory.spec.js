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
        var injector;

        beforeEach(function () {
            injector = new Squire();
        });

        afterEach(function () {
            injector.remove();
        });

        it('should be working with squire', function (done) {
            injector
                .mock('figure', FigureMock)
                .require(['figures-factory'], function (figuresFactory) {
                    expect(figuresFactory.getFigure()).toEqual(jasmine.any(FigureMock));
                    done();
                });
        });
    });
});