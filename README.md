# Highlight.js

[![Build Status](https://travis-ci.org/highlightjs/highlight.js.svg?branch=master)](https://travis-ci.org/highlightjs/highlight.js) [![Greenkeeper badge](https://badges.greenkeeper.io/highlightjs/highlight.js.svg)](https://greenkeeper.io/) [![install size](https://packagephobia.now.sh/badge?p=highlight.js)](https://packagephobia.now.sh/result?p=highlight.js)

Highlight.js is a syntax highlighter written in JavaScript. It works in
the browser as well as on the server. It works with pretty much any
markup, doesn’t depend on any framework, and has automatic language
detection.

#### Upgrading to Version 10

Version 10 is one of the biggest releases in quite some time.  If you're
upgrading from version 9, there are some breaking changes and things you may
want to double check first.

Please read [VERSION_10_UPGRADE.md](https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_UPGRADE.md) for  high-level summary of breaking changes and any actions you may need to take. See [VERSION_10_BREAKING_CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_BREAKING_CHANGES.md) for a more detailed list and [CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/CHANGES.md) to learn what else is new.

##### Support for older versions

Please see [OLD_VERSIONS.md](https://github.com/highlightjs/highlight.js/blob/master/OLD_VERSIONS.md) for support information.

## Getting Started

The bare minimum for using highlight.js on a web page is linking to the
library along with one of the styles and calling [`initHighlightingOnLoad`][1]:

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


## Using with Vue.js

Simply register the plugin with Vue:

```js
Vue.use(hljs.vuePlugin);
```

And you'll be provided with a `highlightjs` component for use
in your templates:

```html
  <div id="app">
    <!-- bind to a data property named `code` -->
    <highlightjs autodetect :code="code" />
    <!-- or literal code works as well -->
    <highlightjs language='javascript' code="var x = 5;" />
  </div>
```

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
// require the highlight.js library, including all languages
const hljs = require('./highlight.js');
const highlightedCode = hljs.highlightAuto('<span>Hello World!</span>').value
```

Or for a smaller footprint... load just the languages you need.

```js
const hljs = require("highlight.js/lib/core");  // require only the core library
// separately require languages
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

const highlightedCode = hljs.highlight('xml', '<span>Hello World!</span>').value
```


## ES6 Modules

First, you'll likely install via `npm` or `yarn` -- see [Getting the Library](#getting-the-library) below.

In your application:

```js
import hljs from 'highlight.js';
```

The default import imports all languages. Therefore it is likely to be more efficient to import only the library and the languages you need:

```js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
```

To set the syntax highlighting style, if your build tool processes CSS from your JavaScript entry point, you can also import the stylesheet directly as modules:

```js
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
```


## Getting the Library

You can get highlight.js as a hosted, or custom-build, browser script or
as a server module. Right out of the box the browser script supports
both AMD and CommonJS, so if you wish you can use RequireJS or
Browserify without having to build from source. The server module also
works perfectly fine with Browserify, but there is the option to use a
build specific to browsers rather than something meant for a server.


**Do not link to GitHub directly.** The library is not supposed to work straight
from the source, it requires building. If none of the pre-packaged options
work for you refer to the [building documentation][6].

**On Almond.** You need to use the optimizer to give the module a name. For
example:

```bash
r.js -o name=hljs paths.hljs=/path/to/highlight out=highlight.js
```

### CDN Hosted

A prebuilt version of highlight.js bundled with many common languages is hosted by the following CDNs:

**cdnjs** ([link](https://cdnjs.com/libraries/highlight.js))

```html
<link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script charset="UTF-8"
 src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/languages/go.min.js"></script>
```

**jsdelivr** ([link](https://www.jsdelivr.com/package/gh/highlightjs/cdn-release))

```html
<link rel="stylesheet"
      href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css">
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/highlight.min.js"></script>
```

**Note:** *The CDN-hosted `highlight.min.js` package doesn't bundle every language.* It would be
very large.  You can find our list "common" languages that we bundle by default on our [download page][5].

### Self Hosting

The [download page][5] can quickly generate a custom bundle including only the languages you need.

Alternatively, you can build a browser package from [source](#source):

```
node tools/build.js -t browser :common
```

See our [building documentation][6] for more information.

**Note:** Building from source should always result in the smallest size builds.  The website download page is optimized for speed, not size.


#### Prebuilt CDN assets

You can also download and self-host the same assets we serve up via our own CDNs.  We publish those builds to the [cdn-release](https://github.com/highlightjs/cdn-release) GitHub repository.  You can easily pull individual files off the CDN endpoints with `curl`, etc; if say you only needed `highlight.min.js` and a single CSS file.

There is also an npm package [@highlightjs/cdn-assets](https://www.npmjs.com/package/@highlightjs/cdn-assets) if pulling the assets in via `npm` or `yarn` would be easier for your build process.


### NPM / Node.js server module

Highlight.js can also be used on the server. The package with all supported languages can be installed from NPM or Yarn:

```bash
npm install highlight.js
# or
yarn add highlight.js
```

Alternatively, you can build it from [source](#source):

```bash
node tools/build.js -t node
```

See our [building documentation][6] for more information.


### Source

[Current source][10] is always available on GitHub.


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
[10]: https://github.com/highlightjs/
