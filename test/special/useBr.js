import { document } from './document.js'
import * as utility from '../utility.js';

describe('use br', () => {
  before(() => {
    const filename = utility.buildPath('fixtures', 'expect', 'useBr.txt'),
          testHTML = document.querySelectorAll('#use-br .hljs');

    return utility.setupFile(filename, 'utf-8', this, testHTML);
  });

  it('should respect <br> tags', () => {
    const actual = this.blocks[0];

    actual.should.equal(this.expected);
  });

  it('should ignore literal new lines', () => {
    const actual = this.blocks[1];

    actual.should.equal(this.expected);
  });

  it('should recognize xml-style <br/>', () => {
    const actual = this.blocks[2];

    actual.should.equal(this.expected);
  });
});
