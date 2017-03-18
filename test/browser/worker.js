'use strict';

let bluebird = require('bluebird');
let Worker   = require('tiny-worker');
let utility  = require('../utility');
let glob     = bluebird.promisify(require('glob'));

const text   = 'var say = "Hello";';
const expect = '<span class="hljs-keyword">' +
  'var</span> say = <span class="hljs-string">' +
  '&quot;Hello&quot;</span>;';

describe('web worker', function() {
  before(function(done) {
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

      this.worker.onmessage = () => done();

      this.worker.postMessage({
        action: 'importScript',
        script: hljsPath[0]
      });
    });
  });

  it('should highlight text', function(done) {
    this.worker.onmessage = event => {
      const actual = event.data;

      actual.should.equal(expect);

      done();
    };

    this.worker.postMessage(text);
  });

  after(function() {
    this.worker.terminate();
  });
});
