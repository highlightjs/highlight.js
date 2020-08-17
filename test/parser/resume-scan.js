const hljs = require('../../build');

describe("bugs", function () {

  describe("resume scan when a match is ignored", () => {
    it("should continue to highlight later matches", () => {
      hljs.highlight('java', 'ImmutablePair.of(Stuff.class, "bar")').value
        .should.equal(
          'ImmutablePair.of(Stuff.class, <span class="hljs-string">&quot;bar&quot;</span>)'
      )
    })
  })
})
