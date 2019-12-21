'use strict';

const Worker   = require('tiny-worker');
const utility  = require('../utility');
const {promisify} = require('util');
const glob     = promisify(require('glob'));

const {newTestCase, defaultCase } = require('./test_case')

describe('web worker', function() {
  before(function() {
    // Will match both `highlight.js` and `highlight.min.js`
    const filepath = utility.buildPath('..', 'build', 'highlight.*js');

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

      actual.should.equal(defaultCase.expect);

      done();
    };

    this.worker.postMessage(defaultCase.code);
  });

  after(function() {
    this.worker.terminate();
  });
});
