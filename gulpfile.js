var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    shell = require('gulp-shell'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    es = require('event-stream');

gulp.task('deps', shell.task('npm install', { cwd: './server' }));

gulp.task('scripts', function () {
    return gulp.src('static/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('script/*.js', ['scripts'])
});

gulp.task('run', function () {
    nodemon({
        script: 'server/index.js',
        watch: 'server'
    })
});