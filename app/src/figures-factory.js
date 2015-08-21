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
         * @returns {Figure}
         */
        getFigure: function (configurations) {
            var configNumber = getRandom(configurations.length),
                allowedConfiguration = configurations[configNumber],
                startIndex = getRandom(allowedConfiguration.length);

            return new Figure({
                allowedConfigurations: allowedConfiguration,
                startIndex : startIndex,
                pointsValue: configNumber + 1
            });
        }
    };
});