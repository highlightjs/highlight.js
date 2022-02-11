'use strict';

const { readFile } = require('fs').promises;
const path     = require('path');

// Build a path relative to `test/`
exports.buildPath = function() {
  const args  = [...arguments],
        paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
};

exports.expectedFile = (filename, encoding, actual) => {
  return readFile(filename, encoding)
    .then(expected => actual.trim().should.equal(expected.trim()));
};

exports.setupFile = (filename, encoding, that, testHTML) => {
  return readFile(filename, encoding)
    .then(expected => {
      that.expected = expected.trim();
      that.blocks   = [...testHTML].map(x => x.innerHTML);
    });
};
