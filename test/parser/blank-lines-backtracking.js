'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

// While the `'use strict'` rule began with `^\s*`, a run of blank lines took
// quadratic time to highlight: `^` matches at the start of every line and
// `\s*` then ran across all the blank lines below it before failing.
// 128 KB of them took ~5s.  See #4582.
describe("blank lines backtracking", function() {
  const LANGUAGES = [
    'javascript',
    'typescript',
    'qml'
  ];

  // 128K empty lines, ended by each character that `^` treats as a line
  // break.  The budget is loose so a slow machine can't make this flaky; the
  // bug overshot it by 5x.
  const LINE_BREAKS = ['\n', '\r', '\u2028', '\u2029'];
  const BUDGET_MS = 1000;

  LANGUAGES.forEach((language) => {
    it(`should highlight ${language} blank lines in linear time`, function() {
      this.timeout(30000);

      LINE_BREAKS.forEach((lineBreak) => {
        const attack = lineBreak.repeat(128 * 1024);
        const start = process.hrtime.bigint();
        hljs.highlight(attack, { language });
        const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

        elapsed.should.be.below(BUDGET_MS,
          `highlighting ${attack.length} lines ended by ${JSON.stringify(lineBreak)} `
          + `took ${elapsed.toFixed(0)}ms (budget ${BUDGET_MS}ms) - a rule likely `
          + `scans across lines again`);
      });
    });
  });

  // `\s*` also accepted a BOM, a non-breaking space or a form feed in front
  // of the directive; narrowing the rule to stay on one line must keep that.
  it("should keep matching a directive after other whitespace on its own line", function() {
    ['\uFEFF', '\u00A0', '\f', '\t', '  '].forEach((space) => {
      const result = hljs.highlight(`${space}'use strict';`, { language: 'javascript' });
      result.value.should.startWith('<span class="hljs-meta">');
    });
  });
});
