var gulp = require('gulp'),
	gutil = require('gulp-util'),
	lr = require('tiny-lr'),
	refresh = require('gulp-livereload'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	open = require('open');

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

gulp.task('open', function() {
	open('http://localhost:3000');
});

gulp.task('dev', function() {
	gulp.run('livereload', 'lint', 'open');

	gulp.watch('src/js/**/*.js', function(ev) {
		gulp.run('lint');
		gulp.src('src/**/*.js')
			.pipe(refresh(server));
	});

	gulp.watch('src/**/*.html', function(ev) {
		gulp.src('src/**/*.html')
			.pipe(refresh(server));
	});

	gulp.watch('src/img/**', function(ev) {
		gulp.src('src/img/**')
			.pipe(refresh(server));
	});
});