'use strict';

var gulp = require('gulp');
var validateJsPipeline = require('pipeline-validate-js');
var validateCssPipeline = require('pipeline-validate-css');
var taskListing = require('gulp-task-listing');
var distArchivePipeline = require('webui-pipeline-archive-dist');
var testPipeline = require('webui-pipeline-test-tdd');
var less = require('pipeline-compile-less');
var handyman = require('pipeline-handyman');
var ngHtml2Js = require('gulp-ng-html2js');
var wiredep = require('wiredep');
var runSequence = require('run-sequence');
var webserverPipeline = require('webui-pipeline-serve');

var options = {
  watch: false,
  serve: {
    livereload: false,
    open: '/',
    port: 6789
  },
  root: './dist/'
};

var htmlFiles = ['./src/**/**/*.html'];
var jsFiles = ['./src/**/**/*.js', '!./src/**/*.test.js'];
var lessFiles = './src/**/**/**/*.less';

gulp.task('serve:local', function () {

  gulp.src(options.root).pipe(webserverPipeline.serve(options));

});

gulp.task('develop', function () {
  runSequence('dist', 'serve:local', 'watch');
});

gulp.task('lint:js', function () {
  return gulp.src([
    './*.js',
    './src/modules/**/*.js',
    './src/modules/**/*.spec.js'
  ])
  .pipe(validateJsPipeline.validateJS());
});

gulp.task('lint:css', function () {
  return gulp.src('./src/modules/**/less/*.less')
    .pipe(less.compileLESS({ addSourceMaps: false }))
    .pipe(validateCssPipeline.validateCSS());
});

gulp.task('test', ['lint:js'], function () {
  var depFiles = wiredep({ devDependencies: true }).js;
  var appFiles = [
    './src/modules/**/*-module.js',
    './src/modules/**/*.js',
    './src/modules/**/*.spec.js',
    './src/modules/**/*.html'
  ];

  var ttdTestOptions = {
    options: {
      files: [].concat(depFiles, appFiles),
      preprocessors: {
        './src/modules/**/*.html': ['ng-html2js']
      },
      ngHtml2JsPreprocessor: {
        stripPrefix: 'src/',
        moduleName: 'webui-sse.sse'
      }

    }
  };
  var tddTestServer = new testPipeline.Server(ttdTestOptions);

  tddTestServer.start();
});

/** DIST TASKS **/
gulp.task('dist:js', ['dist:templates'], function () {
  var uiJsFiles = [
    './src/modules/**/*-module.js',
    './src/modules/**/**/*.js',
    '!./src/modules/**/**/*.spec.js',
    './tmp/**/**/*.js'
  ];

  gulp.src(uiJsFiles)
    .pipe(distArchivePipeline.distributeScripts())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('dist:css', ['lint:css'], function () {
  return gulp.src('./src/modules/**/less/*.less')
    .pipe(less.compileLESS({ addSourceMaps: false }))
    .pipe(distArchivePipeline.distributeStyles())
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist:html', ['lint:css'], function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist:templates', ['clean:tmp'], function () {
  return gulp.src('./src/modules/**/*.html')
    .pipe(ngHtml2Js({
      prefix: 'modules/',
      declareModule: false,
      moduleName: 'webui-sse.sse'
    }))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('bower:copy:js:local', function () {
  var jsFiles = wiredep({
    exclude: ['bower_components/angular-sanitize/']
  }).js;

  return gulp.src(jsFiles, { base: './bower_components', cwd: './bower_components' })
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bower:copy:css:local', function () {
  var cssFiles = wiredep().css;

  return gulp.src(cssFiles, { base: './bower_components', cwd: './bower_components' })
    .pipe(gulp.dest('./dist/'));
});

/** CLEAN UP **/
gulp.task('dist:clean', function () {
  handyman.clean(['./dist/']);
});

gulp.task('clean:tmp', function () {
  handyman.clean(['./tmp']);
});

gulp.task('watch', function () {

  gulp.watch(htmlFiles, function() {
    runSequence(
      ['dist:js']
    );
  });

  gulp.watch(jsFiles, function() {
    runSequence(
      ['dist:js']
    );
  });

  gulp.watch(lessFiles, function() {
    runSequence(
      ['dist:css']
    );
  });

});

gulp.task('bower', function () {
  gulp.src('./src/index.html')
    .pipe(wiredep.stream({ignorePath: '../bower_components/'}))
    .pipe(gulp.dest('./dist'));
});

/** MAIN TASKS **/
gulp.task('lint', ['lint:js', 'lint:css']);
gulp.task('dist', ['dist:clean', 'dist:js', 'dist:css', 'bower:copy:js:local', 'bower:copy:css:local', 'bower']);
gulp.task('help', taskListing);
gulp.task('build', ['test']);
gulp.task('default', ['help']);
