'use strict';

const utility = require('../tools/utility');
const path = require('path');
const { readFile } = require('fs').promises;

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

    it("should assign API_REPLACES to the REPLACES dictionary in the highlight.js code", (done) => {
        readFile(path.join(__dirname, "../src/highlight.js"), 'utf-8').then(function(content) {
            "abc".should.containEql("bc");
            content.should.not.containEql("var API_REPLACES = " + JSON.stringify(utility.REPLACES));
            content.replace(utility.regex.apiReplacesFrom, utility.regex.apiReplacesTo)
                .should
                .containEql("var API_REPLACES = " + JSON.stringify(utility.REPLACES));
            done();
        });
    });
});
