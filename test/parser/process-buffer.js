'use strict';

const hljs = require('../../build');
const { expect } = require('chai');

describe('processBuffer and emitter', () => {
  // Helper function to create a minimal language definition
  const createLanguage = (name, keywords) => ({
    name,
    case_insensitive: true,
    keywords: keywords
  });

  it('should correctly process and emit simple keywords', () => {
    const testLang = createLanguage('test', 'if else while');
    hljs.registerLanguage('test', () => testLang);

    const result = hljs.highlight('if (x) { while (y) {} } else {}', { language: 'test' });

    expect(result.value).to.equal(
      '<span class="hljs-keyword">if</span> (x) { <span class="hljs-keyword">while</span> (y) {} } <span class="hljs-keyword">else</span> {}'
    );
  });

  it('should handle sublanguages correctly', () => {
    const outerLang = {
      name: 'outer',
      contains: [
        {
          begin: '```js',
          end: '```',
          subLanguage: 'javascript'
        }
      ]
    };
    hljs.registerLanguage('outer', () => outerLang);

    const result = hljs.highlight('Before\n```js\nlet x = 5;\n```\nAfter', { language: 'outer' });

    expect(result.value).to.include('<span class="hljs-keyword">let</span>');
    expect(result.value).to.include('<span class="hljs-variable language_">x</span>');
  });

  it('should preserve newlines in the output', () => {
    const simpleLang = createLanguage('simple', 'keyword');
    hljs.registerLanguage('simple', () => simpleLang);

    const result = hljs.highlight('line1\nkeyword\nline3', { language: 'simple' });

    expect(result.value).to.equal(
      'line1\n<span class="hljs-keyword">keyword</span>\nline3'
    );
  });

  it('should handle empty input correctly', () => {
    const emptyLang = createLanguage('empty', '');
    hljs.registerLanguage('empty', () => emptyLang);

    const result = hljs.highlight('', { language: 'empty' });

    expect(result.value).to.equal('');
  });

  it('should process multiple keywords in the same line', () => {
    const multiKeywordLang = createLanguage('multi', 'one two three');
    hljs.registerLanguage('multi', () => multiKeywordLang);

    const result = hljs.highlight('one two three four five', { language: 'multi' });

    expect(result.value).to.equal(
      '<span class="hljs-keyword">one</span> <span class="hljs-keyword">two</span> <span class="hljs-keyword">three</span> four five'
    );
  });
});