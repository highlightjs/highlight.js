'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

// Three rules let a run of whitespace come before the character they need, and
// were retried at every position of that run: csharp's attribute rule and
// ruby's irb result rule began with `^\s*` (`^` matches at the start of every
// line, and `\s*` then ran across all the blank lines below it before failing),
// and bash's command-line flag rule began with `\s+`.  A run of blank lines
// took quadratic time to highlight: 128 KB of them took 8-13s.  See #4582.
describe("blank lines backtracking", function() {
  const LANGUAGES = [
    'bash',
    'csharp',
    'ruby'
  ];

  // 128K empty lines, ended by each character that `^` treats as a line
  // break.  The budget is loose so a slow machine can't make this flaky; the
  // bug overshot it by 8x.
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

  // `\s*` and `\s+` also accepted a BOM, a non-breaking space or a form feed;
  // narrowing the rules must keep that on the rule's own line.
  it("should keep matching after other whitespace on the same line", function() {
    ['\uFEFF', '\u00A0', '\f', '\t', '  '].forEach((space) => {
      hljs.highlight(`${space}[Obsolete]`, { language: 'csharp' }).value
        .should.containEql('<span class="hljs-meta">Obsolete</span>');
      // an irb result line is not highlighted as code, so `nil` stays plain
      hljs.highlight(`${space}=> nil`, { language: 'ruby' }).value
        .should.not.containEql('hljs-literal');
      hljs.highlight(`ls${space}-la`, { language: 'bash' }).value
        .should.containEql('<span class="hljs-attr">-la</span>');
    });
  });
});
