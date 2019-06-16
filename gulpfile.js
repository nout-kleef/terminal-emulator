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
const generate = gulp.parallel(compileStyle, compileJs, moveHtml);
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
	del([assets + subs + ".*", dist + subs + ".html"]);
	cb();
}
// html
function moveHtml(cb) {
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
// javascript
function compileJs(cb) {
	// JQuery (not actually included, just there for demo page)
	gulp.src(node + "jquery/dist/jquery.slim.js") // slim: no extensions
		.pipe(gulp.dest(assets + "js/")).on("error", logError);
	// demo script, implementing example usage
	gulp.src(src + "/js/demo/emulator.js")
		.pipe(gulp.dest(assets + "js/demo/")).on("error", logError);
	gulp.src([src + "/js/*.js"]).on("error", logError)
		.pipe(sourcemaps.init())
		.pipe(concat("terminal-emulator.min.js")).on("error", logError)
		.pipe(uglify()).on("error", logError)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(assets + "js/")).on("error", logError);
	cb();
}
// exports
exports.clean = clean;
exports.generate = generate;
exports.default = build;
