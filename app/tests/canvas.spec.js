/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


define(['canvas'], function (Canvas) {
    describe('Canvas Class', function () {
        var node,
            canvas,
            hash = new Date().valueOf();

        beforeEach(function () {
            document.body.style.margin = 0;
            document.body.style.padding = 0;

            node = document.createElement('div');
            document.body.appendChild(node);

            node.style.left = '10px';
            node.style.top = '10px';
            node.style.position = 'absolute';
            node.style.width = '300px';
            node.style.height = '600px';

            canvas = new Canvas({
                node  : node,
                width : 10,
                height: 20,
                elementClass  : 'element',
                containerClass: 'container'
            });

            canvas.addElement({
                hash  : hash,
                left  : 1,
                top   : 1,
                width : 3,
                points: [
                    1, 0, 0,
                    0, 2, 0,
                    0, 0, 3]
            });
        });

        it('should return its sizes', function () {
            expect(canvas.getSizes()).toEqual({
                width : 10,
                height: 20
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


            it('should not throw errors on deletion undefined', function () {
                var func = function () {
                    canvas.removeElement();
                };

                expect(func).not.toThrow();
            });
        });

        describe('Add element', function () {
            it('should place element with correct settings', function () {
                var container = node.children[0],
                    cNode;

                expect(container.style).toEqual(jasmine.objectContaining({
                    left: '40px',
                    top : '40px'
                }));
                expect(container.className).toEqual('container');

                expect(container.children.length).toEqual(3);

                cNode  = container.children[0];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '0px',
                    top   : '0px',
                    width : '30px',
                    height: '30px'
                }));
                expect(cNode.className).toEqual('element element-1');


                cNode  = container.children[1];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '30px',
                    top   : '30px',
                    width : '30px',
                    height: '30px'
                }));
                expect(cNode.className).toEqual('element element-2');


                cNode  = container.children[2];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '60px',
                    top   : '60px',
                    width : '30px',
                    height: '30px'
                }));
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
                    points: [
                        0, 0, 0, 5,
                        0, 0, 6, 0,
                        7, 8, 0, 0]
                });

                var container = node.children[0],
                    cNode;

                expect(container.style).toEqual(jasmine.objectContaining({
                    left: '100px',
                    top : '100px'
                }));

                expect(container.className).toEqual('container');

                expect(container.children.length).toEqual(4);


                cNode  = container.children[0];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '90px',
                    top   : '0px',
                    width : '30px',
                    height: '30px'
                }));
                expect(cNode.className).toEqual('element element-5');


                cNode  = container.children[1];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '60px',
                    top   : '30px',
                    width : '30px',
                    height: '30px'
                }));
                expect(cNode.className).toEqual('element element-6');


                cNode  = container.children[2];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '0px',
                    top   : '60px',
                    width : '30px',
                    height: '30px'
                }));
                expect(cNode.className).toEqual('element element-7');


                cNode  = container.children[3];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '30px',
                    top   : '60px',
                    width : '30px',
                    height: '30px'
                }));
                expect(cNode.className).toEqual('element element-8');
            });


            it('should update element if it is already placed and sub elements count decreased', function () {
                canvas.updateElement({
                    hash  : hash,
                    left  : 6,
                    top   : 7,
                    width : 2,
                    points: [
                        0, 0,
                        0, 0,
                        0, 9]
                });

                var container = node.children[0],
                    cNode;

                expect(container.style).toEqual(jasmine.objectContaining({
                    left: '190px',
                    top : '220px'
                }));
                expect(container.className).toEqual('container');

                expect(container.children.length).toEqual(1);

                cNode  = container.children[0];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '30px',
                    top   : '60px',
                    width : '30px',
                    height: '30px'
                }));
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
                    cNode;

                expect(container.style).toEqual(jasmine.objectContaining({
                    left: '55px',
                    top : '50px'
                }));
                expect(container.className).toEqual('container');

                expect(container.children.length).toEqual(3);


                cNode  = container.children[0];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '0px',
                    top   : '0px',
                    width : '45px',
                    height: '40px'
                }));
                expect(cNode.className).toEqual('element element-1');


                cNode  = container.children[1];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '45px',
                    top   : '40px',
                    width : '45px',
                    height: '40px'
                }));
                expect(cNode.className).toEqual('element element-2');


                cNode  = container.children[2];
                expect(cNode.style).toEqual(jasmine.objectContaining({
                    left  : '90px',
                    top   : '80px',
                    width : '45px',
                    height: '40px'
                }));
                expect(cNode.className).toEqual('element element-3');
            });
        });
    });
});