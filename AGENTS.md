# Agent notes (highlight.js)

## AI policy (dogfood)

Project policy: `docs/ai-contributions.md`. For **this** repo, when work was
substantially tool-assisted, include an `Assisted-by` trailer on the commit
and/or PR body (eat our own dogfood):

```text
Assisted-by: <model> (<effort>) [<context>]
```

| Piece | Meaning | Examples |
| --- | --- | --- |
| model | Product / model id | `Grok 4.5`, `Claude Sonnet 4` |
| effort | Reasoning / effort setting if any | `low`, `medium`, `high`, `max` |
| context | Context window or budget if known | `512k`, `200k` |

Examples:

```text
Assisted-by: Grok 4.5 (low) [512k]
Assisted-by: Claude Opus 4 (high) [200k]
```

Omit unknown pieces rather than guessing (`Assisted-by: Copilot` is fine).
Do not claim assistance on commits that were fully human.

## Grammar API preferences

### Prefer `scope` over `className`

`className` is deprecated. Use `scope` (string) for the mode’s overall CSS scope in new or edited grammar code.

```js
// good
{ match: /\bfoo\b/, scope: "keyword" }

// avoid in new code
{ match: /\bfoo\b/, className: "keyword" }
```

### Drop `relevance` when touching a mode

`relevance` on modes is **deprecated**. Do not add new `relevance` fields.

When a PR **touches** a mode that still sets `relevance`, remove `relevance` from that mode (or ask the author to remove it) as part of the change—same “touch it, modernize it” rule as `className` → `scope`.

### Prefer lookarounds over `on:begin` / `on:end` callbacks

When a rule is really “match this, except these cases,” prefer **pure regex** (especially negative lookahead/lookbehind) over `"on:begin"` / `"on:end"` callbacks that call `ignoreMatch()`.

Callbacks run in JS on every candidate match and are harder to optimize; lookarounds stay in the regex engine.

```js
// preferred — exclude statement keywords that look like calls
{
  match: /\b(?!(?:if|for|while|switch)\b)[a-z_][A-Za-z0-9_]*(?=\()/,
  scope: "title.function"
}

// avoid when a lookahead suffices
{
  match: /\b[a-z_][A-Za-z0-9_]*(?=\()/,
  scope: "title.function",
  "on:begin": (m, resp) => {
    if (/^(?:if|for|while|switch)$/.test(m[0])) resp.ignoreMatch();
  }
}
```

Callbacks are still fine when the decision needs sets, multi-match state, paired begin/end checks, or other logic regex cannot express cleanly.

### `scope` vs `beginScope` / `endScope`

These are **not** interchangeable (see `docs/mode-reference.rst`):

| Field | What it scopes |
| --- | --- |
| `scope` (string) | The **whole mode** (content between begin and end, as one region). |
| `beginScope` | **Only the begin match** (string = wrap entire begin; object = per multi-match piece). |
| `endScope` | **Only the end match** (same shapes as `beginScope`). |

Use `beginScope` when the mode continues after the begin (e.g. `end: /$/`, `contains: […]`) and only the opening lexeme(s) should be keyword/punctuation—not the rest of the line.

```js
// begin pieces only; body stays unscoped (except contains)
{
  begin: [/^[ \t]*/, /\bFeature\b/, /:/],
  beginScope: { 2: "keyword", 3: "punctuation" },
  end: /$/,
  contains: [VARIABLE]
}

// wrong here: would treat the entire mode/line as keyword
{
  begin: [/^[ \t]*/, /\bFeature\b/, /:/],
  scope: { 2: "keyword", 3: "punctuation" },
  end: /$/
}
```

**Sugar:** for `match: [ … ]` only (no `end`), an object `scope: { 1: "…", 3: "…" }` is compiled into `beginScope` (`src/lib/ext/multi_class.js` `scopeSugar`). That form is fine for match-only multi-class rules. Prefer explicit `beginScope` when the mode has a real `begin`/`end` pair so intent stays obvious.

String `beginScope: "keyword"` wraps the entire begin lexeme (not multi-index).

### Prefer multi-match for keyword + following token

When a rule is really “keyword/punctuation, then whitespace, then an identifier (or similar)” with different scopes per piece, prefer multi-match over `begin` + `excludeBegin` / `end: /\W/` dances.

```js
// preferred — match-only: object `scope` → beginScope sugar
{
  match: [/\bnew\b/, /\s+/, hljs.IDENT_RE],
  scope: {
    1: "keyword",
    3: "type"
  }
}

// preferred — mode with body after begin: use beginScope
{
  begin: [/\bnew\b/, /\s+/, hljs.IDENT_RE],
  beginScope: {
    1: "keyword",
    3: "type"
  },
  end: /$/,
  contains: [/* ... */]
}

// older style — avoid for new work when multi-match fits
{
  className: "type",
  beginKeywords: "new", // or begin: /new\s+/, excludeBegin: true
  end: /\W/,
  excludeBegin: true,
  excludeEnd: true
}
```

Multi-match:

- Uses `begin: [ ... ]` or `match: [ ... ]` (array of consecutive patterns).
- Per-piece scopes are **1-based** indexes into that array (`beginScope` / `endScope`, or object `scope` sugar on `match`).
- Avoids empty spans and makes keyword vs type/title boundaries explicit.

Same idea applies to “after `:` type” rules, `class`/`enum` titles, etc. See existing usage in `java.js`, `scala.js`, `rust.js`, and `test/api/multiClassMatch.js`.

### Building patterns

- Prefer regex literals or template strings; hljs accepts string patterns without `new RegExp(...)`.
- Prefer `regex.concat(...)` when joining lookarounds and `IDENT_RE`-style fragments.
- Mirror style in nearby grammars (e.g. `src/languages/lib/java.js` number variants use template strings, not `new RegExp`).

## Running tests

Markup and most mocha suites load the compiler output from **`build/`**, not
`src/` directly. After editing a grammar under `src/languages/`, rebuild before
testing or you get `Cannot find module '../build'` / stale results.

```bash
# rebuild one language (fast) then run its markup tests
node tools/build.js -t node rust
ONLY_LANGUAGES=rust npm run test-markup

# full node build (all languages)
node tools/build.js -t node

# full test suite (also needs a prior build)
npm test

# other targeted scripts (see package.json)
npm run test-markup
npm run test-detect
```

Notes:

- `ONLY_LANGUAGES` is a space-separated list of **markup folder names**
  (e.g. `rust`, `bash`), matching `test/markup/<lang>/`.
- Mocha `--grep` often matches poorly here because language suites are nested
  under dynamic `describe`s; prefer `ONLY_LANGUAGES` for markup.
- Markup cases live as pairs: `test/markup/<lang>/<name>.txt` and
  `<name>.expect.txt`. Expect files compare `hljs.highlight(...).value` (trimmed).
- Do not commit `build/` artifacts from local rebuilds unless the project
  explicitly expects it (normally CI builds).

## Style / hygiene

### Trailing whitespace

**Ignore trailing whitespace** (and minor EOF newline nits from `git diff --check`)
unless you are already editing that exact line for a real change. Do not open
cleanup-only commits or block reviews on trailing spaces. Prefer leaving
historical noise alone over drive-by whitespace diffs.
