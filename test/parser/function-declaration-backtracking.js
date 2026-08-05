'use strict';

const hljs = require('../../build');
hljs.debugMode(); // tests run in debug mode so errors are raised

// The C/C++ `FUNCTION_DECLARATION` matcher looks for a run of type tokens
// followed by a function name.  That run used to be unbounded, so a long line
// of plain words (which never reaches a function name) made the regex engine
// retry the function name at every token boundary of the run: quadratic in the
// size of the input.  32 KB took ~30s, 64 KB took ~2 minutes.  See #4362.
describe("function declaration backtracking", function() {
  const LANGUAGES = [
    'c',
    'cpp',
    'arduino' // inherits from cpp
  ];

  // 32 KB of words that never form a function declaration.  Highlighting this
  // is a few tens of milliseconds once the run is bounded; the budget is
  // deliberately loose so slow CI machines don't make this flaky, while still
  // being orders of magnitude below the quadratic behavior.
  const attack = 'a '.repeat(16 * 1024);
  const BUDGET_MS = 1000;

  LANGUAGES.forEach((language) => {
    it(`should highlight ${language} in linear time`, function() {
      this.timeout(30000);

      const start = process.hrtime.bigint();
      hljs.highlight(attack, {
        language,
        ignoreIllegals: true
      });
      const elapsed = Number(process.hrtime.bigint() - start) / 1e6;

      elapsed.should.be.below(BUDGET_MS,
        `highlighting ${attack.length} bytes took ${elapsed.toFixed(0)}ms `
        + `(budget ${BUDGET_MS}ms) - the type token run is likely unbounded again`);
    });
  });

  // ...and the declarations we do care about are still recognized, including
  // ones with a healthy pile of qualifiers in front of the name.
  it("should still find the function title after many type tokens", function() {
    const declaration = 'static const volatile unsigned long long int * const * restrict fn(void);';

    const result = hljs.highlight(declaration, { language: 'c' });
    result.value.should.containEql('<span class="hljs-title function_">fn</span>');
  });
});
