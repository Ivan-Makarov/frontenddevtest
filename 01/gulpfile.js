const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const browsersync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const gutil = require( 'gulp-util' );
// PostCSS with plugins
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');

gulp.task('js', () => {
    return gulp.src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js'))
        .pipe(browsersync.stream())
});

gulp.task('css', () => {
    return gulp.src('./src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postCss([
            autoprefixer(),
            mqpacker()
        ]))
        .pipe(gulp.dest('./build/css'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('./build/css'))
        .pipe(browsersync.stream())
});

gulp.task('html', () => {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browsersync.stream())
});

gulp.task('php', () => {
    return gulp.src('./src/**/*.php')
    .pipe(gulp.dest('./build'))
    .pipe(browsersync.stream())
});

gulp.task('img', () => {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
});

gulp.task('sync', () => {
    browsersync.init({
        proxy: 'test',
        notify: false
    })
});

gulp.task('build', ['html', 'css', 'js', 'php', 'img']);

gulp.task('watch', () => {
    gulp.watch(['./src/**/*.scss'], ['css']);
    gulp.watch(['./src/**/**/*.js'], ['js']);
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/**/*.php'], ['php']);
    gulp.watch(['./build/**/*.php',
                './build/**/*.html',
                './build/**/*.css',
                './build/**/*.js'
                ]).on('change', browsersync.reload);
});

gulp.task('default', ['build', 'sync', 'watch']);
