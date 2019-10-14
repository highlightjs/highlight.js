'use strict';

let hljs   = require('../../build');
let should = require('should');

describe('.highlight()', function() {
  it('should ignore common keywords', function() {
    const grammar =function () {
      return {
        keywords: "farmer river weeds and of"
      }
    }
    const code   = "farmer and of river weeds";
    hljs.registerLanguage("test", grammar)
    const result = hljs.highlight('test', code, false, false);

    result.relevance.should.equal(3)
  });
  it ('should not ignored weighted common keywords', function() {
    const grammar =function () {
      return {
        keywords: "farmer river weeds and of|10"
      }
    }
    const code   = "farmer and of river weeds";
    hljs.registerLanguage("test", grammar)
    const result = hljs.highlight('test', code, false, false);

    result.relevance.should.equal(13)
  });
  it ('should not ignored weighted common keywords (if 1 is forced)', function() {
    const grammar = function () {
      return {
        keywords: "farmer river weeds and of|1"
      }
    }
    const code   = "farmer and of river weeds";
    hljs.registerLanguage("test", grammar)
    const result = hljs.highlight('test', code, false, false);

    result.relevance.should.equal(4)
  });
});
