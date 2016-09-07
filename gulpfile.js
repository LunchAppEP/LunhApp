var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var comb = require('gulp-csscomb');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var atImport = require('postcss-import');
var variables = require('postcss-simple-vars');
var bem = require('postcss-bem');
var nested = require('postcss-nested');

gulp.task('css-bem', function () {
    var processors = [
        atImport(),
        variables({ silent: true }),
        bem({defaultNamespace: 'da',
            separators: {
            descendent: '__',
            modifier: '_'
                }
        }),
        nested(),
    ];
    return gulp
        .src('public/css/modules/main.css')
        .pipe(postcss(processors))
        .pipe(comb(''))
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('css-ugly', function () {
    return gulp
        .src('css/style.css')
        .pipe(minify())
        .pipe(rename('css/style.min.css'))
        .pipe(gulp.dest(''));
});

gulp.task('watch', function() {
    gulp.watch('public/css/modules/*/*.css', ['css-bem']);
});