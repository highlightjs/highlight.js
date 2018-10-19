'use strict';

let utility = require('../tools/utility');

describe("minification tools", () => {
    it("should replace API calls with minified names", () => {
        let content = "hljs.COMMENT(); hj.NUMBER_MODE == 0; a = hljs.endRe";
        content.replace(utility.regex.replaces, utility.replaceClassNames).should.equal(
            "hljs.C(); hj.NM == 0; a = hljs.eR"
        );
    });

    it("should replace API calls with minified names and protect declarations", () => {
        let content = "hj.NUMBER_MODE == 0; hljs.COMMENT = 1; a = hljs.endRe";
        content.replace(utility.regex.replaces, utility.replaceClassNames).should.equal(
            "hj.NM == 0; hljs.C = hljs.COMMENT = 1; a = hljs.eR"
        );
    });

    it("should NOT protect non-public member declarations", () => {
        let content = "hljs.endRe = 3;";
        content.replace(utility.regex.replaces, utility.replaceClassNames).should.equal(
            "hljs.eR = 3;"
        );
    });
});