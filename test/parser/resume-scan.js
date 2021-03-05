'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

describe("bugs", function() {
  describe("resume scan when a match is ignored", () => {
    it("should continue to highlight later matches", () => {
      const result = hljs.highlight('java', 'ImmutablePair.of(Stuff.class, "bar")');
      result.value.should.equal(
        'ImmutablePair.of(Stuff.class, <span class="hljs-string">&quot;bar&quot;</span>)'
      );
    });
    // previously the match rule was resumed but it would scan ahead too far and ignore
    // later matches that matched the PRIOR rules... this is because when we "skip" (ignore) a
    // rule we really only want to skip searching for THAT rule at that same location, we
    // do not want to stop searching for ALL the prior rules at that location...
    it("BUT should not skip ahead too far", () => {
      const result = hljs.highlight('java', 'ImmutablePair.of(Stuff.class, "bar");\n23');
      result.value.should.equal(
        'ImmutablePair.of(Stuff.class, <span class="hljs-string">&quot;bar&quot;</span>);\n' +
        '<span class="hljs-number">23</span>'
      );
    });
  });
});
