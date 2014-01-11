var gulp = require('gulp'),
	gutil = require('gulp-util'),
	lr = require('tiny-lr'),
	refresh = require('gulp-livereload'),
	jshint = require('gulp-jshint');

var server = lr();

gulp.task('js', function() {
	gulp.src('src/**/*.js')
		.pipe(refresh(server));
});

gulp.task('html', function() {
	gulp.src('src/**/*.html')
		.pipe(refresh(server));
});

gulp.task('img', function() {
	gulp.src('src/img/**')
		.pipe(refresh(server));
});

gulp.task('livereload', function() {
	var webServer = require('./server');
	webServer.listen(3000);

	server.listen(35729, function(err) {
		if (err) return console.log(err);
	});
});

gulp.task('dev', function() {
	gulp.run('livereload');

	gulp.watch('src/**/*.js', function(ev) {
		gulp.run('js');
	});

	gulp.watch('src/**/*.html', function(ev) {
		gulp.run('html');
	});

	gulp.watch('src/img/**', function(ev) {
		gulp.run('img');
	});
});