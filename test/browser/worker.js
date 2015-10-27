'use strict';

var Worker  = require('webworker-threads').Worker;
var utility = require('../utility');
var glob    = require('glob');

describe('in worker', function() {
  before(function(done) {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    var hljsPath = glob.sync(utility.buildPath('..', 'build', 'highlight.*.js'));

    this.worker = new Worker(function () {
      self.onmessage = function (event) {
        if (event.data.action === 'importScript') {
          importScripts(event.data.script);
          postMessage(1);
        } else {
          var result = hljs.highlightAuto(event.data);
          postMessage(result.value);
        }
      };
    });

    this.worker.onmessage = function () {
      done();
    };

    this.worker.postMessage({
      action: 'importScript',
      script: hljsPath[0]
    });
  });

  it('should works', function(done) {
    this.worker.onmessage = function (event) {
      var actual = event.data;
      actual.should.equal(
        '<span class="hljs-variable"><span class="hljs-keyword">var</span> say</span> = <span class="hljs-string">"Hello"</span>;' +
        '<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Car</span> </span>{}'
      );
      done();
    };

    this.worker.postMessage(
      'var say = "Hello";' +
      'class Car {}'
    );
  });

  after(function () {
    this.worker.terminate();
  });
});
