# Highlight.js

[![Build Status](https://travis-ci.org/highlightjs/highlight.js.svg?branch=master)](https://travis-ci.org/highlightjs/highlight.js) [![Greenkeeper badge](https://badges.greenkeeper.io/highlightjs/highlight.js.svg)](https://greenkeeper.io/) [![install size](https://packagephobia.now.sh/badge?p=highlight.js)](https://packagephobia.now.sh/result?p=highlight.js)

Highlight.js is a syntax highlighter written in JavaScript. It works in
the browser as well as on the server. It works with pretty much any
markup, doesn’t depend on any framework, and has automatic language
detection.

## Upgrading from Version 9

Version 10 is one of the biggest releases in quite some time.  If you're
upgrading from version 9, there are some breaking changes and things you may
want to double check first.

See [VERSION_10_BREAKING_CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_BREAKING_CHANGES.md) to learn about the breaking changes and [CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/CHANGES.md) to learn what else is new.

## Getting Started

The bare minimum for using highlight.js on a web page is linking to the
library along with one of the styles and calling
[`initHighlightingOnLoad`][1]:

```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

This will find and highlight code inside of `<pre><code>` tags; it tries
to detect the language automatically. If automatic detection doesn’t
work for you, you can specify the language in the `class` attribute:

```html
<pre><code class="html">...</code></pre>
```

Classes may also be prefixed with either `language-` or `lang-`.

```html
<pre><code class="language-html">...</code></pre>
```

### Plaintext and Disabling Highlighting

To style arbitrary text like code, but without any highlighting, use the
`plaintext` class:

```html
<pre><code class="plaintext">...</code></pre>
```

To disable highlighting of a tag completely, use the `nohighlight` class:

```html
<pre><code class="nohighlight">...</code></pre>
```

### Supported Languages

Highlight.js supports over 180 different languages in the core library.  There are also 3rd party
language plugins available for additional languages. You can find the full list of supported languages
in [SUPPORTED_LANGUAGES.md][9].

## Custom Initialization

When you need a bit more control over the initialization of
highlight.js, you can use the [`highlightBlock`][3] and [`configure`][4]
functions. This allows you to control *what* to highlight and *when*.

Here’s an equivalent way to calling [`initHighlightingOnLoad`][1] using
vanilla JS:

```js
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});
```

You can use any tags instead of `<pre><code>` to mark up your code. If
you don't use a container that preserves line breaks you will need to
configure highlight.js to use the `<br>` tag:

```js
hljs.configure({useBR: true});

document.querySelectorAll('div.code').forEach((block) => {
  hljs.highlightBlock(block);
});
```

For other options refer to the documentation for [`configure`][4].


## Web Workers

You can run highlighting inside a web worker to avoid freezing the browser
window while dealing with very big chunks of code.

In your main script:

```js
addEventListener('load', () => {
  const code = document.querySelector('#code');
  const worker = new Worker('worker.js');
  worker.onmessage = (event) => { code.innerHTML = event.data; }
  worker.postMessage(code.textContent);
});
```

In worker.js:

```js
onmessage = (event) => {
  importScripts('<path>/highlight.min.js');
  const result = self.hljs.highlightAuto(event.data);
  postMessage(result.value);
};
```

## Node.js

You can use highlight.js with node to highlight content before sending it to the browser.
Make sure to use the `.value` property to get the formatted html.
For more info about the returned object refer to the api docs https://highlightjs.readthedocs.io/en/latest/api.html


```js
// require the highlight.js library including all languages
const hljs = require('./highlight.js');
const highlightedCode = hljs.highlightAuto('<span>Hello World!</span>').value
```

```js
// require the highlight.js library without languages
const hljs = require("highlight.js/lib/core");
// separately require languages
hljs.registerLanguage('html', require('highlight.js/lib/languages/html'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
// highlight with providing the language
const highlightedCode = hljs.highlight('html', '<span>Hello World!</span>').value
```

## Getting the Library

You can get highlight.js as a hosted, or custom-build, browser script or
as a server module. Right out of the box the browser script supports
both AMD and CommonJS, so if you wish you can use RequireJS or
Browserify without having to build from source. The server module also
works perfectly fine with Browserify, but there is the option to use a
build specific to browsers rather than something meant for a server.
Head over to the [download page][5] for all the options.

**Don't link to GitHub directly.** The library is not supposed to work straight
from the source, it requires building. If none of the pre-packaged options
work for you refer to the [building documentation][6].

**The CDN-hosted package doesn't have all the languages.** Otherwise it'd be
too big. If you don't see the language you need in the ["Common" section][5],
it can be added manually:

```html
<script
 charset="UTF-8"
 src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/languages/go.min.js"></script>
```

**On Almond.** You need to use the optimizer to give the module a name. For
example:

```bash
r.js -o name=hljs paths.hljs=/path/to/highlight out=highlight.js
```


### CommonJS

You can import Highlight.js as a CommonJS-module:

```bash
npm install highlight.js --save
```

In your application:

```js
import hljs from 'highlight.js';
```

The default import imports all languages! Therefore it is likely to be more efficient to import only the library and the languages you need:

```js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
```

To set the syntax highlighting style, if your build tool processes CSS from your JavaScript entry point, you can import the stylesheet directly into your CommonJS-module:

```js
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
```

## License

Highlight.js is released under the BSD License. See [LICENSE][7] file
for details.

## Links

The official site for the library is at <https://highlightjs.org/>.

Further in-depth documentation for the API and other topics is at
<http://highlightjs.readthedocs.io/>.

Authors and contributors are listed in the [AUTHORS.txt][8] file.

[1]: http://highlightjs.readthedocs.io/en/latest/api.html#inithighlightingonload
[2]: http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
[3]: http://highlightjs.readthedocs.io/en/latest/api.html#highlightblock-block
[4]: http://highlightjs.readthedocs.io/en/latest/api.html#configure-options
[5]: https://highlightjs.org/download/
[6]: http://highlightjs.readthedocs.io/en/latest/building-testing.html
[7]: https://github.com/highlightjs/highlight.js/blob/master/LICENSE
[8]: https://github.com/highlightjs/highlight.js/blob/master/AUTHORS.txt
[9]: https://github.com/highlightjs/highlight.js/blob/master/SUPPORTED_LANGUAGES.md
