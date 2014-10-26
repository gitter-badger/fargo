module.exports = function(grunt) {

  grunt.config.set('bowercopy', {
    dev: {
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
        'socket.js':            'angular-socket-io/socket.js',
        'ui-bootstrap.js':      'angular-bootstrap/ui-bootstrap-tpls.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');
};
