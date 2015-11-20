'use strict';

var hljs   = require('../../build');
var should = require('should');

describe('.getLanguage', function() {
  it('should get an existing language', function() {
    var result = hljs.getLanguage('python');

    result.should.be.instanceOf(Object);
  });

  it('should be case insensitive', function() {
    var result = hljs.getLanguage('pYTHOn');

    result.should.be.instanceOf(Object);
  });

  it('should return undefined', function() {
    var result = hljs.getLanguage('-impossible-');

    should.strictEqual(result, undefined);
  });

  it('should not break on undefined', function() {
    var result = hljs.getLanguage(undefined);

    should.strictEqual(result, undefined);
  });
});
