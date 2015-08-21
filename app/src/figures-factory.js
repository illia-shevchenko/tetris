/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


/**
 * A module for generating figures randomly
 * @module figures-factory
 */
define(['figure'], function (Figure) {
    var getRandom = function (max) {
        return Math.floor(Math.random() * max);
    };

    return {
        /**
         * Returns Figure class instance with given position
         * @param {Array.<Array>.<Object>} configurations Configurations to get figures from
         * @param {number} [middleOffset = 0] Offset  of the horizontal center of the created figure
         * @param {number} [topOffset = 0] Top offset for a figure
         * @returns {Figure}
         */
        getFigure: function (configurations, middleOffset, topOffset) {
            var configNumber = getRandom(configurations.length),
                allowedConfiguration = configurations[configNumber],
                startIndex = getRandom(allowedConfiguration.length),

                width  = allowedConfiguration[startIndex].width,
                height = Math.floor(allowedConfiguration[startIndex].points.length / width);

            return new Figure({
                left: (middleOffset || 0) - Math.floor(width / 2),
                top : -height + (topOffset || 0),
                allowedConfigurations: allowedConfiguration,
                startIndex : startIndex,
                pointsValue: configNumber + 1
            });
        }
    };
});