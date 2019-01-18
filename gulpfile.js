'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const shell = require('gulp-shell');
const env = require('gulp-env');


/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript.
 */


gulp.task('compile', shell.task([
    'npm run tsc',
]));

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', shell.task([
    'npm run tsc-watch',
]));
/**
 * Copy config files
 */
gulp.task('configs', (cb) => {
    // todo: needs fixing
    return gulp.src("src/api/config/*.*.json")
        .pipe(gulp.dest('./build/api/config'));
});
/**
 * Copy models
 */
gulp.task('copy_models',(cb)=>{
    gulp.src(["src/models/*.js"])
        .pipe(gulp.dest('./build/models'));

});

/**
 * Build the project.
 */
gulp.task('build', ['tslint', 'configs', 'copy_models', 'compile'], () => {
    console.log('Building the project ...');
});


gulp.task('default', ['build']);
