const {promisify} = require('util');
const { JSDOM } = require('jsdom');
const utility  = require('../utility');
const glob     = promisify(require('glob'));
const fs       = require('fs');


function newTestCase(opts) {
  var test = {};
  test.code = opts.code;
  test.html = opts.html;
  test.expect = opts.expect;
  test.language = opts.language;
  test.html = test.html || `<pre><code class='${test.language}'>${test.code}</code></pre>`;
  return test;
}

const buildFakeDOM = async function(data) {
  // Will match both `highlight.pack.js` and `highlight.min.js`
  const filePath = utility.buildPath('..', 'build', 'highlight.*.js');
  const hljsPath = await glob(filePath);
  const hljsFiles = await hljsPath.map(path => fs.readFileSync(path, 'utf8'));
  const hljsScript = await hljsFiles.map(file => `<script>${file}</script>`).join("");
  const { window} = await new JSDOM(hljsScript + data.html, { runScripts: "dangerously" });

  this.block = window.document.querySelector('pre code');
  this.hljs  = window.hljs;
};

const defaultCase = newTestCase({
  code: 'var say = "Hello";',
  language: "javascript",
  expect: '<span class="hljs-keyword">' +
  'var</span> say = <span class="hljs-string">' +
  '"Hello"</span>;'
});

module.exports = { newTestCase, defaultCase, buildFakeDOM };
