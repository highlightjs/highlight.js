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
language inside the class of `code` tags.

```html
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

The [official site][4] is where you want to go to grab the common set of
languages or a custom package. That page mentions some other options to
obtain the library as well that you can check out if just a straight up
browser package isn't what you are looking for.

The other option is through the git repository directly. This is where
you want to read the next section.

## Building

For those that grab highlight.js straight from the git repository won't
be able to start using it right away, that is because highlight.js
requires a build step first. What you need to build highlight.js is
Python 3 if you aren't going to compress the libraries -- however if you
want compression you also need Java.

For the usage info of this build script:

    python3 /path/to/tools/build.py -h

Also visit [the build docs][5] for some examples.

## License

Highlight.js is released under the BSD License. See LICENSE file for
details.

## More Info

All you need can be found on [the official site][6], but there is also
[a readthedocs page][7] for an in depth documentation of the API and
many other subjects.

Also, all authors and contributes are listed in the AUTHORS.en.txt file.

[1]: http://highlightjs.readthedocs.org/en/latest/api.html#inithighlightingonload
[2]: http://highlightjs.readthedocs.org/en/latest/api.html#highlightblock-block
[3]: http://highlightjs.readthedocs.org/en/latest/api.html#configure-options
[4]: http://highlightjs.org/download/
[5]: http://highlightjs.readthedocs.org/en/latest/building-testing.html
[6]: http://highlightjs.org/
[7]: http://highlightjs.readthedocs.org/
