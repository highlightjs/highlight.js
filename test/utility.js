'use strict';

var _    = require('lodash');
var path = require('path');

// Build a path relative to `test/`
exports.buildPath = function() {
  var args  = _.slice(arguments, 0),
      paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
};

exports.numberToString = _.method('toString');
