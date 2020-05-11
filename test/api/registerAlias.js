'use strict';

const hljs   = require('../../build');
const should = require('should');

describe('.registerAliases()', () => {
  it('should get an existing language by alias', () => {
    hljs.registerAliases('jquery', {
      languageName: 'javascript'
    });
    const result = hljs.getLanguage('jquery');

    result.should.be.instanceOf(Object);
  });

  it('should get an existing language by aliases', () => {
    hljs.registerAliases(['jquery', 'jqueryui'], {
      languageName: 'javascript'
    });
    const result = hljs.getLanguage('jquery');

    result.should.be.instanceOf(Object);
  });
});
