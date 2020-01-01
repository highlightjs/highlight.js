## Version 10 Breaking Changes

Incompatibilities:
- chore(parser): compressed version 9.x language definitions no longer supported (rebuild them minified) [Josh Goebel][]

Renamed Language Files:
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

[Josh Goebel]: https://github.com/yyyc514

---

Also see:
https://github.com/highlightjs/highlight.js/issues/2273
