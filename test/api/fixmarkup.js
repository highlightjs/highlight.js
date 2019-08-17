'use strict';

let should = require('should');
let hljs   = require('../../build');

describe('.fixmarkup()', function() {
  after(function() {
    hljs.configure({ useBR: false })
  })

  it('should not add "undefined" to the beginning of the result (#1452)', function() {
    hljs.configure({ useBR: true })
    const value = '{ <span class="hljs-attr">"some"</span>: \n <span class="hljs-string">"json"</span> }';
    const result = hljs.fixMarkup(value);


    result.should.equal(
      '{ <span class="hljs-attr">"some"</span>: <br> <span class="hljs-string">"json"</span> }'
    );
  });
});
