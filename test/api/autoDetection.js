'use strict';

let hljs   = require('../../build');
let should = require('should');

describe('.autoDetection()', function() {
  it('should get an existing language', function() {
    const result = hljs.autoDetection('python');

    result.should.be.instanceOf(Object);
  });

  it('should get an existing language by alias', function() {
    const result = hljs.autoDetection('py');

    result.should.be.instanceOf(Object);
  });

  it('should be case insensitive', function() {
    const result = hljs.autoDetection('pYTHOn');

    result.should.be.instanceOf(Object);
  });

  it('should return undefined', function() {
    const result = hljs.autoDetection('-impossible-');

    should.strictEqual(result, undefined);
  });

  it('should not break on undefined', function() {
    const result = hljs.autoDetection(undefined);

    should.strictEqual(result, undefined);
  });
});
