module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
    'bowercopy:dev',
    'jade:dev',
		'ngtemplates:dev',
		'stylus:dev',
		'copy:dev'
	]);
};
