Library API
===========

Highilght.js exports a few functions as methods of the ``hljs`` object.


``highlight(language_name, value, ignore_illegals)``
----------------------------------------------------

Core highlighting function.
Accepts a language name and a string with the code to highlight. The third
parameter ``ignore_illegals``, when present and evaluates to a true value, forces
highlighting to finish even in case of detecting illegal syntax for the language
instead of throwing an exception.
Returns an object with the following properties:

* ``language``: language name, same as the one passed into a function, returned for consistency with ``highlightAuto``
* ``relevance``: integer value
* ``keyword_count``: integer value
* ``value``: HTML string with highlighting markup


``highlightAuto(value)``
------------------------

Highlighting with language detection.
Accepts a string with the code to highlight.
Returns an object with the following properties:

* ``language``: detected language
* ``relevance``: integer value
* ``keyword_count``: integer value
* ``value``: HTML string with highlighting markup
* ``second_best``: object with the same structure for second-best heuristically detected language, may be absent


``fixMarkup(value, tabReplace, usBR)``
--------------------------------------

Post-processing of the highlighted markup.
Accepts a string with the highlighted markup and two optional values:

* ``tabReplace``: arbitrary string (may contain HTML) to replace TAB characters with
* ``useBR``: a boolean flag to replace real line-breaks with ``<br>`` which is useful for non-``<pre>`` containers


``highlightBlock(block, tabReplace, useBR)``
--------------------------------------------

Applies highlighting to a DOM node containing code.
Accepts a DOM node and two optional parameters for ``fixMarkup``.

This function is the one to use to apply highlighting dynamically after page load
or within initialization code of third-party Javascript frameworks.


``initHighlighting()``
----------------------

Applies highlighting to all ``<pre><code>..</code></pre>`` blocks on a page.

To control tab replacement  use global flags on ``hljs`` object before initialization:

::

  hljs.tabReplace = '    '; //4 spaces
  hljs.initHighlighting();


``initHighlightingOnLoad()``
----------------------------

Attaches highlighting to the page load event.
