// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json


var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier � livrer


//Compiler LESS vers CSS
gulp.task('css1', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(gulp.dest(destination + '/assets/css/'));
});

//Cela nous �vite de retrouver des propri�t�s primordiales perdues en plein milieu d'une tr�s longue r�gle CSS,
// et nous facilite �norm�ment la relecture et la maintenance dans l'�quipe.
gulp.task('css2', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(plugins.csscomb())
    .pipe(gulp.dest(destination + '/assets/css/'));
});

//"gulp-cssbeautify" est un plugin dont l'action sera de faire le m�nage dans votre code et de le rendre brillant
// comme un sou neuf, avec les espacements et les indentations parfaitement respect�es.
gulp.task('css3', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(gulp.dest(destination + '/assets/css/'));
});


//Ajouter automatiquement les pr�fixes CSS3
gulp.task('css4', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + '/assets/css/'));
});

//celle de le minifier pour qu'il n'occupe que le poids minimal.

// T�che "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(destination + '/assets/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/assets/css/'));
});

/*
En vue de pouvoir regrouper ces diff�rentes t�ches, nous pourrions cr�er une t�che g�n�rale "build" 
et une autre t�che "prod". La derni�re �tant pr�vue pour obtenir des fichiers directement � livrer 
au client final (par exemple avec des CSS minifi�s) :
*/

// T�che "build"
gulp.task('build', ['css1','css2','css3']);

// T�che "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// T�che par d�faut
gulp.task('default', ['build']);


// T�che "watch" = je surveille *less
/*
Cette fonction de survellance est directement int�gr�e � Gulp (pas besoin de plugin) et permettra de d�tecter 
toute modification de contenu d'un fichier et de lancer automatiquement une t�che pr�vue, sans avoir besoin de 
syst�matiquement lancer � la main un gulp ou un gulp css ou un gulp build. G�nial !
*/
gulp.task('watch', function () {
  gulp.watch(source + '/assets/css/*.less', ['prod']);
});


// T�che "js" = uglify + concat
//tous les fichiers JavaScript du dossier  /js/ sont minifi�s pour concat�n�s (regroup�s) en un seul fichier 
//global.min.js et plac� dans mon dossier de production.
gulp.task('js2', function() {
  return gulp.src(source + '/assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('global.min.js'))
    .pipe(gulp.dest(destination + '/assets/js/'));
});

//t�ches d�optimisation d�images
// T�che "img" = Images optimis�es
gulp.task('img', function () {
  return gulp.src(source + '/assets/img/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(destination + '/assets/img'));
});
