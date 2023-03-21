'use strict';

import _fs from "fs"
const fs = _fs.promises

import glob from 'glob';
import path from 'path';
import * as utility from '../utility.js';
import { hljs } from "../../build/lib/all.js";

hljs.debugMode();

import { getThirdPartyPackages } from "../../tools/lib/external_language.js"

function testLanguage(language, {testDir}) {
  describe(language, function() {
    const where = testDir ?
      path.join(testDir, '*.expect.txt') :
      utility.buildPath('markup', language, '*.expect.txt');
    const filePath = where;
    const filenames = glob.sync(filePath, {windowsPathsNoEscape: true});

    filenames.forEach(function(filename) {
      const testName = path.basename(filename, '.expect.txt');
      const sourceName = filename.replace(/\.expect/, '');

      it(`should markup ${testName}`, function(done) {
        const sourceFile = fs.readFile(sourceName, 'utf-8');
        const expectedFile = fs.readFile(filename, 'utf-8');

        Promise.all([sourceFile, expectedFile]).then(function([source, expected]) {
          const actual = hljs.highlight(source, { language }).value;

          // Uncomment this for major changes that rewrite the test expectations
          // which will then need to be manually compared by hand of course
          // require('fs').writeFileSync(filename, actual);

          actual.trim().should.equal(expected.trim());
          done();
        }).catch(function(err) { return done(err) });
      });
    });
  });
}

describe('highlight() markup', async() => {
  before(async function() {
    const markupPath = utility.buildPath('markup');

    if (!process.env.ONLY_EXTRA) {
      let languages = null;
      if (process.env.ONLY_LANGUAGES) {
        languages = process.env.ONLY_LANGUAGES.split(" ");
      } else {
        languages = await fs.readdir(markupPath);
      }
      languages.forEach(testLanguage);
    }

    if (!process.env.ONLY_LANGUAGES) {
      const thirdPartyPackages = await getThirdPartyPackages();
      thirdPartyPackages.forEach(
        (pkg) => pkg.names.forEach(
          (name, idx) => testLanguage(name, { testDir: pkg.markupTestPaths[idx] })
        )
      );
    }
  });

  it("adding dynamic tests...", async function() {}); // this is required to work
});
