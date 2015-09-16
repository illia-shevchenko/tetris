/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import Game from '../../../models/game';

export default function (req, res, next) {
    Game.create(req.body, (err) => {
        if (err) {
            return next(err);
        }

        Game.queryWithCount()
            .then(res.send.bind(res))
            .catch(next);
    });
}