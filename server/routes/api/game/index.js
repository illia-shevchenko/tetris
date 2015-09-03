/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


let router = require('express').Router();// eslint-disable-line new-cap

router.get('/:q', require('./list'));
router.put('/:id', require('./update'));
router.post('/', require('./create'));
router.delete('/:id', require('./delete'));

module.exports = router;