/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint no-process-exit: 0*/


var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    mainBowerFiles = require('main-bower-files'),
    args    = require('yargs').argv,

    transpile = args.es5,
    destination = 'server' + (transpile ? '-es5' : ''),

    clientConf = {
        folder: './app/',
        dest  : destination + '/public',
        source: './app/src',
        mainJs  : './app/src/main.js',
        js    : './app/src/**/*.js',
        html  : './app/index.html',
        css   : './app/styles/main.css',

        tests: './app/tests/**/*.spec.js',
        jsOut : 'app.js',
        cssOut: 'app.css',
        libJsOut: 'lib.js',
        docOut     : './app/documentation',

        testConf: './app/karma.conf.js',
        testBuildConf: './app/karma.conf.build.js'
    },

    serverConf = {
        folder: './server',
        dest  : destination,

        js    : './server/**/*.js',
        tests : './server/**/*.spec.js',
        docOut: './server_documentation',
        main  : './server.js'
    },
    initEnv = function () {
        process.env.NODE_TRANSPILE = transpile;
        process.env.NODE_DEST      = destination;
        process.env.NODE_IS_RUN    = '';
    };


//init environment variables
initEnv();


//do something additional if transpile is needed
(function () {
    if (!transpile) {
        return;
    }

    require('gulp-babel/node_modules/babel-core/register');
})();


/**
 * Client tasks
 */


gulp.task('clientLibJs', function () {
    var files = mainBowerFiles({
        paths: clientConf.folder,
        filter: /require.js/
    });

    gulp.src(files)
        .pipe(plugins.uglify())
        .pipe(gulp.dest(clientConf.dest));
});

gulp.task('clientJs', function (cb) {
    gulp.src(clientConf.mainJs)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.requirejsOptimize({
            useStrict: true,
            baseUrl  : clientConf.source,
            paths  : {
                json: '../bower_components/requirejs-plugins/src/json',
                text: '../bower_components/requirejs-plugins/lib/text'
            },
            out: clientConf.jsOut
        }))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(clientConf.dest))
        .once('end', cb);
});

gulp.task('clientLint', function () {
    gulp.src(clientConf.js)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format());
});


gulp.task('clientDoc', function () {
    require('del')(clientConf.docOut + '/**')
        .then(function () {
            gulp.src(clientConf.js)
                .pipe(plugins.jsdoc(clientConf.docOut));
        });
});

gulp.task('clientHtml', function (cb) {
    gulp.src(clientConf.html)
        .pipe(plugins.processhtml())
        .pipe(gulp.dest(clientConf.dest))
        .once('end', cb);
});


gulp.task('clientCss', function (cb) {
    gulp.src(clientConf.css)
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat(clientConf.cssOut))
        .pipe(gulp.dest(clientConf.dest))
        .once('end', cb);
});

gulp.task('clientTest', function () {
    gulp.src('notexisting')
    .pipe(plugins.karma({
            configFile: clientConf.testConf,
            logLevel  : 'ERROR',
            action    : 'run'
        }));
});

//TODO: This is not working. Because we bootstrap main.js file also to build. And karma runs it.
gulp.task('clientTestBuild', function () {
    gulp.src('notexisting')
        .pipe(plugins.karma({
            configFile: clientConf.testBuildConf,
            action    : 'run'
        }));
});


gulp.task('clientBuild', ['clientTest', 'clientLint', 'clientLibJs', 'clientJs', 'clientHtml', 'clientCss']);
gulp.task('clientBuildDev', ['clientTest', 'clientLint', 'clientDoc']);

gulp.task('clientDev', ['clientBuildDev'], function () {
    gulp.watch([clientConf.js, clientConf.tests], ['clientBuildDev']);
});


/**
 * Server tasks
 */


gulp.task('serverJs', function (cb) {
    if (!transpile) {
        return;
    }

    gulp.src(serverConf.js)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(serverConf.dest))
        .once('end', cb);
});

gulp.task('serverDoc', function () {
    require('del')(serverConf.docOut + '/**')
        .then(function () {
            gulp.src(serverConf.folder)
                .pipe(plugins.esdoc({
                    destination: serverConf.docOut
                }));
        });
});

gulp.task('serverBuild', ['serverJs']);
gulp.task('serverBuildDev', ['serverBuild']);

function serverTest() {
    return gulp.src(serverConf.tests)
        .pipe(plugins.mocha({
            require: ['./server/tests/helpers/run.js']
        }))
        .on('error', function (err) {
            console.log(err.toString());//eslint-disable-line no-console
            this.emit('end');
        });
}

function serverTestEnd() {
    serverTest().once('error', process.exit.bind(process, 1))
        .once('end', process.exit);
}

gulp.task('serverTest', ['serverBuild'], serverTestEnd);

gulp.task('server:start', ['serverBuildDev'], function () {
    process.env.NODE_IS_RUN = true;
    plugins.developServer.listen({
        path: serverConf.main
    }, serverTest);
});

gulp.task('server:restart', ['serverBuildDev'], function () {
    plugins.developServer.restart(serverTest);
});

gulp.task('serverDev', ['server:start'], function () {
    gulp.watch([serverConf.js, serverConf.tests], ['server:restart']);
});

gulp.task('build', ['clientBuild', 'serverTest']);
gulp.task('dev', ['clientDev', 'serverDev']);

gulp.task('default', ['dev']);