Building and testing
====================

To actually run highlight.js it is necessary to build it for the environment
where you're going to run it: a browser, the node.js server, etc.


Building
--------

The build tool is written in Python, 3.x version. It also can use
YUICompressor for the in-browser builds so make sure you have Java installed
for that too.

The tool is located in ``tools/build.py``. A few useful examples:

* Build for a browser using only common languages::

    python3 tools/build.py :common

* Build for node.js including all available languages::

    python3 tools/build.py -t node

* Build two specific languages for debugging, skipping compression in this case::

    python3 tools/build.py -n python ruby

The full option reference is available with the usual ``--help`` option.

The build result will be in the ``build/`` directory.


Testing
-------

Testing is done using `mocha <https://visionmedia.github.io/mocha/>` and the
files are found in the ``test/`` directory. You can use the node build to
run the tests in the command line with ``npm test`` after installing the
dependencies with ``npm install``.

**Note**: for Debian-based machine, like Ubuntu, you might need to create an
alias or symbolic link for nodejs to node. The reason for this is the
dependencies that are requires to test highlight.js has a reference to
"node".

The normal tests themselves have more to do with auto-detection, but you
might want to see a visual representation of the highlighted language. To
accomplish this you can place a snippet of the language in ``src/test.html``
and use the browser build type with or without compression.

The usual approach to debugging and testing a language is first building
highlight.js with only the language you're working on without compression
(to have readable code in browser error messages). After this you have to
build the entire package -- this time for node -- with all the languages,
place the snippet you used inside the browser in
``test/detect/<language_name>/default.txt``, and run the testing suite to
see if any tests fail. If your language breaks auto-detection, it should be
fixed by :ref:`improving relevance <relevance>`, which is a black art in and
of itself. When in doubt, please refer to the discussion group!

Usage with Browserify
---------------------

highlight.js also works with `Browserify <http://browserify.org/>`, a Node.js tool for bundling browser-ready JavaScript files using npm packages. This technique gives you granular control over the bundled filesize, because you can pick only the languages you want to support. This is the programmatic equivalent of building a custom package at https://highlightjs.org/download/

    var Highlight = require("highlight.js/lib/highlight");
    var hl = new Highlight();
    hl.registerLanguage('javascript',
      require('highlight.js/lib/languages/javascript'));
