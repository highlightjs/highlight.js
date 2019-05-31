'use strict';

let bluebird = require('bluebird');
let Worker   = require('tiny-worker');
let utility  = require('../utility');
let glob     = bluebird.promisify(require('glob'));

describe('web worker', function() {
  before(function() {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    const filepath = utility.buildPath('..', 'build', 'highlight.*.js');

    return glob(filepath).then(hljsPath => {
      this.worker = new Worker(function() {
        self.onmessage = function(event) {
          if (event.data.action === 'importScript') {
            importScripts(event.data.script);
            postMessage(1);
          } else {
            var result = self.hljs.highlight('javascript', event.data);
            postMessage(result.value);
          }
        };
      });

      const done = new Promise(resolve => this.worker.onmessage = resolve);
      this.worker.postMessage({
        action: 'importScript',
        script: hljsPath[0]
      });
      return done;
    });
  });

  it('should highlight text', function(done) {
    this.worker.onmessage = event => {
      const actual = event.data;

      actual.should.equal(this.expect);

      done();
    };

    this.worker.postMessage(this.text);
  });

  after(function() {
    this.worker.terminate();
  });
});
