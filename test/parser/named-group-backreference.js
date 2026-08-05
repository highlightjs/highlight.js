'use strict';

const hljs = require('../../build');

describe('named capture group backreference', () => {
  before(() => {
    hljs.registerLanguage('named-backref-test', () => ({
      contains: [
        // A named capture group in an earlier joined rule must be counted so
        // that the backreference in the following rule is renumbered correctly.
        { begin: /(?<n>@)\w+/ },
        { match: /(\w)\1/, scope: 'keyword' },
      ],
    }));
  });

  after(() => {
    hljs.unregisterLanguage('named-backref-test');
  });

  it('renumbers a backreference that follows a named capture group', () => {
    const result = hljs.highlight('hello', { language: 'named-backref-test' }).value;
    result.should.equal('he<span class="hljs-keyword">ll</span>o');
  });
});
