'use strict';

const utility  = require('../utility');
const fs = require("fs").promises;

// default to the minified library if it was built, otherwise fallback to
// the non-minified
async function findLibrary() {
  const files = ['highlight.min.js', 'highlight.js']

  for (let file of files) {
    try {
      let path = utility.buildPath('..', 'build', file);
      await fs.stat(path);
      return path;
    } catch {}
  }
  throw "could not find library in `build`"
}

describe('browser build', function() {
  before(async function() {
    this.hljsPath = await findLibrary();
    this.text   = 'var say = "Hello";';
    this.html   = `<pre><code class="javascript">${this.text}</code></pre>`;
    this.expect = '<span class="hljs-keyword">' +
                  'var</span> say = <span class="hljs-string">' +
                  '"Hello"</span>;';
  });

  require('./plain');
  require('./worker');
});
