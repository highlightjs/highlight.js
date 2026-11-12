'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

// While the label and the destination of the markdown LINK variants were both
// unbounded lazy runs, text that looks like the start of a link but never
// finishes one took cubic time: for every start offset the label was grown one
// character at a time, and for every label length the destination was grown
// again.  16 KB of it took 37s.
describe("markdown link backtracking", function() {
  // 16 KB that opens a label and a destination over and over without ever
  // closing one.  The budget is loose so a slow machine can't make this flaky;
  // the bug overshot it by an order of magnitude.
  const attack = '[a](/'.repeat(16 * 1024 / 5);
  const BUDGET_MS = 4000;

  it("should highlight markdown in sub-cubic time", function() {
    this.timeout(60000);

    const start = process.hrtime.bigint();
    hljs.highlight(attack, {
      language: 'markdown',
      ignoreIllegals: true
    });
    const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

    elapsed.should.be.below(BUDGET_MS,
      `highlighting ${attack.length} bytes took ${elapsed.toFixed(0)}ms `
      + `(budget ${BUDGET_MS}ms) - the link label or destination run is likely unbounded again`);
  });

  it("should still mark up every link variant", function() {
    const cases = [
      ['[text](https://example.com)', 'https://example.com'],
      ['[text](/relative/path)', '/relative/path'],
      ['[text](#anchor)', '#anchor'],
      ['[text](mailto:a@b.c)', 'mailto:a@b.c']
    ];

    cases.forEach(([source, link]) => {
      const result = hljs.highlight(source, { language: 'markdown' });
      result.value.should.containEql(`<span class="hljs-link">${link}</span>`);
    });

    hljs.highlight('[text][ref]', { language: 'markdown' })
      .value.should.containEql('<span class="hljs-symbol">ref</span>');
  });
});
