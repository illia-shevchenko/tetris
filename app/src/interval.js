/**
 * Created by Illia_Shevchenko on 27.08.2015.
 */
'use strict';


/**
 * A module representing Interval class to provide functionality for starting, stopping and pausing intervals
 * @module interval
 * @see Interval
 */
define(function () {
    /**
     * This is class for Figures provides functionality or creation, rotation and movement figures
     * @see module:interval
     * @param {Function} callback Callback to call on each interval
     * @param {number} interval Interval delay
     * @class
     * @alias Interval
     */
   var Interval = function (callback, interval) {
        this._callback = callback;
        this._interval = interval;

        this._timer = -1;
   };

   Interval.prototype = {
       /**
        * Starts timer if it is not already started
        */
       start: function () {
           if (this._timer !== 0 && this._timer !== -1) {
               return;
           }

           this._timer = setInterval(this._callback, this._interval);
       },


       /**
        * Stops the timer without ability to resume
        */
       stop: function () {
           clearInterval(this._timer);
           this._timer = -1;
       },


       /**
        * Pauses the timer
        */
       pause: function () {
           if (this._timer === -1) {
               return;
           }

           if (this._timer === 0) {
               this.start();
               return;
           }

           clearInterval(this._timer);
           this._timer = 0;
       },


       /**
        * Sets new interval for a timer
        * @param {number} interval New interval for a timer
        */
       set: function (interval) {
           this.stop();
           this._interval = interval;
           this.start();
       },


       constructor: Interval
   };

    return Interval;
});