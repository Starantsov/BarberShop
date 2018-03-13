var gulp = require("gulp");       //Подключения самого 'gulp'
var less = require("gulp-less"); //Подключение плагина 'gulp-less'
var browser_sync = require('browser-sync');
var reload = browser_sync.reload;  //full reload of the page
var del = require("del");


gulp.task("default",function(){
        console.log("Try 'run' that runs local server on your Wi-Fi and turns on monitoring of all changes.");
});

gulp.task("run", ['less','build','browser-sync','watch'],function(){
        console.log("Server started,all your changings are monitoring");
});
gulp.task("clean",function(){
        return del.sync('build');
});

gulp.task("build",["clean" ,"less"],function(){
         
        var build_html =
         gulp.src("src/index.html")
        .pipe(gulp.dest("build"))

        var build_css =
        gulp.src("src/css/style.css")
        .pipe(gulp.dest("build/css"))//Отправка в папку готового проекта
         
        var build_img =
        gulp.src("src/img/**/*")
        .pipe(gulp.dest("build/img"))

});

gulp.task("less",function(){    //Создания таска
       gulp.src("src/less/style.less")//Указания источника
       .pipe(less())              //Создание потока и загрузка плагина 'gulp-less'
       .pipe(gulp.dest("src/css")) //Отправка в папку с исходниками 
       .pipe(gulp.dest("build/css"))//Отправка в папку готового проекта
});

gulp.task("html-refresh",function(){
        gulp.src("src/index.html")
        .pipe(gulp.dest("build"))
});

gulp.task("watch", function(){
        gulp.watch('src/less/**/*.less',['less',reload]);
        gulp.watch("src/*.html", ['html-refresh',reload]); 
        //gulp.watch("src/js/*.js", reload);
});

gulp.task("browser-sync", function(){
        browser_sync({
                server: {
                        baseDir:"build"
                },
               notify : false
        });
});



 