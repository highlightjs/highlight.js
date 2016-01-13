'use strict';

let _        = require('lodash');
let bluebird = require('bluebird');
let fs       = bluebird.promisifyAll(require('fs'));
let glob     = require('glob');
let hljs     = require('../../build');
let path     = require('path');
let utility  = require('../utility');

function testLanguage(language) {
  describe(language, function() {
    const filePath  = utility.buildPath('markup', language, '*.expect.txt'),
          filenames = glob.sync(filePath);

    _.each(filenames, function(filename) {
      const testName   = path.basename(filename, '.expect.txt'),
            sourceName = filename.replace(/\.expect/, '');

      it(`should markup ${testName}`, function(done) {
        const sourceFile   = fs.readFileAsync(sourceName, 'utf-8'),
              expectedFile = fs.readFileAsync(filename, 'utf-8');

        bluebird.join(sourceFile, expectedFile, function(source, expected) {
          const actual = hljs.highlight(language, source).value;

          actual.trim().should.equal(expected.trim());
          done();
        });
      });
    });
  });
}

describe('hljs.highlight()', function() {
  let markupPath = utility.buildPath('markup');

  return fs.readdirAsync(markupPath).each(testLanguage);
});
