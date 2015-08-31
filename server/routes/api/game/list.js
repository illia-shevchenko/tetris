/**
 * Created by Illia_Shevchenko on 31.08.2015.
 */
'use strict';


module.exports = function (req, res) {
    res.send('Here your list: ' + req.params.q);
};