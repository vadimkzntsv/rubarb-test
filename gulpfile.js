var gulp         = require('gulp'),
		scss         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		sourcemaps   = require('gulp-sourcemaps'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs'),
		plumber			 = require('gulp-plumber');
		babel        = require('gulp-babel');


var SASS_INCLUDE_PATHS = [
	'./node_modules/normalize-scss/sass'
];

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
};

gulp.task('browser-sync', function() {
	browserSync.init({
			server: {
					baseDir: "./app"
			},
			notify: false
	});
	
});

gulp.task('styles', function () {
	return gulp.src('src/scss/main.scss')
		.pipe(plumber({ errorHandler: handleError }))
		.pipe(sourcemaps.init())
		.pipe(scss({outputStyle: 'compressed', includePaths: SASS_INCLUDE_PATHS}))
		.pipe(autoprefixer({browsers: ['last 3 versions'], cascade: false}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber({ errorHandler: handleError }))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./app/js/'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.scss', gulp.parallel('styles'));
	gulp.watch('src/js/**/*.js', gulp.parallel('scripts'));
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));