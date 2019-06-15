// PATHS
const src = "./src",
	dist = "./dist/",
	node = "./node_modules/",
	assets = dist + "assets/",
	subs = "/**/*";

// PLUGINS
const gulp = require('gulp'),
	gutil = require('gulp-util'),
	del = require("del"),
	sourcemaps = require("gulp-sourcemaps"),
	less = require("gulp-less"),
	concat = require("gulp-concat"),
	cleanCSS = require("gulp-clean-css"),
	uglify = require('gulp-uglify-es').default,
	LessAutoprefix = require('less-plugin-autoprefix'),
	autoprefix = new LessAutoprefix({
		browsers: ['last 2 versions']
	});

// TASK COMPOSITIONS
// builds assets
const pipeStyle = gulp.series(compileStyle, joinStyle);
const generate = gulp.parallel(pipeStyle, pipeJs, pipeImg, pipeHtml);
// cleans, then builds
const build = gulp.series(clean, generate);

// TASK MODULES
// error reporting
function logError(error) {
	gutil.log(
		gutil.colors.red('\n!! !! !!\n!! !! !!\n!! !! !!'),
		"\nERROR OCCURRED"
	);
	gutil.log(gutil.colors.red('[Error]'), error.toString());
}
// cleanup
function clean(cb) {
	// delete all existing assets and html to prevent caching issues
	// del([assets + subs + ".*", dist + subs + ".html"]);
	cb();
}
// images
function pipeImg(cb) {
	// copy all images from src to dist
	gulp.src(src + "/images" + subs).on("error", logError)
		// todo: gulp-imagemin
		.pipe(gulp.dest(assets + "img/")).on("error", logError);
	cb();
}
// html
function pipeHtml(cb) {
	// copy all images from src to dist
	gulp.src(src + subs + ".html").on("error", logError)
		.pipe(gulp.dest(dist)).on("error", logError);
	cb();
}
// less/css
function compileStyle(cb) {
	gulp.src(src + "/less/main.less").on("error", logError)
		.pipe(sourcemaps.init())
		.pipe(less( /*{plugins: [autoprefix]}*/ )).on("error", logError)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(assets + "css/"));
	cb();
}

function joinStyle(cb) {
	// gulp.src([]).on("error", logError)
	// 	.pipe(concat("vendor.min.css")).on("error", logError)
	// 	.pipe(cleanCSS()).on("error", logError)
	// 	.pipe(gulp.dest(assets + "css/")).on("error", logError);
	cb();
}
// javascript
function pipeJs(cb) {
	gulp.src([
			node + "jquery/dist/jquery.slim.js", // slim: no extensions
			src + "/js/*" + subs + ".js", // require extensions before main js
			src + "/js/*.js"
		]).on("error", logError)
		.pipe(sourcemaps.init())
		.pipe(concat("main.js")).on("error", logError)
		.pipe(uglify()).on("error", logError)
		// todo: add .min suffix
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(assets + "js/")).on("error", logError);
	cb();
}

// watch source files for changes, reload if necessary
function srcWatcher(cb) {
	gulp.watch([src + subs + ".*"], build).on("error", logError);
	cb();
}
// exports
exports.clean = clean;
exports.build = build;
exports.default = build;
