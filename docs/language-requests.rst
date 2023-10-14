On requesting new languages
===========================

This is a general answer to requests for adding new languages that appear from
time to time in the Highlight.js issue tracker and discussion group.

    Highlight.js does not have a fundamental plan for implementing new languages
    - i.e., the core team doesn't usually develop new languages. The core team
    instead focuses on parser development, bugs, and supporting the existing
    languages. They also do not have time to review, merge, and
    maintain additional languages (fixing bugs, dealing with issues, etc).

    Instead, the project works by encouraging 3rd party language grammars from
    contributors willing to help develop and maintain them. We're also happy to
    host those 3rd party language grammars at the ``highlightjs`` GitHub
    organization - no matter how obscure or weird. Or you're welcome to host it
    yourself - we're still happy to link to it.

    This means that *there's no point in requesting a new language without also
    providing a 3rd party implementation* (we'll simply close "Please support
    language Xyz" issues with a link to this explanation). If you'd like to see
    a particular language available that you cannot implement yourself, the best way to
    make it happen is to find another developer interested in doing so.

    For more info on actually developing a language see our :doc:`language-guide`,
    and for information on how to properly package your 3rd party language module
    see :doc:`language-contribution`.

