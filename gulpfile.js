var gulp = require('gulp'),
  tasks = require("gulp-load-plugins")(),
  lr = require('tiny-lr'),
  server = lr(),
  connect = require('connect'), 
  http = require('http'), 
  runSequence = require('run-sequence'),
  jade = require('gulp-jade');

var destinationDirectory = 'dist';

gulp.task('lint', function() {
  return gulp.src('./app/scripts/app.js')
    .pipe(tasks.jshint())
    .pipe(tasks.jshint.reporter('default'));
});

gulp.task('clean', function() {
  return gulp.src(['./build/', './'+destinationDirectory+'/'], {read: false})
    .pipe(tasks.clean());
});

gulp.task('browserify', function() {
  return gulp.src(['./app/scripts/app.js'])
    .pipe(tasks.browserify({
      insertGlobals : true,
      debug : true,
      shim: {
        
        'angular': {
            path: 'app/bower_components/angular/angular.js',
            exports: 'angular'
        },
        'angular-route': {
            path: 'app/bower_components/angular-route/angular-route.js',
            exports: 'ngRouteModule',
            depends: {
                angular: 'angular'
            }
        },
        bootstrap: {
            path: 'app/bower_components/bootstrap-sass/dist/js/bootstrap.js',
            exports: null,
            depends:{
              jquery: 'jquery'
            }
        },
        'jquery': {
            path: 'app/bower_components/jquery/dist/jquery.js',
            exports: '$'
        }
      }
    }))
    .pipe(tasks.concat('main.js'))
    .pipe(gulp.dest('./build/scripts'))
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  return gulp.src('./app/views/**.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./build/views/'))
});

gulp.task('sass', function(){
  return  gulp.src('app/styles/custom.scss')
    .pipe(tasks.sass({                      // Dictionary of render options
      includePaths: [
        './app/bower_components/bootstrap-sass/lib/',
        '../bower_components/bootstrap-sass/lib/',
        './app/styles/'
      ]
    }))
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('minify-css', function() {
  gulp.src('./build/styles/**/**.css')
    .pipe(tasks['minify-css'](opts))
    .pipe(gulp.dest('./'+destinationDirectory+'/styles'))
});

gulp.task('minify-html', function() {
  gulp.src('./build/views/*.html')
    .pipe(tasks['minify-html'](opts))
    .pipe(gulp.dest('./'+destinationDirectory+'/views'))
});

gulp.task('imagemin', function () {
    gulp.src('app/images/**.{png,svg,jpeg,gif,jpg}')
        .pipe(tasks.imagemin())
        .pipe(gulp.dest(destinationDirectory));
});

gulp.task('minify-js', function() {
  gulp.src('./build/scripts/**/*.js')
    .pipe(tasks.uglify({
            // inSourceMap: 
            // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./'+destinationDirectory+'/scripts'))
});

gulp.task('watch', function() {
  return gulp.src(['./app/scripts/**/**.**','./app/styles/**.**','./app/views/**.**'])
    .pipe(tasks.watch({ emit: 'all' }, function(files) {
        files
          .pipe(gulp.run('templates','sass', 'lint', 'browserify'));
    }));
});

//TEST
gulp.task('mocachino', function () {
  gulp.src('test/**.js')
    .pipe(tasks.mocha({reporter: 'spec'}))
    .on('error', gutil.beep);
});

//SERVER
gulp.task("server", function(){
  var options = {
      url: "http://localhost:8888"
  };
  var app = connect()
      .use(connect.logger('dev'))
      .use(connect.static('app'))
      .use(connect.static('app/bower_components/bootstrap-sass'))
      .use(connect.static('build'));

  http.createServer(app).listen(8888);

  gulp.run('watch');

  return gulp.src("./app/index.html")
      .pipe(tasks.open("", options));
});

gulp.task('buildserver', function(){
  var app = connect()
          .use(connect.static('dist'));
  http.createServer(app).listen(process.env.PORT || 8888);
});

//COPY THINGS
gulp.task("copy-dist", function(){
  gulp.src(['./app/fonts/**.**',
              'app/bower_components/bootstrap-sass/fonts/**.**'])
      .pipe(gulp.dest('./'+destinationDirectory+'/fonts/'));
  gulp.src('./app/data/**.**')
      .pipe(gulp.dest('./'+destinationDirectory+'/data/'));
  gulp.src('./app/images/**.**')
      .pipe(gulp.dest('./'+destinationDirectory+'/images/'));
  gulp.src('./app/res/**/**.**')
      .pipe(gulp.dest('./'+destinationDirectory+'/res/'));

  return gulp.src([
      './build/**/**.html',
      './app/index.html',
      './app/favicon.png',
      './app/**.pdf'
  ])
  .pipe(gulp.dest('./'+destinationDirectory+'/'));
});


//THE USED TASKS
gulp.task('default', function(){
   runSequence('clean','templates', ['browserify', 'lint','sass' ],'server');
});

gulp.task('build', function(){
  destinationDirectory = 'dist';
  runSequence('clean', ['templates','browserify' ,'sass'], 'minify-js', 'minify-css', 'copy-dist');
});

gulp.task('phone', function(){
  destinationDirectory = 'cordova/www';
  runSequence('clean', ['templates','browserify' ,'sass'], 'minify-js', 'minify-css', 'copy-dist');
});

gulp.task('test', function(){
  gulp.src(['./app/scripts/**/**.js', './test/**.js'])
        .pipe(tasks.watch({ emit: 'all' }, function(files) {
            gulp.run('mocachino');
        }));
});