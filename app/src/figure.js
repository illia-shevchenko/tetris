/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
"use strict";


/**
 * A module representing Figure class to provide functionality for figures that can be moved and rotated
 * @module figure
 * @see Figure
 */
define(['./element'], function (GameElement) {
    /**
     * This is class for Figures provides functionality or creation, rotation and movement figures
     * @see module:figure
     * @param {Object} settings
     * @param {Array.<Object>} settings.allowedConfigurations Array of allowed configurations. They are switched in a loop on rotation
     * @param {number} settings.configurationIndex Index of the default configuration
     * @param {number|string} settings.pointsValue Value to fill maps with. All not false values will be filled with 'pointsValue'
     * @class
     * @extends GameElement
     * @alias Figure
     */
    var Figure = function (settings) {
        GameElement.call(this, settings);

        this._allowedConfigurations = settings.allowedConfigurations || [];
        this._configurationIndex    = settings.configurationIndex || 0;

        this._configurationIndex = Math.max(this._configurationIndex, 0);
        if (this._configurationIndex >= this._allowedConfigurations.length) {
            this._configurationIndex = 0;
        }

        this._pointsValue = settings.pointsValue || 1;
        this._fillAllowedConfigurationsWithValues();

        this._points = this._allowedConfigurations[this._configurationIndex].points;
        this._width  = this._allowedConfigurations[this._configurationIndex].width;
    };


    Figure.prototype = Object.create(GameElement.prototype);


    /**
     * Creates new map for rotated Figure. Figure is not changed
     * @returns {Map}
     */
    Figure.prototype.rotate = function () {
        var index = this._configurationIndex + 1,
            map;

        if (index >= this._allowedConfigurations.length) {
            index = 0;
        }

        map = this.getMap();
        map.points = this._allowedConfigurations[index].points;
        map.width  = this._allowedConfigurations[index].width;

        return map;
    };


    /**
     * Creates new map for moved down Figure. Figure is not changed
     * @returns {Map}
     */
    Figure.prototype.moveDown = function () {
        var map = this.getMap();

        map.top += 1;
        return map;
    };


    /**
     * Creates new map for moved left Figure. Figure is not changed
     * @returns {Map}
     */
    Figure.prototype.moveLeft = function () {
        var map = this.getMap();

        map.left -= 1;
        return map;
    };


    /**
     * Creates new map for moved right Figure. Figure is not changed
     * @returns {Map}
     */
    Figure.prototype.moveRight = function () {
        var map = this.getMap();

        map.left += 1;
        return map;
    };



    /**
     * Fills all allowed configurations with new point arrays filled with 'pointsValue'
     * @private
     */
    Figure.prototype._fillAllowedConfigurationsWithValues = function () {
        this._allowedConfigurations.forEach(function (configuration) {
            configuration.points = this._getPointsFilledWithValue(configuration.points, this._pointsValue);
        }, this);
    };


    /**
     * Returns new points array filled with given points
     * @param {Array} points Points to fill
     * @param {number|string} value Value for filling
     * @returns {Array}
     * @private
     */
    Figure.prototype._getPointsFilledWithValue = function (points, value) {
        return points.map(function (point) {
            return point ? value : point;
        });
    };


    Figure.prototype.constructor = Figure;

    return Figure;
});