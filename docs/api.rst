Core API
========

Highlight.js exports a few functions as methods of the ``hljs`` object.

.. _newerapi:

highlight
---------

::

  highlight(code, {language, ignoreIllegals})

Core highlighting function.  Accepts the code to highlight (string) and a list of options (object).
The ``language`` parameter must be present and specify the language name or alias
of the grammar to be used for highlighting.
The ``ignoreIllegals`` is an optional parameter that when ``true`` forces highlighting
to finish even in case of detecting illegal syntax for the
language instead of throwing an exception.

Returns an object with the following properties:

* ``language``: language name, same as the name passed in ``languageName``, returned for consistency with ``highlightAuto``
* ``relevance``: integer value representing the relevance score
* ``value``: HTML string with highlighting markup
* ``top``: top of the current mode stack
* ``illegal``: boolean representing whether any illegal matches were found
* ``code``: the original raw code



highlightAuto
-------------

::

  highlightAuto(code, languageSubset)

Highlighting with language detection.
Accepts a string with the code to highlight and an optional array of language names and aliases restricting detection to only those languages. The subset can also be set with ``configure``, but the local parameter overrides the option if set.

Returns an object with the following properties:

* ``language``: detected language
* ``relevance``: integer value representing the relevance score
* ``value``: HTML string with highlighting markup
* ``secondBest``: object with the same structure for second-best heuristically detected language (may be absent)


highlightElement
----------------

::

  highlightElement(element)

Applies highlighting to a DOM node containing code.

This function is the one to use to apply highlighting dynamically after page load
or within initialization code of third-party JavaScript frameworks.

The function uses language detection by default but you can specify the language
in the ``class`` attribute of the DOM node. See the :doc:`scopes reference
</css-classes-reference>` for all available language names and scopes.




highlightAll
------------

Applies highlighting to all elements on a page matching the configured ``cssSelector``.
The default ``cssSelector`` value is ``'pre code'``, which highlights all code blocks.
This can be called before or after the page's ``onload`` event has fired.


newInstance
-----------

Returns a new instance of the highlighter with default configuration.


configure
---------

::

  configure(options)

Configures global options:

* ``classPrefix``: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets.
* ``languages``: an array of language names and aliases restricting auto detection to only these languages.
* ``languageDetectRe``: a regex to configure how CSS class names map to language (allows class names like say `color-as-php` vs the default of `language-php`, etc.)
* ``noHighlightRe``: a regex to configure which CSS classes are to be skipped completely.
* ``cssSelector``: a CSS selector to configure which elements are affected by ``hljs.highlightAll``. Defaults to ``'pre code'``.
* ``ignoreUnescapedHTML``: do not log warnings to console about unescaped HTML in code blocks
* ``throwUnescapedHTML``: throw a ``HTMLInjectionError`` when ``highlightElement`` is asked to highlight content that includes unescaped HTML


Accepts an object representing options with the values to updated. Other options don't change
::

  hljs.configure({
    noHighlightRe: /^do-not-highlightme$/i,
    languageDetectRe: /\bgrammar-([\w-]+)\b/i, // for `grammar-swift` style CSS naming
    classPrefix: ''     // don't append class prefix
                        // … other options aren't changed
  });


registerLanguage
----------------

::

  registerLanguage(languageName, languageDefinition)

Adds new language to the library under the specified name. Used mostly internally.

* ``languageName``: a string with the name of the language being registered
* ``languageDefinition``: a function that returns an object which represents the
  language definition. The function is passed the ``hljs`` object to be able
  to use common regular expressions defined within it.


unregisterLanguage
------------------

::

  unregisterLanguage(languageName)

Removes a language and its aliases from the library. Used mostly internally.

* ``languageName``: a string with the name of the language being removed.


registerAliases
---------------

::

  registerAliases(alias|aliases, {languageName})

Adds new language alias or aliases to the library for the specified language name defined under ``languageName`` key.

* ``alias|aliases``: a string or array with the name of alias being registered
* ``languageName``: the language name as specified by ``registerLanguage``.


listLanguages
-------------

Returns the languages names list.


.. _getLanguage:


getLanguage
-----------

::

  getLanguage(name)

Looks up a language by name or alias.

Returns the language object if found, ``undefined`` otherwise.


versionString
-------------

::

   versionString

Returns the full Highlight.js version as a string, ie: ``"11.0.1"``.


safeMode
--------

::

   safeMode()

Enables safe mode. This is the default mode, providing the most reliable experience for production usage.


debugMode
---------

::

   debugMode()

Enables *debug/development* mode.

.. warning::

   This mode purposely makes Highlight.js more fragile!  It should only be used for testing and local development (of languages or the library itself).

For example, if a new version suddenly had a serious bug (or breaking change) that affected only a single language:

* **In Safe Mode** all other languages would continue to highlight just fine. The broken language would appear as a code block, but without any highlighting (as if it were plaintext).
* **In Debug Mode** all highlighting would stop and a JavaScript error would be thrown.

addPlugin
---------

::

  addPlugin(plugin)

Add a plugin to this instance of Highlight.js.  See the :doc:`plugin api </plugin-api>` for additional plugin information.
removePlugin
---------

::

  removePlugin(plugin)

Remove the specified plugin from this instance.  ``plugin`` must be exactly the same object that was passed to 


Deprecated API
--------------

highlight
^^^^^^^^^

.. deprecated:: 10.7 This will be removed entirely in v12.

::

  highlight(languageName, code)


Please see the :ref:`newer API<newerapi>` shown above.


highlightBlock
^^^^^^^^^^^^^^

.. deprecated:: 11.0 Please use ``highlightElement()`` instead.


initHighlighting
^^^^^^^^^^^^^^^^

.. deprecated:: 10.6 Please use ``highlightAll()`` instead.



initHighlightingOnLoad
^^^^^^^^^^^^^^^^^^^^^^

.. deprecated:: 10.6 Please use ``highlightAll()`` instead.

