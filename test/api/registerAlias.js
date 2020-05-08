'use strict';

const hljs   = require('../../build');
const should = require('should');

describe('.registerAlias()', () => {
  it('should get an existing language by alias', () => {
    hljs.registerAlias('jquery', {
      languageName: 'javascript'
    });
    const result = hljs.getLanguage('jquery');

    result.should.be.instanceOf(Object);
  });

  it('should get an existing language by aliases', () => {
    hljs.registerAlias(['jquery', 'jqueryui'], {
      languageName: 'javascript'
    });
    const result = hljs.getLanguage('jquery');

    result.should.be.instanceOf(Object);
  });
});
