/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';

import express from 'express';
let router = express.Router();// eslint-disable-line new-cap

router.use('/api', require('./api'));


/**
 * Middleware for /api endpoint
 */
export { router as default };