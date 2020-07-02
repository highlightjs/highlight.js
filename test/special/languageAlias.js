'use strict';

const utility = require('../utility');

describe('language alias', () => {
  before(() => {
    const testHTML = document.querySelectorAll('#language-alias .hljs');

    this.blocks = [...testHTML].map(x => x.innerHTML);
  });

  it('should highlight as aliased language', () => {
    const filename = utility.buildPath('fixtures', 'expect',
                                       'languagealias.txt'),
          actual   = this.blocks[0];

    return utility.expectedFile(filename, 'utf-8', actual);
  });
});
