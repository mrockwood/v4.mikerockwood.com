/* ==========================================================================
   #GULPFILE
   ========================================================================== */




//
// Dependencies
//

const browserSync = require('browser-sync');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const reload = browserSync.reload;
const runSequence = require('run-sequence');
const svgSprite = require('gulp-svg-sprite');
const sass = require('gulp-sass');
const webpack = require('webpack');
const cp = require('child_process');




//
// Options
//

const config = {
	dev: gutil.env.dev,
	styles: {
		browsers: 'last 2 versions',
		src: '_assets/styles/*.scss',
		dest: 'assets/styles',
		watch: '_assets/styles/**/*.scss',
	},
	scripts: {
		src: './_assets/scripts/main.js',
		dest: 'assets/scripts',
		watch: '_assets/scripts/**/*',
	},
	images: {
		src: '_assets/images/**/*',
		dest: 'assets/images',
		watch: '_assets/images/**/*',
	},
	icons: {
		src: '_assets/icons/**/*.svg',
		dest: 'assets/icons',
		watch: '_assets/icons/**/*',
	},
	jekyll: {
		src: ['**/*.{html,md,markdown,xml,yml}', '!_site/**', '!node_modules/**'],
		watch: ['**/*.{html,md,markdown,xml,yml}', '!_site/**', '!node_modules/**'],
	},
	dest: '_site',
};




//
// Clean
//

gulp.task('clean', del.bind(null, [config.dest]));




//
// Styles
//

gulp.task('styles', () => {
	gulp.src(config.styles.src)
	.pipe(sass({
		includePaths: './node_modules',
	}).on('error', sass.logError))
	.pipe(prefix(config.styles.browsers))
	.pipe(gulpif(!config.dev, csso()))
	.pipe(gulp.dest(config.styles.dest))
	.pipe(gulpif(config.dev, reload({ stream: true })));
});




//
// Scripts
//
/*
const webpackConfig = require('./webpack.config')(config);

gulp.task('scripts', (done) => {
  webpack(webpackConfig, (err, stats) => {
	if (err) {
		gutil.log(gutil.colors.red(err()));
	}
	const result = stats.toJson();
	if (result.errors.length) {
		result.errors.forEach((error) => {
			gutil.log(gutil.colors.red(error));
		});
	}
	done();
  });
});
*/



//
// Images
//

gulp.task('images', () => {
	return gulp.src(config.images.src)
		.pipe(imagemin())
		.pipe(gulp.dest(config.images.dest));
});




//
// Jekyll
//

// Messages
var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Build the Jekyll Site
gulp.task('jekyll-build', function(done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
		.on('close', done);
});

// Rebuild Jekyll & reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
	browserSync.reload();
});




//
// Icons
//

gulp.task('icons', function() {
	return gulp.src(config.icons.src)
		.pipe(svgSprite({
			shape: {
				dimension: {
					maxWidth: 50,
					maxHeight: 50
				},
				spacing: {
					padding: 4
				}
			},
			mode: {
				symbol: true,
				symbol: {
					dest: "",
					sprite: "sprite.svg",
					example: true
				}
			}
		}))
		.pipe(gulp.dest('_site/assets/icons'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest(config.icons.dest));
});




//
// Serve
//

gulp.task('serve', () => {

	browserSync({
		server: {
			baseDir: config.dest,
		},
		notify: false,
	});

	gulp.task('jekyll:watch', ['jekyll-rebuild'], browserSync.reload);
	gulp.watch(config.jekyll.watch, ['jekyll:watch']);

	gulp.task('styles:watch', ['styles']);
	gulp.watch(config.styles.watch, ['styles:watch']);

	//gulp.task('scripts:watch', ['scripts'], browserSync.reload);
	//gulp.watch(config.scripts.watch, ['scripts:watch']);

	gulp.task('images:watch', ['images'], browserSync.reload);
	gulp.watch(config.images.watch, ['images:watch']);

	gulp.task('icons:watch', ['icons'], browserSync.reload);
	gulp.watch(config.icons.watch, ['icons:watch']);

});




//
// Default
//

gulp.task('default', ['clean'], () => {

	// define build tasks
	const tasks = [
		'styles',
		//'scripts',
		'images',
		'icons',
		'jekyll-rebuild',
	];

	// run build
	runSequence(tasks, () => {
		if (config.dev) {
			gulp.start('serve');
		}
	});

});
