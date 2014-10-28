module.exports = function(grunt) {

  grunt.config.set('bowercopy', {
    js: {
      options: {
        destPrefix: '.tmp/public/js/dependencies'
      },
      files: {
        'angular.js':           'angular/angular.js',
        'angular-cookies.js':   'angular-cookies/angular-cookies.js',
        'angular-sails.js':     'angular-sails/dist/angular-sails.js',
        'angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',
        'lodash.js':            'lodash/dist/lodash.js',
        'restangular.js':       'restangular/dist/restangular.js',
        'ui-bootstrap.js':      'angular-bootstrap/ui-bootstrap-tpls.js',
      }
    },
    fonts: {
      src:  'bootstrap-stylus/fonts/**/*',
      dest: '.tmp/public/fonts'
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');
};
