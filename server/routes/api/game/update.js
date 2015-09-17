/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import Game from '../../../models/game';


/**
 * Middleware for updating game endpoint
 */
export default function (req, res, next) {
    Game.updateById(req.params.id, req.body)
        .then(Game.queryWithCount.bind(Game))
        .then(res.send.bind(res), next);
}