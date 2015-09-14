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

game.methods.func = function () {

};

game.statics.findByQuery = function ({ q = 'null', min = 0, max = Number.MAX_VALUE }) {
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
            .then((result) => result) //Query has only then method, so to use .catch we need to create promise first
            .catch((err) => {
                throw new DbError('unhandled error', err);
            });
    } catch (err) {
        throw new DbError('unhandled error', err);
    }
};

export default mongoose.model('Game', game);