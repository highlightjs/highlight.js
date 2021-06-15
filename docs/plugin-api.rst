.. highlight:: javascript

Plugin API
==========

Highlight.js supports plugins.

API
---

You can add a plugin via the ``addPlugin`` API.

::

  // a plugin can be a class
  addPlugin(new SimplePlugin());
  addPlugin(new MoreComplexPlugin(options));

  // or simply a keyed object of functions
  addPlugin({
    'after:highlightElement': ({ el, result, text }) => {
      // ...
    }
  });

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

    'after:highlightElement'({ el, result, text }) {
      // ...
    }
  }

  hljs.addPlugin(new DataLanguagePlugin({ dataPrefix: 'hljs' }));

Function Based Plugins
^^^^^^^^^^^^^^^^^^^^^^

This approach is best for simpler plugins.

::

  hljs.addPlugin({
    'after:highlightElement': ({ el, result }) => {
      // move the language from the result into the dataset
      el.dataset.language = result.language;
    }
  });

Callbacks
---------

``before:highlight({code, language})``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This callback function is passed a context object with two keys:

code
  The code to be highlighted.

language
  The language grammar that should be used for highlighting.

Your plugin may modify either value and those new values will be used as input
to the highlighting engine.  If you add a ``result`` key to the object that
result will be returned as the overall result and the internal highlighting code
will never even be called.

If you're plugin plans to make its own recursive calls to ``highlight`` you'll
need to manually handle this. Each time ``highlight`` is called your plugin
callbacks will also be called - making it easy to get into an infinite loop.
You'll likely need to use a class based plugin and add a guard so that your
plugin code is only triggered on the initial call to ``highlight`` and not on
any internal calls your plugin itself is making.

Note: This callback does not fire from highlighting resulting from auto-language detection.

It returns nothing.


``after:highlight(result)``
^^^^^^^^^^^^^^^^^^^^^^^^^^^

This callback function is passed the ``result`` object after highlighting is
complete. Your plugin may make any changes it desires to the result object
and that will be the final return value of the initial call to ``highlight``.

Note: This callback does not fire from highlighting resulting from auto-language detection.

It returns nothing.

``after:highlightBlock({block, result, text})``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Deprecated as of 10.7.  Please use ``after:highlightElement``.

``before:highlightBlock({block, language})``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Deprecated as of 10.7.  Please use ``before:highlightElement``.


``after:highlightElement({el, result, text})``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This callback function is passed an object with two keys:

el
  The HTML element that's been highlighted.

result
  The result object returned by `highlight` or `highlightAuto`.

text
  The raw text that was to be highlighted.

It returns nothing.


``before:highlightElement({el, language})``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This callback function is passed an object with two keys:

el
  The HTML element that will be highlighted.

language
  The language determined from the class attribute (or undefined).

It returns nothing.
