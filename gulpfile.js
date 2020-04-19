// PATHS
const src = "./src",
	dist = "./dist/",
	node = "./node_modules/",
	subs = "/**/*";

// PLUGINS
const gulp = require('gulp'),
	gutil = require('gulp-util'),
	del = require("del"),
	less = require("gulp-less"),
	concat = require("gulp-concat"),
	cleanCSS = require("gulp-clean-css"),
	uglify = require('gulp-uglify-es').default,
	LessAutoprefix = require('less-plugin-autoprefix'),
	autoprefix = new LessAutoprefix({
		browsers: ['last 2 versions']
	});

// TASK COMPOSITIONS
const generate = gulp.parallel(compileStyle, compileJs, moveHtml);
const build = gulp.series(clean, generate);

// TASK MODULES
function logError(error) {
	gutil.log(
		gutil.colors.red('\n!! !! !!\n!! !! !!\n!! !! !!'),
		"\nERROR OCCURRED"
	);
	gutil.log(gutil.colors.red('[Error]'), error.toString());
}
function clean(cb) {
	del([
		dist + "*/" + subs + ".*", // empty any subdirectory
		dist + "*.*"
	]);
	cb();
}
function moveHtml(cb) {
	gulp.src(src + subs + ".html").on("error", logError)
		.pipe(gulp.dest(dist)).on("error", logError);
	cb();
}
function compileStyle(cb) {
	gulp.src(src + "/less/main.less").on("error", logError)
		.pipe(less( /*{plugins: [autoprefix]}*/)).on("error", logError)
		.pipe(concat("terminal-emulator.css")).on("error", logError)
		.pipe(gulp.dest(dist));
	cb();
}
function compileJs(cb) {
	gulp.src(node + "jquery/dist/jquery.slim.js") // slim: no extensions
		.pipe(gulp.dest(dist)).on("error", logError);
	gulp.src(src + "/js/demo/emulator.js")
		.pipe(gulp.dest(dist)).on("error", logError);
	gulp.src([src + "/js/*.js"]).on("error", logError)
		.pipe(concat("terminal-emulator.min.js")).on("error", logError)
		.pipe(uglify()).on("error", logError)
		.pipe(gulp.dest(dist)).on("error", logError);
	cb();
}
exports.clean = clean;
exports.generate = generate;
exports.default = build;
