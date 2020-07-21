const   browserSync = require('browser-sync'),
        del         = require('del'),
        gulp        = require('gulp'),
        plumber     = require('gulp-plumber'),
        babel       = require('gulp-babel'),
        // uglify      = require('gulp-uglify'),
        uglify      = require('gulp-uglify-es').default,
        concat    = require('gulp-concat'),
        rename      = require('gulp-rename'),
        resizer     = require('gulp-images-resizer'),
        sourcemaps  = require('gulp-sourcemaps'),
        sass        = require('gulp-sass'),
        cssnano     = require('cssnano'),
        postcss     = require('gulp-postcss'),
        autoprefixer = require('autoprefixer'),
        nunjucksRender = require('gulp-nunjucks-render');

gulp.task('js', (done) => {
    gulp.src([
        // node_modules
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        // './node_modules/owl.carousel/dist/owl.carousel.min.js',
        './node_modules/slick-carousel/slick/slick.min.js',
        // './node_modules/retinajs/dist/retina.min.js',
        './node_modules/holderjs/holder.min.js',
        // './node_modules/jquery-slinky/dist/slinky.min.js',
        // './node_modules/@fortawesome/fontawesome-pro/js/all.min.js',
        // './node_modules/@fortawesome/fontawesome-pro/js/fontawesome.min.js',
        // './node_modules/jsbarcode/dist/JsBarcode.all.min.js',
        './node_modules/jquery-zoom/jquery.zoom.min.js',

        // './src/vendor/simple-calendar/*.js',

        './src/js/*.js'
    ])
        // .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(plumber())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets'))
    done()
})

gulp.task('sass', (done) => {
    gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./dist/assets'))
done()
})

gulp.task('html', (done) => {
    gulp.src('./html/pages/**/*.+(njk)')
        .pipe(plumber())
        .pipe(plumber())
        .pipe(nunjucksRender({
            path: ['./html/layouts']
        }))
        .pipe(gulp.dest('./dist'))
    gulp.src('./html/emails/**/*.+(njk)')
        .pipe(plumber())
        .pipe(plumber())
        .pipe(nunjucksRender({
            path: ['./html/layouts']
        }))
        .pipe(gulp.dest('./dist/email'))
done()
})

gulp.task('assets', (done) => {
    gulp.src('./img/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/assets'))
done()
})

gulp.task('minify-js', (done) => {
    gulp.src('./dist/assets/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(plumber())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/assets'))
    done()
})

gulp.task('minify-css', (done) => {
    gulp.src('./scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/assets'))
done()
})

gulp.task('image', (done) => {
    gulp.src('./img/*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/img'))
done()
})

gulp.task('delete-dist', (done) => {
    return del(['./dist'])
})

gulp.task('clean',
    gulp.series('delete-dist',
        gulp.parallel('sass','html','assets')
    )
)

gulp.task('minify',
    gulp.parallel('minify-js','minify-css')
)

gulp.task('watch', (done) => {
    browserSync.init({
        server: {
            baseDir: './dist',
            directory: true
        },
        browser: 'google chrome',
        notify: false,
        cors: true
    })

    gulp.watch('./src/js/*.js', gulp.series('js'))

    gulp.watch('./sass/**/*.scss', gulp.series('sass'))

    gulp.watch('./html/**/*.njk', gulp.series('html'))

    gulp.watch('./dist/**/*').on('change', () => {
        browserSync.reload()
    })

done()
})

