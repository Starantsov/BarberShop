var gulp = require("gulp");       //Подключения самого 'gulp'
var less = require("gulp-less"); //Подключение плагина 'gulp-less'

gulp.task("less",function(){    //Создания таска
       gulp.src("less/style.less")//Указания источника
       .pipe(less())              //Создание потока и загрузка плагина 'gulp-less'
       .pipe(gulp.dest("css"));    //Указание папки (destination )
});