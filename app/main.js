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

requirejs(['tetris', 'interval', 'canvas', 'field', 'figures-factory', 'json!../settings/figures.json'], function (Tetris, Interval, Canvas, Field, figuresFactory, configurations) {
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

        tetris = new Tetris({
            canvas  : canvas,
            field   : field,
            preview : preview,
            onFinish: function (scores) {
                var messageEl = document.getElementById('message');

                messageEl.textContent = 'Game finished with scores: ' + scores;
                messageEl.style.display = 'block';

                interval.stop();
            },

            onScoreChanges: function (score) {
                document.getElementById('score').lastChild.textContent = score;
            },
            onNewFigure   : figuresFactory.getFigure.bind(figuresFactory, configurations)
        }),

        interval = new Interval(tetris.tick.bind(tetris), 1000);

    document.addEventListener('keydown', function (event) {
        var key = event.keyCode || event.which;

        switch (interval && key) {
            /*up*/   case 38: tetris.rotate(); break;
            /*right*/case 39: tetris.right(); break;
            /*left*/ case 37: tetris.left(); break;
            /*down*/ case 40: tetris.down(); break;
            default:
            /*space*/if (key === 32) {
                interval.pause();
            }
        }
    });

    document.getElementById('pause').addEventListener('click', interval.pause.bind(interval));
    document.getElementById('restart').addEventListener('click', function () {
        interval.stop();
        tetris.restart();
        interval.start();
    });
    
    tetris.start();
    interval.start();
});