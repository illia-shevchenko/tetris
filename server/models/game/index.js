/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';

import mongoose from 'mongoose';
import DbError from '../errors/db.js';

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


game.statics.queryWithCount = function (query) {
    return Promise.all([this.count(), this.findByQuery(query)])
        .then(([count, games]) => {
            return {
                count: count,
                games: games
            };
        });
};


game.statics.updateById = function (id, newGame) {
    return this.findOne({
        _id: id
    })
        .then((game) => {
            Object.assign(game, newGame);
            return game.save();
        });
};

export default mongoose.model('Game', game);