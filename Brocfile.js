var compileModules = require('broccoli-es6-module-transpiler');
var mergeTrees = require('broccoli-merge-trees');

var libAndTests = compileModules(mergeTrees(['lib', 'tests']), {
	formatter: 'bundle',
	output:    'test.js'
});

module.exports = libAndTests;
