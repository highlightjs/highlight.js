'use strict';

var bluebird = require('bluebird');
var fs       = require('fs');
var path     = require('path');
var jsdom    = require('jsdom');
var utility  = require('../utility');
var glob     = bluebird.promisify(require('glob'));

describe('in plain browser', function() {
  before(function(done) {
    var that = this;
    var html = '<pre><code>var say = "Hello";class Car {}</code></pre>';

    // Will match both `highlight.pack.js` and `highlight.min.js`
    var filepath = utility.buildPath('..', 'build', 'highlight.*.js');

    glob(filepath)
      .then(function(hljsPath) {
        return bluebird.fromNode(function(callback) {
          jsdom.env(html, [hljsPath[0]], callback);
        });
      })
      .then(function(window) {
        that.block = window.document.querySelector('pre code');
        that.hljs  = window.hljs;
      })
      .then(function() { done(); },
            function(error) { done(error); });
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
