/**
 * Created by Illia_Shevchenko on 27.08.2015.
 */
'use strict';


define(['interval'], function (Interval) {
    describe('Interval', function () {
        var interval,
            callback;

        beforeEach(function () {
            callback = jasmine.createSpy('callback');

            interval = new Interval();
            jasmine.clock().install();
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it('should starts timer', function () {
            
        });

        it('should be able to pause timer', function () {

        });

        it('should be able to resume timer after pausing timer', function () {

        });

        it('should be able to stop timer', function () {

        });

        it('should not allow to resume timer after stopping', function () {

        });
    });
});