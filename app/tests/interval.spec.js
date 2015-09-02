/**
 * Created by Illia_Shevchenko on 27.08.2015.
 */
'use strict';
/*eslint max-nested-callbacks: 0*/


define(['interval'], function (Interval) {
    describe('Interval', function () {
        var interval,
            callback;

        beforeEach(function () {
            callback = jasmine.createSpy('callback');

            interval = new Interval(callback, 5);
            jasmine.clock().install();
            interval.start();
        });

        afterEach(function () {
            jasmine.clock().uninstall();
            callback.calls.reset();
        });

        it('should starts timer', function () {
            expect(callback).not.toHaveBeenCalled();
            jasmine.clock().tick(6);

            expect(callback).toHaveBeenCalled();
        });

        it('should starts timer only once', function () {
            interval.start();
            jasmine.clock().tick(8); // for 8 ms it should not be called twice
            expect(callback.calls.count()).toBe(1);
        });

        it('should be able to change interval time and apply it', function () {
            jasmine.clock().tick(6);
            expect(callback.calls.count()).toBe(1);

            interval.set(10);

            jasmine.clock().tick(15);
            expect(callback.calls.count()).toBe(2);
        });

        it('should be able to pause timer', function () {
            interval.pause();
            jasmine.clock().tick(6);
            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick(13);
            expect(callback).not.toHaveBeenCalled();
        });

        it('should be able to resume timer after pausing timer', function () {
            interval.pause();
            interval.pause();

            jasmine.clock().tick(6);
            expect(callback).toHaveBeenCalled();
        });

        it('should be able to stop timer', function () {
            interval.stop();

            jasmine.clock().tick(6);
            expect(callback).not.toHaveBeenCalled();
        });

        it('should not allow to resume timer after stopping', function () {
            interval.stop();

            interval.pause();
            jasmine.clock().tick(6);
            expect(callback).not.toHaveBeenCalled();

            interval.pause();
            jasmine.clock().tick(6);
            expect(callback).not.toHaveBeenCalled();
        });

        it('should be able to restart timer after stopping', function () {
            jasmine.clock().tick(6);
            interval.stop();

            jasmine.clock().tick(6);
            interval.start();

            jasmine.clock().tick(6);
            expect(callback).toHaveBeenCalled();
        });
    });
});