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

* ``language``: language name, same as the name passed in ``languageName``
* ``value``: HTML string with highlighting markup
* ``top``: top of the current mode stack
* ``illegal``: boolean representing whether any illegal matches were found
* ``code``: the original raw code
highlightElement
----------------

::

  await highlightElement(element)

Applies highlighting to a DOM node containing code. Returns a ``Promise`` that
resolves when highlighting is finished.

This function is the one to use to apply highlighting dynamically after page load
or within initialization code of third-party JavaScript frameworks.

The language must be specified via the ``class`` attribute of the DOM node
(for example ``language-python`` or ``lang-python``). See the :doc:`scopes reference
</scope-reference>` for all available language names and scopes.

If the grammar is not yet registered, Highlight.js will try to load it (see
:ref:`loadLanguage`). Configure ``grammarPath`` (or register a module ``url`` via
:ref:`registerAliases`) so the loader knows where to fetch grammars. The promise
**rejects** if the language cannot be resolved or the module fails to load.



highlightAll
------------

::

  await highlightAll()

Applies highlighting to all elements on a page matching the configured ``cssSelector``.
Returns a ``Promise`` that resolves when every matched element has been processed
(or rejects if any element fails to load/highlight).

The default ``cssSelector`` value is ``'pre code'``, which highlights all code blocks.
This can be called before or after the page's ``onload`` event has fired. If the DOM
is still loading, the returned promise waits for ``DOMContentLoaded`` first.

In-flight grammar loads are deduplicated: many blocks of the same language share one
module fetch.


newInstance
-----------

Returns a new instance of the highlighter with default configuration.


configure
---------

::

  configure(options)

Configures global options:

* ``classPrefix``: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets.
* ``languageDetectRe``: a regex to configure how CSS class names map to language (allows class names like say `color-as-php` vs the default of `language-php`, etc.)
* ``noHighlightRe``: a regex to configure which CSS classes are to be skipped completely.
* ``cssSelector``: a CSS selector to configure which elements are affected by ``hljs.highlightAll``. Defaults to ``'pre code'``.
* ``grammarPath``: URL/path **prefix** for dynamic grammar modules used by
  ``loadLanguage`` / async DOM highlighting. Final module URL is
  ``grammarPath + canonicalId + ".js"`` (a trailing ``/`` is added if missing).
  Example: ``"https://cdn.example/highlight.js/languages/"``. Required for
  dynamic loading unless each grammar is given an explicit ``url`` via
  ``registerAliases``. There is no default — unset ``grammarPath`` causes
  load attempts to reject.
* ``ignoreUnescapedHTML``: do not log warnings to console about unescaped HTML in code blocks
* ``throwUnescapedHTML``: throw a ``HTMLInjectionError`` when ``highlightElement`` is asked to highlight content that includes unescaped HTML


Accepts an object representing options with the values to updated. Other options don't change
::

  hljs.configure({
    noHighlightRe: /^do-not-highlightme$/i,
    languageDetectRe: /\bgrammar-([\w-]+)\b/i, // for `grammar-swift` style CSS naming
    grammarPath: '/assets/hljs/languages/',
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


.. _registerAliases:

registerAliases
---------------

::

  registerAliases(alias|aliases, { languageName, url })

Registers one or more aliases for a language **and** (optionally) teaches the
dynamic loader how to fetch that language's module.

* ``alias|aliases``: a string or array of alias names (e.g. ``"uc"`` or ``["uc", "uni"]``)
* ``languageName``: canonical language id — the name used with ``registerLanguage``
  and the default module basename under ``grammarPath`` (``unicorn`` → ``unicorn.js``)
* ``url`` *(optional)*: full module URL for dynamic ``import()``. When set,
  ``loadLanguage`` uses this URL instead of ``grammarPath + languageName + ".js"``.
  Useful for third-party grammars hosted elsewhere.

**Two roles (same API):**

1. **After load** — aliases resolve in ``getLanguage`` / ``highlight`` once the
   language is registered (unchanged from earlier versions).
2. **Before load** — aliases resolve for ``loadLanguage`` / async
   ``highlightElement`` so ``class="language-uc"`` can fetch the right file.

Built-in grammars already have a compact alias map baked into the core build.
Third-party grammars should call ``registerAliases`` once at startup:

::

  // File will be loaded from grammarPath + "unicorn.js"
  hljs.configure({ grammarPath: '/js/languages/' });
  hljs.registerAliases(['uc', 'unicorn'], { languageName: 'unicorn' });
  await hljs.loadLanguage('uc');

  // Or skip grammarPath and point at a full module URL
  hljs.registerAliases('uc', {
    languageName: 'unicorn',
    url: 'https://cdn.example/vendor/unicorn.js'
  });
  await hljs.loadLanguage('uc');

You may also pass only the canonical name (empty alias list is uncommon); the
canonical ``languageName`` is always registered as a loadable id when ``url``
or ``grammarPath`` is available.

Note: ``registerLanguage`` still applies any ``aliases`` defined on the grammar
object itself when the module loads.


.. _loadLanguage:

loadLanguage
------------

::

  await loadLanguage(nameOrAlias, { grammarPath } = {})

Dynamically ``import()``s a grammar module, then ``registerLanguage``s it.
Returns a promise of the language object.

* ``nameOrAlias``: canonical id or alias (built-in map or ``registerAliases``)
* ``grammarPath`` *(optional)*: overrides ``configure({ grammarPath })`` for this call only

Module URL resolution order:

1. Explicit ``url`` from ``registerAliases`` (if any)
2. ``(opts.grammarPath ?? configured grammarPath) + canonicalId + ".js"``

Concurrent loads of the same canonical id are **deduplicated** (one shared promise).
Already-registered languages resolve immediately without a network fetch.

The promise **rejects** if the name is unknown, ``grammarPath``/``url`` is missing,
or the module is invalid.


loadLanguages
-------------

::

  await loadLanguages(namesOrAliases, { grammarPath } = {})

Loads many languages in parallel (same options as ``loadLanguage``).
Returns a promise of an array of language objects.


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

Remove the specified plugin from this instance.  ``plugin`` must be exactly the same object that was passed to ``addPlugin``.


Removed in v12
--------------

The following APIs were removed in Highlight.js 12.0:

* ``highlightAuto`` (language auto-detection)
* ``highlightBlock`` (use ``highlightElement``)
* ``initHighlighting`` / ``initHighlightingOnLoad`` (use ``highlightAll``)
* the older ``highlight(language, code, ignoreIllegals)`` signature
* ``autoDetection``
* ``configure({ languages })`` auto-detection subsetting
