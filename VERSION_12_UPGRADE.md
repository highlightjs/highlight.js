# Upgrading to Highlight.js v12.0

## Overview of Breaking Changes

Welcome to version 12.0.  This a major release and therefore contains breaking changes.  Below is a complete list of those such changes.


### CRLF line endings are converted to CR line-endings

During highligthing all `CRLF` line-endings are now normalized to unix style `CR`.  If you truly require CRLF you can do the tranform post-highlighting:

```js
let result = hljs.highlight(code, {language: "ruby"});
code = result.value.replace(/\n/g,"\r\n");
```

Reference: https://github.com/highlightjs/highlight.js/issues/3298


### Themes are now more accessible by default

Themes may include changes to improve accessibility (increase contrast).  If you're using one of the built-in themes please confirm you're still happy with how it looks after upgrading.


### Built-in set of "Common" Languages

TODO: complete


### The older `highlight` API that was deprecated with 10.7 is no longer supported

```js
// The older v10 API
highlight(language, code, ignore_illegals) {

// The new API takes an options object literal to pass options
highlight(code, { language, ignoreIllegals}) {
```

Your code before might have looked like:

```js
result = highlight("vbscript","your code goes here", true)
```

Where as the new API would require:

```js
result = highlight("your code goes here", 
  {language: "vbscript", ignoreIllegals: true })
```

### Grammar: `classNameAliases` => `scopeAliases`

For clarity: `classNameAliases` key has been renamed to `scopeAliases`.  If you wish your grammar to continue to support both v11 and v12, you may as a work-around include both keys:

```js
const SCOPE_ALIASES = {
  // list of scope aliases here
}
return {
  // ...
  classNameAliases: SCOPE_ALIASES,
  scopeAliases: SCOPE_ALIASES,
  // ...
}
```


### The `styles` folder has been renamed to `themes` (all builds)

This affects the raw source tree and all builds.  If you were pulling in any themes via path you'll need to update your path to point to `themes` now rather than `styles`.


### The `scss` folder has been removed (node build)

In the past this folder was simply a verbatim copy of the `styles` folder in the past (with the files renamed to `.scss` but otherwise unmodified).  Please use the `themes` folder instead and the `.css` files found there.

