'use strict';

delete require.cache[require.resolve('../../build')]
delete require.cache[require.resolve('../../build/lib/highlight')]

const fs       = require('fs').promises;
const fsSync   = require('fs');
const hljs     = require('../../build');
const path     = require('path');
const utility  = require('../utility');

const { getThirdPartyLanguages } = require("../../tools/lib/external_language")

function testAutoDetection(language, detectDir) {
  const languagePath = detectDir || utility.buildPath('detect', language);

  it(`should be detected as ${language}`, async () => {
    const dir = await fs.stat(languagePath);
    dir.isDirectory().should.be.true;

    const dirs = await fs.readdir(languagePath)
    const files = await Promise.all(dirs
      .map(function(example) {
        const filename = path.join(languagePath, example);

        return fs.readFile(filename, 'utf-8');
      }))
    files.forEach(function(content) {
        const expected = language,
              actual   = hljs.highlightAuto(content).language;

        actual.should.equal(expected);
      });
  });
}

describe('hljs.highlightAuto()', () => {
  let languages,thirdPartyLanguages;
  before( async function() {
    thirdPartyLanguages = await getThirdPartyLanguages();

    languages = hljs.listLanguages();
    describe(`hljs.highlightAuto()`, function() {
      languages.filter(hljs.autoDetection).forEach((lang) => {
        testAutoDetection(lang, detectTestDir(lang))
      });
    });

    function detectTestDir(lang) {
      var language = thirdPartyLanguages.find((x) => x.name == lang )
      if (language) {
        let paths = [
          `${language.dir}/test/detect/${language.name}`,
          `${language.dir}/test/detect/`];
        for (let p of paths) {
          try {
            var stat = fsSync.statSync(p)
            if (stat.isDirectory()) { return p }
          } catch { }
        }
        return paths[0] // default to the first directory, long form
      }
    }
  });

  it("adding dynamic tests...", async function() {} ); // this is required to work
});

