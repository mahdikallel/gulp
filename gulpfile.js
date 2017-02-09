// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json


var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer


//Compiler LESS vers CSS
gulp.task('css1', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(gulp.dest(destination + '/assets/css/'));
});

//Cela nous évite de retrouver des propriétés primordiales perdues en plein milieu d'une très longue règle CSS,
// et nous facilite énormément la relecture et la maintenance dans l'équipe.
gulp.task('css2', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(plugins.csscomb())
    .pipe(gulp.dest(destination + '/assets/css/'));
});

//"gulp-cssbeautify" est un plugin dont l'action sera de faire le ménage dans votre code et de le rendre brillant
// comme un sou neuf, avec les espacements et les indentations parfaitement respectées.
gulp.task('css3', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(gulp.dest(destination + '/assets/css/'));
});


//Ajouter automatiquement les préfixes CSS3
gulp.task('css4', function () {
  return gulp.src(source + '/assets/css/styles.less')
    .pipe(plugins.less())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + '/assets/css/'));
});

//celle de le minifier pour qu'il n'occupe que le poids minimal.

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(destination + '/assets/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/assets/css/'));
});

/*
En vue de pouvoir regrouper ces différentes tâches, nous pourrions créer une tâche générale "build" 
et une autre tâche "prod". La dernière étant prévue pour obtenir des fichiers directement à livrer 
au client final (par exemple avec des CSS minifiés) :
*/

// Tâche "build"
gulp.task('build', ['css1','css2','css3']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche par défaut
gulp.task('default', ['build']);


// Tâche "watch" = je surveille *less
/*
Cette fonction de survellance est directement intégrée à Gulp (pas besoin de plugin) et permettra de détecter 
toute modification de contenu d'un fichier et de lancer automatiquement une tâche prévue, sans avoir besoin de 
systématiquement lancer à la main un gulp ou un gulp css ou un gulp build. Génial !
*/
gulp.task('watch', function () {
  gulp.watch(source + '/assets/css/*.less', ['prod']);
});


// Tâche "js" = uglify + concat
//tous les fichiers JavaScript du dossier  /js/ sont minifiés pour concaténés (regroupés) en un seul fichier 
//global.min.js et placé dans mon dossier de production.
gulp.task('js2', function() {
  return gulp.src(source + '/assets/js/*.js')
    .pipe(uglify())
    .pipe(concat('global.min.js'))
    .pipe(gulp.dest(destination + '/assets/js/'));
});

//tâches d’optimisation d’images
// Tâche "img" = Images optimisées
gulp.task('img', function () {
  return gulp.src(source + '/assets/img/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(destination + '/assets/img'));
});
