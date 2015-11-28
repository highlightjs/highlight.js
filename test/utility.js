'use strict';

var _        = require('lodash');
var bluebird = require('bluebird');
var readFile = bluebird.promisify(require('fs').readFile);
var path     = require('path');

// Build a path relative to `test/`
exports.buildPath = function() {
  var args  = _.slice(arguments, 0),
      paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
};

exports.numberToString = _.method('toString');

exports.expectedFile = function(filename, encoding, actual) {
  return readFile(filename, encoding)
    .then(expected => actual.should.equal(expected));
};

exports.setupFile = function(filename, encoding, that, testHTML) {
  return readFile(filename, encoding)
    .then(expected => {
      that.expected = expected.trim();
      that.blocks   = _.map(testHTML, 'innerHTML');
    })
};
