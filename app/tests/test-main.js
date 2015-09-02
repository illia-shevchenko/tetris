var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

//Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(file);
    }
});


require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/app/src',
    paths: {
        Squire: '../bower_components/squire/src/Squire',
        json  : '../bower_components/requirejs-plugins/src/json',
        text  : '../bower_components/requirejs-plugins/lib/text'
    }
});

require(allTestFiles, function() {
    window.__karma__.start();
});