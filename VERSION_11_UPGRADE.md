# Default Build Changes

-  remove apache, http, nginx, properties, coffeescript from :common #2848


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

## API's changed

- rename second_best to secondBest (highlightAuto)
- fixMarkup is gone now, provide your own replacement #2534
- highlightElement/highlightBlock result now no longer returns `re` key, use `relevance` instead
- `CSS_NUMBER_MODE` has now been moved into the internal `css-shared` library

### Configuration options removed/changed

- useBR gone, #2559
- tabReplace gone, #2874

## Others

- `relevance` returned may be a floating point number now
- regex utility `join` renamed to `_eitherRewriteBackreferences` (this was always internal)
