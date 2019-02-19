Building and testing
====================

To actually run highlight.js it is necessary to build it for the environment
where you're going to run it: a browser, the node.js server, etc.

Building a bundle from the command line
--------
After installing, you can use `hljs` directly from the command line to build a bundle
with the core languages you need. This is useful for software that requires hljs as part of a build chain.

Usage: `hljs [options] [<language>...]`

Options:
  -d, --docs           Include documentation and demo (when target "browser")
  -n, --no-compress    Disable compression
  -o, --output <path>  directory to output to
                       (default: "/usr/local/lib/node_modules/highlight.js/build")
  -t, --target <name>  Build for target [all, browser, cdn, node] (default: "browser")
  -h, --help           output usage information

Unlike the legacy build tool (section below), it disables generation of docs and demo files by default.

### Example
The following example shows how to build a highlightjs bundle with that outputs to the "js/deps" directory, and includes only the "xml", "javascript", and "css" languages in the bundle.
The bundle is outputted uncompressed (`-n`).

```Bash
hljs -n --output js/deps/ xml javascript css
```

Build just for Web, don't include docs:

```Bash
hljs --output "some/path" xml javascript
```

Build for Web, include docs:

```Bash
hljs --docs --output "some/path" xml javascript
```

Build for NodeJS:

```Bash
hljs -t node --output "some/path" xml javascript
```

Build for everything (Node and Browser):

```Bash
hljs -t all --output "some/path" xml javascript
```

If you provide no arguments, a bundle is built as the described below (the old way).

Building (the old way)
--------

The build tool is written in JavaScript using node.js. Before running the
script, make sure to have node installed and run ``npm install`` to get the
dependencies.

The tool is located in ``tools/build.js``. A few useful examples:

* Build for a browser using only common languages::

    node tools/build.js :common

* Build for node.js including all available languages::

    node tools/build.js -t node

* Build two specific languages for debugging, skipping compression in this case::

    node tools/build.js -n python ruby

On some systems the node binary is named ``nodejs``; simply replace ``node``
with ``nodejs`` in the examples above if that is the case.

The full option reference is available with the usual ``--help`` option.

The build result will be in the ``build/`` directory.

.. _basic-testing:

Basic testing
-------------

The usual approach to debugging and testing a language is first doing it
visually. You need to build highlight.js with only the language you're working
on (without compression, to have readable code in browser error messages) and
then use the Developer tool in ``tools/developer.html`` to see how it highlights
a test snippet in that language.

A test snippet should be short and give the idea of the overall look of the
language. It shouldn't include every possible syntactic element and shouldn't
even make practical sense.

After you satisfied with the result you need to make sure that language
detection still works with your language definition included in the whole suite.

Testing is done using `Mocha <http://mochajs.org/>`_ and the
files are found in the ``test/`` directory. You can use the node build to
run the tests in the command line with ``npm test`` after installing the
dependencies with ``npm install``.

**Note**: for Debian-based machine, like Ubuntu, you might need to create an
alias or symbolic link for nodejs to node. The reason for this is the
dependencies that are requires to test highlight.js has a reference to
"node".

Place the snippet you used inside the browser in
``test/detect/<language>/default.txt``, build the package with all the languages
for node and run the test suite. If your language breaks auto-detection, it
should be fixed by :ref:`improving relevance <relevance>`, which is a black art
in and of itself. When in doubt, please refer to the discussion group!


Testing markup
--------------

You can also provide additional markup tests for the language to test isolated
cases of various syntactic construct. If your language has 19 different string
literals or complicated heuristics for telling division (``/``) apart from
regexes (``/ .. /``) -- this is the place.

A test case consists of two files:

* ``test/markup/<language>/<test_name>.txt``: test code
* ``test/markup/<language>/<test_name>.expect.txt``: reference rendering

To generate reference rendering use the Developer tool located at
``tools/developer.html``. Make sure to explicitly select your language in the
drop-down menu, as automatic detection is unlikely to work in this case.


