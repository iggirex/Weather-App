var gulp = require("gulp");
var uglify = require("gulp-uglify");
var eslint = require("gulp-eslint");

// gulp.task("scripts", function(){
//     gulp.src("src/*.js")
//     .pipe(concat("all.min.js"))
//     .pipe(uglify())
//     .pipe(gulp.dest("dist"));
// });

gulp.task("eslint", function(){
    return gulp.src(["**/*.js", "!node_modules/**"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("default", ["eslint"], function(){
    //console.log("linter rrrunnningggg");
});
