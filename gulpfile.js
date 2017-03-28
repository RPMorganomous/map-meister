var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    csslint = require('gulp-csslint'),
    html5Lint = require('gulp-html5-lint'),
    jshint = require('gulp-jshint');

    gulp.task('scripts', function(){
        gulp.src('js/*.js')
            .pipe(plumber())
            .pipe(uglify())
            .pipe(rename('app.min.js'))
            .pipe(gulp.dest('js/min/'));
    });

    gulp.task('styles', function(){
        gulp.src('css/*.css')
        // .pipe(plumber())
        .pipe(minifyCSS())
        .pipe(gulp.dest('minCSS/'));
    });

    gulp.task('css', function(){
        gulp.src('css/*.css')
            .pipe(csslint())
            .pipe(csslint.formatter());
    });

    gulp.task('html5-lint', function() {
    return gulp.src('*.html')
        .pipe(html5Lint());
    });

gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

    gulp.task('watch', function(){
        gulp.watch('js/*.js', ['scripts']);
        gulp.watch('css/*.css', ['styles']);
    });

    gulp.task('default', ['scripts', 'styles', 'css', 'html5-lint', 'lint']);