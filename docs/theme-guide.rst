Theme Guide
===========


Key principle
-------------

**Highlight.js themes are language agnostic.** Instead of trying to make a
*rich* set of highlightable classes look great in a handful of languages we have
a *limited* set of classes that work well for many languages.

Hence, there are two important implications:

* Highlight.js themes can tend to be minimalistic (this has improved over time).
* It's not always possible to exactly emulate themes from other highlighting engines.


Defining a theme
----------------

A theme is a single CSS file defining styles for the scopes listed in the
:doc:`scopes reference </css-classes-reference>`. The general guideline is to
style the core/common set of classes, however an author may deliberately choose
to exclude some (for example, ``.attr`` is usually left unstyled).  Use our
:ref:`auto-check<autocheck>` tool to provide additional guidance on this.

You are not required to invent a separate styling for every group of class
names, it's perfectly okay to group them:

::

  .hljs-string,
  .hljs-section,
  .hljs-selector-class,
  .hljs-template-variable,
  .hljs-deletion {
    color: #800;
  }

Use as few or as many unique style combinations as you want.


.. _autocheck:

Auto-checking your theme
------------------------

We provide a tool to auto-checking your theme to see that it provides good scope coverage.

::

  ./tools/checkTheme.js src/styles/your_theme.css

Follow the simple guidance provided to fix any issues.

Theming dos and don'ts
------------------------------------

Don't use:

* non-standard borders/margin/paddings for the root container ``.hljs``
* specific font faces
* font size, line height and anything that affects position and size of
  characters within the container

Okay to use:

* colors (obviously!)
* italic, bold, underlining, etc.
* image backgrounds

These may seem arbitrary at first but it's what has shown to make sense in
practice.

There's also a common set of rules that *must* to be defined for the root
container verbatim:

::

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
  }

If your theme lives within the core project you do not need to add these rules
by hand as they are added by default during the build process.


``.subst``
----------

One important caveat: don't forget to style ``.subst``. It's used for parsed
sections within strings and almost always should be reset to the default color:

::

  .hljs,
  .hljs-subst {
    color: black;
  }


Contributing
------------

You should include a comment at the top of the CSS file with attribution and
other meta data if necessary. The format is free:

::

  /*

  Fancy style (c) John Smith <email@domain.com>

  */

Also update CHANGES.md with your contribution.

Send your contribution as a pull request on GitHub.
