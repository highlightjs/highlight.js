import hljs from "../../build/es/index.js";
hljs.debugMode(); // tests run in debug mode so errors are raised

// While the run of type tokens in `FUNCTION_DECLARATION` was unbounded, a long
// line of plain words took quadratic time to highlight: the engine retried the
// function name at every token boundary of the run, at every start offset.
// 32 KB of it took ~19s.  See #4362.
export default function() {
  const LANGUAGES = [
    'c',
    'cpp',
    'arduino' // inherits from cpp
  ];

  // 32 KB of words that never form a function declaration.  The budget is
  // loose so a slow machine can't make this flaky; the bug overshot it by 18x.
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

  it("should still find the function title after many type tokens", function() {
    const declaration = 'static const volatile unsigned long long int * const * restrict fn(void);';

    const result = hljs.highlight(declaration, { language: 'c' });
    result.value.should.containEql('<span class="hljs-title function_">fn</span>');
  });
}
