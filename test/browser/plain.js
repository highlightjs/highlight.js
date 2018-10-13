'use strict';
const util = require('util');
const { JSDOM } = require('jsdom');
const utility = require('../utility');
const glob = util.promisify(require('glob'));
const readFile = util.promisify(require('fs').readFile);

describe('plain browser', function () {

  before(async function () {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    const filepath = utility.buildPath('..', 'build', 'highlight.*.js');
    const [hljsPath] = await glob(filepath);
    const file = await readFile(hljsPath, 'utf-8');
    const html = `<script>${file}</script>` + this.html;
    const { window } = new JSDOM(html, {
      resources: "usable",
      runScripts: "dangerously",
    });
    this.block = window.document.querySelector('pre code');
    this.hljs = window.hljs;
  });

  it('should highlight block', function () {
    this.hljs.highlightBlock(this.block);

    const actual = this.block.innerHTML;

    actual.should.equal(this.expect);
  });
});
