CSS classes reference
=====================

This is a full list of available classes corresponding to languages'
syntactic structures. The parentheses after language name contain identifiers
used as class names in ``<code>`` element.

Python ("python", "py", "gyp")
------------------------------

* ``keyword``:          keyword
* ``built_in``:         built-in objects (None, False, True and Ellipsis)
* ``number``:           number
* ``string``:           string (of any type)
* ``comment``:          comment
* ``decorator``:        @-decorator for functions
* ``function``:         function header "def some_name(...):"
* ``class``:            class header "class SomeName(...):"
* ``title``:            name of a function or a class inside a header
* ``params``:           everything inside parentheses in a function's or class' header

Python profiler results ("profile")
-----------------------------------

* ``number``:           number
* ``string``:           string
* ``built_in``:         built-in function entry
* ``filename``:         filename in an entry
* ``summary``:          profiling summary
* ``header``:           header of table of results
* ``keyword``:          column header
* ``function``:         function name in an entry (including parentheses)
* ``title``:            actual name of a function in an entry (excluding parentheses)
* ``prompt``:           interpreter prompt (>>> or ...)

Ruby ("ruby", "rb", "gemspec", "podspec", "thor")
-------------------------------------------------

* ``keyword``:          keyword
* ``string``:           string
* ``subst``:            in-string substitution (#{...})
* ``comment``:          comment
* ``yardoctag``:        YARD tag
* ``function``:         function header "def some_name(...):"
* ``class``:            class header "class SomeName(...):"
* ``title``:            name of a function or a class inside a header
* ``parent``:           name of a parent class
* ``symbol``:           symbol

Haml ("haml")
-------------

* ``tag``:              any tag starting with "%"
* ``title``:            tag's name
* ``attribute``:        tag's attribute
* ``keyword``:          tag's attribute that is a keyword
* ``string``:           attribute's value that is a string
* ``value``:            attribute's value, shorthand id or class for tag
* ``comment``:          comment
* ``doctype``:          !!! declaration
* ``bullet``:           line defined by variable

Perl ("perl", "pl")
-------------------

* ``keyword``:          keyword
* ``comment``:          comment
* ``number``:           number
* ``string``:           string
* ``regexp``:           regular expression
* ``sub``:              subroutine header (from "sub" till "{")
* ``variable``:         variable starting with "$", "%", "@"
* ``operator``:         operator
* ``pod``:              plain old doc

PHP ("php", "php3", "php4", "php5", "php6")
-------------------------------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string (of any type)
* ``comment``:          comment
* ``phpdoc``:           phpdoc params in comments
* ``variable``:         variable starting with "$"
* ``preprocessor``:     preprocessor marks: "<?php" and "?>"

Scala ("scala")
---------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          comment
* ``annotation``:       annotation
* ``javadoc``:          javadoc comment
* ``javadoctag``:       @-tag in javadoc
* ``class``:            class header
* ``title``:            class name inside a header
* ``params``:           everything in parentheses inside a class header
* ``inheritance``:      keywords "extends" and "with" inside class header

Go ("go", "golang")
-------------------

* ``comment``:          comment
* ``string``:           string constant
* ``number``:           number
* ``keyword``:          language keywords
* ``constant``:         true false nil iota
* ``typename``:         built-in plain types (int, string etc.)
* ``built_in``:         built-in functions

HTML, XML ("xml", "html", "xhtml", "rss", "atom", "xsl", "plist")
-----------------------------------------------------------------

* ``tag``:              any tag from "<" till ">"
* ``attribute``:        tag's attribute with or without value
* ``value``:            attribute's value
* ``comment``:          comment
* ``pi``:               processing instruction (<? ... ?>)
* ``doctype``:          <!DOCTYPE ... > declaration
* ``cdata``:            CDATA section

Lasso ("lasso", "ls", "lassoscript")
------------------------------------

* ``preprocessor``:     delimiters and interpreter flags
* ``shebang``:          Lasso 9 shell script header
* ``comment``:          single- or multi-line comment
* ``javadoc``:          doc comment
* ``keyword``:          keyword
* ``literal``:          keyword representing a value
* ``built_in``:         built-in types and variables
* ``number``:           number
* ``string``:           string
* ``variable``:         variable reference starting with "#" or "$"
* ``tag``:              tag literal
* ``attribute``:        named or rest parameter in method signature
* ``subst``:            unary/binary/ternary operator symbols
* ``class``:            type, trait, or method header
* ``title``:            name following "define" inside a header

CSS ("css")
-----------

* ``tag``:              tag in selectors
* ``id``:               #some_name in selectors
* ``class``:            .some_name in selectors
* ``at_rule``:          @-rule till first "{" or ";"
* ``attr_selector``:    attribute selector (square brackets in a[href^=http://])
* ``pseudo``:           pseudo classes and elemens (:after, ::after etc.)
* ``comment``:          comment
* ``rules``:            everything from "{" till "}"
* ``attribute``:        property name inside a rule
* ``value``:            property value inside a rule, from ":" till ";" or till the end of rule block
* ``number``:           number within a value
* ``string``:           string within a value
* ``hexcolor``:         hex color (#FFFFFF) within a value
* ``function``:         CSS function within a value
* ``important``:        "!important" symbol

SCSS ("scss")
-------------

* ``tag``:              tag in selectors
* ``id``:               #some_name in selectors
* ``class``:            .some_name in selectors
* ``at_rule``:          @-rule till first "{" or ";"
* ``attr_selector``:    attribute selector (square brackets in a[href^=http://])
* ``pseudo``:           pseudo classes and elemens (:after, ::after etc.)
* ``comment``:          comment
* ``rules``:            everything from "{" till "}"
* ``attribute``:        property name inside a rule
* ``value``:            property value inside a rule, from ":" till ";" or till the end of rule block
* ``number``:           number within a value
* ``string``:           string within a value
* ``hexcolor``:         hex color (#FFFFFF) within a value
* ``function``:         CSS function within a value
* ``important``:        "!important" symbol
* ``variable``:         variable starting with "$"
* ``preprocessor``:     keywords after @

Markdown ("markdown", "md", "mkdown", "mkd")
--------------------------------------------

* ``header``:            header
* ``bullet``:            list bullet
* ``emphasis``:          emphasis
* ``strong``:            strong emphasis
* ``blockquote``:        blockquote
* ``code``:              code
* ``horizontal_rule``:   horizontal rule
* ``link_label``:        link label
* ``link_url``:          link url
* ``link_reference``:    link reference

AsciiDoc ("asciidoc")
---------------------

* ``header``:            heading
* ``bullet``:            list or labeled bullet
* ``emphasis``:          emphasis
* ``strong``:            strong emphasis
* ``blockquote``:        blockquote
* ``code``:              inline or block code
* ``horizontal_rule``:   horizontal rule
* ``link_label``:        link or image label
* ``link_url``:          link or image url
* ``comment``:           comment
* ``attribute``:         document attribute, block attributes
* ``label``:             admonition label

Django ("django", "jinja")
--------------------------

* ``keyword``:          HTML tag in HTML, default tags and default filters in templates
* ``tag``:              any tag from "<" till ">"
* ``comment``:          comment
* ``doctype``:          <!DOCTYPE ... > declaration
* ``attribute``:        tag's attribute with or withou value
* ``value``:            attribute's value
* ``template_tag``:     template tag {% .. %}
* ``variable``:         template variable {{ .. }}
* ``template_comment``: template comment, both {# .. #} and {% comment %}
* ``filter``:           filter from "|" till the next filter or the end of tag
* ``argument``:         filter argument

Handlebars ("handlebars", "hbs", "html.hbs", "html.handlebars")
---------------------------------------------------------------

* ``expression``:       expression to be evaluated
* ``variable``:         variable
* ``begin``:-block      the beginning of a block
* ``end``:-block        the ending of a block
* ``string``:           string

JSON ("json")
-------------

* ``number``:           number
* ``literal``:          "true", "false" and "null"
* ``string``:           string value
* ``attribute``:        name of an object property
* ``value``:            value of an object property

Mathematica ("mathematica", "mma")
----------------------------------

* ``keyword``:          keyword
* ``number``:           number
* ``comment``:          comment
* ``string``:           string
* ``list``:             a list { .. } - the basic Mma structure

JavaScript ("javascript", "js")
-------------------------------

* ``keyword``:          keyword
* ``comment``:          comment
* ``number``:           number
* ``literal``:          special literal: "true", "false" and "null"
* ``string``:           string
* ``regexp``:           regular expression
* ``function``:         header of a function
* ``title``:            name of a function inside a header
* ``params``:           parentheses and everything inside them in a function's header
* ``pi``:               'use strict' processing instruction

CoffeeScript ("coffeescript", "coffee", "cson", "iced")
-------------------------------------------------------

* ``keyword``:          keyword
* ``comment``:          comment
* ``number``:           number
* ``literal``:          special literal: "true", "false" and "null"
* ``built_in``:         built-in objects and functions ("window", "console", "require", etc...)
* ``string``:           string
* ``subst``:            #{ ... } interpolation in double-quoted strings
* ``regexp``:           regular expression
* ``function``:         header of a function
* ``class``:            header of a class
* ``title``:            name of a function variable inside a header
* ``params``:           parentheses and everything inside them in a function's header
* ``property``:         @-property within class and functions

ActionScript ("actionscript", "as")
-----------------------------------

* ``comment``:          comment
* ``string``:           string
* ``number``:           number
* ``keyword``:          keywords
* ``literal``:          literal
* ``reserved``:         reserved keyword
* ``title``:            name of declaration (package, class or function)
* ``preprocessor``:     preprocessor directive (import, include)
* ``type``:             type of returned value (for functions)
* ``package``:          package (named or not)
* ``class``:            class/interface
* ``function``:         function
* ``param``:            params of function
* ``rest_arg``:         rest argument of function

VBScript ("vbscript", "vbs")
----------------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          comment
* ``built_in``:         built-in function

VB.Net ("vbnet", "vb")
----------------------

* ``keyword``:          keyword
* ``built_in``:         built-in types
* ``literal``:          "true", "false" and "nothing"
* ``string``:           string
* ``comment``:          comment
* ``xmlDocTag``:        xmldoc tag ("'''", "<!--", "-->", "<..>")
* ``preprocessor``:     preprocessor directive

HTTP ("http")
-------------

* ``request``:          first line of a request
* ``status``:           first line of a response
* ``attribute``:        header name
* ``string``:           header value or query string in a request line
* ``number``:           status code

Lua ("lua")
-----------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          comment
* ``built_in``:         built-in operator
* ``function``:         header of a function
* ``title``:            name of a function inside a header
* ``params``:           everything inside parentheses in a function's header
* ``long_brackets``:    multiline string in [=[ .. ]=]

Delphi ("delphi")
-----------------

* ``keyword``:          keyword
* ``comment``:          comment (of any type)
* ``number``:           number
* ``string``:           string
* ``function``:         header of a function, procedure, constructor and destructor
* ``title``:            name of a function, procedure, constructor or destructor inside a header
* ``params``:           everything inside parentheses in a function's header
* ``class``:            class' body from "= class" till "end;"

Oxygene ("oxygene")
-------------------

* ``keyword``:          keyword
* ``comment``:          comment (of any type)
* ``string``:           string/char
* ``function``:         method, destructor, procedure or function
* ``title``:            name of a function (inside function)
* ``params``:           everything inside parentheses in a function's header
* ``number``:           number
* ``class``:            class' body from "= class" till "end;"

Java ("java", "jsp")
--------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          commment
* ``annotaion``:        annotation
* ``javadoc``:          javadoc comment
* ``class``:            class header from "class" till "{"
* ``title``:            class or method name
* ``params``:           everything in parentheses inside a class header
* ``inheritance``:      keywords "extends" and "implements" inside class header

C++ ("cpp", "c", "h", "c++", "h++")
-----------------------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string and character
* ``comment``:          comment
* ``preprocessor``:     preprocessor directive
* ``stl_container``:    instantiation of STL containers ("vector<...>")

Objective C ("objectivec", "m", "mm")
-------------------------------------

* ``keyword``:          keyword
* ``built_in``:         Cocoa/Cocoa Touch constants and classes
* ``number``:           number
* ``string``:           string
* ``comment``:          comment
* ``preprocessor``:     preprocessor directive
* ``class``:            interface/implementation, protocol and forward class declaration
* ``title``:            title (id) of interface, implementation, protocol, class
* ``variable``:         properties and struct accesors

Vala ("vala")
-------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          comment
* ``class``:            class definitions
* ``title``:            in class definition
* ``constant``:         ALL_UPPER_CASE

C# ("cs")
---------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          commment
* ``xmlDocTag``:        xmldoc tag ("///", "<!--", "-->", "<..>")
* ``title``:            title of namespace or class

F# ("fsharp", "fs")
-------------------

* ``keywords``:         keyword
* ``number``:           number
* ``string``:           string
* ``commment``:         comment
* ``class``:            any custom F# type
* ``title``:            the name of a custom F# type
* ``annotation``:       any attribute

OCaml ("ocaml", "ml")
---------------------

* ``keywords``:         keyword
* ``number``:           number
* ``string``:           string
* ``commment``:         comment\
* ``class``:            any custom OCaml type
* ``title``:            the name of a custom OCaml type
* ``annotation``:       any attribute

D ("d")
-------

* ``comment``:          comment
* ``string``:           string constant
* ``number``:           number
* ``keyword``:          language keywords (including @attributes)
* ``constant``:         true false null
* ``built_in``:         built-in plain types (int, string etc.)

RenderMan RSL ("rsl")
---------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string (including @"..")
* ``comment``:          comment
* ``preprocessor``:     preprocessor directive
* ``shader``:           sahder keywords
* ``shading``:          shading keywords
* ``built_in``:         built-in function

RenderMan RIB ("rib")
---------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          comment
* ``commands``:         command

Maya Embedded Language ("mel")
------------------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          comment
* ``variable``:         variable

SQL ("sql")
-----------

* ``keyword``:          keyword (mostly SQL'92 and SQL'99)
* ``number``:           number
* ``string``:           string (of any type: "..", '..', \`..\`)
* ``comment``:          comment
* ``aggregate``:        aggregate function

Smalltalk ("smalltalk", "st")
-----------------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          commment
* ``symbol``:           symbol
* ``array``:            array
* ``class``:            name of a class
* ``char``:             char
* ``localvars``:        block of local variables

Lisp ("lisp")
-------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          commment
* ``variable``:         variable
* ``literal``:          b, t and nil
* ``list``:             non-quoted list
* ``title``:            first symbol in a non-quoted list
* ``body``:             remainder of the non-quoted list
* ``quoted``:           quoted list, both "(quote .. )" and "'(..)"

Clojure ("clojure", "clj")
--------------------------

* ``comment``:          comments and hints
* ``string``:           string
* ``number``:           number
* ``collection``:       collections
* ``attribute``:        :keyword
* ``title``:            function name (built-in or user defined)
* ``built_in``:         built-in function name

Ini ("ini")
-----------

* ``title``:            title of a section
* ``value``:            value of a setting of any type
* ``string``:           string
* ``number``:           number
* ``keyword``:          boolean value keyword

Apache ("apache", "apacheconf")
-------------------------------

* ``keyword``:          keyword
* ``number``:           number
* ``comment``:          commment
* ``literal``:          On and Off
* ``sqbracket``:        variables in rewrites "%{..}"
* ``cbracket``:         options in rewrites "[..]"
* ``tag``:              begin and end of a configuration section

Nginx ("nginx", "nginxconf")
----------------------------

* ``title``:            directive title
* ``string``:           string
* ``number``:           number
* ``comment``:          comment
* ``built_in``:         built-in constant
* ``variable``:         $-variable
* ``regexp``:           regexp

Diff ("diff", "patch")
----------------------

* ``header``:           file header
* ``chunk``:            chunk header within a file
* ``addition``:         added lines
* ``deletion``:         deleted lines
* ``change``:           changed lines

DOS ("dos", "bat", "cmd")
-------------------------

* ``keyword``:          keyword
* ``flow``:             batch control keyword
* ``stream``:           DOS special files ("con", "prn", ...)
* ``winutils``:         some commands (see dos.js specifically)
* ``envvar``:           environment variables

Bash ("bash", "sh", "zsh")
--------------------------

* ``keyword``:          keyword
* ``string``:           string
* ``number``:           number
* ``comment``:          comment
* ``literal``:          special literal: "true" и "false"
* ``variable``:         variable
* ``shebang``:          script interpreter header

Makefile ("makefile", "mk", "mak")
----------------------------------

* ``keyword``:          keyword ".PHONY" within the phony line
* ``string``:           string
* ``comment``:          comment
* ``variable``:         $(..) variable
* ``title``:            target title
* ``constant``:         constant within the initial definition

CMake ("cmake", "cmake.in")
---------------------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          commment
* ``envvar``:           $-variable
* ``operator``:         operator (LESS, STREQUAL, MATCHES, etc)

NSIS ("nsis")
---------------

* ``symbol``:           directory constants
* ``number``:           number
* ``constant``:         definitions, language-strings, compiler commands
* ``variable``:         $-variable
* ``string``:           string
* ``comment``:          commment
* ``params``:           parameters
* ``keyword``:          keywords
* ``literal``:          keyword options

Axapta ("axapta")
-----------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          commment
* ``class``:            class header from "class" till "{"
* ``title``:            class name inside a header
* ``params``:           everything in parentheses inside a class header
* ``inheritance``:      keywords "extends" and "implements" inside class header
* ``preprocessor``:     preprocessor directive

Oracle Rules Language ("ruleslanguage")
---------------------------------------

* ``comment``:          comment
* ``string``:           string constant
* ``number``:           number
* ``keyword``:          language keywords
* ``built_in``:         built-in functions
* ``array``:            array stem

1C ("1c")
---------

* ``keyword``:          keyword
* ``number``:           number
* ``date``:             date
* ``string``:           string
* ``comment``:          commment
* ``function``:         header of function or procudure
* ``title``:            function name inside a header
* ``params``:           everything in parentheses inside a function header
* ``preprocessor``:     preprocessor directive

AVR assembler ("avrasm")
------------------------

* ``keyword``:          keyword
* ``built_in``:         pre-defined register
* ``number``:           number
* ``string``:           string
* ``comment``:          commment
* ``label``:            label
* ``preprocessor``:     preprocessor directive
* ``localvars``:        substitution in .macro

VHDL ("vhdl")
-------------

* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``comment``:          commment
* ``literal``:          signal logical value
* ``typename``:         typename
* ``attribute``:        signal attribute

Parser3 ("parser3")
-------------------

* ``keyword``:          keyword
* ``number``:           number
* ``comment``:          commment
* ``variable``:         variable starting with "$"
* ``preprocessor``:     preprocessor directive
* ``title``:            user-defined name starting with "@"

LiveCode Server ("livecodeserver")
----------------------------------

* ``variable``:         variable starting with "g", "t", "p", "s", "$_"
* ``string``:           string
* ``comment``:          comment
* ``number``:           number
* ``title``:            name of a command or a function
* ``keyword``:          keyword
* ``constant``:         constant
* ``operator``:         operator
* ``built_in``:         built_in functions and commands
* ``function``:         header of a function
* ``command``:          header of a command
* ``preprocessor``:     preprocessor marks: "<?", "<?rev", "<?lc", "<?livecode" and "?>"

TeX ("tex")
-----------

* ``comment``:          comment
* ``number``:           number
* ``command``:          command
* ``parameter``:        parameter
* ``formula``:          formula
* ``special``:          special symbol

Haskell ("haskell", "hs")
-------------------------

* ``comment``:          comment
* ``pragma``:           GHC pragma
* ``preprocessor``:     CPP preprocessor directive
* ``keyword``:          keyword
* ``number``:           number
* ``string``:           string
* ``title``:            function or variable name
* ``type``:             value, type or type class constructor name (i.e. capitalized)
* ``container``:        (..., ...) or {...; ...} list in declaration or record
* ``module``:           module declaration
* ``import``:           import declaration
* ``class``:            type class or instance declaration
* ``typedef``:          type declaration (type, newtype, data)
* ``default``:          default declaration
* ``infix``:            infix declaration
* ``foreign``:          FFI declaration
* ``shebang``:          shebang line

Erlang ("erlang", "erl")
------------------------

* ``comment``:          comment
* ``string``:           string
* ``number``:           number
* ``keyword``:          keyword
* ``record_name``:      record access (#record_name)
* ``title``:            name of declaration function
* ``variable``:         variable (starts with capital letter or with _)
* ``pp``:.keywords      module's attribute (-attribute)
* ``function_name``:    atom or atom:atom in case of function call

Elixir ("elixir")
-----------------

*  ``keyword``:         keyword
*  ``string``:          string
*  ``subst``:           in-string substitution (#{...})
*  ``comment``:         comment
*  ``function``:        function header "def some_name(...):"
*  ``class``:           defmodule and defrecord headers
*  ``title``:           name of a function or a module inside a header
*  ``symbol``:          atom
*  ``constant``:        name of a module
*  ``number``:          number
*  ``variable``:        variable
*  ``regexp``:          regexp

Rust ("rust", "rs")
-------------------

* ``comment``:          comment
* ``string``:           string
* ``number``:           number
* ``keyword``:          keyword
* ``title``:            name of declaration
* ``preprocessor``:     preprocessor directive

Matlab ("matlab")
-----------------

* ``comment``:          comment
* ``string``:           string
* ``number``:           number
* ``keyword``:          keyword
* ``title``:            function name
* ``function``:         function
* ``param``:            params of function
* ``matrix``:           matrix in [ .. ]
* ``cell``:             cell in { .. }

Scilab ("scilab", "sci")
------------------------

* ``comment``:          comment
* ``string``:           string
* ``number``:           number
* ``keyword``:          keyword
* ``title``:            function name
* ``function``:         function
* ``param``:            params of function
* ``matrix``:           matrix in [ .. ]

R ("r")
-------

* ``comment``:          comment
* ``string``:           string constant
* ``number``:           number
* ``keyword``:          language keywords (function, if) plus "structural"
                   functions (attach, require, setClass)
* ``literal``:          special literal: TRUE, FALSE, NULL, NA, etc.

OpenGL Shading Language ("glsl")
--------------------------------

* ``comment``:          comment
* ``number``:           number
* ``preprocessor``:     preprocessor directive
* ``keyword``:          keyword
* ``built_in``:         GLSL built-in functions and variables
* ``literal``:          true false

AppleScript ("applescript", "osascript")
----------------------------------------

* ``keyword``:          keyword
* ``command``:          core AppleScript command
* ``constant``:         AppleScript built in constant
* ``type``:             AppleScript variable type (integer, etc.)
* ``property``:         Applescript built in property (length, etc.)
* ``number``:           number
* ``string``:           string
* ``comment``:          comment
* ``title``:            name of a handler

Brainfuck ("brainfuck", "bf")
-----------------------------

* ``title``:            Brainfuck while loop command
* ``literal``:          Brainfuck inc and dec commands
* ``comment``:          comment
* ``string``:           Brainfuck input and output commands

Mizar ("mizar")
---------------

* ``keyword``:          keyword
* ``comment``:          comment

AutoHotkey ("autohotkey")
-------------------------

* ``keyword``:          keyword
* ``literal``:          A (active window), true, false, NOT, AND, OR
* ``built_in``:         built-in variables
* ``string``:           string
* ``comment``:          comment
* ``number``:           number
* ``var_expand``:       variable expansion (enclosed in percent sign)
* ``label``:            label, hotkey label, hotstring label

FIX ("fix")
-----------

* ``attribute``:        attribute name
* ``string``:           attribute value


XL ("xl", "tao")
-----------

* ``keyword``:          keywords defined in the default syntax file
* ``literal``:          names entered in the compiler (true, false, nil)
* ``type``:             basic types (integer, real, text, name, etc)
* ``built_in``:         built-in functions (sin, exp, mod, etc)
* ``module``:           names of frequently used Tao modules
* ``id``:               names of frequently used Tao functions
* ``constant``:         all-uppercase names such as HELLO
* ``variable``:         Mixed-case names such as Hello (style convention)
* ``id``:               Lower-case names such as hello
* ``string``:           Text between single or double quote, long text << >>
* ``number``:           Number values
* ``function``:         Function or variable definition
* ``import``:           Import clause

