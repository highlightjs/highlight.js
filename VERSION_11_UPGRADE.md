- [Overview of Breaking Changes](#overview-of-breaking-changes)
  - [Built-in set of "Common" Languages](#built-in-set-of-common-languages)
  - [Language Files](#language-files)
  - [Language Aliases](#language-aliases)
  - [Styles and CSS](#styles-and-css)
  - [Behavioral changes](#behavioral-changes)
    - [API changes](#api-changes)
      - [Changes to Result Data](#changes-to-result-data)
    - [Feature Removal](#feature-removal)
  - [Small Things](#small-things)


## Overview of Breaking Changes

Welcome to version 11.0.  This a major release and therefore contains breaking changes.  Below is a complete list of those such changes.


### Built-in set of "Common" Languages

The default `highlight.min.js` build **removes** a few less popular grammars:

- apache
- http
- nginx
- properties
- coffeescript

If you need any of these, you can always create a custom build.

Ref: https://github.com/highlightjs/highlight.js/issues/2848


### Language Files

This would matter if you are requiring any of these files directly (via Node.js or CDN).

- `htmlbars` has been removed. Use `handlebars` instead.
- `c-like` has been removed. Use `c`, `cpp`, or `arduino`.
- `sql_more` has been removed. Use `sql` instead.


### Language Aliases

This would matter if you are using these aliases.

- `php3`,`php4`,`php5`, `php6`, `php7`, and `php8` havbe been removed. Use `php` instead.
- `zsh` has been removed. Use `sh` or `bash` instead.
- `freepascal`, `lazarus`, `lpr`, and `lpm` removed. Use `delphi` instead.

You can of course re-register any of these aliases easily if necessary. For example to restore the PHP aliases:

```js
hljs.registerAliases(["php3","php4","php5","php6","php7","php8"],{ languageName: "php" })
```

### Styles and CSS

- The default padding on `.hljs` element has been increased and is now `1em` (it was `0.5em` previously). If your design depends on the smaller spacing you may need to update your CSS to override.
- `schoolbook` no longer has a custom lined background, it is solid color now.  The old image and CSS can be found in the [10-stable branch](https://github.com/highlightjs/highlight.js/tree/10-stable/src/styles) if you wish to manually copy it into your project.
- `github` includes significant changes to more properly match modern GitHub syntax highlighting. If you desire the old theme you can manually copy it into your project from the [10-stable branch](https://github.com/highlightjs/highlight.js/tree/10-stable/src/styles).


### Behavioral changes

#### API changes

- The `highlight(language,code, ...args)` API no longer accepts `continuation` as a 4th argument.
- The `highlight(language,code, ...args)` API is deprecated (to be removed in 12.0).

The new call signature is `highlight(code, {options})`. ([see docs](https://highlightjs.readthedocs.io/en/latest/api.html#highlight))

Code using the old API:

```js
// highlight(language, code, ignoreIllegals, continuation)
highlight("javascript", "var a = 5;", true)
```
...would be upgraded to the newer API as follows:

```js
// highlight(code, {language, ignoreIllegals})
highlight("var a = 5;", {language: "javascript", ignoreIllegals: true})
```

The new API purposely does not support `continuation` as this is only intended for internal library usage.

- `initHighlighting()` is deprecated (to be removed in 12.0).
- `initHighlightingOnLoad()` is deprecated (to be removed in 12.0).

**Use `highlightAll()` instead.** ([see docs](https://highlightjs.readthedocs.io/en/latest/api.html#highlight-all)) The old functions are now simply aliases of `highlightAll()`. The new function may be called before or after the DOM is loaded and should do the correct thing in all cases, replacing the need for the previous individual functions.

Note: `highlightAll()` does not guard against calling itself repeatedly as the previous functions did. Your code should be careful to avoid doing this.

- `highlightBlock()` is deprecated (to be removed in 12.0).

**Use `highlightElement()` instead.** ([see docs](https://highlightjs.readthedocs.io/en/latest/api.html#highlight-element)) This is merely a naming change.

Note: The object literal passed to the `before:highlightElement` callback now passes the element in the `el` key vs the `block` key.

##### Changes to Result Data

- `highlightAuto()`'s `second_best` key has been renamed to `secondBest`
- `highlightElement()`'s result now no longer includes a `re` key. Use the `relevance` key now.
- `highlight()` renames some result keys to more clearly mark them as private: `_top`, `_emitter`, and `_illegalBy`. You should not depend on these keys as they are subject to change at any time.
- The `relevance` key returned by `highlight()` is no longer guaranteed to be an even integer.


#### Feature Removal

- HTML auto-passthru is now no longer included in core.  Use a plugin instead. For a possible plugin please see [#2889](https://github.com/highlightjs/highlight.js/issues/2889).

An example:

```html
<pre><code class="lang-js">
var a = 4;
<span class="yellow">var a = 4;</span>
</code></pre>
```

Unescaped HTML like this will now be ignored (stripped before highlighting) and a warning will be logged to the console.  All HTML to be highlighted should be properly escaped to avoid potential HTML/JS injection attacks.

- `fixMarkup` has been removed.

This function was deprecated in v10.2.  It is not our goal to provide random string utilities. You may need to provide your own replacement [Ref: #2534](https://github.com/highlightjs/highlight.js/issues/2634)

- `CSS_NUMBER_MODE` has been removed.

This rule was too broad for bring inclusion in core and has been removed.

- `useBR` configuration has been removed.

This configuration option was deprecated in v10.1. Use a plugin or preferably simply CSS `white-space: pre`. [Ref: #2559](https://github.com/highlightjs/highlight.js/issues/2559)


- `tabReplace` configuration has been removed.

This configuration option was deprecated in v10.5. Use a plugin or pre-render content instead with desired spacing. [Ref: #2874](https://github.com/highlightjs/highlight.js/issues/2874)





### Small Things

- The `regex` utility `join` has been renamed to `_eitherRewriteBackreferences` (this has always been intended for internal use only)
