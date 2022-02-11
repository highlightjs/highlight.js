const hljs = require('../../build');

describe("parser specifics", function () {

  // CONTEXT: https://github.com/highlightjs/highlight.js/pull/2219
  describe("a grammar with look-ahead end matchers", () => {
    it("should match successfully", () => {
      hljs.registerLanguage('test-language', (hljs) => {

        // broken regex from old Fortran ruleset
        const PATTERN = {
          className: "pattern",
          begin: '[A-Z]{3}',
          // followed by at least one space
          end: '\\d{3}(?=\\s+)'
        }

        return {
          contains: [PATTERN]
        };
      });

      hljs.highlight('ABC123 is the secret. XYZ123. End of string: ABC123', {language: 'test-language'}).value
        .should.equal(
        // one full match at beginning, other match begins with XYZ but then never terminates,
        // so the end of the parsing finally closes the span tag
        '<span class="hljs-pattern">ABC123</span> is the secret. <span class="hljs-pattern">XYZ123. End of string: ABC123</span>'
      )
    })
  })
})
