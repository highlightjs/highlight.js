# Contributing
**Table of Contents**
- [Getting Started](#getting-started) (1st draft)
- [Philosophy](#philosophy) (TBD)
- [Reporting an Issue](#reporting-an-issue) (TBD)
- [Pull Requests](#pull-requests) (1st draft)
	-  _Should this be renamed to "fixing an issue"?_
	-  Link to GitHub guide for PRs
	-  What issues are good to start with? (Eg. `feature`, `bug`, etc. )
- [Setup and Run](#setup-and-run) (TBD)
## Getting Started
Hi, and welcome to highlight.js. We're a code-highlighting engine etc., but you probably know that. You want to contribute, and this document is the your guide.

There are many ways to contribute to highlight.js. Feel free to work on an open issue. You can also help by writing [a plugin](https://highlightjs.readthedocs.io/en/latest/plugin-api.html) or creating [a theme](https://highlightjs.readthedocs.io/en/latest/style-guide.html). In terms of getting help, GitHub issues are the primary method of communication. We're exploring the idea of creating a Gitter chat room.

## Philosophy
> A short section on our overall philosophy somewhere would be great also (I'm happy to help there):
> - keep the core parser simple (focus on the 80%)
> - encourage and support a plug-in culture (let others tackle the last 20%)
> - we don't show line numbers on purpose
> - we're more than a keyword highlighter
> - we're not a full language parser
> - auto-detect is not powered by magic unicorn dust
> 
> ([Josh Goebel](https://github.com/highlightjs/highlight.js/issues/2753#issuecomment-709415929))

## Reporting an Issue

## Pull Requests
When opening a PR, follow the template.
- Add a changelog entry to CHANGES.md
- If necessary, add your name to AUTHORS.txt under Contributors
- You should usually add markup tests (ie. whenever you've made a significant grammar change or fixed a bug)
- Change only what needs to be changed; don't re-lint/rewrite whole files when fixing bugs
- Open an issue first, so we can explore and discuss it
- Linting needs a dedicated commit

## Setup and Run
(In-depth docs at https://highlightjs.readthedocs.io/)
