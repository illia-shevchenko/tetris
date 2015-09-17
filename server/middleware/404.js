/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import HttpError from '../models/errors/http';


/**
 * Middleware for 404 error
 */
export default function (req, res, next) {
    let err = new HttpError('Not Found', 404);
    next(err);
}