/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
"use strict";


/**
 * A module representing Figure class to provide functionality for figures that can be moved and rotated
 * @module figure
 */
define(['./element'], function (GameElement) {
    /**
     * @param {Object} settings
     * @constructor
     * @extends module#GameElement
     * @alias module#Figure
     */
    var Figure = function (settings) {
        GameElement.call(this, settings);
    };

    Figure.prototype = Object.create(GameElement.prototype);
    Figure.prototype.constructor = Figure;

    return Figure;
});