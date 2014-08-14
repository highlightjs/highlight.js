'use strict';

var path = require('path');

// Build a path relative to `test/`
exports.buildPath = function() {
  var args  = [].slice.call(arguments, 0),
      paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
};
