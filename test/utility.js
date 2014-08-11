'use strict';

var fs   = require('fs');
var path = require('path');

// Build a path relative to `test/`
function buildPath() {
  var args  = [].slice.call(arguments, 0),
      paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
}
exports.buildPath = buildPath;

exports.languagesList = function() {
  var langPath  = buildPath('language'),
      languages = fs.readdirSync(langPath);

  return languages;
};
