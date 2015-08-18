/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
"use strict";

/**
 * A module representing canvas class
 * Canvas can paint elements in node using virtual coordinates (map object)
 * @module canvas
 */
define(function () {
    /**
     * @param {Object} settings Settings for instantiate canvas
     * @param {HTMLElement} settings.node Node to hold canvas. Should have 'clientHeight', 'clientWidth', 'clientTop' and 'clientLeft' as they are used to calculate coefficients
     * @param {number} [settings.width = 10] Virtual width of the canvas
     * @param {number} [settings.height = 20] Virtual height of the canvas
     * @param {string} [settings.tag = 'div'] Tag for creation elements on the canvas
     * @constructor
     * @alias module:canvas
     */
    var Canvas = function (settings) {
            this._node   = settings.node;
            this._width  = settings.width  || 10;
            this._height = settings.height || 20;
            this._tag    = settings.tag    || 'div';

            this._maps     = {};
            this._elements = {};
            this._setSizes();
        };

    Canvas.prototype = {
        _containerClass: 'container',


        /**
         * @global
         * @typedef {Object} Map
         * @property {string|number} hash Hash of the object map. For some operations only hash property may be needed
         * @property {number} [left] Left position of the map
         * @property {number} [top] Top position of the map
         * @property {number} [width] Width of the map
         * @property {Array.<number>} [points] Array of points
         * @property {string} [baseClass] Base class of the points
         */


        /**
         * Adds element to the canvas and draws it
         * @param {Map} map Map for element to place on the canvas
         */
        addElement: function (map) {
            var element = this._createElement(this._containerClass);
            this._maps[map.hash]     = map;
            this._elements[map.hash] = element;

            this._node.appendChild(element);
            this.updateElement(map);
        },


        /**
         * Removes element from the canvas
         * @param {Map} map Map of the element to delete. Actually only hash property needed to find element
         */
        removeElement: function (map) {
            if (!this._maps[map.hash]) {
                return;
            }

            this._node.removeChild(this._elements[map.hash]);
            delete this._maps[map.hash];
            delete this._elements[map.hash];
        },


        /**
         * Updates element placed on the canvas
         * @param {Map} map New map from which needed to update element
         * @todo: refactor this
         */
        updateElement: function (map) {
            if (!this._maps[map.hash]) {
                return;
            }

            var element = this._elements[map.hash],
                counter = 0;

            this._maps[map.hash]     = map;
            this._elements[map.hash] = element;

            this._node.removeChild(element);

            element.style.left = this._getRealX(map.left);
            element.style.top  = this._getRealY(map.top);

            map.points.forEach(function (point, index) {
                if (!point) {
                    return;
                }

                var left = index % map.width,
                    top  = Math.floor(index / map.width),
                    subElement = element.children[counter];

                if (!subElement) {
                    subElement = this._createElement();
                    element.appendChild(subElement);
                }

                subElement.style.left   = this._getRealX(left);
                subElement.style.top    = this._getRealY(top);
                subElement.style.width  = this._getRealX(1);
                subElement.style.height = this._getRealY(1);
                subElement.className    = map.baseClass + ' ' + map.baseClass + '-' + point;

                counter++;
            }, this);

            //Remove excess nodes using counter
            for (; counter < element.children.length; ++counter) {
                element.removeChild(element.children[counter]);
            }

            this._node.appendChild(element);
        },


        /**
         * Update sizes and redraws all registered elements
         */
        redraw: function () {
            this._setSizes();

            for (var hash in this._maps) {
                if (this._maps.hasOwnProperty(hash)) {
                    this.updateElement(this._maps[hash]);
                }
            }
        },


        /**
         * Gets size by X axy in pixel from virtual
         * @param val Virtual size or coordinate
         * @returns {string} Size in pixel
         * @protected
         */
        _getRealX: function (val) {
            return val * this._unitWidth + 'px';
        },


        /**
         * Gets size by Y axy in pixel from virtual
         * @param {number} val Virtual size or coordinate
         * @returns {string} Size in pixel
         * @protected
         */
        _getRealY: function (val) {
            return val * this._unitHeight + 'px';
        },


        /**
         * Sets sizes for units
         * @protected
         *
         */
        _setSizes: function () {
            this._unitWidth  = Math.round(this._node.clientWidth  / this._width);
            this._unitHeight = Math.round(this._node.clientHeight / this._height);
        },


        /**
         * Creates new element with given class
         * @param {string} [className] Class name to add to new element
         * @returns {Element} New element with tag provided in private property _tag
         * @protected
         */
        _createElement: function (className) {
            var element = document.createElement(this._tag);
            element.className = className;

            return element;
        },

        constructor: Canvas
    };

    return Canvas;
});