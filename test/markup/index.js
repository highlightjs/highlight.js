'use strict';

const _        = require('lodash');
const fs       = require('fs').promises;
const glob     = require('glob');
const hljs     = require('../../build');
const path     = require('path');
const utility  = require('../utility');

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

describe('hljs.highlight()', async () => {
  // TODO: why?
  // ./node_modules/.bin/mocha test/markup
  it("needs this or it can't be run stand-alone", function() {} );

  const markupPath = utility.buildPath('markup');

  const languages = await fs.readdir(markupPath)
  return languages.forEach(testLanguage);
});
