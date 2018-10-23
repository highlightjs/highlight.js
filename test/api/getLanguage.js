'use strict';

let hljs   = require('../../build');
let should = require('should');

describe('.getLanguage()', function() {
  it('should get an existing language', function() {
    const result = hljs.getLanguage('python');

    result.should.be.instanceOf(Object);
  });

  it('should get an existing language by alias', function() {
    const result = hljs.getLanguage('py');

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

  it('should get the csharp language by c# alias', function() {
    const result = hljs.getLanguage('c#');

    result.should.be.instanceOf(Object);
    result.should.have.property('aliases').with.containEql('csharp');
  });
});
