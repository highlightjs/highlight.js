.. highlight:: javascript

Mode Reference
==============

**Data Types**

Types of attributes values in this reference:

+------------+----------------------------------------------------------------------------+
| mode       | A valid Highlight.js Mode (as defined by this very reference)              |
+------------+----------------------------------------------------------------------------+
| scope      | A valid grammar scope: ``title.class.inherited``                           |
+------------+----------------------------------------------------------------------------+
| regexp     | JavaScript regexp literal (recommended) or string representing a regexp.   |
|            |                                                                            |
|            | (note when using a string proper escaping is critical)                     |
+------------+----------------------------------------------------------------------------+
| boolean    | JavaScript boolean: ``true`` or ``false``                                  |
+------------+----------------------------------------------------------------------------+
| string     | JavaScript string                                                          |
+------------+----------------------------------------------------------------------------+
| number     | JavaScript number                                                          |
+------------+----------------------------------------------------------------------------+
| object     | JavaScript object: ``{ ... }``                                             |
+------------+----------------------------------------------------------------------------+
| array      | JavaScript array: ``[ ... ]``                                              |
+------------+----------------------------------------------------------------------------+


Language Attributes
-------------------

These attributes are only valid at the language level (ie, they many only exist on the top-most language object and have no meaning if specified in children modes).


name
^^^^

- **type**: string

The canonical name of this language, ie "JavaScript", etc.


unicodeRegex
^^^^^^^^^^^^

- **type**: boolean

Expresses whether the grammar in question uses Unicode (``u`` flag) regular expressions.
(defaults to false)


case_insensitive
^^^^^^^^^^^^^^^^

- **type**: boolean

Case insensitivity of language keywords and regexps. Used only on the top-level mode.
(defaults to false)


aliases
^^^^^^^

- **type**: array of strings

A list of additional names (besides the canonical one given by the filename) that can be used to identify a language in HTML classes and in a call to :ref:`getLanguage <getLanguage>`.


scopeAliases
^^^^^^^^^^^^^^^^

- **type**: object

A mapping table of any custom scope names your grammar uses and their supported equivalencies.  Perhaps your language has a concept of "slots" that roughly correspond to variables in other languages.  This allows you to write grammar code like:

::

  {
    scopeAliases: {
      slot: "variable",
      "message-name": "string"
    },
    contains: [
      {
        scope: "slot",
        begin: // ...
      }
    ]
  }

The final HTML output will render slots with a CSS class of ``hljs-variable``.  This feature exists to make it easier for grammar maintainers to think in their own language when maintaining a grammar.

For a list of all supported scope names please see the :doc:`Scopes Reference
</css-classes-reference>`.


disableAutodetect
^^^^^^^^^^^^^^^^^

- **type**: boolean

Disables autodetection for this language.
(defaults to false, meaning auto-detect is enabled)


__emitTokens
^^^^^^^^^^^^

.. warning::

  **This is currently still private/beta API**, though it's expected to be fairly stable.

  It should land in version 12.0.

Allows grammars to bundle custom parsers - bypassing the default parser and grammar mode definitions.  This should be a function that accepts the raw source code as the first argument and an "Emitter" object as the second.

A custom parser may parse the source as it sees fit - making calls to the Emitter along the way - allowing Highlight.js to generate and theme the final HTML.

The **Emitter** API is trivial:

- ``addText(text)``
- ``startScope(name)``
- ``endScope()``

Given:

::

  hello beautiful world!


Assuming beautiful is a keyword our Emitter calls might look something like:

::

  addText("hello ")
  startScope("keyword")
  addText("beautiful")
  endScope()
  addText(" world!")

Resulting in the following generated HTML:

.. code-block:: html

  hello <span class="hljs-keyword">beautiful</span> world!

.. note::

  The intended use of ``addText`` is larger chunks of plain text, not individual characters.  Custom parsers should buffer plain text output into complete strings rather than sending output one character at a time.

compilerExtensions
^^^^^^^^^^^^^^^^^^

.. warning::

  **This is heavily dependent upon compiler internals and may NOT be
  stable from minor release to minor release.** *It is currently recommended
  only for 1st party grammars.*

- **type**: an array of compiler extensions ie: ``(mode, parentMode) -> {}``

This allows grammars to extend the mode compiler to add their own syntactic
sugar to make reading and writing grammars easier.  The
intention is that we use grammars to "test" out new compiler extensions and if
they perform well promote them into the core library.

