/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */



/**
 * A module represents Field class
 * @module field
 * @see Field
 */
define(['./element'], function (GameElement) {
    /**
     * Creates field with zero position and fulfilled points with given width and height with zeroes
     *
     * @param {Object} settings Settings to create field
     * @param {number} settings.width Width for new field
     * @param {number} settings.height Height for new field
     * @param {number} [settings.baseClass] Base class for field creation
     *
     * @class
     * @extends GameElement
     * @alias Field
     * @see module:field
     */
    var Field = function (settings) {
        var fieldSettings = {
            left : 0,
            top  : 0,
            width: settings.width,
            baseClass: settings.baseClass
        };

        GameElement.call(this, fieldSettings);
        this._points = this._createPoints(settings.width, settings.height);
    };

    Field.prototype = Object.create(GameElement.prototype);


    /**
     * Get position related to current map and position to
     * @param {number} pointIndex Position (index) in map points related to which positions should be counted
     * @param {Map} map Map according to which positions should be counted
     * @returns {{top: number, left: number, fieldTop: number, fieldLeft: number, fieldValueIndex: number}}
     * @private
     */
    Field.prototype._getAllPositions = function (pointIndex, map) {
        var fieldHeight = Math.floor(this._points.length / this._width),

            top  = Math.floor(pointIndex / map.width),
            left = pointIndex % map.width,

            fieldTop = map.top + top,
            fieldLeft = map.left + left,
            fieldValueIndex = fieldTop * this._width + fieldLeft;

        return {
            top : top,
            left: left,
            fieldTop : fieldTop,
            fieldLeft: fieldLeft,

            fieldValueIndex: fieldValueIndex,
            indexInField   : fieldTop < fieldHeight && fieldLeft >= 0 && fieldLeft < this._width
        };
    };


    /**
     * Check map suits current field
     * @param {Map} map Map to check
     * @returns {boolean} True if map suits
     */
    Field.prototype.checkMap = function (map) {
        var fieldPoints = this._normalizePoints(this._points);

        return this._normalizePoints(map.points)
            .every(function (point, index) {
                var positions  = this._getAllPositions(index, map),
                    fieldValue = 1;

                if (positions.indexInField) {
                    fieldValue = fieldPoints[positions.fieldValueIndex];
                }

                return point + fieldValue < 2;
            }, this);
    };


    Field.prototype.layMap = function (map) {
        map.points.forEach(function (point, index) {
            var positions = this._getAllPositions(index, map);


        }, this);

        this._strikeLines();
    };



    Field.prototype._strikeLines = function () {
        this._points.forEach(function (point, index) {
            var left = index % this._width,
                line = Math.floor(index / this._width);


        }, this);
    };

    Field.prototype._strikeLine = function (number) {

    };


    /**
     * Creates points array filled with zeroes with given width and height. According to system interface, point is one-dimensional (flat) array.
     * @param {number} width Width for points
     * @param {number} height Height for points
     * @returns {Array.<number>}
     * @private
     */
    Field.prototype._createPoints = function (width, height) {
        var points = new Array(width * height),
            i = 0;
        for (; i < points.length; ++i) {
            points[i] = 0;
        }

        return points;
    };


    /**
     * Returns normalized points - all not false able values becomes 1;
     * @param {Array.<number>} points Points ot normalize
     * @returns {Array.<number>}
     * @private
     */
    Field.prototype._normalizePoints = function (points) {
        return points.map(function (point) {
            return point && 1;
        })
    };


    Field.prototype.constructor = Field;

    return Field;
});