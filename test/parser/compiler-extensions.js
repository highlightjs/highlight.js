const hljs = require('../../build');

describe("compiler extensions", function() {
  describe("triggered using a plugin", () => {
    hljs.debugMode();
    hljs.registerLanguage("extension_test", function(hljs) {
      return {
        name: "test",
        contains: [
          { earlyWantsToBeBegin: "booger", apple: true },
          { lateWantsToBeBegin: "booger" }
        ]
      };
    });
    const plugin = {
      "before:compileEarly": (mode, parent) => {
        if (mode.earlyWantsToBeBegin) mode.begin = mode.earlyWantsToBeBegin;
        if (mode.apple) mode.orange = true;
      },
      "before:compileLate": (mode, parent) => {
        if (mode.lateWantsToBeBegin) mode.begin = mode.lateWantsToBeBegin;
        if (mode.orange) mode.lime = true;
      }
    };

    hljs.addPlugin(plugin);
    // stub highlight to make sure the language gets compiled
    // since we have no API point to make that happen
    hljs.highlight("extension_test", "");

    const [first, second] = hljs.getLanguage("extension_test").contains;

    it("before:compileEarly is executed", () => {
      first.begin.should.equal("booger");
    });

    it("before:compileLate is executed", () => {
      second.begin.should.equal("booger");
    });

    it("should run early extensions first, then late", () => {
      // early rule changes apple to orange
      // late rule change orange to lime
      first.lime.should.equal(true);
    });
  });
});
