/**
 * Created by Illia_Shevchenko on 17.09.2015.
 */
'use strict';

define(function () {
    var TetrisGame = function (settings) {
        this._settings = settings;
    };


    TetrisGame.fetch = function (query) {
        this._query = query;
    };

    TetrisGame.prototype = {
        'delete': function () {

        },

        update: function () {

        },

        constructor: TetrisGame
    };

    return TetrisGame;
});