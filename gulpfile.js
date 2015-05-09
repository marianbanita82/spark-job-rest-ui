var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower');

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('sass', function () {
  return sass(config.sassPath + '/style.scss', {
        style: 'expanded',
        loadPath:[
            './resources/sass',
            config.bowerDir + '/bootstrap-sass-official/assets/stylesheets'
        ]
    })
    .on('error', notify.onError(function (error){
      return "Error: " + error.message;
    }))
    .pipe(gulp.dest('./assets/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

gulp.task('default', ['bower', 'sass', 'watch']);
