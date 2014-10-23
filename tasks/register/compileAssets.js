module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
    'bowercopy:dev',
		'jst:dev',
		'stylus:dev',
		'copy:dev'
	]);
};
