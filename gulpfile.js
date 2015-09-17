/**
 * Created by Illia_Shevchenko on 01.09.2015.
 */
'use strict';
/*eslint no-process-exit: 0*/


/**
 * ===========
 * Client tasks
 * ===========
 */
let gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    mainBowerFiles = require('main-bower-files'),
    args    = require('yargs').argv,

    transpile = args.es5,
    destination = 'server' + (transpile ? '-es5' : '');

const clientConf = {
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
};


gulp.task('clientLibJs', () => {
    let files = mainBowerFiles({
        paths: clientConf.folder,
        filter: /require.js/
    });

    gulp.src(files)
        .pipe(plugins.uglify())
        .pipe(gulp.dest(clientConf.dest));
});

gulp.task('clientJs', (cb) => {
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

gulp.task('clientLint', () => {
    gulp.src(clientConf.js)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format());
});


gulp.task('clientDoc', () => {
    require('del')(clientConf.docOut + '/**')
        .then(function () {
            gulp.src(clientConf.js)
                .pipe(plugins.jsdoc(clientConf.docOut));
        });
});

gulp.task('clientHtml', (cb) => {
    gulp.src(clientConf.html)
        .pipe(plugins.processhtml())
        .pipe(gulp.dest(clientConf.dest))
        .once('end', cb);
});


gulp.task('clientCss', (cb) => {
    gulp.src(clientConf.css)
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat(clientConf.cssOut))
        .pipe(gulp.dest(clientConf.dest))
        .once('end', cb);
});

gulp.task('clientTest', () => {
    gulp.src('notexisting')
    .pipe(plugins.karma({
            configFile: clientConf.testConf,
            logLevel  : 'ERROR',
            action    : 'run'
        }));
});

//TODO: This is not working. Because we bootstrap main.js file also to build. And karma runs it.
gulp.task('clientTestBuild', () => {
    gulp.src('notexisting')
        .pipe(plugins.karma({
            configFile: clientConf.testBuildConf,
            action    : 'run'
        }));
});


gulp.task('clientBuild', ['clientTest', 'clientLint', 'clientLibJs', 'clientJs', 'clientHtml', 'clientCss']);
gulp.task('clientBuildDev', ['clientTest', 'clientLint', 'clientDoc']);

gulp.task('clientDev', ['clientBuildDev'], () => {
    gulp.watch([clientConf.js, clientConf.tests], ['clientBuildDev']);
});


/**
 * ===========
 * Server tasks
 * ===========
 */

let serverConf = {
        folder: './server',
        dest  : destination,

        js    : './server/**/*.js',
        tests : './server/**/*.spec.js',
        integrationTests : './server/**/*.integration.js',
        docOut: './server_documentation',
        main  : './server.js'
    },
    initEnv = () => {
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

    //for mocha
    require('gulp-babel/node_modules/babel-core/register');
})();


gulp.task('serverJs', (cb) => {
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
                    destination: serverConf.docOut,
                    test: {
                        type: 'mocha',
                        source: serverConf.folder
                    }
                }));
        });
});


gulp.task('serverUnitTest', () => {
    gulp.src(serverConf.tests)
        .pipe(plugins.mocha({
            require: ['./server/tests/helpers/run.js']
        }))
        .on('error', function (err) {
            console.log(err.toString());//eslint-disable-line no-console
            this.emit('end');
        });
});


gulp.task('serverUnitBuild', ['serverUnitTest', 'serverDoc', 'serverJs']);
gulp.task('serverBuild', ['serverJs']);
gulp.task('serverBuildDev', ['serverBuild', 'serverDoc']);


function serverIntegrationTest() {
    return gulp.src(serverConf.integrationTests)
        .pipe(plugins.mocha({
            require: ['./server/tests/helpers-int/run.js']
        }))
        .on('error', function (err) {
            console.log(err.toString());//eslint-disable-line no-console
            this.emit('end');
        });
}

function processEnd(proc) {
    proc.once('error', process.exit.bind(process, 1))
           .once('end', process.exit);
}


gulp.task('serverTest', ['serverBuild'], () => {
    processEnd(serverIntegrationTest());
});


gulp.task('server:start', ['serverBuildDev'], () => {
    process.env.NODE_IS_RUN = true;
    plugins.developServer.listen({
        path: serverConf.main
    }, serverIntegrationTest);
});


gulp.task('server:restart', ['serverBuildDev'], () => {
    plugins.developServer.restart(serverIntegrationTest);
});


gulp.task('serverDev', ['server:start'], () => {
    gulp.watch([serverConf.js, serverConf.tests], ['server:restart']);
});


gulp.task('serverUnitDev', ['serverUnitBuild'], () => {
    gulp.watch([serverConf.js, serverConf.tests], ['serverUnitBuild']);
});


gulp.task('build', ['clientBuild', 'serverTest']);
gulp.task('dev', ['clientDev', 'serverDev']);

gulp.task('default', ['dev']);