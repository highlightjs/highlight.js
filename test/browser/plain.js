'use strict';

let bluebird = require('bluebird');
let jsdomEnv = bluebird.promisify(require('jsdom').env);
let utility  = require('../utility');
let glob     = bluebird.promisify(require('glob'));

describe('plain browser', function() {
  before(function() {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    const filepath = utility.buildPath('..', 'build', 'highlight.*.js');

    return glob(filepath)
      .then(hljsPath => jsdomEnv(this.html, hljsPath))
      .then(window => {
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
