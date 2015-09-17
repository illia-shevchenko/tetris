/**
 * Created by Illia_Shevchenko on 17.09.2015.
 */
'use strict';

define(['components/http'], function (http) {
    http.get('some path', { set1: true });
});