mode
  The incoming mode object

parentMode
  The parent mode of the mode (null for the top level language mode)

For example lets look at a tiny well behaved extension to allow us to write
``match`` as sugar to better express the intent to "match a single thing, then
end mode".

::

  compilerExtensions: [
    (mode, _parentMode) => {
      // first some quick sanity checks
      if (!mode.match) return;

      // then check for users doing things that would make no sense
      if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");

      // copy the match regex into begin
      mode.begin = mode.match;

      // cleanup: delete our syntactic construct
      delete mode.match;
    }
  ]

Compiler extension functions return nothing. They are expected to mutate the
mode itself.



Mode Attributes
---------------

className
^^^^^^^^^

.. deprecated:: 11.0

  Use ``scope`` instead.


scope
^^^^^

.. versionadded:: 11.0

- **type**: scope

The scope of a given mode. Scopes are converted to CSS class names in HTML markup.

Multiple modes can have the same scope. This is useful when a language has multiple variants of syntax
for one thing like string in single or double quotes.

::

  {
    scope: "title.function.call",
    begin: /[a-z]+\(/
  }


See :doc:`scopes reference</css-classes-reference>` for details on scopes and CSS classes.

begin
^^^^^

- **type**: regexp or array of regexp

Regular expression starting a mode. For example a single quote for strings or two forward slashes for C-style comments.
If absent, ``begin`` defaults to a regexp that matches anything, so the mode starts immediately.

This may also be an array.  See :ref:`beginScope`.

.. _beginScope:

beginScope
^^^^^^^^^^

.. versionadded:: 11.0

- **type**: scope
- **type**: numeric index of scopes (when ``begin`` is an array)

This can be used to apply a scope to just the begin match portion.

::

  {
    begin: /def/,
    beginScope: "keyword"
  }

You can also use ``beginScope`` to individually highlight portions of the match
with different scopes by passing an array to ``begin``.

::

  {
  begin: [
    /function!/,
    /\s+/,
    hljs.IDENT_RE
  ],
  beginScope: {
    1: "keyword",
    3: "title"
  },
  }

This would highlight ``function!`` as a ``keyword`` while highlighting the name
of the function as ``title``. The space(s) between would be matched, but not
highlighted.

Note: Internally, each regular expression in the array becomes a capture group
inside a larger concatenated regex.  If your regular expressions use capture
groups (or references) they will be auto-magically renumerated so that they
continue to work without any changes.

For more info see issue `#3095 <https://github.com/highlightjs/highlight.js/issues/3095>`_.


endScope
^^^^^^^^

.. versionadded:: 11.0

- **type**: scope
- **type**: numeric index of scopes (when ``end`` is an array)

This has the same behavior as ``beginScope`` but applies to the content of the
``end`` match.

::

  {
    begin: /FIRST/,
    end: /LAST/,
    endScope: "built_in"
  }


match
^^^^^

.. versionadded:: 11.0

- **type**: regexp or array of regexp

This is simply syntactic sugar for a ``begin`` when no ``end`` expression is
necessary.   It may not be used with ``begin`` or ``end`` keys (that would make
no sense).  It exists simply to help make grammars more readable.

::

  {
    scope: "title",
    match: /Fish/
  }

This is equivalent to:

::

  {
    scope: "title",
    begin: /Fish/
  }


on:begin
^^^^^^^^

- **type**: callback (matchData, response)

This callback is triggered the moment a begin match is detected. ``matchData`` includes the typical regex match data; the full match, match groups, etc. The ``response`` object is used to tell the parser how it should handle the match. It can be also used to temporarily store data.

- ``response.data`` - a simple object data store.  Can be used for building more complex rules where the end rule is dependent on the content of begin, etc.
- ``response.ignoreMatch()`` - pretend as if this match never happened. The mode is not entered. Continues trying subsequent modes in the current mode's ``contains`` list

For an example of usage see ``END_SAME_AS_BEGIN`` in ``modes.js``.


end
^^^

- **type**: regexp

Regular expression ending a mode. For example a single quote for strings or "$" (end of line) for one-line comments.

It's often the case that a beginning regular expression defines the entire mode and doesn't need any special ending.
For example a number can be defined with ``begin: "\\b\\d+"`` which spans all the digits.

If absent, ``end`` defaults to a regexp that matches anything, so the mode ends immediately (after possibly
matching any ``contains`` sub-modes).

Sometimes a mode can end not by itself but implicitly with its containing (parent) mode.
This is achieved with :ref:`endsWithParent <endsWithParent>` attribute.


on:end
^^^^^^

- **type**: callback (matchData, response)

This callback is triggered the moment an end match is detected. ``matchData`` includes the typical regex match data; the full match, match groups, etc. The ``response`` object is used to tell the parser how it should handle the match. It can also be used to retrieve data stored from a `begin` callback.

- ``response.data`` - a simple object data store.  Can be used for building more complex rules where the end rule is dependent on the content of begin, etc.
- ``response.ignoreMatch()`` - pretend as if this match never happened. The mode is not entered. Continues trying subsequent modes in the current mode's ``contains`` list

For an example of usage see ``END_SAME_AS_BEGIN`` in ``modes.js``.


beginKeywords
^^^^^^^^^^^^^

- **type**: string

Used instead of ``begin`` for modes starting with keywords to avoid needless repetition:

::

  {
    begin: '\\b(class|interface)\\b',
    keywords: 'class interface'
  }

… can often be shortened to:

::

  {
    beginKeywords: 'class interface'
  }

Unlike the :ref:`keywords <keywords>` attribute, this one allows only a simple list of space separated keywords.
If you do need additional features of ``keywords`` or you just need more keywords for this mode you may include ``keywords`` along with ``beginKeywords``.

.. note::

  ``beginKeywords`` also checks for a ``.`` before or after the keywords and will fail to match if one is found.
  This is to avoid false positives for method calls or property accesses.

  Ex. ``class A { ... }`` would match while ``A.class == B.class`` would not.

.. _endsWithParent:

endsWithParent
^^^^^^^^^^^^^^

- **type**: boolean

A flag indicating that a mode ends when its parent ends.

This is best demonstrated by example. In CSS syntax a selector has a set of rules contained within symbols "{" and "}".
Individual rules are separated by ";" but the last rule may omit the terminating semicolon:

::

  p {
    width: 100%;
    color: red
  }

A simple ``end: /;/`` rule is problematic - the parser could get "stuck" looking
for a ``;`` that it will never find (or find much later) - skipping over valid content that should be
highlighted. This is where ``endsWithParent`` proves useful:

::

  {
    scope: 'rules', begin: /\{/, end: /\}/,
    contains: [
      {scope: 'rule', /* ... */ end: ';', endsWithParent: true}
    ]
  }

The ``rule`` scope now will end when the parser sees *either* a ``;`` or a ``}`` (from the parent).

