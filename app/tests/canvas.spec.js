/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
define(['canvas'],function (Canvas) {
    describe('Canvas Class', function () {
        var node,
            canvas,

            hash   = new Date().valueOf(),
            width  = 10,
            height = 20,
            size   = 30;

        beforeEach(function () {
            node   = document.createElement('div');
            document.body.appendChild(node);
            node.style.width = width * size + 'px';
            node.style.height = height * size + 'px';

            canvas = new Canvas({
                node  : node,
                width : width,
                height: height,
                tag   : 'span'
            });

            canvas.addElement({
                hash  : hash,
                x     : 1,
                y     : 1,
                width : 3,
                points: [1, 0, 0,
                         0, 2, 0,
                         0, 0, 3],
                baseClass: 'element'
            });
        });

        describe('Place element', function () {
            it('should place element with correct settings', function () {
                var expectedHTML = '<div class="element element-1" style="left: 0px; right: 0px; width: 30px; height: 30px;"></div>' +
                                   '<div class="element element-2" style="left: 30px; right: 30px; width: 30px; height: 30px;"></div>' +
                                   '<div class="element element-3" style="left: 60px; right: 60px; width: 30px; height: 30px;"></div>';
                expect(node.innerHTML).toEqual(expectedHTML);
            });
        });

        describe('Update element', function () {
            it('should update element if it is already placed', function () {
                canvas.updateElement({
                    hash  : hash,
                    x     : 3,
                    y     : 3,
                    width : 4,
                    points: [0, 0, 0, 5,
                             0, 0, 6, 0,
                             7, 0, 0, 0],
                    baseClass: 'element-updated'
                });

                var expectedHTML = '<div class="element-updated element-updated-5" style="left: 90px; right: 0px; width: 30px; height: 30px;"></div>' +
                                   '<div class="element-updated element-updated-6" style="left: 60px; right: 30px; width: 30px; height: 30px;"></div>' +
                                   '<div class="element-updated element-updated-7" style="left: 0px; right: 60px; width: 30px; height: 30px;"></div>';

                expect(node.innerHTML).toEqual(expectedHTML);
            });
        });

        describe('Update on resize', function () {
            it('should recalculate size and position if node size is changed', function () {
                node.style.width  = '450px';
                node.style.height = '800px';

                canvas.redraw();

                var expectedHTML = '<div class="element element-1" style="left: 0px; right: 0px; width: 45px; height: 40px;"></div>' +
                                   '<div class="element element-2" style="left: 45px; right: 40px; width: 45px; height: 40px;"></div>' +
                                   '<div class="element element-3" style="left: 90px; right: 80px; width: 45px; height: 40px;"></div>';

                expect(node.innerHTML).toEqual(expectedHTML);
            });
        });
    });
});