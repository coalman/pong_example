var gulp = require('gulp'),
	gutil = require('gulp-util'),
	lr = require('tiny-lr'),
	refresh = require('gulp-livereload'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish');

var server = lr();

gulp.task('lint', function() {
	gulp.src('./src/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('livereload', function() {
	var webServer = require('./server');
	webServer.listen(3000);

	server.listen(35729, function(err) {
		if (err) return console.log(err);
	});
});

gulp.task('dev', function() {
	gulp.run('livereload', 'lint');

	gulp.watch('src/js/**/*.js', function(ev) {
		gulp.run('lint');
		gulp.src('src/**/*.js')
			.pipe(refresh(server));
	});

	gulp.watch('src/**/*.html', function(ev) {
		gulp.run('html');
		gulp.src('src/**/*.html')
			.pipe(refresh(server));
	});

	gulp.watch('src/img/**', function(ev) {
		gulp.run('img');
		gulp.src('src/img/**')
			.pipe(refresh(server));
	});
});