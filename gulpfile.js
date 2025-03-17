const gulp = require('gulp');
const gulpPug = require('gulp-pug');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    notify: false,
    open: false,
    reloadOnRestart: true,
  });
}

function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
				.pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}


function css() {
  return gulp.src('src/blocks/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/pages/**/*.pug'], pug);
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/**/*.scss'], scss);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch('dist/**/*').on('change', browserSync.reload); 
}

function pug() {
  return gulp.src('src/pages/**/*.pug')
        .pipe(gulpPug())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function scss() {
  return gulp.src('src/blocks/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

const build = gulp.series(clean, gulp.parallel(pug, scss, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images;
exports.clean = clean;
exports.pug = pug;
exports.scss = scss;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;