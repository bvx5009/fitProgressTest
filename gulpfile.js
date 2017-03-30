var gulp = require('gulp'),     //task runner
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){ //to see that when we restart or save extensions above, node restarts by itself automatically
        console.log('restarting');
    });
});

