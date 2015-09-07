/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import express from 'express';
let router = express.Router();// eslint-disable-line new-cap

router.use('/game', require('./game'));
router.get('/about', function (req, res) {
    res.send('Here is cool api version 0.0.0-pre-alfa');
});

export { router as default };