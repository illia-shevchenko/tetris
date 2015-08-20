/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


/**
 * A module defines Tetris class to bootstrap all game elements to a game
 * @module tetris
 * @see Tetris
 */
define(function () {
    /**
     * @global
     * @typedef {Function} onNewFigure
     * @returns {Figure}
     */

    /**
     * @global
     * @typedef {Function} onLineStrike
     * @param {number} number Number of stricken off lines
     */

    /**
     * Creates instances of tetris game
     * @param {object} settings Settings for tetris instance creation
     * @param {Canvas} settings.canvas Canvas instance
     * @param {Field} settings.field Field instance
     * @param {onNewFigure} settings.onNewFigure Callback for getting new Figure
     * @param {onLineStrike} [settings.onLineStrike] Callback on line strikes. Possible for scores
     * @class
     * @alias Tetris
     * @see module:tetris
     */
    var Tetris = function (settings) {
        this._canvas = settings.canvas;
        this._field  = settings.field;

        this._figure  = null;

        this.onNewFigure = settings.onNewFigure;
        this.onLineStrike = settings.onLineStrike;
    };

    Tetris.prototype = {
        onLineStrike: function () {},

        /**
         * Sets new figure and adds it to the canvas
         * @private
         */
        _setNewFigure: function () {
            this._figure = this.onNewFigure();
            this._canvas.addElement(this._figure.getMap());
        },


        /**
         * Starts the game - adds field to canvas and set new figure
         */
        start: function () {
            this._canvas.addElement(this._field.getMap());
            this._setNewFigure();
        },


        /**
         * Processes map with Tetris game logic
         * @param {Map} map Map to process
         * @private
         */
        _processMap: function (map) {
            var strickenLines;

            switch (this._field.checkMap(map)) {
                case 1:
                    this._figure.setMap(map);
                    this._canvas.updateElement(map);
                break;
                case 2:
                    this._canvas.removeElement(map);
                    strickenLines = this._field.layMap(map);
                    this.onLineStrike(strickenLines);
                    this._canvas.updateElement(this._field.getMap());
                    this._setNewFigure();
                break;
            }
        },


        /**
         * Moves current figure down
         */
        down: function () {
            var map = this._figure.moveDown();
            this._processMap(map);
        },


        /**
         * Moves current figure left
         */
        left: function () {
            var map = this._figure.moveLeft();
            this._processMap(map);
        },


        /**
         * Moves current figure right
         */
        right: function () {
            var map = this._figure.moveRight();
            this._processMap(map);
        },


        /**
         * Rotates current figure
         */
        rotate: function () {
            var map = this._figure.rotate();
            this._processMap(map);
        },


        constructor: Tetris
    };

    return Tetris;
});