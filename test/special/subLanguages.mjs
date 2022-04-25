'use strict';

import * as utility from '../utility.js';

export default function () {
  before(() => {
    this.block = document.querySelector('#sublanguages');
  });

  it('should highlight XML with PHP and JavaScript', () => {
    const filename = utility.buildPath('fixtures', 'expect',
                                     'sublanguages.txt'),
          actual   = this.block.innerHTML;

    return utility.expectedFile(filename, 'utf-8', actual);
  });
}
