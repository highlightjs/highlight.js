import hljs from '#hljs';

import { promises as fs } from 'fs';
import path from 'path';
import * as utility from '../utility.js';
import { getThirdPartyPackages } from '#tools/external_language';

hljs.debugMode(); // tests run in debug mode so errors are raised

function testAutoDetection(language, { detectPath }) {
  const languagePath = detectPath || utility.buildPath('detect', language);

  it(`should be detected as ${language}`, async() => {
    const dir = await fs.stat(languagePath);
    dir.isDirectory().should.be.true();

    const filenames = await fs.readdir(languagePath);
    await Promise.all(filenames
      .map(async function(example) {
        const filename = path.join(languagePath, example);

        const content = await fs.readFile(filename, 'utf-8');
        const detectedLanguage = hljs.highlightAuto(content).language;

        detectedLanguage.should.equal(language,
          `${path.basename(filename)} should be detected as ${language}, but was ${detectedLanguage}`);
      }));
  });
}

describe('hljs.highlightAuto()', () => {
  before(async function() {
    const thirdPartyPackages = await getThirdPartyPackages();

    const languages = hljs.listLanguages();
    describe(`hljs.highlightAuto()`, function() {
      languages.filter(hljs.autoDetection).forEach((language) => {
        const detectPath = detectTestDir(language);
        testAutoDetection(language, { detectPath });
      });
    });

    // assumes only one package provides the requested module name
    function detectTestDir(name) {
      for (let i = 0; i < thirdPartyPackages.length; ++i) {
        const pkg = thirdPartyPackages[i];
        const idx = pkg.names.indexOf(name);
        if (idx !== -1) return pkg.detectTestPaths[idx];
      }
      return null; // test not found
    }
  });

  it("compiling the grammars", async function() {
    const languages = hljs.listLanguages();
    languages.forEach(l => hljs.highlight(l, ""))
  }); // this is also required for the dynamic test generation above to work
});
