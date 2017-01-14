const gulp = require("gulp");
const uglify = require("gulp-uglify");
const eslint = require("gulp-eslint");
const mocha = require("gulp-mocha");

gulp.task("eslint", function(){
    return gulp.src(["**/*.js", "!node_modules/**"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("mocha", function(){
  gulp.src("test/test.js", {read: false})
  .pipe(mocha({reporter: "nyan"}))
})

gulp.task("default", ["eslint", "mocha"], function(){});
