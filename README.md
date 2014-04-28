# Highlight.js

Highlight.js highlights syntax in code examples on blogs, forums and,
in fact, on any web page. It's very easy to use because it works
automatically: finds blocks of code, detects a language, highlights it.

## Getting Started

The bare minimum for using highlight.js is linking to the library along
with one of the styles and call [`initHighlightingOnLoad`][1]:

```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

This will highlight anything inside of `<pre><code>` using the auto
detection to figure the language by default.

But what if you already know what language you want highlighted? Well
the way to shut off auto detection for certain blocks is to specify the
language inside the class of either `pre` or `code` tags.

```html
<pre class="html"><code>...</code></pre>
<!-- or -->
<pre><code class="html">...</code></pre>
```

Just in case you have class names that conflict inside your stylesheets,
you can prefix these language names with either `language-` or `lang-`.
In the examples case to can replace plain-old `html` class with
`language-html` or any other languages that are supported, and it will
highlight in the syntax of that language.

But sometimes you don't want to highlight something inside of
`<pre><code>`; for cases like this, you would use `no-highlight` class:

```html
<pre><code class="no-highlight">...</code></pre>
```

### Custom Initialization

When you need a bit more control over the initialization of
highlight.js, you can use the [`highlightBlock`][2] and [`configure`][3]
functions.

Say you want to use jQuery to initialize:

```javascript
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};)
```

This will essentially be equivalent to calling
[`hljs.initHighlightingOnLoad`][1].

Maybe you don't want to use the `<pre><code>` tags and just want a div
without any use of the two `pre` and `code` tags. In that case you will
need to configure highlight.js to use the `br` tag with the `useBR`
option:

```javascript
hljs.configure({useBR: true});

$('div.code').each(function(i, block) {
  hljs.highlightBlock(block);
});
```

There are other options that can be used before highlight, but some
common cases, besides `useBR`, is replacing tab with something else
using `tabReplace`:

```javascript
hljs.configure({tabReplace: '    '}); // 4 spaces
// or
hljs.configure({tabReplace: '<span class="indent">\t</span>'});

hljs.initHighlightingOnLoad();
```

To look at the other options, check out the [configuration docs][3].

## Getting the Library

There are several ways to get highlight.js as a local copy or through a
CDN. The first one is with our [official site][4], where you can get the
common set of languages or a custom package.

The another way is with node.js version using npm:

    npm install highlight.js

There is also a [third-party][5] package for bower that you can use. The
way to install that is:

    bower install highlightjs

If you wish to use a CDN, there are two different CDNs that highlight.js
currently support. The first one is [yandex][6], and the other is
[cdnjs][7]. You just need to replace the source for the library itself
and the styles with the url that corresponds with the CDN you are using.

For further explanation, check out [the download][4] page on our site.

You can use `highlightBlock` to highlight blocks dynamically inserted into
the page. Just make sure you don't do it twice for already highlighted
blocks.

If your code container relies on `<br>` tags instead of line breaks (i.e. if
it's not `<pre>`) set the `useBR` option to `true`:

```javascript
hljs.configure({useBR: true});
$('div.code').each(function(i, e) {hljs.highlightBlock(e)});
```


## Heuristics

Autodetection of a code's language is done using a simple heuristic:
the program tries to highlight a fragment with all available languages and
counts all syntactic structures that it finds along the way. The language
with greatest count wins.

This means that in short fragments the probability of an error is high
(and it really happens sometimes). In this cases you can set the fragment's
language explicitly by assigning a class to the `<code>` element:

```html
<pre><code class="language-html">...</code></pre>
```

You can use class names prefixed with "language-" (or "lang-")
as [recommended in the HTML Living Standard][sem],
for example "language-html" or "language-php".
Classes also can be assigned to the `<pre>` element.

To disable highlighting of a fragment altogether use "no-highlight" class:

```html
<pre><code class="no-highlight">...</code></pre>
```

[sem]: http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-code-element


## Export

File export.html contains a little program that allows you to paste in a code
snippet and then copy and paste the resulting HTML code generated by the
highlighter. This is useful in situations when you can't use the script itself
on a site.


## Meta

- Version: 8.0
- URL:     http://highlightjs.org/

For the license terms see LICENSE files.
For authors and contributors see AUTHORS.en.txt file.
