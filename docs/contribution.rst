Language contributor checklist
==============================

1. Put language definition into a .js file
------------------------------------------

The file defines a function accepting a reference to the library and returning a language object.
The library parameter is useful to access common modes and regexps. You should not immediately call this function,
this is done during the build process and details differ for different build targets.

::

  function(hljs) {
    return {
      defaultMode: {
        contains: [ ..., hljs.NUMBER_MODE, ... ]
      }
    }
  }
  
The name of the file is used as a short language identifier and should be usable as a class name in HTML and CSS.
  

2. Provide meta data
--------------------

At the top of the file there is a specially formatted comment with meta data processed by a build system.
Meta data format is simply key-value pairs each occupying its own line:

::

  /*
  Language: Superlanguage
  Requires: java.js, sql.js
  Author: John Smith <email@domain.com>
  Contributors: Mike Johnson <...@...>, Matt Wilson <...@...>
  Description: Some cool language definition
  */

``Language`` — the only required header giving a human-readable language name.

``Requires`` — a list of other language files required for this language to work.
This make it possible to describe languages that extend definitions of other ones.
Required files aren't processed in any special way.
The build system just makes sure that they will be in the final package in ``LANGUAGES`` object.

The meaning of the other headers is pretty obvious.


3. Create a test fragment
-------------------------

The fragment should include various language features. This is used both as an example and a test case.
It's usually better to create a synthetic fragment instead of just take a snippet of an existing code
because real-world code rarely contains all language features in one place.
This fragment is also absolutely *not* required to actually work or make sense :-).
Good example are C++ and HTML fragments in ``test.html``.

Then put the fragment into the ``test.html`` similar to other languages
and test if it's properly detected and doesn't break detection of other languages.


4. Write class reference
------------------------

Class reference lives in the :doc:`CSS classes reference </css-classes-reference>`..
Describe shortly names of all meaningful modes used in your language definition.


5. Add yourself to AUTHORS.*.txt
--------------------------------

If you're a new contributor add yourself to the authors list. Feel free to use either English and/or Russian version.


6. Create a pull request
------------------------

Send your contribution as a pull request on GitHub.
