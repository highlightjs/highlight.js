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

* Build for a browser using only common languages (they will be listed as it
works):

::

  python3 tools/build.py :common

* Build for node.js including all available languages:

::

  python3 tools/build.py -t node

* Build two specific languages for debugging, skipping compression in this case:

::

  python3 tools/build.py -n python ruby

The full option reference is available with the usual ``--help`` option.

The build result will be in the ``build/`` directory.


Testing
-------

Testing is done in a browser using the provided ``src/test.html`` file that
contains snippets for all the supported languages. You can use browser builds
with all or only some of the languages, with or without compression.

The usual approach to debugging and testing a language is first building
highlight.js with only the language you're working on without compression
(to have readable code in browser error messages). After this you have to build
the entire package with all the languages and see if anything is broken. If your
language breaks auto-detection it should be fixed by
:ref:`improving relevance <relevance>` and is a black art in and of itself. When
in doubt, please refer to the discussion group!
