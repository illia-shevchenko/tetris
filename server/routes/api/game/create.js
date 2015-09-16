/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import Game from '../../../models/game';

export default function (req, res, next) {
    Game.create(req.body, (err, game) => {
        if (err) {
            return next(err);
        }

        res.send(game);
    });
}