---
name: Language Request
about: Highlight.js should add support for a new language.
title: PLEASE read the below carefully.
labels: autoclose
assignees: ''

---

First let us say that we'd also love it if Highlight.js could highlight whichever language you're about to request support for!  And there is a chance you can help make that happen! But first...

...PLEASE READ THE FOLLOWING...

    Highlight.js does not have a fundamental plan for implementing new languages
    - i.e., the core team doesn't usually develop new languages. The core team
    instead focuses on parser development, bugs, and supporting the existing
    languages. They also currently does not have time to review, merge and
    maintain any additional languages (fixing bugs, dealing with issues, etc).

    Instead, the project works by encouraging 3rd party language grammars from
    contributors willing to help develop and maintain them. We're also happy to
    host those 3rd party language grammars at the ``highlightjs`` GitHub
    organization - no matter how obscure or weird. Or you're wlecome to host it
    yourself - we're still happy to link to it.

    This means that *there's no point in requesting a new language without also
    providing a 3rd party implementation* (we'll simply close "Please support
    language Xyz" issues with a link to this explanation). If you'd like to see
    a particular language available but cannot implement it, the best way to
    make it happen is to find another developer interested in doing so.

    For more info on actually developing a language see our :doc:`language-guide`,
    and for information on how to properly package your 3rd party language module
    see :doc:`language-contribution`.

If you are interested in contributing a 3rd party language grammar you can start with:

- https://highlightjs.readthedocs.io/en/latest/language-contribution.html

---

You actually don't need to create this issue at all unless you have a specific question about the 3rd party language grammar creation process - which we'd be glad to answer.
