/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import Game from '../../../models/game';


/**
 * Middleware for querying list of games endpoint
 */
export default function (req, res, next) {
    let params = Object.assign({}, req.query, req.params);

    Game.queryWithCount(params)
        .then(res.send.bind(res), next);
}