## Version 10 Breaking Changes

Incompatibilities:

- chore(parser): compressed version 9.x language definitions no longer supported (rebuild them minified) [Josh Goebel][]
- `nohightlight` and `no-highlight` are the only "ignore me" css classes now (`plain` and `text` no longer count)
  (to get the old behavior you can customize `noHighlightRe`)
- a grammar with a top-level `self` reference will now always throw an error
  (previously in safe mode this would be silently ignored)
- PHP templates are now detected as `php-template`, not `xml`

Renamed Language Files:

- chore(parser): `htmlbars.js` now depends on `handlebars.js` [Josh Goebel][]
- chore(parser): rename `nimrod.js` to `nim.js` [Josh Goebel][]
- chore(parser): rename `cs.js` to `csharp.js` [Josh Goebel][]
- chore(parser): rename `tex.js` to `latex.js` [Josh Goebel][]
- chore(parser): effectively rename `cpp.js` to `c-like.js` [Josh Goebel][]
- chore(parser): create new `c.js` (C), depends on `c-like` now [Josh Goebel][]
- chore(parser): create new `cpp.js` (C), depends on `c-like` now [Josh Goebel][]
- This will allow us to clean up C/C++ in the future without another breaking change
  by getting this require change out of the way early.
  (https://github.com/highlightjs/highlight.js/issues/2146)

Legacy Browser Issues:

- **We're now using ES2015 features in the codebase.  Internet Explorer 11 is no longer supported.**
- In general legacy browsers are no longer supported.
- chore(parser): remove `load` listener in favor of only the newer `DOMContentLoaded` [Josh Goebel][]

Removed styles:

- chore(styles): darkula.css (use darcula.css instead) [Josh Goebel][]

[Josh Goebel]: https://github.com/joshgoebel

---

Also see:
https://github.com/highlightjs/highlight.js/issues/2273
