# Highlight.js

Highlight.js highlights syntax in code examples on blogs, forums and
in fact on any web pages. It's very easy to use because it works 
automatically: finds blocks of code, detects a language, highlights it.

Autodetection can be fine tuned when it fails by itself (see "Heuristics").

## Installation and usage

The script is installed by linking to a single file and making a single
initialization call:

    <script type="text/javascript" src="highlight.js"></script>
    <script type="text/javascript">
      initHighlightingOnLoad();
    </script>

Autodetection can work a bit slow if it includes too many languages and code
blocks are large. To speed up highlighting in this case you can pass to the
initialization function only those languages that you actually use on your pages:

    <script type="text/javascript">
      initHighlightingOnLoad('html', 'css');
    </script>

This set of languages is adhered only for autodetection but you can
always set the code's language explicitly (see "Heuristics").

Then the script looks in your page for fragments `<pre><code>...</code></pre>`
that are used traditionally to mark up code examples. Their content is
marked up by logical pieces with defined class names. The classes are
used to actually style the code elements:

    .comment {
      color: gray;
    }

    .keyword {
      font-weight: bold;
    }

    .python .string {
      color: blue;
    }

    .html .atribute .value {
      color: green;
    }

A full list of available classes is below ("Languages").

### WordPress plugin

Generally installing highlight.js in a [WordPress][wp] blog is no different
than for any other web page. However it can also be installed as a plugin.
This is useful if your blog is located on a shared hosting and you don't
have a permission to edit template and style files. Or it may be more convenient
to you this way. 

To install the plugin copy the whole directory with highlight.js to the 
WordPress plugins directory. After this you can activate and deactivate it
from the Plugins panel. There is also a page "highlight.js" under the Options
menu where you can set a list of languages and style rules. Insanely convenient :-)

[wp]: http://wordpress.org/


## Languages

This is a full list of available classes corresponding to languages' 
syntactic structures.

Python:

  keyword         keyword
  number          number
  string          string (of any любого типа)
  comment         comment
  decorator       @-decorator for functions
  function        function header "def some_name(...):"
  class           class header "class SomeName(...):"
  title           name of a function or a class inside a header
  params          everything inside parentheses in a function's or class' header
  
HTML:

  keyword         HTML tag
  tag             any tag from "<" till ">"
  comment         comment
  attribute       tag's attribute with or withou value
  value           attribute's value

CSS:

  keyword         HTML tag when in selectors, CSS keyword when in rules
  id              #some_name in selectors
  class           .some_name in selectors
  attr_selector   attribute selector (square brackets in a[href^=http://])
  comment         comment
  rules           everything from "{" till "}"
  value           property's value inside a rule, from ":" till ";" or
                  till the end of rule block

Delphi:

  keyword         keyword
  comment         comment (of any type)
  number          number
  string          string
  function        header of a function, procedure, constructor and destructor
  title           name of a function, procedure, constructor or destructor
                  inside a header
  params          everything inside parentheses in a function's header
  class           class' body from "= class" till "end;"
  
Perl:

  keyword         keyword
  comment         comment
  number          number
  string          string
  regexp          regular expression
  sub             subroutine header (from "sub" till "{")
  variable        variable starting with "$", "%", "@"

PHP:

  keyword         keyword
  number          number
  string          string (of any type)
  comment         comment
  phpdoc          phpdoc params in comments
  variable        variable starting with "$"

Java:

  keyword         keyword
  number          number
  string          string
  comment         commment
  annotaion       annotation
  javadoc         javadoc comment
  class           class header from "class" till "{"
  title           class name inside a header
  params          everything in parentheses inside a class header
  inheritance     keywords "extends" and "implements" inside class header

C++:

  keyword         keyword
  number          number
  string          string and character
  comment         comment
  preprocessor    preprocessor directive

## Heuristics

Autodetection of a code's language is done with a simple heuristics:
the program tries to highlight a fragment with all available languages and
counts all syntactic structures that it finds along the way. The language
with greatest count wins.

This means that in short fragments the probability of an error is high 
(and it really happens sometimes). In this cases you can set the fragment's
language explicitly by assigning a class to the `<code>` element:

    <pre><code class="html">...</code></pre>
    
To disable highlighting of a fragment altogether use "no-highlight" class:

    <pre><code class="no-highlight">...</code></pre>

## Contacts

Version: 1.0
URL:     http://softwaremaniacs.org/soft/highlight/en/
Author:  Ivan Sagalaev (Maniac@SoftwareManiacs.Org)

Contributors:

- Peter Leonov <gojpeg@gmail.com> 
- Victor Karamzin <Victor.Karamzin@enterra-inc.com>
- Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
- Anton Kovalyov <anton@kovalyov.net>
