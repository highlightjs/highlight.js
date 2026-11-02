'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

// While the Bash function header could start mid-word, a long word took
// quadratic time to highlight: the engine retried the name from every
// character while looking for `() {`.  64 KB took a few seconds.  See #4529.
describe("bash function backtracking", function() {
  // 64 KB that never forms a function header.  32 KB stayed under a second
  // on a fast machine, so it would not fail the old pattern.  The budget is
  // loose so a slow machine cannot make the fixed grammar flaky.
  const word = 'a'.repeat(64 * 1024);
  const CASES = {
    'a long word': word,
    'a long word followed by parentheses': word + '()'
  };
  const BUDGET_MS = 1000;

  Object.entries(CASES).forEach(([name, source]) => {
    it(`should highlight ${name} in linear time`, function() {
      this.timeout(30000);

      const start = process.hrtime.bigint();
      hljs.highlight(source, {
        language: 'bash',
        ignoreIllegals: true
      });
      const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

      elapsed.should.be.below(BUDGET_MS,
        `highlighting ${source.length} bytes took ${elapsed.toFixed(0)}ms `
        + `(budget ${BUDGET_MS}ms) - the function header is likely unanchored again`);
    });
  });

  it("should still find the function title", function() {
    const result = hljs.highlight('echo hello; my_func() { echo hi; }', { language: 'bash' });
    result.value.should.containEql('<span class="hljs-title">my_func</span>');
  });
});
