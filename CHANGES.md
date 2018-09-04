## Master

New language:

- *isbl* built-in language DIRECTUM and Conterra by [Dmitriy Tarasov][].
- *ReasonML* by [Gidi Meir Morris][]
- *AngelScript* by [Melissa Geels][]
- *GML* by [meseta][]
- *PostgreSQL* SQL dialect and PL/pgSQL language by [Egor Rogov][].

New style:
- *a11y-dark theme* by [Eric Bailey][]
- *a11y-light theme* by [Eric Bailey][]
- *isbl editor light* by [Dmitriy Tarasov][]
- *isbl editor dark* by [Dmitriy Tarasov][]
- *Lightfair* by [Tristian Kelly][]
- [*Nord*][nord-highlightjs] by [Arctic Ice Studio][]
- *Atom One Dark Reasonable* by [Gidi Meir Morris][]

Improvements:

- New attribute endSameAsBegin for nested constructs with variable names
  by [Egor Rogov][].
- *Python* highlighting of escaped quotes fixed by [Harmon][].
- *PHP*: Added alias for php7, by [Vijaya Chandran Mani][]

[Dmitriy Tarasov]: https://github.com/MedvedTMN
[Tristian Kelly]: https://github.com/TristianK3604
[Gidi Meir Morris]: https://github.com/gmmorris
[Melissa Geels]: https://github.com/codecat
[meseta]: https://github.com/meseta
[Egor Rogov]: https://github.com/egor-rogov
[Harmon]: https://github.com/Harmon758
[Arctic Ice Studio]: https://github.com/arcticicestudio
[nord-highlightjs]: https://github.com/arcticicestudio/nord-highlightjs
[Eric Bailey]: https://github.com/ericwbailey
[Vijaya Chandran Mani]: https://github.com/vijaycs85

## Version 9.12.0

New language:

- *MikroTik* RouterOS Scripting language by [Ivan Dementev][].

New style:

- *VisualStudio 2015 Dark* by [Nicolas LLOBERA][]

Improvements:

- *Crystal* updated with new keywords and syntaxes by [Tsuyusato Kitsune][].
- *Julia* updated to the modern definitions by [Alex Arslan][].
- *julia-repl* added by [Morten Piibeleht][].
- [Stanislav Belov][] wrote a new definition for *1C*, replacing the one that
  has not been updated for more than 8 years. The new version supports syntax
  for versions 7.7 and 8.
- [Nicolas LLOBERA][] improved C# definition fixing edge cases with function
  titles detection and added highlighting of `[Attributes]`.
- [nnnik][] provided a few correctness fixes for *Autohotkey*.
- [Martin Clausen][] made annotation collections in *Clojure* to look
  consistently with other kinds.
- [Alejandro Alonso][] updated *Swift* keywords.

[Tsuyusato Kitsune]: https://github.com/MakeNowJust
[Alex Arslan]: https://github.com/ararslan
[Morten Piibeleht]: https://github.com/mortenpi
[Stanislav Belov]: https://github.com/4ppl
[Ivan Dementev]: https://github.com/DiVAN1x
[Nicolas LLOBERA]: https://github.com/Nicolas01
[nnnik]: https://github.com/nnnik
[Martin Clausen]: https://github.com/maacl
[Alejandro Alonso]: https://github.com/Azoy

## Version 9.11.0

New languages:

- *Shell* by [Tsuyusato Kitsune][]
- *jboss-cli* by [Raphaël Parrëe][]

Improvements:

- [Joël Porquet] has [greatly improved the definition of *makefile*][5b3e0e6].
- *C++* class titles are now highlighted as in other languages with classes.
- [Jordi Petit][] added rarely used `or`, `and` and `not` keywords to *C++*.
- [Pieter Vantorre][] fixed highlighting of negative floating point values.


[Tsuyusato Kitsune]: https://github.com/MakeNowJust
[Jordi Petit]: https://github.com/jordi-petit
[Raphaël Parrëe]: https://github.com/rparree
[Pieter Vantorre]: https://github.com/NuclearCookie
[5b3e0e6]: https://github.com/isagalaev/highlight.js/commit/5b3e0e68bfaae282faff6697d6a490567fa9d44b


## Version 9.10.0

Apologies for missing the previous release cycle. Some thing just can't be
automated… Anyway, we're back!

New languages:

