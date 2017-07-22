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
const uncss = require('gulp-uncss');
const uglify = require('gulp-uglify');
const cp = require('child_process');




//
// Options
//

const config = {
	dev: gutil.env.dev,
	styles: {
		browsers: ['> 1%', 'last 2 versions', 'IE 10', 'IE 11'],
		src: '_assets/styles/*.scss',
		dest: 'assets/styles',
		site: '_site/assets/styles',
		watch: '_assets/styles/**/*.scss',
	},
	scripts: {
		src: '_assets/scripts/main.js',
		dest: 'assets/scripts',
		site: '_site/assets/scripts',
		watch: '_assets/scripts/**/*',
	},
	images: {
		src: '_assets/images/**/*',
		dest: 'assets/images',
		site: '_site/assets/images',
		watch: '_assets/images/**/*',
	},
	icons: {
		src: '_assets/icons/**/*.svg',
		dest: 'assets/icons',
		site: '_site/assets/icons',
		watch: '_assets/icons/**/*',
	},
	fonts: {
		src: '_assets/fonts/**/*',
		dest: 'assets/fonts',
		site: '_site/assets/fonts',
		watch: '_assets/fonts/**/*',
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

gulp.task('styles', ['jekyll'], () => {
	return gulp.src(config.styles.src)
		.pipe(sass({
			includePaths: './node_modules',
		}).on('error', sass.logError))
		.pipe(prefix(config.styles.browsers))
		.pipe(uncss({
			html: ['_site/**/*.html'],
			ignore: []
		}))
		.pipe(csso())
		.pipe(gulp.dest(config.styles.dest))
		.pipe(gulp.dest(config.styles.site))
		.pipe(browserSync.reload({stream:true}))
});




//
// Scripts
//

gulp.task('scripts', () => {
	return gulp.src(config.scripts.src)
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(gulp.dest(config.scripts.site))
});




//
// Images
//

gulp.task('images', () => {
	return gulp.src(config.images.src)
		.pipe(imagemin({
			cache: false
		}))
		.pipe(gulp.dest(config.images.dest))
		.pipe(gulp.dest(config.images.site))
});




//
// Images
//

gulp.task('fonts', () => {
	return gulp.src(config.fonts.src)
		.pipe(gulp.dest(config.fonts.dest))
		.pipe(gulp.dest(config.fonts.site))
});




//
// Jekyll
//

gulp.task('jekyll', function(done) {
	browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
		.on('close', done);
});




//
// Icons
//

gulp.task('icons', () => {
	return gulp.src(config.icons.src)
		.pipe(svgSprite({
			shape: {
				dimension: {
					maxWidth: 24,
					maxHeight: 24
				},
				transform: []
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
		.pipe(gulp.dest(config.icons.dest))
		.pipe(gulp.dest(config.icons.site))
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

	gulp.task('styles:watch', ['styles']);
	gulp.watch(config.styles.watch, ['styles:watch']);

	gulp.task('scripts:watch', ['scripts'], browserSync.reload);
	gulp.watch(config.scripts.watch, ['scripts:watch']);

	gulp.task('images:watch', ['images'], browserSync.reload);
	gulp.watch(config.images.watch, ['images:watch']);

	gulp.task('icons:watch', ['icons'], browserSync.reload);
	gulp.watch(config.icons.watch, ['icons:watch']);

	gulp.task('fonts:watch', ['fonts'], browserSync.reload);
	gulp.watch(config.fonts.watch, ['fonts:watch']);

	gulp.task('jekyll:watch', ['jekyll', 'styles'], browserSync.reload);
	gulp.watch(config.jekyll.watch, ['jekyll:watch']);

});




//
// Default
//

gulp.task('default', ['clean'], () => {

	// tasks
	const tasks = [
		'jekyll',
		'styles',
		'scripts',
		'images',
		'icons',
		'fonts',
	];

	// serve
	runSequence(tasks, () => {
		if (config.dev) {
			gulp.start('serve');
		}
	});

});
