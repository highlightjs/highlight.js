'use strict';

let _        = require('lodash');
let fs       = require('fs').promises
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
        const sourceFile   = fs.readFile(sourceName, 'utf-8'),
              expectedFile = fs.readFile(filename, 'utf-8');

        Promise.all([sourceFile, expectedFile]).then(function([source, expected]) {
          const actual = hljs.highlight(language, source).value;

          actual.trim().should.equal(expected.trim());
          done();
        }).catch(function(err) { return done(err) });
      });
    });
  });
}

describe('hljs.highlight()', function() {
  let markupPath = utility.buildPath('markup');

  return fs.readdir(markupPath).then((list) => list.forEach(testLanguage));
});
