/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
define(['canvas'],function (Canvas) {
    describe('Canvas Class', function () {
        var node,
            canvas,
            hash = new Date().valueOf();

        beforeEach(function () {
            node = document.createElement('div');
            document.body.appendChild(node);
            node.style.width = '300px';
            node.style.height = '600px';

            canvas = new Canvas({
                node  : node,
                width : 10,
                height: 20,
                tag   : 'span'
            });

            canvas.addElement({
                hash  : hash,
                left  : 1,
                top   : 1,
                width : 3,
                points: [1, 0, 0,
                         0, 2, 0,
                         0, 0, 3],
                baseClass: 'element'
            });
        });
        
        describe('Remove element', function () {
            it('should delete existing element', function () {
                canvas.removeElement({
                    hash: hash
                });

                expect(node.children.length).toEqual(0);
            });


            it('should not throw errors on deletion not existing element', function () {
                var func = function () {
                    canvas.removeElement({
                        hash: new Date().valueOf()
                    });
                };

                expect(func).not.toThrow();
            });
        });

        describe('Add element', function () {
            it('should place element with correct settings', function () {
                var container = node.children[0],
                    cNode,
                    cStyle;

                expect(container.style.left).toEqual('30px');
                expect(container.style.top).toEqual('30px');

                expect(container.children.length).toEqual(3);


                cNode  = container.children[0];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('0px');
                expect(cStyle.top).toEqual('0px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element element-1');


                cNode  = container.children[1];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('30px');
                expect(cStyle.top).toEqual('30px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element element-2');


                cNode  = container.children[2];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('60px');
                expect(cStyle.top).toEqual('60px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element element-3');
            });
        });

        describe('Update element', function () {
            it('should update element if it is already placed and sub elements count increased', function () {
                canvas.updateElement({
                    hash  : hash,
                    left  : 3,
                    top   : 3,
                    width : 4,
                    points: [0, 0, 0, 5,
                             0, 0, 6, 0,
                             7, 8, 0, 0],
                    baseClass: 'element-updated'
                });

                var container = node.children[0],
                    cNode,
                    cStyle;

                expect(container.style.left).toEqual('90px');
                expect(container.style.top).toEqual('90px');

                expect(container.children.length).toEqual(4);


                cNode  = container.children[0];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('90px');
                expect(cStyle.top).toEqual('0px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element-updated element-updated-5');


                cNode  = container.children[1];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('60px');
                expect(cStyle.top).toEqual('30px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element-updated element-updated-6');


                cNode  = container.children[2];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('0px');
                expect(cStyle.top).toEqual('60px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element-updated element-updated-7');


                cNode  = container.children[3];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('30px');
                expect(cStyle.top).toEqual('60px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element-updated element-updated-8');
            });


            it('should update element if it is already placed and sub elements count decreased', function () {
                canvas.updateElement({
                    hash  : hash,
                    left  : 6,
                    top   : 7,
                    width : 2,
                    points: [0, 0,
                             0, 4,
                             0, 9],
                    baseClass: 'element'
                });

                var container = node.children[0],
                    cNode,
                    cStyle;

                expect(container.style.left).toEqual('180px');
                expect(container.style.top).toEqual('210px');

                expect(container.children.length).toEqual(2);


                cNode  = container.children[0];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('30px');
                expect(cStyle.top).toEqual('30px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element element-4');


                cNode  = container.children[1];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('30px');
                expect(cStyle.top).toEqual('60px');
                expect(cStyle.width).toEqual('30px');
                expect(cStyle.height).toEqual('30px');
                expect(cNode.className).toEqual('element element-9');
            });


            it('should not throw errors on updating not existing element', function () {
                var func = function () {
                    canvas.updateElement({
                        hash: new Date().valueOf()
                    });
                };

                expect(func).not.toThrow();
            });
        });

        describe('Redraw', function () {
            it('should recalculate size and position if node size is changed', function () {
                node.style.width  = '450px';
                node.style.height = '800px';

                canvas.redraw();

                var container = node.children[0],
                    cNode,
                    cStyle;

                expect(container.style.left).toEqual('45px');
                expect(container.style.top).toEqual('40px');

                expect(container.children.length).toEqual(3);


                cNode  = container.children[0];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('0px');
                expect(cStyle.top).toEqual('0px');
                expect(cStyle.width).toEqual('45px');
                expect(cStyle.height).toEqual('40px');
                expect(cNode.className).toEqual('element element-1');


                cNode  = container.children[1];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('45px');
                expect(cStyle.top).toEqual('40px');
                expect(cStyle.width).toEqual('45px');
                expect(cStyle.height).toEqual('40px');
                expect(cNode.className).toEqual('element element-2');


                cNode  = container.children[2];
                cStyle = cNode.style;

                expect(cStyle.left).toEqual('90px');
                expect(cStyle.top).toEqual('80px');
                expect(cStyle.width).toEqual('45px');
                expect(cStyle.height).toEqual('40px');
                expect(cNode.className).toEqual('element element-3');
            });
        });
    });
});