# Default Build Changes

-  remove apache, http, nginx, properties, coffeescript from :common #2848

### Feature Removal

- HTML merging is now no longer included in core.  You'll want to use a plugin instead. https://github.com/highlightjs/highlight.js/issues/2889
- fixMarkup is gone now, provide your own replacement #2534

### Behavior changes

- `initHighlighting` and `initHighlightingOnLoad` call `highlightAll`
- Calling `highlightAll` over and over is not guarded against

### Grammar's removed or renamed

- remove the old htmlbars stub, use handlebars
- remove c-like, use c, cpp, or arduino
- removed `sql_more`, use `sql` instead

### Visual / Themeing / CSS Changes

- Default padding on `.hljs` is now 1em (up from 0.5em)
- schoolbook no longer has a custom lined background, it's solid now

### Alias Changes

- php3,4,5,6,etc... aliases removed, use php instead
- `zsh` removed, use `sh` instead
- `freepascal`, `lazarus`, `lpr`, `lpm` removed. Use `delphi` or add you own aliases back.

## API's changed

- rename second_best to secondBest (highlightAuto)
- highlightElement/highlightBlock result now no longer returns `re` key, use `relevance` instead
- `CSS_NUMBER_MODE` has now been moved into the internal `css-shared` library
- `highlight()` result now renames some keys to mark them as private: `_top`, `_emitter`, and `_illegalBy`

### Configuration options removed/changed

- useBR gone, #2559
- tabReplace gone, #2874

## Others

- `relevance` returned may be a floating point number now
- regex utility `join` renamed to `_eitherRewriteBackreferences` (this was always internal)
