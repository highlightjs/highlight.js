Library API
===========

Highlight.js exports a few functions as methods of the ``hljs`` object.


``highlight(languageName, code, ignore_illegals, continuation)``
---------------------------------------------------------

Core highlighting function.
Accepts a language name, or an alias, and a string with the code to highlight.
The ``ignore_illegals`` parameter, when present and evaluates to a true value,
forces highlighting to finish even in case of detecting illegal syntax for the
language instead of throwing an exception.
The ``continuation`` is an optional mode stack representing unfinished parsing.
When present, the function will restart parsing from this state instead of
initializing a new one.  This is used internally for `sublanguage` support.

Note: `continuation` is NOT intended to support line-by-line highlighting
because there is no requirement that a grammar handle linebreaks in any special
way. It's quite possible for a grammar to have a single mode/regex that matches
MANY lines at once.  This is not discouraged and entirely up to the grammar.

Returns an object with the following properties:

* ``language``: language name, same as the name passed in ``languageName``, returned for consistency with ``highlightAuto``
* ``relevance``: integer value representing the relevance score
* ``value``: HTML string with highlighting markup
* ``top``: top of the current mode stack
* ``illegal``: boolean representing whether any illegal matches were found


``highlightAuto(code, languageSubset)``
----------------------------------------

Highlighting with language detection.
Accepts a string with the code to highlight and an optional array of language names and aliases restricting detection to only those languages. The subset can also be set with ``configure``, but the local parameter overrides the option if set.

Returns an object with the following properties:

* ``language``: detected language
* ``relevance``: integer value representing the relevance score
* ``value``: HTML string with highlighting markup
* ``second_best``: object with the same structure for second-best heuristically detected language (may be absent)


``fixMarkup(value)``
--------------------

Post-processing of the highlighted markup. Currently consists of replacing indentation TAB characters and using ``<br>`` tags instead of new-line characters. Options are set globally with ``configure``.

Accepts a string with the highlighted markup.


``highlightBlock(block)``
-------------------------

Applies highlighting to a DOM node containing code.

This function is the one to use to apply highlighting dynamically after page load
or within initialization code of third-party Javascript frameworks.

The function uses language detection by default but you can specify the language
in the ``class`` attribute of the DOM node. See the :doc:`class reference
</css-classes-reference>` for all available language names and aliases.


``configure(options)``
----------------------

Configures global options:

* ``tabReplace``: a string used to replace TAB characters in indentation.
* ``useBR``: a flag to generate ``<br>`` tags instead of new-line characters in the output, useful when code is marked up using a non-``<pre>`` container.
* ``classPrefix``: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets.
* ``languages``: an array of language names and aliases restricting auto detection to only these languages.

Accepts an object representing options with the values to updated. Other options don't change
::

  hljs.configure({
    tabReplace: '    ', // 4 spaces
    classPrefix: ''     // don't append class prefix
                        // … other options aren't changed
  })
  hljs.initHighlighting();


``initHighlighting()``
----------------------

Applies highlighting to all ``<pre><code>..</code></pre>`` blocks on a page.



``initHighlightingOnLoad()``
----------------------------

Attaches highlighting to the page load event.


``registerLanguage(name, language)``
------------------------------------

Adds new language to the library under the specified name. Used mostly internally.

* ``name``: a string with the name of the language being registered
* ``language``: a function that returns an object which represents the
  language definition. The function is passed the ``hljs`` object to be able
  to use common regular expressions defined within it.


``listLanguages()``
----------------------------

Returns the languages names list.



.. _getLanguage:


``getLanguage(name)``
---------------------

Looks up a language by name or alias.

Returns the language object if found, ``undefined`` otherwise.


``requireLanguage(name)``
---------------------

Looks up a language by name or alias.

This should be used when one language definition depends on another.
Using this function (vs ``getLanguage``) will provide better error messaging
when a required language is missing.

Returns the language object if found, raises a hard error otherwise.


``debugMode()``
---------------

Enables *debug/development* mode.  **This mode purposely makes Highlight.js more fragile!  It should only be used for testing and local development (of languages or the library itself).**  By default "Safe Mode" is used, providing the most reliable experience for production usage.

For example, if a new version suddenly had a serious bug (or breaking change) that affected only a single language:

* **In Safe Mode**: All other languages would continue to highlight just fine.  The broken language would appear as a code block, but without any highlighting (as if it were plaintext).
* **In Debug Mode**: All highlighting would stop when an error was encountered and a JavaScript error would be thrown.
