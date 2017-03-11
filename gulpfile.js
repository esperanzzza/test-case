'use strict';

var gulp = require('gulp'),
    sass = require ('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    debug = require('gulp-debug'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR', 'ie >= 10']
};

gulp.task('html', function () {
    return gulp.src('./res/src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./res'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('scss', function(callback) {
    return gulp.src('res/scss/**/*.scss')
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(debug({title: 'src'}))
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(debug({title: 'sass'}))
    .pipe(concat('main.css'))
    .pipe(debug({title: 'concat'}))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('res/css'))
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'res' 
        },
        notify: false 
    });
});

gulp.task('scripts', function() {
    return gulp.src([ 
        'bower_components/jquery/dist/jquery.min.js'
        ])
        .pipe(concat('libs.min.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('res/js')); 
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['browser-sync', 'html', 'scss', 'scripts'], function() {
    gulp.watch('res/sass/**/*.scss', ['scss', 'bs-reload']); 
    gulp.watch('res/src/**/*.html', ['html']); 
    gulp.watch('res/js/**/*.js', ['bs-reload']); 
});