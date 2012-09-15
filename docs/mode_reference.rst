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
If absent, ``begin`` defaults to ``hljs.IMMEDIATE_RE`` that matches anything.


end
^^^

**type**: regexp

Regular expression ending a mode. For example a single quote for strings or "$" (end of line) for one-line comments.

It's often the case that a beginning regular expression defines the entire mode and doesn't need any special ending.
For example a number can be defined with ``begin: "\\b\\d+"`` which spans all the digits.

If absent, ``end`` defaults to ``hljs.IMMEDIATE_RE`` that matches anything.

Sometimes a mode can end not by itself but implicitly with its containing (parent) mode.
This is achieved with :ref:`endsWithParent <endsWithParent>` attribute.


beginWithKeyword
^^^^^^^^^^^^^^^^

**type**: boolean

Used instead of ``begin`` for modes starting with keywords to avoid needless repetition:

::

  {
    begin: '\\b(extends|implements) ',
    keywords: 'extends implements'
  }
  
… becomes:

::

  {
    beginWithKeywords: true, keywords: 'extends implements'
  }


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


.. _lexems:

lexems
^^^^^^

**type**: regexp

A regular expression extracting individual lexems from language text to find ``[[#keywords]]`` among them.
Default value is ``hljs.IDENT_RE`` which works for most languages.


.. _keywords:

keywords
^^^^^^^^

**type**: object

Keyword definition comes in two forms:

* ``'for while if else weird_voodoo|10 ... '`` -- a string of space-separated keywords with an optional relevance over a pipe
* ``{'keyword': ' ... ', 'literal': ' ... '}`` -- an object whose keys are names of different kinds of keywords and values
                                                  are keyword definition strings in the first form

For detailed explanation see [[Language]] definition guide.


illegal
^^^^^^^

**type**: regexp

A regular expression defining symbols illegal for the mode.
When the parser finds a match for illegal expression it immediately drops parsing the whole language altogether.


excludeBegin, excludeEnd
^^^^^^^^^^^^^^^^^^^^^^^^
 
**type**: boolean

Exclude beginning or ending lexems out of mode's generated markup. For example in CSS syntax a rule ends with a semicolon.
However visually it's better not to color it as the rule contents. Having ``excludeEnd: true`` forces a ``<span>`` element for the rule to close before the semicolon.


returnBegin
^^^^^^^^^^^

**type**: boolean

Returns just found beginning lexem back into parser. This is used when beginning of a sub-mode is a complex expression
that should not only be found within a parent mode but also parsed according to the rules of a sub-mode.

Since the parser is effectively goes back it's quite possible to create a infinite loop here so use with caution!


returnEnd
^^^^^^^^^

**type**: boolean

Returns just found ending lexem back into parser. This is used for example to parse Javascript embedded into HTML.
A Javascript block ends with the HTML closing tag ``</script>`` that cannot be parsed with Javascript rules.
So it is returned back into its parent HTML mode that knows what to do with it.

Since the parser is effectively goes back it's quite possible to create a infinite loop here so use with caution!


contains
^^^^^^^^

**type**: array

The list of sub-modes that can be found inside the mode. For detailed explanation see [[Language]] definition guide.


starts
^^^^^^

**type**: identifier

The name of the mode that will start right after the current mode ends. The new mode won't be contained within the current one.

Currently this attribute is used to highlight Javascript and CSS contained within HTML.
Tags ``<script>`` and ``<style>`` start sub-modes that use another language definition to parse their contents (see :ref:`subLanguage`).


.. _subLanguage:

subLanguage
^^^^^^^^^^^

**type**: identifier

The name of another language used to parse the contents of the mode.
When using this attribute there's not point to define internal parsing rules like :ref:`lexems` or :ref:`keywords`.
Also it is recommended to skip ``className`` attribute since the sublanguage will wrap the text in its own ``<span class="language-name">``

If the attribute is set to an empty string highlight.js will highlight the mode contents with language detection.

Note that for this to work the language should be included in package (obviously).
