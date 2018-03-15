var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer"); // Для webkit, transformation и т.д.
var server = require("browser-sync");
var run = require("run-sequence"); // Позволяет запускать task последовательно друг за другом, а не синхронно 
var del = require("del");


gulp.task("less", function() {
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
  .pipe(server.reload({stream: true}));
});



gulp.task("serve", ["less"], function() {
  server.init({
    server: "src"
  });
  
  gulp.watch("src/less/**/*.less", ["less"]);
  gulp.watch("src/*.html").on("change" , server.reload);
 });

gulp.task("clean", function() {
  return del("build");
});



