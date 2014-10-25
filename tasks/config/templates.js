
module.exports = function(grunt) {

  grunt.config.set('ngtemplates', {
    dev: {
      options: {
        module: 'fargo'
      },
      cwd:  '.tmp/templates',
      src:  '**/*.html',
      dest: '.tmp/public/js/app.templates.js'
    }
  });

  grunt.loadNpmTasks('grunt-angular-templates');
};
