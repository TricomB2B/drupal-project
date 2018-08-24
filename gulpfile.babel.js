'use strict';

require('dotenv').config();

if (!process.env.THEME_PATH) {
  console.error('ERROR: could not locate `.env` file or it does not contain a `THEME_PATH` variable.');
  process.exit(1);
}

// vendors
const jsVendorList  = [];
const cssVendorList = [];

// paths to relevant directories
const dirs = {
  src: `${process.env.THEME_PATH}/src`,
  dest: `${process.env.THEME_PATH}/dist`
};

// paths to file sources
const sources = {
  js: `${dirs.src}/**/*.js`,
  scss: `${dirs.src}/**/*.scss`,
  coreScss: `${dirs.src}/scss/main.scss`,
  marketoScss: `${dirs.src}/scss/marketo.scss`,
  img: `./images/**/*.{png,jpg,jpeg}`,
  jsVendor: jsVendorList,
  cssVendor: cssVendorList
};

// paths to file destinations
const dests = {
  js: `${process.env.THEME_PATH}/js`,
  css: `${process.env.THEME_PATH}/css`,
  img: `${dirs.dest}/img`,
  sigFile: `${process.env.THEME_PATH}/images/.tinypng-sigs`,
  vendor: `${dirs.dest}/vendors`
};

// plugins
import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

// auto-load plugins
const $ = gulpLoadPlugins();

/****************************************
  Gulp Tasks
*****************************************/

// launch browser sync as a standalone local server
gulp.task('browser-sync-local', browserSyncLocal());
// browser-sync task for starting the server by proxying a local url
gulp.task('browser-sync-proxy', browserSyncProxy());
// copy vendor CSS
gulp.task('css-vendors', cssVendors());
// Lint Javascript Task
gulp.task('js-lint', javascriptLint());
// Concatenate and Minify Vendor JS
gulp.task('js-vendors', javascriptVendors());
// concatenate and minify marketo specific styles
gulp.task('marketo-styles', marketoStyles());
// lint sass task
gulp.task('sass-lint', sassLint());
// Concatenate & Minify JS
gulp.task('scripts', scripts());
// compile, prefix, and minify the sass
gulp.task('styles', styles());
// compress and combine svg icons
gulp.task('svg', svg());
// Unit testing
gulp.task('test', test());
// compress png and jpg images via tinypng API
gulp.task('tinypng', tinypng());
// Watch Files For Changes
gulp.task('watch', watch());

// default task builds src, opens up a standalone server, and watches for changes
gulp.task('default', gulp.series(
  'styles',
  'js-lint',
  'scripts',
  'browser-sync-proxy',
  'watch'
));

// local task builds src, opens up a standalone server, and watches for changes
gulp.task('local', gulp.series(
  'styles',
  'js-lint',
  'scripts',
  'browser-sync-local',
  'watch'
));

// proxy task builds src, opens up a proxy server, and watches for changes
gulp.task('proxy', gulp.series(
  'styles',
  'js-lint',
  'scripts',
  'browser-sync-proxy',
  'watch'
));

// builds everything
gulp.task('build', gulp.parallel(
  'styles',
  'js-lint',
  'scripts'
));

// builds the vendor files
gulp.task('vendors', gulp.parallel(
  'css-vendors',
  'js-vendors'
));

// compresses imagery
gulp.task('images', gulp.parallel(
  'svg',
  'tinypng'
));

/****************************************
  Task Logic
*****************************************/

function browserSyncLocal (done) {
  return (done) => {
    browserSync.init({
      server: './web'
    }, done);
  };
}

function browserSyncProxy (done) {
  return (done) => {
    if (!process.env.BROWSER_SYNC_PROXY) {
      console.error('ERROR: could not locate a `.env` file or it does not have a `BROWSER_SYNC_PROXY` variable.');
      process.exit(1);
    }

    browserSync.init({
      proxy: process.env.BROWSER_SYNC_PROXY
    }, done);
  };
}

function cssVendors () {
  return () => {
    return gulp.src(sources.cssVendor)
      .pipe(gulp.dest(dests.vendor));
  };
}

function javascriptLint (done) {
  return () => {
    return gulp.src(sources.js)
      .pipe($.jshint({esversion: 6}))
      .pipe($.jshint.reporter('jshint-stylish'));
  };
}

function javascriptVendors () {
  return () => {
    return gulp.src(sources.jsVendor)
      .pipe($.plumber())
      .pipe($.concat('vendors.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest(dests.vendor));
  };
}

function marketoStyles () {
  return () => {
    return gulp.src(sources.marketoScss)
      .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer(["> 1%", "last 2 versions"], { cascade: true }))
        .pipe(gulp.dest(dests.css))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.cleanCss())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(dests.css))
      .pipe(browserSync.stream());
  };
}

function sassLint () {
  return () => {
    return gulp.src(sources.scss)
      .pipe($.sassLint())
      .pipe($.sassLint.format())
      .pipe($.sassLint.failOnError());
  };
}

function scripts () {
  return () => {
    return gulp.src(sources.js)
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
        .pipe($.concat('main.js'))
        .pipe($.babel())
        .pipe(gulp.dest(dests.js))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(dests.js))
      .pipe(browserSync.stream());
  };
}

function styles () {
  return () => {
    return gulp.src(sources.coreScss)
      .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer(["> 1%", "last 2 versions"], { cascade: true }))
        .pipe(gulp.dest(dests.css))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.cleanCss())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest(dests.css))
      .pipe(browserSync.stream());
  };
}

function svg () {
  return () => {
    return gulp.src('./img/icons/*.svg')
      .pipe($.svgmin())
      .pipe($.svgstore())
      .pipe(gulp.dest('./img/icons'));
  };
}

function test (done) {
  return () => {
    let server = new karma.Server('./karma.conf.js', done);
    server.start();
  };
}

function tinypng () {
  return () => {
    if (!process.env.TINYPNG_KEY) {
      console.error('ERROR: could not locate a `.env` file or it does not have a `TINYPNG_KEY` variable.');
      process.exit(1);
    }

    return gulp.src(sources.img)
      .pipe($.tinypngCompress({
        key: process.env.TINYPNG_KEY,
        sigFile: dests.sigFile
      }))
      .pipe(gulp.dest(dests.img));
  };
}

function watch () {
  return () => {
    gulp.watch(sources.js, gulp.parallel('scripts'));
    gulp.watch(sources.scss, gulp.parallel('styles'));
    // gulp.watch('**/*.php', browserSync.reload);
    // gulp.watch('**/*.twig', browserSync.reload);
  };
}
