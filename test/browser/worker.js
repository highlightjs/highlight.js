'use strict';

var bluebird = require('bluebird');
var Worker   = require('tiny-worker');
var utility  = require('../utility');
var glob     = bluebird.promisify(require('glob'));

describe('web worker', function() {
  before(function(done) {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    var filepath = utility.buildPath('..', 'build', 'highlight.*.js');

    return glob(filepath).then(hljsPath => {
      this.worker = new Worker(function() {
        self.onmessage = function(event) {
          if (event.data.action === 'importScript') {
            importScripts(event.data.script);
            postMessage(1);
          } else {
            var result = self.hljs.highlightAuto(event.data);
            postMessage(result.value);
          }
        };
      });

      this.worker.onmessage = () => done();

      this.worker.postMessage({
        action: 'importScript',
        script: hljsPath[0]
      });
    });
  });

  it('should highlight text', function(done) {
    this.worker.onmessage = event => {
      var actual = event.data;

      actual.should.equal(this.expect);

      done();
    };

    this.worker.postMessage(this.text);
  });

  after(function() {
    this.worker.terminate();
  });
});
