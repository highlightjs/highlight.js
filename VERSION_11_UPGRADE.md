# very rough draft

-  rename second_best to secondBest (highlightAuto)
-  remove apache, http, nginx, properties, coffeescript from :common #2848
-  schoolbook no longer has a custom lined background, it's solid now


### Grammar's removed or renamed

- remove the old htmlbars stub, use handlebars
- remove c-like, use c, cpp, or arduino

### Alias Changes

- php3,4,5,6,etc... aliases removed, use php instead

## API's changed

- highlightElement/highlightBlock result now no longer returns `re` key, use `relevance` instead

## Notable

- `relevance` returned may be a floating point number now
