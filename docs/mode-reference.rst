Mode reference
==============

Types
-----

Types of attributes values in this reference:

+------------+-------------------------------------------------------------------------------------+
| identifier | String suitable to be used as a Javascript variable and CSS class name              |
|            | (i.e. mostly ``/[A-Za-z0-9_]+/``)                                                   |
+------------+-------------------------------------------------------------------------------------+
| regexp     | String representing a Javascript regexp.                                            |
|            | Note that since it's not a literal regexp all back-slashes should be repeated twice |
+------------+-------------------------------------------------------------------------------------+
| boolean    | Javascript boolean: ``true`` or ``false``                                           |
+------------+-------------------------------------------------------------------------------------+
| number     | Javascript number                                                                   |
+------------+-------------------------------------------------------------------------------------+
| object     | Javascript object: ``{ ... }``                                                      |
+------------+-------------------------------------------------------------------------------------+
| array      | Javascript array: ``[ ... ]``                                                       |
+------------+-------------------------------------------------------------------------------------+


Attributes
----------

case_insensitive
^^^^^^^^^^^^^^^^

**type**: boolean

Case insensitivity of language keywords and regexps. Used only on the top-level mode.


aliases
^^^^^^^

**type**: array

A list of additional names (besides the canonical one given by the filename) that can be used to identify a language in HTML classes and in a call to :ref:`getLanguage <getLanguage>`.


className
^^^^^^^^^

**type**: identifier

The name of the mode. It is used as a class name in HTML markup.

Multiple modes can have the same name. This is useful when a language has multiple variants of syntax
for one thing like string in single or double quotes.


begin
^^^^^

**type**: regexp

Regular expression starting a mode. For example a single quote for strings or two forward slashes for C-style comments.
If absent, ``begin`` defaults to a regexp that matches anything, so the mode starts immediately.


on:begin
^^^^^^^^^^^

**type**: callback (matchData, response)

This callback is triggered the moment a begin match is detected. ``matchData`` includes the typical regex match data; the full match, match groups, etc. The ``response`` object is used to tell the parser how it should handle the match. It can be also used to temporarily store data.

- ``response.data`` - a simple object data store.  Can be used for building more complex rules where the end rule is dependent on the content of begin, etc.
- ``response.ignoreMatch()`` - pretend as if this match never happened. The mode is not entered. Continues trying subsequent modes in the current mode's ``contains`` list

For an example of usage see ``END_SAME_AS_BEGIN`` in ``modes.js``.


end
^^^

**type**: regexp

Regular expression ending a mode. For example a single quote for strings or "$" (end of line) for one-line comments.

It's often the case that a beginning regular expression defines the entire mode and doesn't need any special ending.
For example a number can be defined with ``begin: "\\b\\d+"`` which spans all the digits.

If absent, ``end`` defaults to a regexp that matches anything, so the mode ends immediately (after possibly
matching any ``contains`` sub-modes).

Sometimes a mode can end not by itself but implicitly with its containing (parent) mode.
This is achieved with :ref:`endsWithParent <endsWithParent>` attribute.


on:end
^^^^^^^^^^^

**type**: callback (matchData, response)

This callback is triggered the moment an end match is detected. ``matchData`` includes the typical regex match data; the full match, match groups, etc. The ``response`` object is used to tell the parser how it should handle the match. It can also be used to retrieve data stored from a `begin` callback.

- ``response.data`` - a simple object data store.  Can be used for building more complex rules where the end rule is dependent on the content of begin, etc.
- ``response.ignoreMatch()`` - pretend as if this match never happened. The mode is not entered. Continues trying subsequent modes in the current mode's ``contains`` list

For an example of usage see ``END_SAME_AS_BEGIN`` in ``modes.js``.


beginKeywords
^^^^^^^^^^^^^^^^

**type**: string

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

Note: ``beginKeywords`` also checks for a ``.`` before or after the keywords and will fail to match if one is found.
This is to avoid false positives for method calls or property accesses.

Ex. ``class A { ... }`` would match while ``A.class == B.class`` would not.

.. _endsWithParent:

endsWithParent
^^^^^^^^^^^^^^

**type**: boolean

A flag showing that a mode ends when its parent ends.

This is best demonstrated by example. In CSS syntax a selector has a set of rules contained within symbols "{" and "}".
Individual rules separated by ";" but the last one in a set can omit the terminating semicolon:

::

  p {
    width: 100%; color: red
  }

This is when ``endsWithParent`` comes into play:

::

  {
    className: 'rules', begin: '{', end: '}',
    contains: [
      {className: 'rule', /* ... */ end: ';', endsWithParent: true}
    ]
  }

.. _endsParent:

endsParent
^^^^^^^^^^^^^^

**type**: boolean

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
    className: 'function',
    beginKeywords: 'def', end: /\B\b/,
    contains: [
      {
        className: 'title',
        begin: hljs.IDENT_RE, endsParent: true
      }
    ]
  }

(The ``end: /\B\b/`` regex tells function to never end by itself.)

.. _endSameAsBegin:

endSameAsBegin (deprecated as of 10.1)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Deprecated:** *This attribute has been deprecated.*  You should instead use the
``END_SAME_AS_BEGIN`` mode or use the ``on:begin`` and ``on:end`` attributes to
build more complex paired matchers.

**type**: boolean

