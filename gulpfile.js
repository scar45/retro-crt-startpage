var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require("gulp-concat"),
    del = require('del'),
	minifyHTML = require("gulp-minify-html"),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
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
            src: ["src/images/**/*.jpg", "src/images/**/*.jpeg", "src/images/**/*.png", "src/images/**/*.svg"],
            dest: "build/images"
        },
        css: {
            src: ["src/css/normalize.css", "src/css/whhg.css"],
            dest: "build/css"
        },
        sass: {
            src: ["src/sass/**/*.scss"],
            dest: "build/css"
        },
        untouched: {
            src: ["src/.htaccess", "src/*.png", "src/*.xml", "src/*.txt"],
            dest: "build",
            fontSrc: "src/fonts/**/*",
            fontDest: "build/fonts"
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
        .pipe(zip('retro-crt-startpage-release.zip'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', ['scripts'], function() {
    return gulp.src(config.paths.html.src)
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task('css', ['sass'], function () {
    return gulp.src(config.paths.css.src)
        .pipe(concat("startpage-helpers.css"))
        .pipe(stripCssComments())
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.paths.css.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
    return gulp.src(config.paths.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.sass.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
    gulp.src(config.paths.javascript.src)
        .pipe(gulp.dest(config.paths.javascript.dest));
    gulp.src("./node_modules/vanilla-modal/dist/index.js")
        .pipe(rename("vanilla-modal.js"))
        .pipe(gulp.dest("./build/js/vendor"));
});

gulp.task("untouched", function(){
    gulp.src(config.paths.untouched.src)
        .pipe(gulp.dest(config.paths.untouched.dest));
    gulp.src(config.paths.untouched.fontSrc)
        .pipe(gulp.dest(config.paths.untouched.fontDest));
	gulp.src(config.paths.images.src)
		.pipe(gulp.dest(config.paths.images.dest));
    gulp.src(config.paths.json.src)
    .pipe(gulp.dest(config.paths.json.dest));
});

gulp.task('liveCoding', ['untouched', 'html', 'css'], function() {
    // Quick 2s delay to allow all tasks to complete
    setTimeout(function() {
        browserSync({
            server: {
                baseDir: './build'
            },
            reloadDelay: 1000
        });
    }, 2000);

});

gulp.task('release', function() {
    runSequence('clean', ['untouched', 'html', 'css'], 'cleanpostrelease', 'ziprelease')
});

gulp.task('default', ['liveCoding'], function(){
    gulp.watch(config.paths.html.src, ['html', browserSync.reload]);
    gulp.watch(config.paths.css.src, ['css', browserSync.reload]);
    gulp.watch(config.paths.sass.src, ['sass', browserSync.reload]);
    gulp.watch(config.paths.javascript.src, ['scripts', browserSync.reload]);
    gulp.watch(config.paths.images.src, ['untouched', browserSync.reload]);
    gulp.watch(config.paths.json.src, ['untouched', browserSync.reload]);
    gulp.watch(config.paths.untouched.src, ['untouched', browserSync.reload]);
});
