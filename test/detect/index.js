'use strict';

delete require.cache[require.resolve('../../build')]
delete require.cache[require.resolve('../../build/lib/highlight')]

const fs       = require('fs').promises;
const hljs     = require('../../build');
const path     = require('path');
const utility  = require('../utility');
const { getThirdPartyPackages } = require('../../tools/lib/external_language')

function testAutoDetection(language, {detectPath}) {
  const languagePath = detectPath || utility.buildPath('detect', language);

  it(`should be detected as ${language}`, async () => {
    const dir = await fs.stat(languagePath);
    dir.isDirectory().should.be.true;

    const filenames = await fs.readdir(languagePath)
    const filesContent = await Promise.all(filenames
      .map(function(example) {
        const filename = path.join(languagePath, example);

        return fs.readFile(filename, 'utf-8');
      }))
    filesContent.forEach(function(content) {
      const expected = language,
            actual   = hljs.highlightAuto(content).language;

      actual.should.equal(expected);
    });
  });
}

describe('hljs.highlightAuto()', () => {
  before( async function() {
    let thirdPartyPackages = await getThirdPartyPackages();

    let languages = hljs.listLanguages();
    describe(`hljs.highlightAuto()`, function() {
      languages.filter(hljs.autoDetection).forEach((language) => {
        let detectPath = detectTestDir(language);
        testAutoDetection(language, { detectPath });
      });
    });

    // assumes only one package provides the requested module name
    function detectTestDir(name) {
      for (let i = 0; i < thirdPartyPackages.length; ++i) {
        const pkg = thirdPartyPackages[i];
        const idx = pkg.names.indexOf(name);
        if (idx !== -1)
          return pkg.detectTestPaths[idx]
      }
      return null; // test not found
    }
  });

  it("adding dynamic tests...", async function() {} ); // this is required to work
});

