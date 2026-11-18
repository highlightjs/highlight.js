'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

// The type parameters after a C# method name were matched with `<[^=]+>`, which
// ran from every `<` to the end of the input looking for a `>` and a `(`, so
// text with many `<` and no `>` took quadratic time.  See #4582.
describe("csharp type parameters backtracking", function() {
  // 256 KB with a `<` every four characters and no `>`.  The budget is loose so
  // a slow machine can't make this flaky; the bug took about 4s.
  const attack = 'a b<'.repeat(64 * 1024);
  const BUDGET_MS = 1000;

  it("should highlight csharp in linear time", function() {
    this.timeout(30000);

    const start = process.hrtime.bigint();
    hljs.highlight(attack, {
      language: 'csharp',
      ignoreIllegals: true
    });
    const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

    elapsed.should.be.below(BUDGET_MS,
      `highlighting ${attack.length} bytes took ${elapsed.toFixed(0)}ms `
      + `(budget ${BUDGET_MS}ms) - the type parameter list likely scans past '<' again`);
  });
});
