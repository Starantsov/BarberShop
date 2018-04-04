var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var minify = require("gulp-csso"); // Минификация css файла
var rename = require("gulp-rename");//Переименование файлов
var autoprefixer = require("autoprefixer"); // Для webkit, transformation и т.д.
var server = require("browser-sync");
var del = require("del");

gulp.task("default", ["run"])

gulp.task("less", function() {   //Творим что-то с лесс файлами
  gulp.src("src/less/style.less")
  .pipe(plumber()) // обработка ошибок без остановки скрипта
  .pipe(less())
  .pipe(postcss([
    autoprefixer({browsers: [
      "last 1 version",
      "last 2 Chrome versions", 
      "last 2 Firefox versions",
      "last 2 Opera versions",
      "last 2 Edge versions"
    ]})
  ]))
  
  .pipe(gulp.dest("src/css"))  
  .pipe(gulp.dest("build/css"))
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("src/css"))  
  .pipe(gulp.dest("build/css"))


  gulp.src("src/index.html")
  .pipe(gulp.dest("build"))


  .pipe(server.reload({stream: true}));
});

gulp.task("run", ["less", "build"], function() {
  server.init({
    server: "build",
    ghostMode: false, //Отключает синхронный скролинг на разных устройствах
    // logLevel:"debug",  Показывает базовую информацию о происходящем на сервере
    notify:false,
    logPrefix:"Starantsov_Browsersync",
    logConnections:true,//Пишет о подключенный девайсах
    online: true        //Не будет узнавать статус сети посмотрев сюда(сократит время)
  });
  
  gulp.watch("src/less/**/*.less", ["less"]);
  gulp.watch("src/js/**/*.js", ["build"]);
  gulp.watch("src/*.html",["less"]) ;


});

gulp.task("build",["clean"],function(){
         
        var build_html =
          gulp.src("src/index.html")
          .pipe(gulp.dest("build"))

        var build_css =
          gulp.src("src/css/style.css")
          .pipe(gulp.dest("build/css"))//Отправка в папку готового проекта

        var build_min_css = 
          gulp.src("src/css/style.min.css")
          .pipe(gulp.dest("build/css"))

        var build_img =
          gulp.src("src/img/**/*")
          .pipe(gulp.dest("build/img"))
        
        var build_js =                
          gulp.src("src/js/**/*.js")
          .pipe(gulp.dest("build/js"))
        
        var build_fonts = 
          gulp.src("src/fonts/*")
          .pipe(gulp.dest("build/fonts"))
          
        .pipe(server.reload({stream: true}));

});

gulp.task("clean", function() {
  return del("build");
});