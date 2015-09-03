/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';

let router = require('express').Router();// eslint-disable-line new-cap

router.use('/api', require('./api'));

module.exports = router;