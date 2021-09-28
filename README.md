# Highlight.js

[![latest version](https://badgen.net/npm/v/highlight.js?label=latest)](https://www.npmjs.com/package/highlight.js)
[![license](https://badgen.net/github/license/highlightjs/highlight.js?color=cyan)](https://github.com/highlightjs/highlight.js/blob/main/LICENSE)
[![install size](https://badgen.net/packagephobia/install/highlight.js?label=npm+install)](https://packagephobia.now.sh/result?p=highlight.js)
![minified](https://img.shields.io/github/size/highlightjs/cdn-release/build/highlight.min.js?label=minified)
[![NPM downloads weekly](https://badgen.net/npm/dw/highlight.js?label=npm+downloads&color=purple)](https://www.npmjs.com/package/highlight.js)
[![jsDelivr CDN downloads](https://badgen.net/jsdelivr/hits/gh/highlightjs/cdn-release?label=jsDelivr+CDN&color=purple)](https://www.jsdelivr.com/package/gh/highlightjs/cdn-release)

<!-- [![build and CI status](https://badgen.net/github/checks/highlightjs/highlight.js?label=build)](https://github.com/highlightjs/highlight.js/actions?query=workflow%3A%22Node.js+CI%22) -->
![build and CI status](https://badgen.net/github/checks/highlightjs/highlight.js/main?label=build)
[![code quality](https://badgen.net/lgtm/grade/g/highlightjs/highlight.js/js?label=code+quality)](https://lgtm.com/projects/g/highlightjs/highlight.js/?mode=list)
[![vulnerabilities](https://badgen.net/snyk/highlightjs/highlight.js)](https://snyk.io/test/github/highlightjs/highlight.js?targetFile=package.json)
![dev deps](https://badgen.net/david/dev/highlightjs/highlight.js?label=dev+deps)


[![discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=pink)](https://discord.gg/M24EbU7ja9)
[![open issues](https://badgen.net/github/open-issues/highlightjs/highlight.js?label=issues)](https://github.com/highlightjs/highlight.js/issues)
[![help welcome issues](https://badgen.net/github/label-issues/highlightjs/highlight.js/help%20welcome/open)](https://github.com/highlightjs/highlight.js/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+welcome%22)
[![good first issue](https://badgen.net/github/label-issues/highlightjs/highlight.js/good%20first%20issue/open)](https://github.com/highlightjs/highlight.js/issues?q=is%3Aopen+is%3Aissue+label%3A%22beginner+friendly%22)

<!-- [![Build CI](https://img.shields.io/github/workflow/status/highlightjs/highlight.js/Node.js%20CI)](https://github.com/highlightjs/highlight.js/actions?query=workflow%3A%22Node.js+CI%22) -->
<!-- [![commits since release](https://img.shields.io/github/commits-since/highlightjs/highlight.js/latest?label=commits+since)](https://github.com/highlightjs/highlight.js/commits/main) -->
<!-- [![](https://data.jsdelivr.com/v1/package/gh/highlightjs/cdn-release/badge?style=rounded)](https://www.jsdelivr.com/package/gh/highlightjs/cdn-release) -->
<!-- [![Total Lines](https://img.shields.io/tokei/lines/github/highlightjs/highlight.js)]() -->
<!-- [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/highlight.js.svg)](https://bundlephobia.com/result?p=highlight.js) -->


Highlight.js is a syntax highlighter written in JavaScript. It works in
the browser as well as on the server. It can work with pretty much any
markup, doesn’t depend on any other frameworks, and has automatic language
detection.

**Contents**

- [Basic Usage](#basic-usage)
  - [In the Browser](#in-the-browser)
    - [Plaintext Code Blocks](#plaintext-code-blocks)
    - [Ignoring a Code Block](#ignoring-a-code-block)
  - [Node.js on the Server](#nodejs-on-the-server)
- [Supported Languages](#supported-languages)
- [Custom Usage](#custom-usage)
  - [Using custom HTML](#using-custom-html)
  - [Using with Vue.js](#using-with-vuejs)
  - [Using Web Workers](#using-web-workers)
- [Importing the Library](#importing-the-library)
  - [Node.js / `require`](#nodejs--require)
  - [ES6 Modules / `import`](#es6-modules--import)
- [Getting the Library](#getting-the-library)
  - [Fetch via CDN](#fetch-via-cdn)
    - [Download prebuilt CDN assets](#download-prebuilt-cdn-assets)
  - [Download from our website](#download-from-our-website)
  - [Install via NPM package](#install-via-npm-package)
  - [Build from Source](#build-from-source)
- [Requirements](#requirements)
- [License](#license)
- [Links](#links)

---

#### Upgrading to Version 11

As always, major releases do contain breaking changes which may require action from users.  Please read [VERSION_11_UPGRADE.md](https://github.com/highlightjs/highlight.js/blob/main/VERSION_11_UPGRADE.md) for a detailed summary of breaking changes and any actions you may need to take.


**Upgrading to v10**:  You really should probably be upgrading to version 11... but if you're coming from version 9 then these documents may still prove helpful.

- [VERSION_10_UPGRADE.md](https://github.com/highlightjs/highlight.js/blob/main/VERSION_10_UPGRADE.md)  and  [VERSION_10_BREAKING_CHANGES.md](https://github.com/highlightjs/highlight.js/blob/main/VERSION_10_BREAKING_CHANGES.md)

#### Support for older versions <!-- omit in toc -->

Please see [SECURITY.md](https://github.com/highlightjs/highlight.js/blob/main/SECURITY.md) for long-term support information.

---

## Basic Usage
### In the Browser

The bare minimum for using highlight.js on a web page is linking to the
library along with one of the themes and calling [`highlightAll`][1]:

```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
```

This will find and highlight code inside of `<pre><code>` tags; it tries
to detect the language automatically. If automatic detection doesn’t
work for you, or you simply prefer to be explicit, you can specify the language manually in the using the `class` attribute:


```html
<pre><code class="language-html">...</code></pre>
```

#### Plaintext Code Blocks

To apply the Highlight.js styling to plaintext without actually highlighting it, use the `plaintext` language:

```html
<pre><code class="language-plaintext">...</code></pre>
```

#### Ignoring a Code Block

To skip highlighting of a code block completely, use the `nohighlight` class:

```html
<pre><code class="nohighlight">...</code></pre>
```

### Node.js on the Server

The bare minimum to auto-detect the language and highlight some code.

```js
// load the library and ALL languages
hljs = require('highlight.js');
html = hljs.highlightAuto('<h1>Hello World!</h1>').value
```

To load only a "common" subset of popular languages:

```js
hljs = require('highlight.js/lib/common');
```

To highlight code with a specific language, use `highlight`:

```js
html = hljs.highlight('<h1>Hello World!</h1>', {language: 'xml'}).value
```

See [Importing the Library](#importing-the-library) for more examples of `require` vs `import` usage, etc.  For more information about the result object returned by `highlight` or `highlightAuto` refer to the [api docs](https://highlightjs.readthedocs.io/en/latest/api.html).



## Supported Languages

Highlight.js supports over 180 languages in the core library.  There are also 3rd party
language definitions available to support even more languages. You can find the full list of supported languages in [SUPPORTED_LANGUAGES.md][9].

## Custom Usage

If you need a bit more control over the initialization of
Highlight.js, you can use the [`highlightElement`][3] and [`configure`][4]
functions. This allows you to better control *what* to highlight and *when*.

For example, here’s the rough equivalent of calling [`highlightAll`][1] but doing the work manually instead:

```js
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((el) => {
    hljs.highlightElement(el);
  });
});
```

Please refer to the documentation for [`configure`][4] options.


### Using custom HTML

We strongly recommend `<pre><code>` wrapping for code blocks. It's quite
semantic and "just works" out of the box with zero fiddling. It is possible to
use other HTML elements (or combos), but you may need to pay special attention to
preserving linebreaks.

Let's say your markup for code blocks uses divs:

```html
<div class='code'>...</div>
```

To highlight such blocks manually:

```js
// first, find all the div.code blocks
document.querySelectorAll('div.code').forEach(el => {
  // then highlight each
  hljs.highlightElement(el);
});
```

Without using a tag that preserves linebreaks (like `pre`) you'll need some
additional CSS to help preserve them.  You could also [pre and post-process line
breaks with a plug-in][brPlugin], but *we recommend using CSS*.

[brPlugin]: https://github.com/highlightjs/highlight.js/issues/2559

To preserve linebreaks inside a `div` using CSS:

```css
div.code {
  white-space: pre;
}
```


### Using with Vue.js

See [highlightjs/vue-plugin](https://github.com/highlightjs/vue-plugin) for a simple Vue plugin that works great with Highlight.js.

An example of `vue-plugin` in action:

```html
  <div id="app">
    <!-- bind to a data property named `code` -->
    <highlightjs autodetect :code="code" />
    <!-- or literal code works as well -->
    <highlightjs language='javascript' code="var x = 5;" />
  </div>
```

### Using Web Workers

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

## Importing the Library

First, you'll likely be installing the library via `npm` or `yarn` -- see [Getting the Library](#getting-the-library).


### Node.js / `require`

Requiring the top-level library will load all languages:

```js
// require the highlight.js library, including all languages
const hljs = require('./highlight.js');
const highlightedCode = hljs.highlightAuto('<span>Hello World!</span>').value
```

For a smaller footprint, load our common subset of languages (the same set used for our default web build).

```js
const hljs = require('highlight.js/lib/common');
```

For the smallest footprint, load only the languages you need:

```js
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

const highlightedCode = hljs.highlight('<span>Hello World!</span>', {language: 'xml'}).value
```


### ES6 Modules / `import`

The default import will register all languages:

```js
import hljs from 'highlight.js';
```

 It is more efficient to import only the library and register the languages you need:

```js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
```

If your build tool processes CSS imports, you can also import the theme directly as a module:

```js
import hljs from 'highlight.js';
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

### Fetch via CDN

A prebuilt version of Highlight.js bundled with many common languages is hosted by several popular CDNs.
When using Highlight.js via CDN you can use Subresource Integrity for additional security.  For details
see [DIGESTS.md](https://github.com/highlightjs/cdn-release/blob/main/DIGESTS.md).

**cdnjs** ([link](https://cdnjs.com/libraries/highlight.js))

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/languages/go.min.js"></script>
```

**jsdelivr** ([link](https://www.jsdelivr.com/package/gh/highlightjs/cdn-release))

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/styles/default.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/languages/go.min.js"></script>
```

**unpkg** ([link](https://unpkg.com/browse/@highlightjs/cdn-assets/))

```html
<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.2.0/styles/default.min.css">
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.2.0/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.2.0/languages/go.min.js"></script>
```

**Note:** *The CDN-hosted `highlight.min.js` package doesn't bundle every language.* It would be
very large. You can find our list of "common" languages that we bundle by default on our [download page][5].

#### Download prebuilt CDN assets

You can also download and self-host the same assets we serve up via our own CDNs.  We publish those builds to the [cdn-release](https://github.com/highlightjs/cdn-release) GitHub repository.  You can easily pull individual files off the CDN endpoints with `curl`, etc; if say you only needed `highlight.min.js` and a single CSS file.

There is also an npm package [@highlightjs/cdn-assets](https://www.npmjs.com/package/@highlightjs/cdn-assets) if pulling the assets in via `npm` or `yarn` would be easier for your build process.

### Download from our website

The [download page][5] can quickly generate a custom single-file minified bundle including only the languages you desire.

**Note:** [Building from source](#build-from-source) can produce slightly smaller builds than the website download.


### Install via NPM package

Our NPM package including all supported languages can be installed with NPM or Yarn:

```bash
npm install highlight.js
# or
yarn add highlight.js
```

Alternatively, you can build the NPM package from source.


### Build from Source

The [current source code][10] is always available on GitHub.

```bash
node tools/build.js -t node
node tools/build.js -t browser :common
node tools/build.js -t cdn :common
```

See our [building documentation][6] for more information.


## Requirements

Highlight.js works on all modern browsers and currently supported Node.js versions.  You'll need the following software to contribute to the core library:

- Node.js >= 12.x
- npm >= 6.x

## License

Highlight.js is released under the BSD License. See our [LICENSE][7] file
for details.


## Links

The official website for the library is <https://highlightjs.org/>.

Further in-depth documentation for the API and other topics is at
<http://highlightjs.readthedocs.io/>.

A list of the Core Team and contributors can be found in the [CONTRIBUTORS.md][8] file.

[1]: http://highlightjs.readthedocs.io/en/latest/api.html#highlightall
[2]: http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
[3]: http://highlightjs.readthedocs.io/en/latest/api.html#highlightelement
[4]: http://highlightjs.readthedocs.io/en/latest/api.html#configure
[5]: https://highlightjs.org/download/
[6]: http://highlightjs.readthedocs.io/en/latest/building-testing.html
[7]: https://github.com/highlightjs/highlight.js/blob/main/LICENSE
[8]: https://github.com/highlightjs/highlight.js/blob/main/CONTRIBUTORS.md
[9]: https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
[10]: https://github.com/highlightjs/
