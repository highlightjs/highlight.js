CSS classes reference
=====================


Stylable classes
----------------

+------------------------------------------------------------------------------+
| **General-purpose**                                                          |
+--------------------------+---------------------------------------------------+
| keyword                  | keyword in a regular Algol-style language         |
+--------------------------+---------------------------------------------------+
| built_in                 | built-in or library object (constant, class,      |
|                          | function)                                         |
+--------------------------+---------------------------------------------------+
| type                     | user-defined type in a language with first-class  |
|                          | syntactically significant types, like Haskell     |
+--------------------------+---------------------------------------------------+
| literal                  | special identifier for a built-in value ("true",  |
|                          | "false", "null")                                  |
+--------------------------+---------------------------------------------------+
| number                   | number, including units and modifiers, if any.    |
+--------------------------+---------------------------------------------------+
| regexp                   | literal regular expression                        |
+--------------------------+---------------------------------------------------+
| string                   | literal string, character                         |
+--------------------------+---------------------------------------------------+
| subst                    | parsed section inside a literal string            |
+--------------------------+---------------------------------------------------+
| symbol                   | symbolic constant, interned string, goto label    |
+--------------------------+---------------------------------------------------+
| class                    | class or class-level declaration (interfaces,     |
|                          | traits, modules, etc)                             |
+--------------------------+---------------------------------------------------+
| function                 | function or method declaration                    |
+--------------------------+---------------------------------------------------+
| title                    | name of a class or a function at the place of     |
|                          | declaration                                       |
+--------------------------+---------------------------------------------------+
| params                   | block of function arguments (parameters) at the   |
|                          | place of declaration                              |
+--------------------------+---------------------------------------------------+
| **Meta**                                                                     |
+--------------------------+---------------------------------------------------+
| comment                  | comment                                           |
+--------------------------+---------------------------------------------------+
| doctag                   | documentation markup within comments              |
+--------------------------+---------------------------------------------------+
| meta                     | flags, modifiers, annotations, processing         |
|                          | instructions, preprocessor directive, etc         |
+--------------------------+---------------------------------------------------+
| meta-keyword             | keyword or built-in within meta construct         |
+--------------------------+---------------------------------------------------+
| meta-string              | string within meta construct                      |
+--------------------------+---------------------------------------------------+
| **Tags, attributes, configs**                                                |
+--------------------------+---------------------------------------------------+
| section                  | heading of a section in a config file, heading in |
|                          | text markup                                       |
+--------------------------+---------------------------------------------------+
| tag                      | XML/HTML tag                                      |
+--------------------------+---------------------------------------------------+
| name                     | name of an XML tag, the first word in an          |
|                          | s-expression                                      |
+--------------------------+---------------------------------------------------+
| builtin-name             | s-expression name from the language standard      |
|                          | library                                           |
+--------------------------+---------------------------------------------------+
| attr                     | name of an attribute with no language defined     |
|                          | semantics (keys in JSON, setting names in .ini),  |
|                          | also sub-attribute within another highlighted     |
|                          | object, like XML tag                              |
+--------------------------+---------------------------------------------------+
| attribute                | name of an attribute followed by a structured     |
|                          | value part, like CSS properties                   |
+--------------------------+---------------------------------------------------+
| variable                 | variable in a config or a template file,          |
|                          | environment var expansion in a script             |
+--------------------------+---------------------------------------------------+
| **Markup**                                                                   |
+--------------------------+---------------------------------------------------+
| bullet                   | list item bullet in text markup                   |
+--------------------------+---------------------------------------------------+
| code                     | code block in text markup                         |
+--------------------------+---------------------------------------------------+
| emphasis                 | emphasis in text markup                           |
+--------------------------+---------------------------------------------------+
| strong                   | strong emphasis in text markup                    |
+--------------------------+---------------------------------------------------+
| formula                  | mathematical formula in text markup               |
+--------------------------+---------------------------------------------------+
| link                     | hyperlink in text markup                          |
+--------------------------+---------------------------------------------------+
| quote                    | quotation in text markup                          |
+--------------------------+---------------------------------------------------+
| **CSS**                                                                      |
+--------------------------+---------------------------------------------------+
| selector-tag             | tag selector in CSS                               |
+--------------------------+---------------------------------------------------+
| selector-id              | #id selector in CSS                               |
+--------------------------+---------------------------------------------------+
| selector-class           | .class selector in CSS                            |
+--------------------------+---------------------------------------------------+
| selector-attr            | [attr] selector in CSS                            |
+--------------------------+---------------------------------------------------+
| selector-pseudo          | :pseudo selector in CSS                           |
+--------------------------+---------------------------------------------------+
| **Templates**                                                                |
+--------------------------+---------------------------------------------------+
| template-tag             | tag of a template language                        |
+--------------------------+---------------------------------------------------+
| template-variable        | variable in a template language                   |
+--------------------------+---------------------------------------------------+
| **diff**                                                                     |
+--------------------------+---------------------------------------------------+
| addition                 | added or changed line in a diff                   |
+--------------------------+---------------------------------------------------+
| deletion                 | deleted line in a diff                            |
+--------------------------+---------------------------------------------------+
| **ReasonML**                                                                 |
+--------------------------+---------------------------------------------------+
| operator                 | reasonml operator such as pipe                    |
+--------------------------+---------------------------------------------------+
| pattern-match            | reasonml pattern matching matchers                |
+--------------------------+---------------------------------------------------+
| typing                   | type signatures on function parameters            |
+--------------------------+---------------------------------------------------+
| constructor              | type constructors                                 |
+--------------------------+---------------------------------------------------+
| module-access            | scope access into a ReasonML module               |
+--------------------------+---------------------------------------------------+
| module                   | ReasonML module reference within scope access     |
+--------------------------+---------------------------------------------------+


Language names and aliases
--------------------------

The language names and aliases table has moved to the project
[README](https://github.com/highlightjs/highlight.js)
