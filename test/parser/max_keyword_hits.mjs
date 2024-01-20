import { hljs } from "../../build/lib/all.js";

export default function() {
  it("should count a keyword 7 times for relevance, no more", () => {
    hljs.registerLanguage('test-language', (hljs) => {
      return {
        keywords: "bob suzy|2"
      };
    });

    let result = hljs.highlight('bob bob bob bob bob bob bob bob bob bob bob bob bob', { language: 'test-language' });
    result.relevance.should.equal(7);

    result = hljs.highlight('suzy suzy suzy suzy suzy suzy suzy suzy suzy suzy suzy suzy suzy', { language: 'test-language' });
    result.relevance.should.equal(14);

    hljs.unregisterLanguage("test-language");
  });
}
