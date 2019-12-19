'use strict';

const _        = require('lodash');
const fs       = require('fs').promises;
const glob     = require('glob');
const hljs     = require('../../build');
const path     = require('path');
const utility  = require('../utility');

const { getThirdPartyLanguages } = require("../../tools/lib/external_language")

function testLanguage(language, {testDir}) {
  describe(language, function() {
    const where = testDir ?
      path.join(testDir, '*.expect.txt') :
      utility.buildPath('markup', language, '*.expect.txt')
    const filePath  = where,
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

describe('highlight() markup', async () => {
  let languages,thirdPartyLanguages;
  before(async function() {
    const markupPath = utility.buildPath('markup');

    if (!process.env.EXTRA) {
      languages = await fs.readdir(markupPath)
      languages.forEach(testLanguage);
    }

    thirdPartyLanguages = await getThirdPartyLanguages();
    return thirdPartyLanguages.forEach((l) => testLanguage(l.name,{testDir: l.markupTestPath}));
  })

  it("adding dynamic tests...", async function() {} ); // this is required to work
});
