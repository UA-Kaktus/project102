const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const pug = require("gulp-pug");
const { fdatasyncSync } = require("fs");

// Static server
gulp.task("browser-sync", function () {
	browserSync.init({
		server: {
			baseDir: "dist",
		},
	});
});

gulp.task("styles", function () {
	return gulp
		.src("src/scss/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(
			rename({
				prefix: "",
				suffix: ".min",
			})
		)
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

gulp.task("pug", function () {
	return gulp
		.src("./src/index.pug")
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest("./dist"))
		.pipe(browserSync.stream());
});

gulp.task("watch", function () {
	gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel("styles"));
	gulp.watch("src/*.pug", gulp.parallel("pug"));
	gulp.watch("src/js/**/*.js", gulp.parallel("scripts"));
});

gulp.task("scripts", function () {
	return gulp
		.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
});

gulp.task("assets", function () {
	return gulp.src("src/assets/**/*").pipe(gulp.dest("dist/assets"));
});

gulp.task(
	"default",
	gulp.parallel("browser-sync", "styles", "watch", "pug", "scripts", "assets")
);
