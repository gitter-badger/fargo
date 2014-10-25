
module.exports = function(grunt) {

  grunt.config.set('jade', {
    dev: {
      options: {
        pretty: true
      },
      files: [{
        expand: true,
        cwd:  'assets',
        src:  'templates/**/*.jade',
        dest: '.tmp',
        ext:  '.html'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
};
