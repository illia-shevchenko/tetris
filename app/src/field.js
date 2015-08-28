/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


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
            width: settings.width
        };

        GameElement.call(this, fieldSettings);
        this._height = settings.height;
        this.clear();
    };

    Field.prototype = Object.create(GameElement.prototype);


    Field.prototype._pointValue = 0;
    /**
     * Get position related to current map and position to
     * @param {number} pointIndex Position (index) in map points related to which positions should be counted
     * @param {Map} map Map according to which positions should be counted
     * @returns {{fieldValueIndex: *, indexInField: boolean, fieldNextLineIndex: *, nextLineIndexInField: boolean}}
     * @private
     */
    Field.prototype._getAllPositions = function (pointIndex, map) {
        var fieldTop  = map.top  + Math.floor(pointIndex / map.width),
            fieldLeft = map.left + pointIndex % map.width,

            fieldValueIndex = fieldTop * this._width + fieldLeft;

        return {
            fieldValueIndex: fieldValueIndex,
            indexInField   : fieldTop < this._height && fieldLeft >= 0 && fieldLeft < this._width,
            indexAboveField: fieldTop < 0,

            fieldNextLineIndex  : fieldValueIndex + this._width,
            nextLineIndexInField: fieldTop + 1 < this._height
        };
    };


    /**
     * Check map suits current field. Also maps that does not suit width if the field will be rejected
     * @param {Map} map Map to check
     * @returns {boolean} True if map suits the field
     */
    Field.prototype.checkOverlay = function (map) {
        var fieldPoints = this._normalizePoints(this._points);

        return this._normalizePoints(map.points)
            .some(function (point, index) {
                var positions  = this._getAllPositions(index, map),
                    fieldValue = 1;

                if (positions.indexInField) {
                    fieldValue = fieldPoints[positions.fieldValueIndex] || 0;
                }

                return point + fieldValue > 1;
            }, this);
    };


    /**
     * Check map to be over size the field
     * @param {Map} map Map to check
     * @returns {boolean} True if map does not suit the field size
     */
    Field.prototype.checkOverSize = function (map) {
        return this._normalizePoints(map.points)
            .some(function (point, index) {
                var positions = this._getAllPositions(index, map);
                return point && (positions.indexAboveField || !positions.indexInField);
            }, this);
    };


    /**
     * Lays map to a field (copy values to a proper positions)
     * @param {Map} map Map to lay to the field
     * @return {number} Stricken lines number
     */
    Field.prototype.layMap = function (map) {
        map.points.forEach(function (point, index) {
            if (!point) {
                return;
            }

            var positions = this._getAllPositions(index, map);

            if (!positions.indexInField) {
                return;
            }

            this._points[positions.fieldValueIndex] = point;
        }, this);

        return this._strikeLines();
    };


    /**
     * Strikes out completed lines
     * @return {number} Stricken lines number
     * @private
     */
    Field.prototype._strikeLines = function () {
        var line = 0,
            lines = 0,
            column,
            offset,
            completed;

        for (; line < this._height; ++line) {
            offset = line * this._width;

            for (completed = true, column = 0; column < this._width; ++column) {
                if (!this._points[offset  + column]) {
                    completed = false;
                    break;
                }
            }

            if (completed) {
                this._strikeLine(offset);
                lines++;
            }
        }

        return lines;
    };


    /**
     * Strike a line from points and adds zero line from the beginning
     * @param {number} start Start position from which line should be stricken
     * @private
     */
    Field.prototype._strikeLine = function (start) {
        this._points.splice(start, this._width);
        this._points = this._createPoints(this._width, 1).concat(this._points);
    };


    /**
     * Clears points of the field
     */
    Field.prototype.clear = function () {
        this._points = this._createPoints(this._width, this._height);
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
            points[i] = this._pointValue;
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
        });
    };


    Field.prototype.constructor = Field;

    return Field;
});