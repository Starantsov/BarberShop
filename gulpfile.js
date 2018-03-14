var gulp = require("gulp");       //Подключения самого 'gulp'
var less = require('gulp-less');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");


var     vf            = require('vinyl-file'),
        vss           = require('vinyl-source-stream'),
        vb            = require('vinyl-buffer');

gulp.task("run", ['server'],function(){
        console.log("Server started,all your changings are monitoring");
});

gulp.task("clean",function(){
        return del.sync('build');
});

gulp.task("less",function(){    //Создания таска
       gulp.src( "src/less/style.less")//Указания источника
        .pipe(plumber())
        .pipe(less())           //Создание потока и загрузка плагина 'gulp-less'
        .pipe(postcss([
                autoprefixer({browsers:[
                        "last 1 version",
                        "last 2 Chrome versions",
                        "last 2 Firefox versions",
                        "last 2 Opera versions",
                        "last 2 Edge versions"
                ]})
        ]))
        .pipe(gulp.dest( "src/css")) //Отправка в папку с исходниками 
        .pipe(server.reload({stream:true}));
});




gulp.task("server", ["less"] ,function(){
       server.init({
               server: "./src/",
               injectChanges: true,            
               logConnections: true
               
       });

       gulp.watch("src/less/**/*.less", ["less"]);
       gulp.watch("src/*.html").on("change",server.reload);
});


// gulp.task("build",["clean" ,"less"],function(){
         
//         var build_html =
//          gulp.src("src/index.html")
//         .pipe(gulp.dest("build"))
//         build_html;
//         var build_css =
//         // gulp.src("src/less/style.less")
//         // .pipe(less())
//         gulp.src("src/css/style.css")
//         .pipe(gulp.dest("build/css"))//Отправка в папку готового проекта
//         build_css; 

//         var build_img =
//         gulp.src("src/img/**/*")
//         .pipe(gulp.dest("build/img"))
//         build_img;

// });