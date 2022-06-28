Language contributor checklist
==============================

1. Know that you are creating a 3rd party grammar
-------------------------------------------------

*Sadly, due to lack of maintainer time we no longer merge new languages grammars
into the core library.* Instead, the project works by encouraging 3rd party
language grammar development by willing contributors ready to help and maintain
them. We're also happy to host those 3rd party language grammars at the
``highlightjs`` GitHub organization. Or you're welcome to host yourself - we're
always happy to link to to new language grammars.

We also make it easy to build, maintain, and distribute 3rd party grammar
modules so that Highlight.js can always be easily extended with new languages.
Using a 3rd party language (for end users) is often as simple as just adding a
single line of code to their JavaScript or build system.

We'd love to have your grammar as a 3rd party language module if you'd be
willing to maintain it over time.  It's easy to develop and publish a 3rd party
language module.  If you already started work in the main source tree - it's
trivial to convert your existing work into a 3rd party module. (you pretty much
just move your files into a new project folder)


2. Read extra/3RD_PARTY_QUICK_START.md
--------------------------------------

Next, read ``extra/3RD_PARTY_QUICK_START.md``.  This should provide you with a
very high-level overview of the steps for creating a third-party language
grammar for Highlight.js.


3. Create a language grammar definition file
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

The name of the file is used as a short language identifier and should be usable
as a class name in HTML and CSS.  Typically you'll place this file in your
new grammar repository under ``my_new_grammar/src/languages/``.


4. Add language metadata
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


5. Create a code example
------------------------

The code example is used both to test language detection and for the demo page
on https://highlightjs.org/. Put it in ``test/detect/<language>/default.txt``.

Take inspiration from other languages in ``test/detect/`` and read
:ref:`testing instructions <basic-testing>` for more details.


6. Write a class reference if your class uses custom classes
------------------------------------------------------------

A class reference document should typically be placed at the root of your
language repository: ``css-class-reference.md``

Describe shortly names of all meaningful modes used in your language definition.

Note: If you use custom classes please be aware that all the build-in themes
are not going to support your custom classes and you should likely also
distribute your own custom theme.


7. Request a repository at the ``highlightjs`` organization
-----------------------------------------------------------

*This is optional.*  
Of course you are free to host your repository anywhere you would like.

Request a new 3rd party grammar repository hosted in highlightjs with Issue Type 
`**Issue: Request a new 3rd party grammar repository** 
<https://github.com/highlightjs/highlight.js/issues/new/choose>`_

8. Create a pull request
------------------------

Submit a PR to add your language to `SUPPORTED_LANGUAGES.md <https://github.com/highlightjs/highlight.js/SUPPORTED_LANGUAGES.md>`_.
