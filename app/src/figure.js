/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
define(['./element'], function (Element) {
    var Figure = function () {

    };

    Figure.prototype = Object.create(Element.prototype);
    Figure.prototype.constructor = Figure;

    return Figure;
});