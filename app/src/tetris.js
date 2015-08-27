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
     * @typedef {Function} onScoreChanges
     * @param {number} number Number of current scores
     */

    /**
     * Creates instances of tetris game
     * @param {object} settings Settings for tetris instance creation
     * @param {Canvas} settings.canvas Canvas instance
     * @param {Canvas} settings.preview Canvas instance for preview block
     * @param {Field} settings.field Field instance
     * @param {onNewFigure} settings.onNewFigure Callback for getting new Figure
     * @param {onScoreChanges} [settings.onScoreChanges] Callback on score changes
     * @param {Function} [settings.onFinish] Callback on game is finished
     * @class
     * @alias Tetris
     * @see module:tetris
     */
    var Tetris = function (settings) {
        this._canvas  = settings.canvas;
        this._preview = settings.preview;
        this._field   = settings.field;

        this._figure  = null;

        this.onNewFigure = settings.onNewFigure;
        this.onScoreChanges = settings.onScoreChanges;
        this.onFinish = settings.onFinish;
    };

    Tetris.prototype = {
        onScoreChanges: function () {},
        onFinish      : function () {},

        _baseScore: 100,

        /**
         * Sets new figure and adds it to the canvas
         * @private
         */
        _setNewFigure: function () {
            var map,
                previewSizes;

            this._figure     = this._nextFigure;
            this._nextFigure = this.onNewFigure();

            this._figure.setOffsetPosition({
                x: this._canvas.getSizes().width
            });

            map = this._figure.getMap();
            this._canvas.addElement(map);
            this._preview.removeElement(map);

            previewSizes = this._preview.getSizes();
            this._nextFigure.setOffsetPosition({
                x: previewSizes.width,
                y: previewSizes.height,
                yCenter: true
            });

            this._preview.addElement(this._nextFigure.getMap());
        },


        /**
         * Sets base score
         * @param {number} value New base score value
         */
        setBaseScore: function (value) {
            this._baseScore = value;
        },


        /**
         * Set current strokes and return its value
         * @param {number} lines Stricken lines
         * @returns {number} current score
         * @private
         */
        _setScores: function (lines) {
            this._scores += this._baseScore * lines * lines;
            return this._scores;
        },


        /**
         * Starts the game - adds field to canvas and set new figure
         */
        start: function () {
            this._scores = 0;
            this._canvas.addElement(this._field.getMap());

            this._nextFigure = this.onNewFigure();
            this._setNewFigure();
        },


        /**
         * Processes map with Tetris game logic
         * @param {Map} map Map to process
         * @private
         */
        _processMovement: function (map) {
            if (this._field.checkOverlay(map)) {
                return;
            }

            this._figure.setMap(map);
            this._canvas.updateElement(map);
        },


        /**
         * Next game tick. For tetris it is down the figure
         */
        tick: function () {
            var mapDown = this._figure.moveDown(),
                mapCurrent = this._figure.getMap(),
                overlay = this._field.checkOverlay(mapDown),
                oversize = this._field.checkOverSize(mapCurrent),
                strickenLines;

            //move down solution
            if (!overlay) {
                return this._processMovement(mapDown);
            }

            //finish solution
            if (overlay && oversize) {
                return this.onFinish(this._scores);
            }

            //lay solution
            if (overlay && !oversize) {
                this._canvas.removeElement(mapCurrent);

                strickenLines = this._field.layMap(mapCurrent);
                this.onScoreChanges(this._setScores(strickenLines));

                this._canvas.updateElement(this._field.getMap());
                this._setNewFigure();
            }
        },


        /**
         * Moves current figure down
         */
        down: function () {
            var map = this._figure.moveDown();
            this._processMovement(map);
        },


        /**
         * Moves current figure left
         */
        left: function () {
            var map = this._figure.moveLeft();
            this._processMovement(map);
        },


        /**
         * Moves current figure right
         */
        right: function () {
            var map = this._figure.moveRight();
            this._processMovement(map);
        },


        /**
         * Rotates current figure
         */
        rotate: function () {
            var map = this._figure.rotate();
            this._processMovement(map);
        },


        constructor: Tetris
    };

    return Tetris;
});