/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
//
define(['Squire'], function (Squire) {
    var FigureMock = function (settings) {
        this.allowedConfigurations = settings.allowedConfigurations;
    };

    FigureMock.prototype = {
        constructor: FigureMock
    };

    describe('Figures Factory', function () {
        var injector,
            mocked;

        beforeEach(function () {
            injector = new Squire();
            mocked   = injector.mock('figure', FigureMock);
        });

        afterEach(function () {
            injector.remove();
        });

        it('should be working with squire', function () {
            expect(true).toBeTruthy();
        });
    });
});