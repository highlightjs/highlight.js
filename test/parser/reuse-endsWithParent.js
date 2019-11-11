const hljs = require('../../build');

describe("bugs", function () {

  describe("modes containing 'endsWithParent'", () => {
    it("should be allowed to be reused", () => {
      hljs.registerLanguage('test-language', (hljs) => {

        const TAG_CONTENTS = {className: 'name', begin: /\w+/, starts: {endsWithParent: true}};

        const PAREN_TAG = {className: 'tag', begin: /\(/, end: /\)/, contains: [TAG_CONTENTS]};
        const SQUARE_BRACKET_TAG = {className: 'tag', begin: /\[/, end: /\]/, contains: [TAG_CONTENTS]};

        return {
          contains: [PAREN_TAG, SQUARE_BRACKET_TAG]
        };
      });

      hljs.highlight('test-language', '(abc 123) [abc 123] (abc 123)').value
        .should.equal(
        '<span class="hljs-tag">(<span class="hljs-name">abc</span> 123)</span> ' +
        '<span class="hljs-tag">[<span class="hljs-name">abc</span> 123]</span> ' +
        '<span class="hljs-tag">(<span class="hljs-name">abc</span> 123)</span>'
      )
    })
  })
})
