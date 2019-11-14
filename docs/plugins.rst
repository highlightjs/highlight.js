.. highlight:: javascript

Plugins
=======

Highlight.js supports plugins.

API
---

You can add a plugin via the ``addPlugin`` API.

::

  // a plugin can be a class
  addPlugin(PluginClass, options)
  // or simply a keyed object of functions
  addPlugin({
    afterHighlightBlock: (args) => {
      ...
    }
  })

Class based plugins
^^^^^^^^^^^^^^^^^^^

This approach is useful for more complex plugins that need to deal with
configuration options or managing state.  Highlight.js will instantiate
a single instance of
your class and execute it's callbacks as necessary.

::

  class DataLanguagePlugin {
    constructor(options) {
      self.prefix = options.dataPrefix;
    }

    afterHighlightBlock({block, result}) {
      // ...
    }
  }

  hljs.addPlugin(DataLanguagePlugin, { dataPrefix: "hljs"})

Function based plugins
^^^^^^^^^^^^^^^^^^^^^

This approach is best for simpler plugins.

::

    hljs.addPlugin( {
      afterHighlightBlock: ({block, result}) => {
        // move the language from the result into the dataset
        block.dataset.language = result.language }
    })

Callbacks
---------

after:highlightBlock({block, result})
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This callback function is passed an object with two keys:

block
  The HTML element of the block that's been highlighted

result
  The result object returned by `highlight` or `highlightAuto`.


before:highlightBlock({block, language})
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This callback function is passed an object with two keys:

block
  The HTML element of the block that will be highlighted

language
  The language determined from the class attribute (or undefined).


