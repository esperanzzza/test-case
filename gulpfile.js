'use strict';

const gulp = require('gulp');
const scss = require ('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('sass', function(callback) {
	return gulp.src('res/scss/**/*.scss')
	.pipe(gulpif(isDevelopment, sourcemaps.init()))
	.pipe(debug({title: 'src'}))
	.pipe(scss())
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


gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'scripts'), function() {
    gulp.watch('res/sass/**/*.sass', ['sass']); 
    gulp.watch('res/*.html', browserSync.reload); 
    gulp.watch('res/js/**/*.js', browserSync.reload); 
});

gulp.task('default', gulp.series('watch'));