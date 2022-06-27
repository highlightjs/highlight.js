---
name: Request a new 3rd party grammar repository
about: You'd like to host your repo inside the highlightjs org
title: "(request org repo) highlightjs-[name of your grammar]"
labels: language
assignees: 'joshgoebel'

---

<!--
	Currently we offer 3rd party grammars the opportunity to be hosted
	within the Highlight.js GitHub organization for better visilibity.

	This is entirely optional.
-->

I would like to request the creation of a `highlightjs-[my-grammar]` repository for my 3rd party grammar.

<!--
We no longer create repositories "in advance".  Instead prepare your
repository in your own GitHub account and then when it looks good it
can easily to pushed upstream to the organization.
-->

- [ ] I have an existing personal repository ready to go

<!--
Add any other context or useful information...
-->


### Metadata

- Grammar Name: _Language Name_
- Link to repo: _link to existing repository_


### Requirements

- [ ] I've read the [language Contributor Checklist](https://highlightjs.readthedocs.io/en/latest/language-contribution.html)
- [ ] I've read the [Language Contribution Guide](https://github.com/highlightjs/highlight.js/blob/main/extra/3RD_PARTY_QUICK_START.md)
- [ ] I'm currently willing to support and maintain this grammar over time
- [ ] That repo includes a `dist` folder with CDN-ready `CJS` and `ESM` builds
- [ ] That `README.md` includes examples of simple web usage
- [ ] That `README.md` includes examples of Node.js usage


### Afterwards

Submit a PR that:

- [ ] adds mention of your new language to `CHANGES.md`
- [ ] updates `SUPPORTED_LANGUAGES.md` in the main library


