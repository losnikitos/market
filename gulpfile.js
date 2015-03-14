var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    shell = require('gulp-shell'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    usemin =require('gulp-usemin');

gulp.task('deps', shell.task('npm install', { cwd: './server' }));

//gulp.task('scripts', function () {
//    return gulp.src('static/*.js')
//        .pipe(concat('all.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist'));
//});

//gulp.task('watch', function () {
//    gulp.watch('static/**/*.{html,css,js}', ['default'])
//});

gulp.task('run', function () {
    nodemon({
        script: 'server/index.js',
        watch: 'server'
    })
});

gulp.task('build', function() {
    return gulp.src('static/*.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            js: [uglify()]
        }))
        .pipe(gulp.dest('dist'));
});