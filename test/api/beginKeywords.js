import hljs from '#hljs';

let grammar = function() {
  return {
    contains: [
      { beginKeywords: "class" }
    ]
  }
}

let grammarWithFollowupRule = function() {
  return {
    contains: [
      { beginKeywords: "class" },
      { begin: "class", className: "found" }
    ]
  }
}

describe('beginKeywords', () => {
  before( () => {
    hljs.registerLanguage("test", grammar);
    hljs.registerLanguage("has-followup", grammarWithFollowupRule);
  });
  after( () => {
    hljs.unregisterLanguage("test");
    hljs.unregisterLanguage('has-followup');
  });

  it("should allow subsequence matches to still succeed", () => {
    let content = "A.class = self";
    let res = hljs.highlight("has-followup", content);
    res.value.should.equal('A.<span class="hljs-found">class</span> = self');
  });

  it("should ignore a preceeding .", () => {
    let content = "A.class = self";
    let res = hljs.highlight("test", content);
    res.value.should.equal('A.class = self');
  });

  it("should ignore a trailing .", () => {
    let content = "class.config = true";
    let res = hljs.highlight("test", content);
    res.value.should.equal('class.config = true');
  });

  it('should detect keywords', () => {
    let content = "I have a class yes I do.";
    let res = hljs.highlight("test", content);
    res.value.should.equal('I have a <span class="hljs-keyword">class</span> yes I do.');
  });
});
