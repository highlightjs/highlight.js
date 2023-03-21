'use strict';

import { hljs } from "../../build/lib/all.js";

export default function() {
  describe('computing the relevance score of a language', () => {
    it('should ignore common keywords', () => {
      const grammar =function () {
        return {
          keywords:
            "farmer river weeds" +
            " and of" // keywords that happen to also be common
        }
      }
      const code   = "farmer and of river weeds";
      hljs.registerLanguage("test", grammar)
      const result = hljs.highlight(code, { language: 'test' });

      result.relevance.should.equal(3)
    });
    it ('should not ignore weighted common keywords', () => {
      const grammar =function () {
        return {
          keywords:
            "farmer river weeds" +
            " and of|10" // keywords that happen to also be common
        }
      }
      const code   = "farmer and of river weeds";
      hljs.registerLanguage("test", grammar)
      const result = hljs.highlight(code, { language: 'test' });

      result.relevance.should.equal(13)
    });
    it ('should not ignore weighted common keywords (if 1 is forced)', () => {
      const grammar = function () {
        return {
          keywords:
            "farmer river weeds" +
            " and of|1" // keywords that happen to also be common
        }
      }
      const code   = "farmer and of river weeds";
      hljs.registerLanguage("test", grammar)
      const result = hljs.highlight(code, { language: 'test' });

      result.relevance.should.equal(4)
    });
  });
}