const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageOptiPng = require('imagemin-pngquant');
const del = require('del');
const plumber = require('gulp-plumber');
const sassGlob = require('gulp-sass-glob');
const htmlMin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

function makePug(){
    return src('./src/assets/pug/index.pug')
    .pipe(plumber())
    .pipe(pug({
        pretty: true,
    }))
    .pipe(htmlMin({
        collapseWhitespace: true,
        removeComments: true,
    }))
    .pipe(dest('./src'))
    .pipe(browserSync.stream())
}

function cleanDist(){
    return del('dist')
}

function images(){
    return src('./src/assets/images/**/*')
    .pipe(imagemin(
        [
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imageOptiPng({quality: [0.8, 0.9]}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]
    ))
    .pipe(dest('dist/assets/images'))
};

function browsSync(cb){
    browserSync.init({
        server: {
            baseDir: 'src/'
        },
        open: true,
        notify: false,
    });
    cb()
}

function html(){
    return src('./src/*.html', {base: 'src/'})
    .pipe(plumber())
    .pipe(browserSync.stream())
}

const scripts =() => (
    browserify('./src/assets/js/main.js', {debug: true})
        .transform('babelify', {presets: ['@babel/preset-env']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({
            toplevel: true,
        }))
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./src/assets/js'))
    .pipe(browserSync.reload({stream: true}))
)

function styles(){
    return src('./src/assets/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(scss({
        outputStyle: 'compressed',
        includePaths: ['./node_modules/']
    }).on('error', scss.logError))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true
    }))
    .pipe(dest('./src/assets/css'))
    .pipe(browserSync.stream())
}

function build(){
    return src([
        './src/*.html',
        './src/assets/fonts/**/*',
        './src/assets/js/main.min.js',
        './src/assets/css/style.min.css'
    ], {base: 'src'})
    .pipe(dest('dist'))
}

function watching(){
    watch(['./src/assets/scss/**/*.scss'], styles);
    watch(['./src/assets/**/*.js', '!./src/assets/js/main.min.js'], scripts);
    watch(['./src/assets/pug/**/*.pug'], makePug).on('change', browserSync.reload)
}

exports.styles = styles;
exports.watching = watching;
exports.browsSync = browsSync;
exports.scripts = scripts;
exports.makePug = makePug;
exports.images = images;
exports.cleanDist = cleanDist;
exports.html = html;

exports.build = series(cleanDist, images, build);

exports.default = parallel(makePug, html, styles, scripts, watching, browsSync);