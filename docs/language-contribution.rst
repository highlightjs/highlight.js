Language contributor checklist
==============================

1. Read ``extra/3RD_PARTY_QUICK_START.md``
------------------------------------------

It contains rough high-level steps for creating a 3rd party language grammar for Highlight.js.


2. Create a language grammar definition file
--------------------------------------------

The file defines a function accepting a reference to the library and returning a language object.
The library parameter (``hljs``) is useful to access common modes and regexps. You should not
immediately call this function (you only need to export it). Calling it is handled by the build
process and details differ for different build targets.

::

  export default function(hljs) {
    return {
      name: "Language Name",
      keywords: 'foo bar',
      contains: [ ..., hljs.NUMBER_MODE, ... ]
    }
  }

The name of the file is used as a short language identifier and should be usable as a class name in HTML and CSS.


3. Add language metadata
----------------------------

At the top of the file there is a specially formatted comment with meta data processed by a build system.
Meta data format is simply key-value pairs each occupying its own line:

::

  /*
  Language: Superlanguage
  Requires: java.js, sql.js
  Author: John Smith <email@domain.com>
  Contributors: Mike Johnson <...@...>, Matt Wilson <...@...>
  Description: Some cool language definition
  Website: https://superlanguage.example.com
  */

``Language`` — the only required header giving a human-readable language name.

``Requires`` — a list of other language files required for this language to work.
This make it possible to describe languages that extend definitions of other ones.
Required files aren't processed in any special way.
The build system just makes sure that they will be in the final package in
``LANGUAGES`` object.

The meaning of the other headers should be pretty obvious.


4. Create a code example
------------------------

The code example is used both to test language detection and for the demo page
on https://highlightjs.org/. Put it in ``test/detect/<language>/default.txt``.

Take inspiration from other languages in ``test/detect/`` and read
:ref:`testing instructions <basic-testing>` for more details.


5. Write a class reference if your class uses custom classes
------------------------------------------------------------

A class reference document should typically be placed at the root of your
language repository: ``css-class-reference.md``

Describe shortly names of all meaningful modes used in your language definition.

Note: If you use custom classes please be aware that all the build-in themes
are not going to support your custom classes and you should likely also
distribute your own custom theme.


6. Request a repository at the ``highlightjs`` organization
----------------------------------------------------------

*This is optional.*  Of course you are free to host your repository anywhere
you would like.


7. Create a pull request
------------------------

Submit a PR to add your language to `SUPPORTED_LANGUAGES.md`.
