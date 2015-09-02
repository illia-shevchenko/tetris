/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';


var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    mainBowerFiles = require('main-bower-files'),
    args    = require('yargs').argv,

    transpile = args.es5,

    config = {
        clientPath: './app/',
        clientSource: './app/src',
        clientMain  : './app/src/main.js',
        clientJs    : './app/src/**/*.js',
        clientHtml  : './app/index.html',
        clientCss   : './app/styles/main.css',

        clientOutJs : 'app.js',
        clientOutCss: 'app.css',
        clientOutLibJs: 'lib.js',
        clientDoc     : '.app/documentation',

        clientTestConf: './app/karma.conf.js',
        clientTestBuildConf: './app/karma.conf.build.js'
    },

    destination = 'server' + (transpile ? '-es5' : ''),
    clientDestination = destination + '/public';


gulp.task('clientLibJs', function () {
    var files = mainBowerFiles({
        paths: config.clientPath,
        filter: /require.js/
    });

    gulp.src(files)
        .pipe(plugins.uglify())
        .pipe(gulp.dest(clientDestination));
});

gulp.task('clientJs', function () {
    gulp.src(config.clientMain)
        .pipe(plugins.requirejsOptimize({
            useStrict: true,
            baseUrl  : config.clientSource,
            paths  : {
                json: '../bower_components/requirejs-plugins/src/json',
                text: '../bower_components/requirejs-plugins/lib/text'
            },
            out: config.clientOutJs/*,
            TODO: Source maps seems not to be working - file is not created

             optimize: 'uglify2',
             generateSourceMaps: true,
             preserveLicenseComments: false
             */
        }))
        .pipe(gulp.dest(clientDestination));
});


gulp.task('clientDoc', function () {
    require('del')(config.clientDoc + '/**')
        .then(function () {
            gulp.src(config.clientJs)
                .pipe(plugins.jsdoc(config.clientDoc));
        });
});

gulp.task('clientHtml', function () {
    gulp.src(config.clientHtml)
        .pipe(gulp.dest(clientDestination));
});


gulp.task('clientCss', function () {
    gulp.src(config.clientCss)
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat(config.clientOutCss))
        .pipe(gulp.dest(clientDestination));
});

gulp.task('clientTest', function () {
    gulp.src('notexisting')
    .pipe(plugins.karma({
            configFile: config.clientTestConf,
            logLevel  : 'ERROR',
            action    : 'run'
        }));
});

//TODO: This is not working. Because we bootstrap main.js file also to build. And karma runs it.
gulp.task('clientTestBuild', function () {
    gulp.src('notexisting')
        .pipe(plugins.karma({
            configFile: config.clientTestBuildConf,
            action    : 'run'
        }));
});

gulp.task('clientBuild', ['clientLibJs', 'clientJs', 'clientHtml', 'clientCss']);
gulp.task('clientDev', ['clientTest', 'clientDoc']);

gulp.task('default', []);