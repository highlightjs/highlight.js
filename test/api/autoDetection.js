import hljs from '#hljs';
import should from 'should';

describe('.autoDetection()', () => {
  it('should get an existing language', () => {
    const result = hljs.autoDetection('python');

    result.should.be.instanceOf(Object);
  });

  it('should get an existing language by alias', () => {
    const result = hljs.autoDetection('py');

    result.should.be.instanceOf(Object);
  });

  it('should be case insensitive', () => {
    const result = hljs.autoDetection('pYTHOn');

    result.should.be.instanceOf(Object);
  });

  it('should return undefined', () => {
    const result = hljs.autoDetection('-impossible-');

    should.strictEqual(result, undefined);
  });

  it('should not break on undefined', () => {
    const result = hljs.autoDetection(undefined);

    should.strictEqual(result, undefined);
  });
});
