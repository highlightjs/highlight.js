# Highlight.js

[![Build Status](https://travis-ci.org/highlightjs/highlight.js.svg?branch=master)](https://travis-ci.org/highlightjs/highlight.js) [![Greenkeeper badge](https://badges.greenkeeper.io/highlightjs/highlight.js.svg)](https://greenkeeper.io/) [![install size](https://packagephobia.now.sh/badge?p=highlight.js)](https://packagephobia.now.sh/result?p=highlight.js)

Highlight.js is a syntax highlighter written in JavaScript. It works in
the browser as well as on the server. It works with pretty much any
markup, doesn’t depend on any framework, and has automatic language
detection.

## Getting Started

The bare minimum for using highlight.js on a web page is linking to the
library along with one of the styles and calling
[`initHighlightingOnLoad`][1]:

```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.pack.js"></script>
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

The table below shows the full list of supported languages (and corresponding classes) that are bundled with the library.  Note: Which languages are available may depend on how you've built or included the library in your app. See [Getting the Library](#getting-the-library) below.

<details>
<summary>Reveal the full list of languages...</summary>

| Language                | Classes                | Package |
| :-----------------------| :--------------------- | :------ |
| 1C                      | 1c                     |         |
| ABNF                    | abnf                   |         |
| Access logs             | accesslog              |         |
| Ada                     | ada                    |         |
| ARM assembler           | armasm, arm            |         |
| AVR assembler           | avrasm                 |         |
| ActionScript            | actionscript, as       |         |
| Alan                    | alan, i                | [highlightjs-alan](https://github.com/highlightjs/highlightjs-alan) |
| AngelScript             | angelscript, asc       |         |
| Apache                  | apache, apacheconf     |         |
| AppleScript             | applescript, osascript |         |
| Arcade                  | arcade                 |         |
| AsciiDoc                | asciidoc, adoc         |         |
| AspectJ                 | aspectj                |         |
| AutoHotkey              | autohotkey             |         |
| AutoIt                  | autoit                 |         |
| Awk                     | awk, mawk, nawk, gawk  |         |
| Axapta                  | axapta                 |         |
| Bash                    | bash, sh, zsh          |         |
| Basic                   | basic                  |         |
| BNF                     | bnf                    |         |
| Brainfuck               | brainfuck, bf          |         |
| C#                      | cs, csharp             |         |
| C++                     | cpp, c, cc, h, c++, h++, hpp |   |
| C/AL                    | cal                    |         |
| Cache Object Script     | cos, cls               |         |
| CMake                   | cmake, cmake.in        |         |
| Coq                     | coq                    |         |
| CSP                     | csp                    |         |
| CSS                     | css                    |         |
| Cap’n Proto             | capnproto, capnp       |         |
| Clojure                 | clojure, clj           |         |
| CoffeeScript            | coffeescript, coffee, cson, iced | |
| Crmsh                   | crmsh, crm, pcmk       |         |
| Crystal                 | crystal, cr            |         |
| Cypher (Neo4j)          | cypher                 | [highlightjs-cypher](https://github.com/highlightjs/highlightjs-cypher) |
| D                       | d                      |         |
| DNS Zone file           | dns, zone, bind        |         |
| DOS                     | dos, bat, cmd          |         |
| Dart                    | dart                   |         |
| Delphi                  | delphi, dpr, dfm, pas, pascal, freepascal, lazarus, lpr, lfm | |
| Diff                    | diff, patch            |         |
| Django                  | django, jinja          |         |
| Dockerfile              | dockerfile, docker     |         |
| dsconfig                | dsconfig               |         |
| DTS (Device Tree)       | dts                    |         |
| Dust                    | dust, dst              |         |
| Dylan                   | dylan                  | [highlight-dylan](https://github.com/highlightjs/highlight-dylan) |
| EBNF                    | ebnf                   |         |
| Elixir                  | elixir                 |         |
| Elm                     | elm                    |         |
| Erlang                  | erlang, erl            |         |
| Excel                   | excel, xls, xlsx       |         |
| Extempore               | extempore, xtlang, xtm | [highlightjs-xtlang](https://github.com/highlightjs/highlightjs-xtlang) |
| F#                      | fsharp, fs             |         |
| FIX                     | fix                    |         |
| Fortran                 | fortran, f90, f95      |         |
| G-Code                  | gcode, nc              |         |
| Gams                    | gams, gms              |         |
| GAUSS                   | gauss, gss             |         |
| GDScript                | godot, gdscript        | [highlightjs-gdscript](https://github.com/highlightjs/highlightjs-gdscript) |
| Gherkin                 | gherkin                |         |
| GN for Ninja            | gn, gni                | [highlightjs-GN](https://github.com/highlightjs/highlightjs-GN/blob/master/gn.js) |
| Go                      | go, golang             |         |
| Grammatical Framework   | gf                     | [highlightjs-gf](https://github.com/johnjcamilleri/highlightjs-gf) |
| Golo                    | golo, gololang         |         |
| Gradle                  | gradle                 |         |
| Groovy                  | groovy                 |         |
| HTML, XML               | xml, html, xhtml, rss, atom, xjb, xsd, xsl, plist, svg | |
| HTTP                    | http, https            |         |
| Haml                    | haml                   |         |
| Handlebars              | handlebars, hbs, html.hbs, html.handlebars        | |
| Haskell                 | haskell, hs            |         |
| Haxe                    | haxe, hx               |         |
| Hy                      | hy, hylang             |         |
| Ini, TOML               | ini, toml              |         |
| Inform7                 | inform7, i7            |         |
| IRPF90                  | irpf90                 |         |
| JSON                    | json                   |         |
| Java                    | java, jsp              |         |
| JavaScript              | javascript, js, jsx    |         |
| Kotlin                  | kotlin, kt             |         |
| Leaf                    | leaf                   |         |
| Lasso                   | lasso, ls, lassoscript |         |
| Less                    | less                   |         |
| LDIF                    | ldif                   |         |
| Lisp                    | lisp                   |         |
| LiveCode Server         | livecodeserver         |         |
| LiveScript              | livescript, ls         |         |
| Lua                     | lua                    |         |
| Makefile                | makefile, mk, mak      |         |
| Markdown                | markdown, md, mkdown, mkd |      |
| Mathematica             | mathematica, mma, wl   |         |
| Matlab                  | matlab                 |         |
| Maxima                  | maxima                 |         |
| Maya Embedded Language  | mel                    |         |
| Mercury                 | mercury                |         |
| mIRC Scripting Language | mirc, mrc              | [highlightjs-mirc](https://github.com/highlightjs/highlightjs-mirc) |
| Mizar                   | mizar                  |         |
| Mojolicious             | mojolicious            |         |
| Monkey                  | monkey                 |         |
| Moonscript              | moonscript, moon       |         |
| N1QL                    | n1ql                   |         |
| NSIS                    | nsis                   |         |
| Nginx                   | nginx, nginxconf       |         |
| Nimrod                  | nimrod, nim            |         |
| Nix                     | nix                    |         |
| OCaml                   | ocaml, ml              |         |
| Objective C             | objectivec, mm, objc, obj-c |    |
| OpenGL Shading Language | glsl                   |         |
| OpenSCAD                | openscad, scad         |         |
| Oracle Rules Language   | ruleslanguage          |         |
| Oxygene                 | oxygene                |         |
| PF                      | pf, pf.conf            |         |
| PHP                     | php, php3, php4, php5, php6, php7 |    |
| Parser3                 | parser3                |         |
| Perl                    | perl, pl, pm           |         |
| Plaintext: no highlight | plaintext              |         |
| Pony                    | pony                   |         |
| PostgreSQL & PL/pgSQL   | pgsql, postgres, postgresql |    |
| PowerShell              | powershell, ps, ps1    |         |
| Processing              | processing             |         |
| Prolog                  | prolog                 |         |
| Properties              | properties             |         |
| Protocol Buffers        | protobuf               |         |
| Puppet                  | puppet, pp             |         |
| Python                  | python, py, gyp        |         |
| Python profiler results | profile                |         |
| Q                       | k, kdb                 |         |
| QML                     | qml                    |         |
| R                       | r                      |         |
| Razor CSHTML            | cshtml, razor, razor-cshtml | [highlightjs-cshtml-razor](https://github.com/highlightjs/highlightjs-cshtml-razor) |
| ReasonML                | reasonml, re           |         |
| RenderMan RIB           | rib                    |         |
| RenderMan RSL           | rsl                    |         |
| Roboconf                | graph, instances       |         |
| Robot Framework         | robot, rf              | [highlightjs-robot](https://github.com/highlightjs/highlightjs-robot) |
| RPM spec files          | rpm-specfile, rpm, spec, rpm-spec, specfile | [highlightjs-rpm-specfile](https://github.com/highlightjs/highlightjs-rpm-specfile) |
| Ruby                    | ruby, rb, gemspec, podspec, thor, irb | |
| Rust                    | rust, rs               |         |
| SAS                     | SAS, sas               |         |
| SCSS                    | scss                   |         |
| SQL                     | sql                    |         |
| STEP Part 21            | p21, step, stp         |         |
| Scala                   | scala                  |         |
| Scheme                  | scheme                 |         |
| Scilab                  | scilab, sci            |         |
| Shape Expressions       | shexc                  | [highlightjs-shexc](https://github.com/highlightjs/highlightjs-shexc) |
| Shell                   | shell, console         |         |
| Smali                   | smali                  |         |
| Smalltalk               | smalltalk, st          |         |
| Solidity                | solidity, sol          | [highlightjs-solidity](https://github.com/highlightjs/highlightjs-solidity) |
| Stan                    | stan, stanfuncs        |         |
| Stata                   | stata                  |         |
| Structured Text         | iecst, scl, stl, structured-text | [highlightjs-structured-text](https://github.com/highlightjs/highlightjs-structured-text) |
| Stylus                  | stylus, styl           |         |
| SubUnit                 | subunit                |         |
| Supercollider           | supercollider, sc      | [highlightjs-supercollider](https://github.com/highlightjs/highlightjs-supercollider) |
| Swift                   | swift                  |         |
| Tcl                     | tcl, tk                |         |
| Terraform (HCL)         | terraform, tf, hcl     | [highlightjs-terraform](https://github.com/highlightjs/highlightjs-terraform) |
| Test Anything Protocol  | tap                    |         |
| TeX                     | tex                    |         |
| Thrift                  | thrift                 |         |
| TP                      | tp                     |         |
| Twig                    | twig, craftcms         |         |
| TypeScript              | typescript, ts         |         |
| VB.Net                  | vbnet, vb              |         |
| VBScript                | vbscript, vbs          |         |
| VHDL                    | vhdl                   |         |
| Vala                    | vala                   |         |
| Verilog                 | verilog, v             |         |
| Vim Script              | vim                    |         |
| x86 Assembly            | x86asm                 |         |
| XL                      | xl, tao                |         |
| XQuery                  | xquery, xpath, xq      |         |
| YAML                    | yml, yaml              |         |
| Zephir                  | zephir, zep            |         |

Languages with the specified package name are defined in separate repositories
and not included in `highlight.pack.js`.
</details>


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
  importScripts('<path>/highlight.pack.js');
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
const hljs = require("highlight.js/lib/highlight.js");
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
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
```

To set the syntax highlighting style, if your build tool processes CSS from your JavaScript entry point, you can import the stylesheet directly into your CommonJS-module:

```js
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';
```

## License

Highlight.js is released under the BSD License. See [LICENSE][7] file
for details.

## Links

The official site for the library is at <https://highlightjs.org/>.

Further in-depth documentation for the API and other topics is at
<http://highlightjs.readthedocs.io/>.

Authors and contributors are listed in the [AUTHORS.en.txt][8] file.

[1]: http://highlightjs.readthedocs.io/en/latest/api.html#inithighlightingonload
[2]: http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
[3]: http://highlightjs.readthedocs.io/en/latest/api.html#highlightblock-block
[4]: http://highlightjs.readthedocs.io/en/latest/api.html#configure-options
[5]: https://highlightjs.org/download/
[6]: http://highlightjs.readthedocs.io/en/latest/building-testing.html
[7]: https://github.com/highlightjs/highlight.js/blob/master/LICENSE
[8]: https://github.com/highlightjs/highlight.js/blob/master/AUTHORS.en.txt
