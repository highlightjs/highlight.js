'use strict';

const should = require('should');
const hljs   = require('../../build');

describe('.fixmarkup()', () => {
  after(() => {
    hljs.configure({ useBR: false });
  });

  it('should not strip HTML from beginning of strings', () => {
    hljs.configure({ useBR: true });
    const value = '<span class="hljs-attr">"some"</span>: \n <span class="hljs-string">"json"</span>';
    const result = hljs.fixMarkup(value);

    result.should.equal(
      '<span class="hljs-attr">"some"</span>: <br> <span class="hljs-string">"json"</span>'
    );
  });

  it('should not add "undefined" to the beginning of the result (#1452)', () => {
    hljs.configure({ useBR: true });
    const value = '{ <span class="hljs-attr">"some"</span>: \n <span class="hljs-string">"json"</span> }';
    const result = hljs.fixMarkup(value);


    result.should.equal(
      '{ <span class="hljs-attr">"some"</span>: <br> <span class="hljs-string">"json"</span> }'
    );
  });
});
