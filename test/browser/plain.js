'use strict';

var bluebird = require('bluebird');
var jsdomEnv = bluebird.promisify(require('jsdom').env);
var utility  = require('../utility');
var glob     = bluebird.promisify(require('glob'));

describe('in plain browser', function() {
  before(function() {
    var html = '<pre><code>var say = "Hello";class Car {}</code></pre>';

    // Will match both `highlight.pack.js` and `highlight.min.js`
    var filepath = utility.buildPath('..', 'build', 'highlight.*.js');

    return glob(filepath)
      .then(hljsPath => jsdomEnv(html, hljsPath))
      .then((window) => {
        this.block = window.document.querySelector('pre code');
        this.hljs  = window.hljs;
      });
  });

  it('should works', function() {
    this.hljs.highlightBlock(this.block);

    var actual = this.block.innerHTML;

    actual.should.equal(
      '<span class="hljs-variable"><span class="hljs-keyword">var</span> say</span> = <span class="hljs-string">"Hello"</span>;' +
      '<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{}'
    );
  });
});
