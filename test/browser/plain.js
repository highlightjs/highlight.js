'use strict';

const { JSDOM } = require('jsdom');
const utility  = require('../utility');
const {promisify} = require('util');
const glob     = promisify(require('glob'));
const fs       = require('fs');

describe('plain browser', function() {
  before(function() {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    const filepath = utility.buildPath('..', 'build', 'highlight.*.js');

    return glob(filepath)
      .then(hljsPath => hljsPath.map(path => fs.readFileSync(path, 'utf8')))
      .then(hljsFiles => hljsFiles.map(file => `<script>${file}</script>`).join(""))
      .then(hljsScript => new JSDOM(hljsScript + this.html, { runScripts: "dangerously" }))
      .then(({ window }) => {
        this.block = window.document.querySelector('pre code');
        this.hljs  = window.hljs;
      });
  });

  it('should return relevance key', function() {
    var out = this.hljs.highlight("javascript","");
    out.relevance.should.equal(0);
  })

  it('should highlight block', function() {
    this.hljs.highlightBlock(this.block);

    const actual = this.block.innerHTML;

    actual.should.equal(this.expect);
  });
});
