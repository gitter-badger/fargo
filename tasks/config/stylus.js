
module.exports = function(grunt) {

  grunt.config.set('stylus', {
    dev: {
      files: {
        '.tmp/public/styles/styles.css': 'assets/styles/importer.styl' // 1:1 compile
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
};