Acts as ``end`` matching exactly the same string that was found by the
corresponding ``begin`` regexp.

For example, in PostgreSQL string constants can use "dollar quotes",
consisting of a dollar sign, an optional tag of zero or more characters,
and another dollar sign. String constant must be ended with the same
construct using the same tag. It is possible to nest dollar-quoted string
constants by choosing different tags at each nesting level:

::

  $foo$
    ...
    $bar$ nested $bar$
    ...
  $foo$

In this case you can't simply specify the same regexp for ``begin`` and
``end`` (say, ``"\\$[a-z]\\$"``), but you can use ``begin: "\\$[a-z]\\$"``
and ``endSameAsBegin: true``.


.. _lexemes:

lexemes (now keywords.$pattern)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**type**: regexp

A regular expression that extracts individual "words" from the code to compare
against :ref:`keywords <keywords>`. The default value is ``\w+`` which works for
many languages.

Note: It's now recommmended that you use ``keywords.$pattern`` instead of
``lexemes``, as this makes it easier to keep your keyword pattern associated
with your keywords themselves, particularly if your keyword configuration is a
constant that you repeat multiple times within different modes of your grammar.

.. _keywords:

keywords
^^^^^^^^

**type**: object

Keyword definition comes in two forms:

* ``'for while if|0 else weird_voodoo|10 ... '`` -- a string of space-separated keywords with an optional relevance over a pipe
* ``{keyword: ' ... ', literal: ' ... ', $pattern: /\w+/ }`` -- an object that describes multiple sets of keywords and the pattern used to find them

For detailed explanation see :doc:`Language definition guide </language-guide>`.


illegal
^^^^^^^

**type**: regexp

A regular expression that defines symbols illegal for the mode.
When the parser finds a match for illegal expression it immediately drops parsing the whole language altogether.


excludeBegin, excludeEnd
^^^^^^^^^^^^^^^^^^^^^^^^

**type**: boolean

Exclude beginning or ending lexemes out of mode's generated markup. For example in CSS syntax a rule ends with a semicolon.
However visually it's better not to color it as the rule contents. Having ``excludeEnd: true`` forces a ``<span>`` element for the rule to close before the semicolon.


returnBegin
^^^^^^^^^^^

**type**: boolean

Returns just found beginning lexeme back into parser. This is used when beginning of a sub-mode is a complex expression
that should not only be found within a parent mode but also parsed according to the rules of a sub-mode.

Since the parser is effectively goes back it's quite possible to create a infinite loop here so use with caution!


returnEnd
^^^^^^^^^

**type**: boolean

Returns just found ending lexeme back into parser. This is used for example to parse Javascript embedded into HTML.
A Javascript block ends with the HTML closing tag ``</script>`` that cannot be parsed with Javascript rules.
So it is returned back into its parent HTML mode that knows what to do with it.

Since the parser is effectively goes back it's quite possible to create a infinite loop here so use with caution!


contains
^^^^^^^^

**type**: array

The list of sub-modes that can be found inside the mode. For detailed explanation see :doc:`Language definition guide </language-guide>`.


starts
^^^^^^

**type**: identifier

The name of the mode that will start right after the current mode ends. The new mode won't be contained within the current one.

Currently this attribute is used to highlight Javascript and CSS contained within HTML.
Tags ``<script>`` and ``<style>`` start sub-modes that use another language definition to parse their contents (see :ref:`subLanguage`).


variants
^^^^^^^^

**type**: array

Modification to the main definitions of the mode, effectively expanding it into several similar modes
each having all the attributes from the main definition augmented or overridden by the variants::

  {
    className: 'string',
    contains: ['self', hljs.BACKSLASH_ESCAPE],
    relevance: 0,
    variants: [
      {begin: /"/, end: /"/},
      {begin: /'/, end: /'/, relevance: 1}
    ]
  }

Note: ``variants`` has very specific behavior with regards to ``contains: ['self']``.
Lets consider the example above. While you might think this would allow you to
embed any type of string (double or single quoted) within any other string, it
does not allow for this.

The variants are compiled into to two *discrete* modes::

  { className: 'string', begin: /"/, contains: ['self', ... ] }
  { className: 'string', begin: /'/, contains: ['self', ... ] }

Each mode's ``self`` refers only to the new expanded mode, not the original mode
with variants (which no longer exists after compiling).

Further info: https://github.com/highlightjs/highlight.js/issues/826


.. _subLanguage:

subLanguage
^^^^^^^^^^^

**type**: string or array

Highlights the entire contents of the mode with another language.

When using this attribute there's no point to define internal parsing rules like :ref:`lexemes` or :ref:`keywords`. Also it is recommended to skip ``className`` attribute since the sublanguage will wrap the text in its own ``<span class="language-name">``.

The value of the attribute controls which language or languages will be used for highlighting:

* language name: explicit highlighting with the specified language
* empty array: auto detection with all the languages available
* array of language names: auto detection constrained to the specified set

skip
^^^^

**type**: boolean

Skips any markup processing for the mode ensuring that it remains a part of its
parent buffer along with the starting and the ending lexemes. This works in
conjunction with the parent's :ref:`subLanguage` when it requires complex
parsing.

Consider parsing PHP inside HTML::

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

disableAutodetect
^^^^^^^^^^^^^^^^^

**type**: boolean

Disables autodetection for this language.

