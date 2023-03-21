'use strict';

import { readFile } from 'fs/promises';
import * as path from 'path';

const __dirname = "test/";

// const { readFile } = require('fs').promises;
// const path     = require('path');

// Build a path relative to `test/`
const buildPath = function() {
  const args  = [...arguments],
        paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
};

const expectedFile = (filename, encoding, actual) => {
  return readFile(filename, encoding)
    .then(expected => actual.trim().should.equal(expected.trim()));
};

const setupFile = (filename, encoding, that, testHTML) => {
  return readFile(filename, encoding)
    .then(expected => {
      that.expected = expected.trim();
      that.blocks   = [...testHTML].map(x => x.innerHTML);
    });
};

export { buildPath, expectedFile, setupFile };