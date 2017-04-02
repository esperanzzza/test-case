'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    debug = require('gulp-debug'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR', 'ie >= 10']
};

gulp.task('html', function() {
    return gulp.src('./res/src/*.html')
        .pipe(gulp.dest('./res'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scss', function(callback) {
    return gulp.src('res/scss/**/*.scss')
        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(debug({
            title: 'src'
        }))
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(debug({
            title: 'sass'
        }))
        .pipe(concat('main.css'))
        .pipe(debug({
            title: 'concat'
        }))
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
        'res/libs/jquery/jquery-3.1.1.min.js', 
        'res/libs/jquery/jquery.validate.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('res/js'));
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});


gulp.task('default', ['browser-sync', 'html', 'scss', 'scripts'], function() {
    gulp.watch('res/scss/**/*.scss', ['scss', 'bs-reload']);
    gulp.watch('res/*.html', ['html']);
    gulp.watch('res/js/**/*.js', ['bs-reload']);
});


gulp.task('clean', function() {
    return del.sync('docs');
});

gulp.task('img', function() {
    return gulp.src('res/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))) 
        .pipe(gulp.dest('docs/img'));

});

gulp.task('build', ['clean', 'img', 'scss', 'scripts'], function() {

    var buildCss = gulp.src(['res/css/*.min.css', 'res/css/main.css'])
        .pipe(gulp.dest('docs/css'))


    var buildFonts = gulp.src('res/fonts/**/*')
        .pipe(gulp.dest('docs/fonts'))

    var buildJs = gulp.src('res/js/**/*')
        .pipe(gulp.dest('docs/js'))


    var buildHtml = gulp.src('res/*.html')
        .pipe(gulp.dest('docs'));

});

gulp.task('clear', function() {
    return cache.clearAll();
})