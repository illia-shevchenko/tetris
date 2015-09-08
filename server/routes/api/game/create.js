/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import Game from '../../../models/game';


export default function (req, res, next) {
    //try {
        let game = new Game(req.body);
        game.save((err) => {
            if (err) {
                return next(err);
            }

            res.send(game);
        });

        //res.send('Created new item with name:' + req.body.name);
    //} catch (error) {
    //    next(error);
    //}
}