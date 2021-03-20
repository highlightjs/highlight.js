const hljs = require('../../build');

describe("parser/should not destroy data", function () {

  // CONTEXT: https://github.com/highlightjs/highlight.js/pull/2219
  describe("a grammar with a mode that makes a 0 width match", () => {
    it("should instead count it as a 1 character match", () => {
      hljs.safeMode();
      hljs.registerLanguage('test-language', (hljs) => {

        // broken regex from old Fortran ruleset
        const NUMBER = {
          className: "number",
          begin: '(?=\\b|\\+|-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?',
        }

        return {
          contains: [NUMBER]
        };
      });

      hljs.highlight('The number is 123_longint yes.', {language: 'test-language' }).value
        .should.equal(
          // The whole number isn't highlighted (the rule doesn't handle the _type)
          // But the key thing is the "1" is registered as a match for the rule
          // instead of disappearing from the output completely, which is what
          // would happen previously.
          'The number is <span class="hljs-number">1</span>23_longint yes.'
          // Incorrect prior output:
          // 'The number is <span class="hljs-number"></span>23_longint yes.'
        );
      hljs.debugMode();
      should(() => {
        hljs.highlight('The number is 123_longint yes.', {language: 'test-language'}).value
       }).throw(Error, {
         message: "0 width match regex",
         languageName: "test-language"})
    })
  })
})
