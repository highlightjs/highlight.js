'use strict';

let bluebird = require('bluebird');
let jsdomEnv = bluebird.promisify(require('jsdom').env);
let utility  = require('../utility');
let glob     = bluebird.promisify(require('glob'));

const text   = `{"<a class="show-popup" data-attr="{&#34;popup-content&#34;:<div class=\&#34;popup-content\&#34;>html value inside data attr</div>&#34;}">key</a>": "value"}`;
const html   = `<pre><code class="javascript">${text}</code></pre>`;
const expect = `{<span class="hljs-string">"</span><a class="show-popup" data-attr="{&quot;popup-content&quot;:<div class=&quot;popup-content&quot;>html value inside data attr</div>&quot;}"><span class="hljs-string">key</span></a><span class="hljs-string">"</span>: <span class="hljs-string">"value"</span>}`;

describe('additional markup inside code block', function() {
  before(function() {
    // Will match both `highlight.pack.js` and `highlight.min.js`
    const filepath = utility.buildPath('..', 'build', 'highlight.*.js');

    return glob(filepath)
      .then(hljsPath => jsdomEnv(html, hljsPath))
      .then(window => {
        this.block = window.document.querySelector('pre code');
        this.hljs  = window.hljs;
      });
  });

  it('should highlight block', function() {
    this.hljs.highlightBlock(this.block);

    const actual = this.block.innerHTML;

    actual.should.equal(expect);
  });
});
