var gulp = require('gulp');

gulp.task('default', function(){
    var watcher = gulp.watch('*.js');

    watcher.on('change', function(){
    })
});