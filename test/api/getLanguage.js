'use strict';

let hljs   = require('../../build');
let should = require('should');

describe('.getLanguage()', function() {
  it('should get an existing language', function() {
    const result = hljs.getLanguage('python');

    result.should.be.instanceOf(Object);
  });

  it('should be case insensitive', function() {
    const result = hljs.getLanguage('pYTHOn');

    result.should.be.instanceOf(Object);
  });

  it('should return undefined', function() {
    const result = hljs.getLanguage('-impossible-');

    should.strictEqual(result, undefined);
  });

  it('should not break on undefined', function() {
    const result = hljs.getLanguage(undefined);

    should.strictEqual(result, undefined);
  });
});
