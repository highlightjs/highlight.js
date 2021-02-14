const {promisify} = require('util');
const { JSDOM } = require('jsdom');
const utility  = require('../utility');
const glob     = promisify(require('glob'));
const fs       = require('fs');

// default to the minified library if it was built, otherwise fallback to
// the non-minified
async function findLibrary() {
  const files = ['highlight.min.js', 'highlight.js'];

  for (let file of files) {
    try {
      let path = utility.buildPath('..', 'build', file);
      await fs.promises.stat(path);
      return path;
    } catch {}
  }
  throw new Error("could not find library in `build`");
}

function newTestCase(opts) {
  var test = {};
  test.code = opts.code;
  test.html = opts.html;
  test.expect = opts.expect;
  test.language = opts.language;
  test.html = test.html || `<pre><code class='${test.language}'>${test.code}</code></pre>`;
  test.runner = async function() {
    await buildFakeDOM.bind(this, test)();
    this.hljs.highlightElement(this.block);
    const actual = this.block.innerHTML;
    actual.should.equal(test.expect);
  }
  return test;
}

const buildFakeDOM = async function(data) {
  const filePath = await findLibrary();
  const hljsPath = await glob(filePath);
  const hljsFiles = await hljsPath.map(path => fs.readFileSync(path, 'utf8'));
  const hljsScript = await hljsFiles.map(file => `<script>${file}</script>`).join("");
  const { window} = await new JSDOM(hljsScript + data.html, { runScripts: "dangerously" });

  this.block = window.document.querySelector('pre code');
  this.hljs  = window.hljs;
};

// quotes are not encoded because we're testing the value
// returned by innerHTML where the browser helpfully reencodes
// &quot; to " for us...
const defaultCase = newTestCase({
  code: 'var say = "Hello";',
  language: "javascript",
  expect: '<span class="hljs-keyword">' +
  'var</span> say = <span class="hljs-string">' +
  '"Hello"</span>;'
});

module.exports = { newTestCase, defaultCase, buildFakeDOM, findLibrary };
