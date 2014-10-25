module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
    'jade:dev',
    'ngtemplates:dev',
		'stylus:dev',
		'sync:dev'
	]);
};
