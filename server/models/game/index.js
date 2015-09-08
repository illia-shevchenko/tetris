/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';

import mongoose from 'mongoose';

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

export default mongoose.model('Game', game);