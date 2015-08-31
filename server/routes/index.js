/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';

let router = require('express').Router();

router.use('/api', require('./api'));

module.exports = router;