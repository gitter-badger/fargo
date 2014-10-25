module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:devJsJade',
		'sails-linker:devStylesJade'
	]);
};
