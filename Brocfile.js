var compileModules = require('broccoli-es6-module-transpiler');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');

var tests = new Funnel('.', {
    include: [/^tests\//]
});
var libAndTestSource = mergeTrees(['lib', tests]);

var libAndTestCompiled = compileModules(libAndTestSource, {
    formatter: 'bundle',
    output:    'test.js'
});

module.exports = libAndTestCompiled;
