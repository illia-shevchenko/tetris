/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
define(['canvas'], function (Canvas) {
    /*
        canvas should be able to:
        1. Add element
        2. Delete element
        3. Update (redraw) element or complete canvas
        4. Reset

        On creation it will be given a node to use, template, virtual width and height
        Adding figure means adding 'divs' (elements can be configurable in the future) set classes and positions for them -
        recalculate virtual coordinates to real

        currently all methods will fully redraw canvas. In the future we can improve logic to redraw some elements if they are already drown and are changed.

    */
    var node,
        canvas;

    beforeEach(function () {
        node = document.createElement('div');
        canvas = new Canvas(node);
    });

    describe('Add elements', function () {

    });
});