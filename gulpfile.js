var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');
var map = require("map-stream");  
var customerReporter = map(function(file,cb){  
    if(!file.jshint.success){  
       //打印出错误信息  
       console.log("jshint fail in:" + file.path);  
       file.jshint.results.forEach(function(err){  
           if(err){  
              console.log(err);  
              console.log("在 "+file.path+" 文件的第"+err.error.line+" 行的第"+err.error.character+" 列发生错误");  
           }  
       });  
    }  
});  
  
gulp.task("jshint",function(){  
   gulp.src("src/scenes.js")  
      .pipe(jshint())  
      .pipe(customerReporter);  
});  

gulp.task('uglify', function () {
    gulp.src('src/threeQuery.move.js')
        .pipe(uglify())
        .pipe(gulp.dest('res/js'));
});

gulp.task("concat",function(){
    gulp.src(['src/threeQuery.core.js','src/threeQuery.controls.js','src/threeQuery.move.js','src/threeQuery.component.js','src/threeQuery.device.js','src/threeQuery.sound.js']).pipe(concat('threeQuery.js')).pipe(gulp.dest('res'));
})


//gulp.task('jshint')