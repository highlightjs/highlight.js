'use strict';

var bluebird = require('bluebird');
var jsdomEnv = bluebird.promisify(require('jsdom').env);
var utility  = require('../utility');
var glob     = bluebird.promisify(require('glob'));

describe('plain browser', function() {
  before(function() {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    var filepath = utility.buildPath('..', 'build', 'highlight.*.js');

    return glob(filepath)
      .then(hljsPath => jsdomEnv(this.html, hljsPath))
      .then(window => {
        this.block = window.document.querySelector('pre code');
        this.hljs  = window.hljs;
      });
  });

  it('should highlight block', function() {
    this.hljs.highlightBlock(this.block);

    var actual = this.block.innerHTML;

    actual.should.equal(this.expect);
  });
});
