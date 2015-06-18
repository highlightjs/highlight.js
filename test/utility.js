'use strict';

var _    = require('lodash');
var fs   = require('fs');
var path = require('path');

// Build a path relative to `test/`
exports.buildPath = function() {
  var args  = _.slice(arguments, 0),
      paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
};

exports.numberToString = _.method('toString');

exports.handleExpectedFile = _.curry(function(actual, done, err, expected) {
  if(err) return done(err);

  actual.should.equal(expected);
  done();
}, 4);

exports.setupFile = function(filename, encoding, that, testHTML, done) {
  fs.readFile(filename, encoding, function(error, expected) {
    if(error) return done(error);

    that.expected = expected.trim();
    that.blocks   = _.map(testHTML, 'innerHTML');
    done();
  });
};
