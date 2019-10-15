'use strict';

let hljs   = require('../../build');

describe('computing the relevance score of a language', function() {
  it('should ignore common keywords', function() {
    const grammar =function () {
      return {
        keywords:
          "farmer river weeds" +
          " and of" // keywords that happen to also be common
      }
    }
    const code   = "farmer and of river weeds";
    hljs.registerLanguage("test", grammar)
    const result = hljs.highlight('test', code, false, false);

    result.relevance.should.equal(3)
  });
  it ('should not ignore weighted common keywords', function() {
    const grammar =function () {
      return {
        keywords:
          "farmer river weeds" +
          " and of|10" // keywords that happen to also be common
      }
    }
    const code   = "farmer and of river weeds";
    hljs.registerLanguage("test", grammar)
    const result = hljs.highlight('test', code, false, false);

    result.relevance.should.equal(13)
  });
  it ('should not ignore weighted common keywords (if 1 is forced)', function() {
    const grammar = function () {
      return {
        keywords:
          "farmer river weeds" +
          " and of|1" // keywords that happen to also be common
      }
    }
    const code   = "farmer and of river weeds";
    hljs.registerLanguage("test", grammar)
    const result = hljs.highlight('test', code, false, false);

    result.relevance.should.equal(4)
  });
});
