.. highlight:: javascript

Language Definition Guide
=========================

Highlighting overview
---------------------

Programming language code consists of parts with different rules of parsing: keywords like ``for`` or ``if``
don't make sense inside strings, strings may contain backslash-escaped symbols like ``\"``,
and comments usually don't contain anything interesting except the end of the comment.

In Highlight.js such parts are called "modes".

Each mode consists of:

* starting condition
* ending condition
* list of contained sub-modes
* lexing rules and keywords
* …exotic stuff like another language inside a language

The parser's work is to look for modes and their keywords.
Upon finding them, it wraps them into the markup ``<span class="...">...</span>``
and puts the name of the mode ("string", "comment", "number")
or a keyword group name ("keyword", "literal", "built-in") as the span's class name.


General syntax
--------------

A language definition is a JavaScript object describing the default parsing mode for the language.
This default mode contains sub-modes which in turn contain other sub-modes, effectively making the language definition a tree of modes.

Here's an example:

::

  {
    case_insensitive: true, // language is case-insensitive
    keywords: 'for if while',
    contains: [
      {
        scope: 'string',
        begin: '"', end: '"'
      },
      hljs.COMMENT(
        '/\\*', // begin
        '\\*/', // end
        {
          contains: [
            {
              scope: 'doc', begin: '@\\w+'
            }
          ]
        }
      )
    ]
  }

Usually the default mode accounts for the majority of the code and describes all language keywords.
A notable exception here is XML in which a default mode is just a user text that doesn't contain any keywords,
and most interesting parsing happens inside tags.


Keywords
--------

In the simple case language keywords can be defined with a string (space delimited) or array:

::

  {
    keywords: 'else for if while',
    // or with an array
    keywords: ['else', 'for', 'if', 'while']
  }

Some languages have different kinds of "keywords" that might not be called as
such by the language spec but are very close to them from the point of view of a
syntax highlighter. These are all sorts of "literals", "built-ins", "symbols"
and such. To define such keyword groups, the attribute ``keywords`` becomes an
object, each property of which defines its own group of keywords:

::

  {
    keywords: {
      keyword: 'else for if while',
      literal: ['false','true','null'],
    }
  }

The group name becomes the class name in the generated markup, enabling different
theming for different kinds of keywords.

To detect keywords, highlight.js breaks the processed chunk of code into separate
words — a process called lexing. By default, "words" are matched with the regexp
``\w+``, and that works well for many languages. Different lexing rules can be
defined by the magic ``$pattern`` attribute:

::

  {
    keywords: {
      $pattern: /-[a-z]+/,        // allow keywords to begin with dash
      keyword: '-import -export'
    }
  }

Note: The older ``lexemes`` setting has been deprecated in favor of using
``keywords.$pattern``. They are functionally identical.

Sub-modes
---------

Sub-modes are listed in the ``contains`` attribute:

::

  {
    keywords: '...',
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT,
      { ... custom mode definition ... }
    ]
  }

A mode can reference itself in the ``contains`` array by using a special keyword ``'self``'.
This is commonly used to define nested modes:

::

  {
    scope: 'object',
    begin: /\{/, end: /\}/,
    contains: [hljs.QUOTE_STRING_MODE, 'self']
  }

Note: ``self`` may not be used in the root level ``contains`` of a language.  The root level mode is special and may not be self-referential.


Comments
--------

To define custom comments it is recommended to use a built-in helper function ``hljs.COMMENT`` instead of describing the mode directly, as it also defines a few default sub-modes that improve language detection and do other nice things.

Parameters for the function are:

::

  hljs.COMMENT(
    begin,      // begin regex
    end,        // end regex
    extra       // optional object with extra attributes to override defaults
                // (for example `{ begin: /more/ }`)
  )


Markup generation
-----------------

Modes usually generate actual highlighting markup — ``<span>`` elements with specific class names that are defined by the ``scope`` attribute:

::

  {
    contains: [
      {
        scope: 'string',
        // ... other attributes
      },
      {
        scope: 'number',
        // ...
      }
    ]
  }

Scopes are not required to be unique; it's quite common to have several definitions with the same scope.
For example, many languages have various syntaxes for strings, comments, etc…

Sometimes modes are defined only to support specific parsing rules and aren't needed in the final markup.
A classic example is an escaping sequence inside strings allowing them to contain an ending quote.

::

  {
    scope: 'string',
    begin: '"', end: '"',
    contains: [{begin: '\\\\.'}],
  }

For such modes, the ``scope`` attribute should be omitted so they won't generate excessive markup.

For a list of all supported scope names please see the :doc:`Scopes Reference
</scope-reference>`.


Mode attributes
---------------

Other useful attributes are defined in the :doc:`mode reference </mode-reference>`.


Illegal symbols
---------------

Another way to improve language detection is to define illegal symbols for a mode.
For example, in Python the first line of a class definition (``class MyClass(object):``) cannot contain the symbol ``{`` or a newline.
The presence of these symbols clearly shows that the language is not Python, and the parser can drop this attempt early.

Illegal symbols are defined using a single regular expression:

::

  {
    scope: 'class',
    illegal: '[${]'
  }


Pre-defined modes and regular expressions
-----------------------------------------

Many languages share common modes and regular expressions. These expressions are defined in `lib/modes.js <https://github.com/highlightjs/highlight.js/blob/main/src/lib/modes.js>`_ and should be used whenever possible.


Regular Expression Features
---------------------------

The goal of Highlight.js is to support whatever regex features our supported JavaScript runtimes universally support.  You're using real regular expressions, use them responsibly.  That said, due to the design of the parser, there are some caveats.  These are addressed below.

Things we fully support now that we did not always:

* look-ahead regex matching for `begin` (#2135)
* look-ahead regex matching for `end` (#2237)
* look-ahead regex matching for `illegal` (#2135)
* back-references within your regex matches (#1897)

Things that technically would work, but we do not allow (because Safari does not support look-behind):

* look-behind matching for `begin` (#2135)

Things that are not supported because of issues with the parsing engine itself:

* look-behind matching for `end` matchers


Contributing
------------

Follow the :doc:`contributor checklist </language-contribution>`.
