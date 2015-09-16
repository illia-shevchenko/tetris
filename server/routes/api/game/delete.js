/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import Game from '../../../models/game';

export default function (req, res, next) {
    Game.remove({
        _id: req.params.id
    }, (err/*, game*/) => {
        if (err) {
            return next(err);
        }

        //res.send(game);
        Game.queryWithCount()
            .then(res.send.bind(res))
            .catch(next);
    });
}