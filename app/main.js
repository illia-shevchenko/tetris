/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


requirejs.config({
    baseUrl: 'src'
});

requirejs(['tetris', 'canvas', 'field', 'figures-factory'], function (Tetris, Canvas, Field, figuresFactory) {
    var field = new Field({
            width : 10,
            height: 20
        }),
        canvas = new Canvas({
            node  : document.getElementById('canvas'),
            width : 10,
            height: 20,
            tag   : 'div',
            elementClass  : 'figure',
            containerClass: 'container'
        }),
        tetris = new Tetris({
            canvas: canvas,
            field : field,
            onNewFigure: figuresFactory.getFigure.bind(figuresFactory, 5),
            onLineStrike: function (lines) {
                console.log('Stricken lines: ' + lines);
            },
            onFinish: function () {
                pause();
            }
        }),

        start = function () {
            interval = setInterval(tetris.down.bind(tetris), 1000);
        },

        pause = function () {
            if (!interval) {
                start();
                return;
            }

            clearInterval(interval);
            interval = null;
        },

        interval;

    document.addEventListener('keydown', function (event) {
        var key = event.keyCode || event.which;
        //space
        if (key === 32) {
            pause();
        }

        if (!interval) {
            return;
        }

        switch (event.keyCode || event.which) {
            //up
            case 38: tetris.rotate(); break;
            //right
            case 39: tetris.right(); break;
            //left
            case 37: tetris.left(); break;
            //down
            case 40: tetris.down(); break;
        }
    });

    tetris.start();
    start();
});