/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';

import mongoose from 'mongoose';
import DbError from '../errors/db.js';


/**
 * @global
 * @typedef {Object} Map
 * @property {number} left Left position of the map
 * @property {number} top Top position of the map
 * @property {number} width Width of the map
 * @property {Array.<number>} points Array of points
 */

/**
 * @typedef {Object} Game~schema
 * @property {Map} nextFigure Next figure map
 * @property {Map} figure Figure map
 * @property {Map} field Field map
 * @property {number} score Scores
 * @property {string} user User name
 */
let schema = {
        nextFigure: {
            left  : Number,
            top   : Number,
            width : Number,
            points: [Number]
        },
        figure: {
            left  : Number,
            top   : Number,
            width : Number,
            points: [Number]
        },
        field: {
            left  : Number,
            top   : Number,
            width : Number,
            points: [Number]
        },
        score: Number,
        user : String
    },

    game = new mongoose.Schema(schema);

game.eachPath((path, schemaType) => {
    schemaType.required(true);
});


/**
 * Queries documents with given query
 * @methodOf GameModel
 * @static
 * @param {Object} [args = {}] Arguments. All below are members
 * @param {string} [q = 'null'] Query string to search
 * @param {number} [min = 0] Minimum score
 * @param {number} [max = Number.MAX_VALUE] Maximum score
 * @returns {Promise} Which resolves with array of results
 *
 */
game.statics.findByQuery = function ({ q = 'null', min = 0, max = Number.MAX_VALUE } = {}) {
    try {
        let regExp = q === 'null' ? /.*/ : new RegExp(q);

        return this.find({
            score: {
                $gte: min,
                $lte: max
            }
        })
            .or([{
                user: { $regex: regExp }
            }, {
                name: { $regex: regExp }
            }])
            .select('-__v');
    } catch (err) {
        return Promise.reject(new DbError('Find by query error', err.toString()));
    }
};


/**
 * Queries documents with given query and returns object with count if documents (overall) and array of found games
 * @methodOf GameModel
 * @static
 * @param {Object} query
 * @returns {Promise} Returns promise which on rejections return object with Number <count> and Array <games>
 */
game.statics.queryWithCount = function (query) {
    return Promise.all([this.count(), this.findByQuery(query)])
        .then(([count, games]) => {
            return {
                count: count,
                games: games
            };
        });
};


/**
 * Finds document with given Id and removes it
 * @methodOf GameModel
 * @static
 * @param {string} id id of the document to remove
 * @returns {Promise}
 */
game.statics.removeById = function (id) {
    return this.remove({
        _id: id
    });
};


/**
 * Updates document with given id
 * @methodOf GameModel
 * @static
 * @param {string} id of for document to update
 * @param {Game~schema} newGame Data for updating
 * @returns {Promise}
 */
game.statics.updateById = function (id, newGame) {
    return this.findOne({
        _id: id
    })
        .then((game) => {
            Object.assign(game, newGame);
            return game.save();
        });
};


/**
 * Defines model for Game database instances
 * @constructs
 * @name GameModel
 * @extends external:Mongoose.Model
 * @param {Game~schema} schema Schema for model
 */
export default mongoose.model('Game', game);