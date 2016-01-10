'use strict';

let hljs   = require('../../build');
let should = require('should');

describe('.getLanguage()', function() {
  it('should get an existing language', function() {
    let result = hljs.getLanguage('python');

    result.should.be.instanceOf(Object);
  });

  it('should be case insensitive', function() {
    let result = hljs.getLanguage('pYTHOn');

    result.should.be.instanceOf(Object);
  });

  it('should return undefined', function() {
    let result = hljs.getLanguage('-impossible-');

    should.strictEqual(result, undefined);
  });

  it('should not break on undefined', function() {
    let result = hljs.getLanguage(undefined);

    should.strictEqual(result, undefined);
  });
});
