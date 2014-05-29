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


end
^^^

**type**: regexp

Regular expression ending a mode. For example a single quote for strings or "$" (end of line) for one-line comments.

It's often the case that a beginning regular expression defines the entire mode and doesn't need any special ending.
For example a number can be defined with ``begin: "\\b\\d+"`` which spans all the digits.

If absent, ``end`` defaults to a regexp that matches anything, so the mode ends immediately.

Sometimes a mode can end not by itself but implicitly with its containing (parent) mode.
This is achieved with :ref:`endsWithParent <endsWithParent>` attribute.


beginKeywords
^^^^^^^^^^^^^^^^

**type**: string

Used instead of ``begin`` for modes starting with keywords to avoid needless repetition:

::

  {
    begin: '\\b(extends|implements) ',
    keywords: 'extends implements'
  }

… becomes:

::

  {
    beginKeywords: 'extends implements'
  }

Unlike the :ref:`keywords <keywords>` attribute, this one allows only a simple list of space separated keywords.
If you do need additional features of ``keywords`` or you just need more keywords for this mode you may include ``keywords`` along with ``beginKeywords``.


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


.. _lexemes:

lexemes
^^^^^^^

**type**: regexp

A regular expression that extracts individual lexemes from language text to find :ref:`keywords <keywords>` among them.
Default value is ``hljs.IDENT_RE`` which works for most languages.


.. _keywords:

keywords
^^^^^^^^

**type**: object

Keyword definition comes in two forms:

* ``'for while if else weird_voodoo|10 ... '`` -- a string of space-separated keywords with an optional relevance over a pipe
* ``{'keyword': ' ... ', 'literal': ' ... '}`` -- an object whose keys are names of different kinds of keywords and values are keyword definition strings in the first form

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
each having all the attributes from the main definition augmented or overriden by the variants::

  {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    relevance: 0,
    variants: [
      {begin: /"/, end: /"/},
      {begin: /'/, end: /'/, relevance: 1}
    ]
  }


.. _subLanguage:

subLanguage
^^^^^^^^^^^

**type**: identifier

The name of another language used to parse the contents of the mode.
When using this attribute there's no point to define internal parsing rules like :ref:`lexemes` or :ref:`keywords`.
Also it is recommended to skip ``className`` attribute since the sublanguage will wrap the text in its own ``<span class="language-name">``

If the attribute is set to an empty string highlight.js will highlight the mode contents with language detection.

Note that for this to work the language should be included in the package (obviously).

subLanguageMode
^^^^^^^^^^^^^^^

**type**: identifier

The only available value for this is ``'continuous'``. By default ``subLanguage`` highlights the contents of the mode as an isolated code snippet. In continuous mode every occurance of the mode is treated as a continuation of the previous one and highlighted from the point where it was interrupted before.

This is best illustrated by an example. The following snippet consists of HTML markup intermixed with some templating language::

    <link href="<% url 'style.css' absolute %>" rel="stylesheet">

To highlight HTML markup outside templating tags the language can be defined like this::

    {
      subLanguage: 'xml', subLanguageMode: 'continuous',
      contains: [ ... templating tags ... ]
    }

The outside contents will be highlighted as 'xml' up to the first double quote. Then the templating tag will be highlighted according to the rules of the templating language. And after that 'xml' will restart from the previous parsing state — inside the value of a tag — and will correctly process the closing double quote and highlight the next HTML attribute.