- *Hy* by [Sergey Sobko][]
- *Leaf* by [Hale Chan][]
- *N1QL* by [Andres Täht][] and [Rene Saarsoo][]

Improvements:

- *Rust* got updated with new keywords by [Kasper Andersen][] and then
  significantly modernized even more by [Eduard-Mihai Burtescu][] (yes, @eddyb,
  Rust core team member!)
- *Python* updated with f-literals by [Philipp A][].
- *YAML* updated with unquoted strings support.
- *Gauss* updated with new keywords by [Matt Evans][].
- *Lua* updated with new keywords by [Joe Blow][].
- *Kotlin* updated with new keywords by [Philipp Hauer][].
- *TypeScript* got highlighting of function params and updated keywords by
  [Ike Ku][].
- *Scheme* now correctly handles \`-quoted lists thanks to [Guannan Wei].
- [Sam Wu][] fixed handling of `<<` in *C++* defines.

[Philipp A]: https://github.com/flying-sheep
[Philipp Hauer]: https://github.com/phauer
[Sergey Sobko]: https://github.com/profitware
[Hale Chan]: https://github.com/halechan
[Matt Evans]: https://github.com/matthewevans
[Joe Blow]: https://github.com/mossarelli
[Kasper Andersen]: https://github.com/kasma1990
[Eduard-Mihai Burtescu]: https://github.com/eddyb
[Andres Täht]: https://github.com/andrestaht
[Rene Saarsoo]: https://github.com/nene
[Philipp Hauer]: https://github.com/phauer
[Ike Ku]: https://github.com/dempfi
[Guannan Wei]: https://github.com/Kraks
[Sam Wu]: https://github.com/samsam2310


## Version 9.9.0

New languages

- *LLVM* by [Michael Rodler][]

Improvements:

- *TypeScript* updated with annotations and param lists inside constructors, by
  [Raphael Parree][].
- *CoffeeScript* updated with new keywords and fixed to recognize JavaScript
  in \`\`\`, thanks to thanks to [Geoffrey Booth][].
- Compiler directives in *Delphi* are now correctly highlighted as "meta".

[Raphael Parree]: https://github.com/rparree
[Michael Rodler]: https://github.com/f0rki
[Geoffrey Booth]: https://github.com/GeoffreyBooth


## Version 9.8.0 "New York"

This version is the second one that deserved a name. Because I'm in New York,
and the release isn't missing the deadline only because it's still Tuesday on
West Coast.

New languages:

- *Clean* by [Camil Staps][]
- *Flix* by [Magnus Madsen][]

Improvements:

- [Kenton Hamaluik][] did a comprehensive update for *Haxe*.
- New commands for *PowerShell* from [Nicolas Le Gall][].
- [Jan T. Sott][] updated *NSIS*.
- *Java* and *Swift* support unicode characters in identifiers thanks to
  [Alexander Lichter][].

[Camil Staps]: https://github.com/camilstaps
[Magnus Madsen]: https://github.com/magnus-madsen
[Kenton Hamaluik]: https://github.com/FuzzyWuzzie
[Nicolas Le Gall]: https://github.com/darkitty
[Jan T. Sott]: https://github.com/idleberg
[Alexander Lichter]: https://github.com/manniL


## Version 9.7.0

A comprehensive bugfix release. This is one of the best things about
highlight.js: even boring things keep getting better (even if slow).

- VHDL updated with PSL keywords and uses more consistent styling.
- Nested C-style comments no longer break highlighting in many languages.
- JavaScript updated with `=>` functions, highlighted object attributes and
  parsing within template string substitution blocks (`${...}`).
- Fixed another corner case with self-closing `<tag/>` in JSX.
- Added `HEALTHCHECK` directive in Docker.
- Delphi updated with new Free Pascal keywords.
- Fixed digit separator parsing in C++.
- C# updated with new keywords and fixed to allow multiple identifiers within
  generics `<...>`.
- Fixed another slow regex in Less.


## Version 9.6.0

New languages:

- *ABNF* and *EBNF* by [Alex McKibben][]
- *Awk* by [Matthew Daly][]
- *SubUnit* by [Sergey Bronnikov][]

New styles:

- *Atom One* in both Dark and Light variants  by [Daniel Gamage][]

Plus, a few smaller updates for *Lasso*, *Elixir*, *C++* and *SQL*.

[Alex McKibben]: https://github.com/mckibbenta
[Daniel Gamage]: https://github.com/danielgamage
[Matthew Daly]: https://github.com/matthewbdaly
[Sergey Bronnikov]: https://github.com/ligurio


## Version 9.5.0

New languages:

- *Excel* by [Victor Zhou][]
- *Linden Scripting Language* by [Builder's Brewery][]
- *TAP* (Test Anything Protocol) by [Sergey Bronnikov][]
- *Pony* by [Joe Eli McIlvain][]
- *Coq* by [Stephan Boyer][]
- *dsconfig* and *LDIF* by [Jacob Childress][]

New styles:

- *Ocean Dark* by [Gavin Siu][]

Notable changes:

- [Minh Nguyễn][] added more built-ins to Objective C.
- [Jeremy Hull][] fixed corner cases in C++ preprocessor directives and Diff
  comments.
- [Victor Zhou][] added support for digit separators in C++ numbers.

[Gavin Siu]: https://github.com/gavsiu
[Builder's Brewery]: https://github.com/buildersbrewery
[Victor Zhou]: https://github.com/OiCMudkips
[Sergey Bronnikov]: https://github.com/ligurio
[Joe Eli McIlvain]: https://github.com/jemc
[Stephan Boyer]: https://github.com/boyers
[Jacob Childress]: https://github.com/braveulysses
[Minh Nguyễn]: https://github.com/1ec5
[Jeremy Hull]: https://github.com/sourrust


## Version 9.4.0

New languages:

- *PureBASIC* by [Tristano Ajmone][]
- *BNF* by [Oleg Efimov][]
- *Ada* by [Lars Schulna][]

New styles:

- *PureBASIC* by [Tristano Ajmone][]

Improvements to existing languages and styles:

- We now highlight function declarations in Go.
- [Taisuke Fujimoto][] contributed very convoluted rules for raw and
  interpolated strings in C#.
- [Boone Severson][] updated Verilog to comply with IEEE 1800-2012
  SystemVerilog.
- [Victor Zhou][] improved rules for comments and strings in PowerShell files.
- [Janis Voigtländer][] updated the definition of Elm to version 0.17 of the
  languages. Elm is now featured on the front page of <https://highlightjs.org>.
- Special variable `$this` is highlighted as a keyword in PHP.
- `usize` and `isize` are now highlighted in Rust.
- Fixed labels and directives in x86 assembler.

[Tristano Ajmone]: https://github.com/tajmone
[Taisuke Fujimoto]: https://github.com/temp-impl
[Oleg Efimov]: https://github.com/Sannis
[Boone Severson]: https://github.com/BooneJS
[Victor Zhou]: https://github.com/OiCMudkips
[Lars Schulna]: https://github.com/captain-hanuta
[Janis Voigtländer]: https://github.com/jvoigtlaender


## Version 9.3.0

New languages:

- *Tagger Script* by [Philipp Wolfer][]
- *MoonScript* by [Billy Quith][]

New styles:

- *xt256* by [Herbert Shin][]

Improvements to existing languages and styles:

- More robust handling of unquoted HTML tag attributes
- Relevance tuning for QML which was unnecessary eager at seizing other
  languages' code
- Improve GAMS language parsing
- Fixed a bunch of bugs around selectors in Less
- Kotlin's got a new definition for annotations, updated keywords and other
  minor improvements
- Added `move` to Rust keywords
- Markdown now recognizes \`\`\`-fenced code blocks
- Improved detection of function declarations in C++ and C#

[Philipp Wolfer]: https://github.com/phw
[Billy Quith]: https://github.com/billyquith
[Herbert Shin]: https://github.com/initbar


## Version 9.2.0

New languages:

- *QML* by [John Foster][]
- *HTMLBars* by [Michael Johnston][]
- *CSP* by [Taras][]
- *Maxima* by [Robert Dodier][]

New styles:

- *Gruvbox* by [Qeole][]
- *Dracula* by [Denis Ciccale][]

Improvements to existing languages and styles:

- We now correctly handle JSX with arbitrary node tree depth.
- Argument list for `(lambda)` in Scheme is no longer highlighted as a function
  call.
- Stylus syntax doesn't break on valid CSS.
- More correct handling of comments and strings and other improvements for
  VimScript.
- More subtle work on the default style.
- We now use anonymous modules for AMD.
- `macro_rules!` is now recognized as a built-in in Rust.

[John Foster]: https://github.com/jf990
[Qeole]: https://github.com/Qeole
[Denis Ciccale]: https://github.com/dciccale
[Michael Johnston]: https://github.com/lastobelus
[Taras]: https://github.com/oxdef
[Robert Dodier]: https://github.com/robert-dodier


## Version 9.1.0

New languages:

- *Stan* by [Brendan Rocks][]
- *BASIC* by [Raphaël Assénat][]
- *GAUSS* by [Matt Evans][]
- *DTS* by [Martin Braun][]
- *Arduino* by [Stefania Mellai][]

New Styles:

- *Arduino Light* by [Stefania Mellai][]

Improvements to existing languages and styles:

- Handle return type annotations in Python
- Allow shebang headers in Javascript
- Support strings in Rust meta
- Recognize `struct` as a class-level definition in Rust
- Recognize b-prefixed chars and strings in Rust
- Better numbers handling in Verilog

[Brendan Rocks]: http://brendanrocks.com
[Raphaël Assénat]: https://github.com/raphnet
[Matt Evans]: https://github.com/matthewevans
[Martin Braun]: https://github.com/mbr0wn
[Stefania Mellai]: https://github.com/smellai


## Version 9.0.0

The new major version brings a reworked styling system. Highlight.js now defines
a limited set of highlightable classes giving a consistent result across all the
styles and languages. You can read a more detailed explanation and background in
the [tracking issue][#348] that started this long process back in May.

This change is backwards incompatible for those who uses highlight.js with a
custom stylesheet. The [new style guide][sg] explains how to write styles
in this new world.

Bundled themes have also suffered a significant amount of improvements and may
look different in places, but all the things now consistent and make more sense.
Among others, the Default style has got a refresh and will probably be tweaked
some more in next releases. Please do give your feedback in our
[issue tracker][issues].

New languages in this release:

- *Caché Object Script* by [Nikita Savchenko][]
- *YAML* by [Stefan Wienert][]
- *MIPS Assembler* by [Nebuleon Fumika][]
- *HSP* by [prince][]

Improvements to existing languages and styles:

- ECMAScript 6 modules import now do not require closing semicolon.
- ECMAScript 6 classes constructors now highlighted.
- Template string support for Typescript, as for ECMAScript 6.
- Scala case classes params highlight fixed.
- Built-in names introduced in Julia v0.4 added by [Kenta Sato][].
- Refreshed Default style.

Other notable changes:

- [Web workers support][webworkers] added bu [Jan Kühle][].
- We now have tests for compressed browser builds as well.
- The building tool chain has been switched to node.js 4.x. and is now
  shamelessly uses ES6 features all over the place, courtesy of [Jeremy Hull][].
- License added to non-compressed browser build.

[Jan Kühle]: https://github.com/frigus02
[Stefan Wienert]: https://github.com/zealot128
[Kenta Sato]: https://github.com/bicycle1885
[Nikita Savchenko]: https://github.com/ZitRos
[webworkers]: https://github.com/isagalaev/highlight.js#web-workers
[Jeremy Hull]: https://github.com/sourrust
[#348]: https://github.com/isagalaev/highlight.js/issues/348
[sg]: http://highlightjs.readthedocs.org/en/latest/style-guide.html
[issues]: https://github.com/isagalaev/highlight.js/issues
[Nebuleon Fumika]: https://github.com/Nebuleon
[prince]: https://github.com/prince-0203


## Version 8.9.1

Some last-minute changes reverted due to strange bug with minified browser build:

- Scala case classes params highlight fixed
- ECMAScript 6 modules import now do not require closing semicolon
- ECMAScript 6 classes constructors now highlighted
- Template string support for Typescript, as for ECMAScript 6
- License added to not minified browser build


## Version 8.9.0

New languages:

- *crmsh* by [Kristoffer Gronlund][]
- *SQF* by [Soren Enevoldsen][]

[Kristoffer Gronlund]: https://github.com/krig
[Soren Enevoldsen]: https://github.com/senevoldsen90

Notable fixes and improvements to existing languages:

- Added `abstract` and `namespace` keywords to TypeScript by [Daniel Rosenwasser][]
- Added `label` support to Dockerfile by [Ladislav Prskavec][]
- Crystal highlighting improved by [Tsuyusato Kitsune][]
- Missing Swift keywords added by [
