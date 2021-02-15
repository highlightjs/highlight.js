"use strict";

const hljs = require("../../build");

let grammar = function () {
  return {
    contains: [{ beginKeywords: "class" }],
  };
};

describe(".unregisterLanguage()", () => {
  beforeEach(() => {
    hljs.registerLanguage("test", grammar);
  });

  it("should remove an existing language", () => {
    hljs.unregisterLanguage("test");
    const result = hljs.getLanguage("test");

    (result == null).should.be.true();
  });

  it("should remove an existing language and its aliases", () => {
    hljs.registerAliases(["jquery", "jqueryui"], {
      languageName: "test",
    });

    {
        const result = hljs.getLanguage("jquery");
        (result == null).should.be.false();
    }
    hljs.unregisterLanguage("test");
    {
        const result = hljs.getLanguage("jquery");
        (result == null).should.be.true();
    }
  });
});
