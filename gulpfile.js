const gulp = require('gulp');
const pump = require('pump');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const mincss = require('gulp-minify-css');
const gulp_replace = require('gulp-replace');
// const minifier = require('gulp-uglify/minifier');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('minicss', function(){
  gulp.src(['css/*.css'])
    .pipe(concat('style.css'))
    .pipe(mincss())
    // .pipe(gulp_replace('../images', 'https://static.huli.com/images'))
    .pipe(gulp.dest('admin/public/stylesheets/'))
});

gulp.task('compress', function (cb) {
    const arrSrc = [
        'jquery.min.js',
        'jquery.easing.1.3.js',
        'bootstrap.min.js',
        'jquery.waypoints.min.js',
        'jquery.magnific-popup.min.js',
        'salvattore.min.js',
        'main.js'
    ];
  pump([
        gulp.src(arrSrc, {cwd: 'js'}),
        concat('build.min.js'),
        uglify(),
        gulp.dest('admin/public/javascripts')
    ],
    cb
  );
});

gulp.task('copyfonts', function(){
  gulp.src('fonts/**/*')
    .pipe(gulp.dest('./admin/public/fonts'))
});

gulp.task('build', ['minicss', 'compress', 'copyfonts']);