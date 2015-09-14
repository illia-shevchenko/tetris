/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';

import mongoose from 'mongoose';

export function connect() {
    return mongoose.connect('mongodb://server:server@ds035563.mongolab.com:35563/games');
}