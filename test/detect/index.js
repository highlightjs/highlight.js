'use strict';

delete require.cache[require.resolve('../../build')]
delete require.cache[require.resolve('../../build/lib/highlight')]

const fs       = require('fs').promises;
const hljs     = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised
const path     = require('path');
const utility  = require('../utility');
const { getThirdPartyLanguages } = require('../../tools/lib/external_language')

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
    let thirdPartyLanguages = await getThirdPartyLanguages();

    let languages = hljs.listLanguages();
    describe(`hljs.highlightAuto()`, function() {
      languages.filter(hljs.autoDetection).forEach((language) => {
        let detectPath = detectTestDir(language);
        testAutoDetection(language, { detectPath });
      });
    });

    function detectTestDir(name) {
      let language = thirdPartyLanguages.find((x) => x.name == name);
      if (language) {
        return language.detectTestPath;
      }
    }
  });

  it("adding dynamic tests...", async function() {} ); // this is required to work
});

