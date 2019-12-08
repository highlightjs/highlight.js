'use strict';

const { JSDOM } = require('jsdom');
const utility  = require('../utility');
const {promisify} = require('util');
const glob     = promisify(require('glob'));
const fs       = require('fs');

const buildFakeDOM = async function() {
  // Will match both `highlight.pack.js` and `highlight.min.js`
  const filePath = utility.buildPath('..', 'build', 'highlight.*.js');
  const hljsPath = await glob(filePath)
  const hljsFiles = await hljsPath.map(path => fs.readFileSync(path, 'utf8'))
  const hljsScript = await hljsFiles.map(file => `<script>${file}</script>`).join("")
  const { window} = await new JSDOM(hljsScript + this.html, { runScripts: "dangerously" })

  this.block = window.document.querySelector('pre code');
  this.hljs  = window.hljs;
};

class ContentAdder {
  constructor(params) {
    this.content = params.content
  }
  'before:highlightBlock'({block,language}) {
    block.innerHTML += this.content;
  }
}

describe('before:highlightBlock', function() {
  it('can modify block content before highlight', async function() {
    this.text = "This is the original content."
    this.html = `<pre><code class="javascript">${this.text}</code></pre>`;
    await buildFakeDOM.bind(this)();

    this.hljs.addPlugin({
      'before:highlightBlock': ({block, language}) => {
        language.should.equal("javascript")
        block.innerHTML = "var a;"
      }
    });

    this.hljs.highlightBlock(this.block);
    const actual = this.block.innerHTML;
    actual.should.equal(
      `<span class="hljs-keyword">var</span> a;`);
  });

  it("supports class based plugins", async function() {
    this.text = "var b";
    this.html = `<pre><code class="javascript">${this.text}</code></pre>`;
    await buildFakeDOM.bind(this)();

    this.hljs.addPlugin(new ContentAdder({content:" = 5;"}))
    this.hljs.highlightBlock(this.block);
    const actual = this.block.innerHTML;
    actual.should.equal(
      `<span class="hljs-keyword">var</span> b = <span class="hljs-number">5</span>;`);
  })
})

describe('after:highlightBlock', function() {
  it('receives result data', async function() {
    await buildFakeDOM.bind(this)();

    var pluginCalled = 0;

    this.hljs.addPlugin({
      'after:highlightBlock': ({block, result}) => {
        result.language.should.equal("javascript")
        result.relevance.should.above(0)
        pluginCalled += 1;
      }
    });

    this.hljs.highlightBlock(this.block);
    this.hljs.highlightBlock(this.block);
    pluginCalled.should.equal(2);
  });
})
