/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


/**
 * A module representing GameElement class
 * @module game-element
 * @see GameElement
 */
define(function () {
    /**
     * @param {Object} settings Settings to create a element
     * @param {Object} [settings.left = 0] Left position of the element
     * @param {Object} [settings.top  = 0] Top position of the element
     * @param {Object} [settings.width = 0] Width of the element
     *
     * @constructor
     * @alias GameElement
     */
    var GameElement = function (settings) {
        this._hash = new Date().valueOf();

        this._left  = settings.left || 0;
        this._top   = settings.top  || 0;

        this._width = settings.width || 0;
    };

    GameElement.prototype = {
        _points: [],


        /**
         * Generates and returns map object for an element
         * @returns {Map}
         */
        getMap: function () {
            return {
                hash     : this._hash,
                left     : this._left,
                top      : this._top,
                width    : this._width,
                points   : this._points
            };
        },

        /**
         * Sets new map for an element
         * @param {Map} map Map to set
         */
        setMap: function (map) {
            if (typeof map.left === 'number') {
                this._left = map.left;
            }

            if (typeof map.top === 'number') {
                this._top = map.top;
            }

            if (typeof map.width !== 'number' || !Array.isArray(map.points)) {
                return;
            }

            if (map.points.length % map.width !== 0) {
                var msg = 'Width (' + map.width + ') does not suit points length (' + map.points.length + ')';
                throw new Error(msg);
            }

            this._points = map.points;
            this._width  = map.width;
        },

        constructor: GameElement
    };

    return GameElement;
});