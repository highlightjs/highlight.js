'use strict';

const _        = require('lodash');
const bluebird = require('bluebird');
const readFile = bluebird.promisify(require('fs').readFile);
const path     = require('path');

// Build a path relative to `test/`
exports.buildPath = function() {
  const args  = _.slice(arguments, 0),
        paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
};

exports.numberToString = _.method('toString');

exports.expectedFile = (filename, encoding, actual) => {
  return readFile(filename, encoding)
    .then(expected => actual.trim().should.equal(expected.trim()));
};

exports.setupFile = (filename, encoding, that, testHTML) => {
  return readFile(filename, encoding)
    .then(expected => {
      that.expected = expected.trim();
      that.blocks   = _.map(testHTML, 'innerHTML');
    });
};
