/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


export default function (req, res, next) {
    try {
        res.send('Updated item with id: {' + req.params.id + '} and name: ' + req.body.name);
    } catch (error) {
        next(error);
    }
}