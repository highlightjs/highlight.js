'use strict';

let bluebird = require('bluebird');
let { JSDOM } = require('jsdom');
let utility  = require('../utility');
let glob     = bluebird.promisify(require('glob'));
let fs       = require('fs');

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

  it('should highlight block', function() {
    this.hljs.highlightBlock(this.block);

    const actual = this.block.innerHTML;

    actual.should.equal(this.expect);
  });
});
