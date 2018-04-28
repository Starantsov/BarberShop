var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var minify = require("gulp-csso"); // Минификация css файла
var rename = require("gulp-rename");//Переименование файлов
var autoprefixer = require("autoprefixer"); // Для webkit, transformation и т.д.
var server = require("browser-sync");
var del = require("del");
var mqpacker = require("css-mqpacker");
var imagemin = require("gulp-imagemin");
 
gulp.task("default", ["run"])

gulp.task("less", function() {   //Творим что-то с лесс файлами
return gulp.src("src/less/style.less")
  .pipe(plumber()) // обработка ошибок без остановки скрипта
  .pipe(less())
  .pipe(postcss([
    autoprefixer({browsers: [
      "last 1 version",
      "last 2 Chrome versions", 
      "last 2 Firefox versions",
      "last 2 Opera versions",
      "last 2 Edge versions"
    ]}),
    mqpacker({
      sort:true
    })
  ]))
  
  .pipe(gulp.dest("build/css"))  
  .pipe(minify())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))

  .pipe(server.reload({stream: true}));
});

gulp.task("run", ["build"], function() {
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
  gulp.watch("src/*.html",["build"]) ;


});

gulp.task("build", ["less"], function(){
         
        var build_html =
          gulp.src("src/**.html")
          .pipe(gulp.dest("build"))

        var build_js =                
          gulp.src("src/js/**/*.js")
          .pipe(gulp.dest("build/js"))
        
        var build_fonts = 
          gulp.src("src/fonts/*")
          .pipe(gulp.dest("build/fonts"))
          
        var build_img =  
          gulp.src("src/img/**")
          .pipe(gulp.dest("build/img"))
          
        .pipe(server.reload({stream: true}));
});

gulp.task("images",function(){
  return gulp.src("build/img/**/*.{png,jpg,gif}")
          .pipe(imagemin([
            imagemin.optipng({optimizationLevel:3}),
            imagemin.jpegtran({progressive: true}) // Прогрессивная закрузка ( не с вверху в низ =))  
          ]))

          .pipe(gulp.dest("build/img"));
})

gulp.task("clean", function() {
  return del("build");
});