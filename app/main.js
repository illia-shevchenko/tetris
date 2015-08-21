/**
 * Created by Illia_Shevchenko on 14.08.2015.
 */
'use strict';


requirejs.config({
    baseUrl: 'src',
    paths  : {
        json: '../lib/requirejs-plugins/json',
        text: '../lib/requirejs-plugins/text'
    }
});

requirejs(['tetris', 'canvas', 'field', 'figures-factory', 'json!../settings/figures.json'], function (Tetris, Canvas, Field, figuresFactory, configurations) {
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
        preview = new Canvas({
            node  : document.getElementById('next'),
            width : 6,
            height: 6,
            tag   : 'div',
            elementClass  : 'figure',
            containerClass: 'container'
        }),

        interval,
        start = function () {
            interval = setInterval(tetris.down.bind(tetris), 1000);
        },

        pause = function () {
            if (!interval) {
                return start();
            }

            interval = clearInterval(interval);
        },

        tetris = new Tetris({
            canvas      : canvas,
            field       : field,
            preview     : preview,
            onNewFigure : figuresFactory.getFigure.bind(figuresFactory, configurations),
            onLineStrike: console.log.bind(console, 'Stricken lines: '),
            onFinish    : pause
        });

    document.addEventListener('keydown', function (event) {
        var key = event.keyCode || event.which;

        switch (interval && key) {
            /*up*/   case 38: tetris.rotate(); break;
            /*right*/case 39: tetris.right(); break;
            /*left*/ case 37: tetris.left(); break;
            /*down*/ case 40: tetris.down(); break;
            default:
            /*space*/if (key === 32) {
                pause();
            }
        }
    });

    document.getElementById('pause').addEventListener('click', pause);
    tetris.start();
    start();
});