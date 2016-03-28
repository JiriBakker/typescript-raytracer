var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    merge = require('merge'),
    fs = require("fs");
 
eval("var project = " + fs.readFileSync("./project.json"));
 
var paths = {
    npm: './node_modules/',
    lib: "./" + project.webroot + "/lib/",
    tsSource: ['./TypeScript/*.ts', './TypeScript/sceneObjects/*.ts'],
    tsOutput: "./" + project.webroot + '/scripts/',
    tsDef: "./TypeScript/definitions/"
};
 
var tsProject = ts.createProject({
    declarationFiles: true,
    noExternalResolve: false,
    module: 'AMD',
    removeComments: true
});
 
gulp.task('ts-compile', function () {
    var tsResult = gulp.src(paths.tsSource)
                    .pipe(ts(tsProject));
 
    return merge([
        tsResult.dts.pipe(gulp.dest(paths.tsDef)),
        tsResult.js.pipe(gulp.dest(paths.tsOutput))
    ]);
});
 
gulp.task('watch', ['ts-compile'], function () {
    gulp.watch(paths.tsSource, ['ts-compile']);
});