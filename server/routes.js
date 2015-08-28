/**
 * Created by Illia_Shevchenko on 28.08.2015.
 */
'use strict';

let express = require('express'),
    router  = express.Router();

router.get('/api/todos', function(req, res) {
});

// create todo and send back all todos after creation
router.post('/api/todos', function(req, res) {
});

// delete a todo
router.delete('/api/todos/:todo_id', function(req, res) {
});

module.exports = router;