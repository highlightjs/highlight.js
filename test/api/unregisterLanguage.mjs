"use strict";

import hljs from "../../build/es/index.js";

const jQuery = function() {
  return {
    name: "jQuery",
    contains: [{ beginKeywords: "class" }]
  };
};

export default function() {
  describe(".unregisterLanguage()", () => {
    beforeEach(() => {
      hljs.registerLanguage("test", jQuery);
    });

    it("should remove an existing language", () => {
      hljs.unregisterLanguage("test");
      const result = hljs.getLanguage("test");

      should(result).be.undefined();
    });

    it("should remove an existing language and its aliases", () => {
      hljs.registerAliases(["jquery", "jqueryui"], {
        languageName: "test"
      });

      {
        const result = hljs.getLanguage("jquery");
        should(result.name).equal("jQuery");
      }
      hljs.unregisterLanguage("test");
      {
        const result = hljs.getLanguage("jquery");
        should(result).be.undefined();
      }
    });
  });
}