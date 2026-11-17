'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

// While the run of key characters in the YAML `KEY` rule was unbounded, a long
// line with no key took quadratic time to highlight: the engine retried the
// key at every word and scanned to the end of the line each time.  192 KB of
// it took ~4s.  See #4582.
describe("yaml key backtracking", function() {
  // 192 KB of words on one line, with no `:` to end a key.  The budget is
  // loose so a slow machine can't make this flaky.
  const attack = 'ab '.repeat(64 * 1024);
  const BUDGET_MS = 1000;

  it("should highlight a long line in linear time", function() {
    this.timeout(30000);

    const start = process.hrtime.bigint();
    hljs.highlight(attack, { language: 'yaml' });
    const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

    elapsed.should.be.below(BUDGET_MS,
      `highlighting ${attack.length} bytes took ${elapsed.toFixed(0)}ms `
      + `(budget ${BUDGET_MS}ms) - the key run is likely unbounded again`);
  });

  // YAML allows an implicit key of at most 1024 characters.
  it("should still highlight a key of the longest length YAML allows", function() {
    const key = 'k'.repeat(1024);

    const result = hljs.highlight(`${key}: value`, { language: 'yaml' });
    result.value.should.containEql(`<span class="hljs-attr">${key}:</span>`);
  });

  it("should not highlight a key longer than YAML allows", function() {
    const key = 'k'.repeat(1025);

    const result = hljs.highlight(`${key}: value`, { language: 'yaml' });
    result.value.should.not.containEql('hljs-attr');
  });
});
