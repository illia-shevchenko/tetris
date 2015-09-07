/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';

import express from 'express';
import list from './list';
import update from './update';
import create from './create';
import del    from './delete';

let router = express.Router();// eslint-disable-line new-cap

router.get('/:q', list);
router.put('/:id', update);
router.post('/', create);
router.delete('/:id', del);

export { router as default };