module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuildProd', [
		'sails-linker:prodJsRelativeJade',
		'sails-linker:prodStylesRelativeJade'
	]);
};
