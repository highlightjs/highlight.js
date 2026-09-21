'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

// While the identifier and `(.*)` runs in the LiveScript function and label
// patterns were unbounded, a long word or a long line of `(` took quadratic
// time to highlight: the engine retried the run from every start offset.
// 32 KB of either took several seconds.  See #4529.
describe("livescript function backtracking", function() {
  // 32 KB inputs that never form a function.  The budget is loose so a slow
  // machine can't make this flaky; the bug overshot it several times over.
  const ATTACKS = {
    'a long word': 'a'.repeat(32 * 1024),
    'a long regex-like word': '/' + 'a'.repeat(32 * 1024),
    'a long run of parentheses': '('.repeat(32 * 1024)
  };
  const BUDGET_MS = 1000;

  Object.entries(ATTACKS).forEach(([name, attack]) => {
    it(`should highlight ${name} in linear time`, function() {
      this.timeout(30000);

      const start = process.hrtime.bigint();
      hljs.highlight(attack, {
        language: 'livescript',
        ignoreIllegals: true
      });
      const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

      elapsed.should.be.below(BUDGET_MS,
        `highlighting ${attack.length} bytes took ${elapsed.toFixed(0)}ms `
        + `(budget ${BUDGET_MS}ms) - an identifier or params run is likely unbounded again`);
    });
  });

  it("should still find the function title and params", function() {
    const result = hljs.highlight('add-numbers = (first, second) -> first + second', { language: 'livescript' });
    result.value.should.containEql('<span class="hljs-title">add-numbers</span>');
    result.value.should.containEql('<span class="hljs-params">(first, second)</span>');
  });
});
