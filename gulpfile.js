var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require("gulp-concat"),
    del = require('del'),
	minifyHTML = require("gulp-minify-html"),
    minifyCSS = require('gulp-minify-css'),
    package = require('./package.json'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('node-sass')),
    sourcemaps = require('gulp-sourcemaps'),
    stripCssComments = require('gulp-strip-css-comments'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip');

var config = {
    paths: {
        html: {
            src:  "src/**/*.html",
            dest: "build"
        },
        json: {
            src:  "src/**/*.json",
            dest: "build"
        },
        javascript: {
            src:  "src/js/**/*.js",
            dest: "build/js"
        },
        images: {
            src: ["src/images/**/*.jpg", "src/images/**/*.jpeg", "src/images/**/*.png", "src/images/**/*.svg", "!src/images/icons/custom/**/*"],
            dest: "build/images"
        },
        css: {
            src: ["src/css/normalize.css"],
            dest: "build/css"
        },
        sass: {
            src: ["src/sass/**/*.scss"],
            dest: "build/css"
        },
        untouched: {
            src: ["src/.htaccess", "src/*.png", "src/*.xml", "src/*.txt", "src/*.mp3"],
            dest: "build",
            fontSrc: "src/fonts/**/*",
            fontDest: "build/fonts",
            dataSrc: "src/data/**/*",
            dataDest: "build/data"
        }
    }
};

gulp.task('clean', function() {
    return del('./build');
});

gulp.task('cleanpostrelease', function() {
    return del(['./build/css/**/*.map' ])
});

gulp.task('ziprelease', function() {
    return gulp.src(['./build/**/*','!./build/links.json'])
        .pipe(zip('retro-crt-startpage-v' + package.version + '-release.zip'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
    return gulp.src(config.paths.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.sass.dest))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(done) {
    gulp.src(config.paths.javascript.src)
        .pipe(gulp.dest(config.paths.javascript.dest));
    gulp.src("./node_modules/vanilla-modal/dist/index.js")
        .pipe(rename("vanilla-modal.js"))
        .pipe(gulp.dest("./build/js/vendor"));
    done();
});

gulp.task('html', gulp.series('scripts', function() {
    return gulp.src(config.paths.html.src)
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest));
}));

gulp.task('css', gulp.series('sass', function () {
    return gulp.src(config.paths.css.src)
        .pipe(concat("startpage-helpers.css"))
        .pipe(stripCssComments())
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.paths.css.dest))
        .pipe(browserSync.stream());
}));

gulp.task("untouched", function(done){
    gulp.src(config.paths.untouched.src)
        .pipe(gulp.dest(config.paths.untouched.dest));
    gulp.src(config.paths.untouched.fontSrc)
        .pipe(gulp.dest(config.paths.untouched.fontDest));
    gulp.src(config.paths.untouched.dataSrc)
        .pipe(gulp.dest(config.paths.untouched.dataDest));
	gulp.src(config.paths.images.src)
		.pipe(gulp.dest(config.paths.images.dest));
    gulp.src(config.paths.json.src)
        .pipe(gulp.dest(config.paths.json.dest));
    done();
});

gulp.task('release', gulp.series('clean','untouched','html','css','cleanpostrelease','ziprelease'));

function serve(done) {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    done();
}

const watchHTML = () => gulp.watch(config.paths.html.src, gulp.series('html', function (done) {
    browserSync.reload();
    done();
}));
const watchCSS = () => gulp.watch(config.paths.css.src, gulp.series('css',  function (done) {
    browserSync.reload();
    done();
}));
const watchSASS = () => gulp.watch(config.paths.sass.src, gulp.series('sass',  function (done) {
    browserSync.reload();
    done();
}));
const watchJS = () => gulp.watch(config.paths.javascript.src, gulp.series('scripts',  function (done) {
    browserSync.reload();
    done();
}));
const watchUntouched = () => gulp.watch(config.paths.untouched.src, gulp.series('untouched',  function (done) {
    browserSync.reload();
    done();
}));

const liveCoding = gulp.series(
    serve,
    gulp.series('untouched', 'html', 'css'),
    gulp.parallel(watchHTML,watchCSS,watchSASS,watchJS,watchUntouched)
);

exports.default = liveCoding;
