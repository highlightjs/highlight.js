import { hljs } from "../../build/lib/all.js";

// not quite ready to become a plugin yet, so these hooks
// have been removed and we're skipping this test for now
export default  function() {
  before(function() {
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
    hljs.highlight("", { language: "extension_test" });
    const [first, second] = hljs.getLanguage("extension_test").contains;
    this.first = first;
    this.second = second;
  });

  describe("triggered using a plugin", function() {
    it("before:compileEarly is executed", function() {
      this.first.begin.should.equal("booger");
    });

    it("before:compileLate is executed", function() {
      this.second.begin.should.equal("booger");
    });

    it("should run early extensions first, then late", function() {
      // early rule changes apple to orange
      // late rule change orange to lime
      this.first.lime.should.equal(true);
    });
  });
}