.. _endsParent:

endsParent
^^^^^^^^^^^^^^

- **type**: boolean

Forces closing of the parent mode right after the current mode is closed.

This is used for modes that don't have an easily expressible ending lexeme but
instead could be closed after the last interesting sub-mode is found.

Here's an example with two ways of defining functions in Elixir, one using a
keyword ``do`` and another using a comma:

::

  def foo :clear, list do
    :ok
  end

  def foo, do: IO.puts "hello world"

Note that in the first case the parameter list after the function title may also
include a comma. And if we're only interested in highlighting a title we can
tell it to end the function definition after itself:

::

  {
    scope: 'function',
    beginKeywords: 'def', end: hljs.MATCH_NOTHING_RE,
    contains: [
      {
        scope: 'title',
        begin: hljs.IDENT_RE, endsParent: true
      }
    ]
  }

The ``end: hljs.MATCH_NOTHING_RE`` ensures that function will never end itself.


.. _keywords:

keywords
^^^^^^^^

- **type**: object / string / array

*Keyword definition comes in three forms.*

A string of space-separated keywords with an optional relevance following a pipe (``|``):

::

  'for while if|0 else weird_voodoo|10 ...'

An array of keywords (with optional relevance  following a ``|``):

  ::

    [
      "for",
      "while",
      "if|0"
    ]

.. note::

  It's recommended that the array form be used (one keyword per line) rather
  than a string to simplify future maintenance. This is the style followed by
  grammars part of the core library.


An object that describing multiple sets of keywords and (optionally) the pattern
used to locate them:

::

  {
    keyword: [ 'for', 'while', 'if|0' ],
    literal: [ 'true', 'false' ],
    $pattern: /\w+/
  }



For a more detailed explanation see :doc:`Language definition guide </language-guide>`.


illegal
^^^^^^^

- **type**: regexp or array

A regular expression or array that defines symbols illegal for the mode. When
the parser finds an illegal match it may immediately stop parsing the whole
language altogether (see ``ignoreIllegals``). Smart use of illegal can greatly
improve auto-detection by quickly ruling out a language (when an illegal match
is found).

