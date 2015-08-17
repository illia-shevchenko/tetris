/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
define(['./element'], function (Element) {
    var Field = function () {

    };

    Field.prototype = Object.create(Element.prototype);
    Field.prototype.constructor = Field;

    return Field;
});