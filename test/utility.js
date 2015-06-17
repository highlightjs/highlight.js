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

exports.handleExpectedFile = _.curry(function(actual, done, err, expected) {
  if(err) return done(err);

  actual.should.equal(expected);
  done();
}, 4);

exports.handleSetup = _.curry(
  function(that, testHTML, done, err, expected) {
    if(err) return done(err);

    that.expected = expected.trim();
    that.blocks   = _.map(testHTML, 'innerHTML');
    done();
  }, 5);
