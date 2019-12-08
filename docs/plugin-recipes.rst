.. highlight:: javascript

Recipes
==============

Below is a collection of useful plugin "recipes" that you might find helpful.


data-language
-------------

Let's say you'd like to track the language that was auto-detected via a
`data attribute <https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes>`_.
This might prove useful if you desired to add a dynamic label
via CSS with ``:before``, etc.

::

    hljs.addPlugin( {
      afterHighlightBlock: ({block, result}) => {
        // move the language from the result into the dataset
        block.dataset.language = result.language }
    })



