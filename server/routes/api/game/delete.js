/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import Game from '../../../models/game';


/**
 * Middleware for deletion game endpoint
 */
export default function (req, res, next) {
    Game.removeById(req.params.id)
        .then(Game.queryWithCount.bind(Game))
        .then(res.send.bind(res), next);
}