::

  {
    illegal: /%/,
    // or using an array
    illegal: [ /%/, /cookies/ ]
  }


excludeBegin, excludeEnd
^^^^^^^^^^^^^^^^^^^^^^^^

- **type**: boolean

Excludes beginning or ending matches from a mode's content. For example in CSS
syntax a rule ends with a semicolon. However visually it's better not to
consider the semicolon as part of the rule's contents. Using ``excludeEnd:
true`` forces a ``<span>`` element for the rule to close before the semicolon.

The semicolon is still consumed by the rule though and cannot be matched by
other subsequent rules. (it's effectively been skipped over)


returnBegin
^^^^^^^^^^^

- **type**: boolean

Returns just found beginning lexeme back into parser. This is used when beginning of a sub-mode is a complex expression
that should not only be found within a parent mode but also parsed according to the rules of a sub-mode.

.. warning::

  Since the parser is effectively goes back it's quite possible to create a infinite loop here so use with caution!
  A look-ahead regex is almost always preferable.


returnEnd
^^^^^^^^^

- **type**: boolean

Returns just found ending lexeme back into parser. This is used for example to parse JavaScript embedded into HTML.
A JavaScript block ends with the HTML closing tag ``</script>`` that cannot be parsed with JavaScript rules.
So it is returned back into its parent HTML mode that knows what to do with it.

.. warning::

  Since the parser is effectively goes back it's quite possible to create a infinite loop here so use with caution!
  A look-ahead regex is almost always preferable.


contains
^^^^^^^^

- **type**: array

The list of sub-modes that can be found inside the mode. For detailed explanation see :doc:`Language definition guide </language-guide>`.


starts
^^^^^^

- **type**: mode

The the mode that will start right after the current mode ends. The new mode will not be contained within the current one.

Currently this attribute is used to highlight JavaScript and CSS contained within HTML.
Tags ``<script>`` and ``<style>`` start sub-modes that use another language definition to parse their contents (see :ref:`subLanguage`).


variants
^^^^^^^^

- **type**: array

Modification to the main definitions of the mode, effectively expanding it into several similar modes
each having all the attributes from the main definition augmented or overridden by the variants::

  {
    scope: 'string',
    contains: ['self', hljs.BACKSLASH_ESCAPE],
    relevance: 0,
    variants: [
      {begin: /"/, end: /"/},
      {begin: /'/, end: /'/, relevance: 1}
    ]
  }

.. note::

  ``variants`` has very specific behavior with regards to ``contains: ['self']``.
  Lets consider the example above. While you might think this would allow you to
  embed any type of string (double or single quoted) within any other string, **it
  does not**.

The variants are instead compiled into to two *discrete* modes::

  { scope: 'string', begin: /"/, contains: ['self', ... ] }
  { scope: 'string', begin: /'/, contains: ['self', ... ] }

Each mode's ``self`` refers only to the new expanded mode, not the original mode
with variants (which no longer exists after compiling).

Further info: https://github.com/highlightjs/highlight.js/issues/826


.. _subLanguage:


subLanguage
^^^^^^^^^^^

- **type**: string or array

Highlights the entire contents of the mode with another language.

When using this attribute there's no point to define internal parsing rules like
:ref:`keywords`, etc. Also it is recommended to avoid the ``scope`` attribute
since the sublanguage already wraps the text in its own ``<span
class="language-name">`` tag.

The value of the attribute controls which language or languages will be used for highlighting:

* language name: explicit highlighting with the specified language
* empty array: auto detection with all the languages available
* array of language names: auto detection constrained to the specified set


skip
^^^^

- **type**: boolean

Skips any markup processing for the mode ensuring that it remains a part of its
parent buffer along with the starting and the ending lexemes. This works in
conjunction with the parent's :ref:`subLanguage` when it requires complex
parsing.

Consider parsing PHP inside HTML:

.. code-block:: php

  <p><? echo 'PHP'; /* ?> */ ?></p>

The ``?>`` inside the comment should **not** end the PHP part, so we have to
handle pairs of ``/* .. */`` to correctly find the ending ``?>``::

  {
    begin: /<\?/, end: /\?>/,
    subLanguage: 'php',
    contains: [{begin: '/\\*', end: '\\*/', skip: true}]
  }

Without ``skip: true`` every comment would cause the parser to drop out back
into the HTML mode.
