# Contributing

[![discord](https://badgen.net/badge/icon/discord?icon=discord&label&color=pink)](https://discord.gg/M24EbU7ja9)
[![open issues](https://badgen.net/github/open-issues/highlightjs/highlight.js?label=issues)](https://github.com/highlightjs/highlight.js/issues)
[![help welcome issues](https://badgen.net/github/label-issues/highlightjs/highlight.js/help%20welcome/open)](https://github.com/highlightjs/highlight.js/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+welcome%22)
[![good first issue](https://badgen.net/github/label-issues/highlightjs/highlight.js/good%20first%20issue/open)](https://github.com/highlightjs/highlight.js/issues?q=is%3Aopen+is%3Aissue+label%3A%22beginner+friendly%22)

**Contents**

- [Welcome](#welcome)
  - [Our Philosophy](#our-philosophy)
  - [Prerequisites](#prerequisites)
- [Requesting Features](#requesting-features)
  - [Language Requests](#language-requests)
- [Reporting Issues](#reporting-issues)
- [Fixing Issues (PRs)](#fixing-issues-prs)
  - [Setup, Build, and Test](#setup-build-and-test)


## Welcome

Hello, and welcome to Highlight.js. We're a code-highlighting engine, but you probably knew that already. If you'd like to pitch in this document will be your guide.

**You do not have to be a programmer to help.**

There are many ways to contribute::

- Hang out on our [Discord](https://discord.gg/M24EbU7ja9) and help answers questions as they come up
- Report [new issues or bugs](https://github.com/highlightjs/highlight.js/issues/new/choose) or join the existing discussion on open issues
- Submit pull requests to resolve issues
- Write [plugins](https://highlightjs.readthedocs.io/en/latest/plugin-api.html) that extend our core functionality
- Author [language definitions](https://github.com/highlightjs/highlight.js/blob/master/extra/3RD_PARTY_QUICK_START.md) to improve our language support
- Design [new themes](https://highlightjs.readthedocs.io/en/latest/style-guide.html) to make our highlighting extra beautiful
- Improve our documentation to better explain all the things to all the peoples

### Our Philosophy

Highlight.js makes an effort to keep the core engine small, simple, and easy to use.  Our goal with core is to support the highlighting "happy path" and let plug-ins handle edge cases.

- Rather than add lots of tiny features and configuration knobs we [embrace plug-ins and extensions](https://github.com/highlightjs/highlight.js/issues/2225). For example, our [lack of line numbers is considered a feature](https://highlightjs.readthedocs.io/en/latest/line-numbers.html).
- We do quite bit more than highlight keywords. We often make an attempt to understand local context, yet we do not strive to be a full and correct parser for any language.
- Our [language auto-detection is unfortunately not magic](https://github.com/highlightjs/highlight.js/issues/1213). It's best effort, not best in class. If you think you could help improve it that'd be a great contribution!

### Prerequisites

- To help answer questions on issues or contribute on Discord you need only be friendly.
- To contribute to language definitions knowing [Regular Expressions](https://www.regular-expressions.info) is often necessary.
- To work on the core parsing engine you'll need to know JavaScript.
- To work on documentation you need to be ready and willing to document things.
- Attention to detail or expert knowledge in one of the languages we highlight can be super helpful.


## Requesting Features

Feature requests are always welcome.  If the feature doesn't belong in the core library then we're always happy to suggest how you might go about developing a plug-in.

If you're thinking of contributing a feature first open an issue to discuss whether the feature belongs in core vs a plug-in.  Often this is a great way to get implementation tips or links to prior discussions on the topic often with additional context, etc.


### Language Requests

If you wish we supported a language we don't, first read [On requesting new languages](https://highlightjs.readthedocs.io/en/latest/language-requests.html).  TL;DR The core team generally doesn't implement new languages - so there is no point opening requests.  Please consider trying to contribute the language yourself or enlisting the help of a friend.


## Reporting Issues

If you find a bug or think of an improvement, feel free to [open an issue](https://github.com/highlightjs/highlight.js/issues/new/choose).
- If you've found a language highlighting issue, you can use [this JSFiddle](https://jsfiddle.net/ajoshguy/2bmdswn6/) to create a test case.


## Fixing Issues (PRs)

If you're new to contributing to open-source, have a look at [this GitHub Guide](https://guides.github.com/activities/forking). It explains the general process of GitHub collaboration.

If you feel comfortable with the [prerequisites](#prerequisites), you can grab any issue marked ["good first issue"](https://github.com/highlightjs/highlight.js/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22). Or feel free to jump in with thoughts or comments on any of the more complex issues.


### Rules <!-- omit in toc -->

Don't worry, it's all pretty standard. Please open a new issue before your PR (or join the discussion on the existing issue), so we can explore and discuss the topic at hand. Your time is important, and we need to be sure it's well-spent.

*Before* you start coding, keep these tips in mind:

- You should usually add markup tests (ie. whenever you've made a significant grammar change or fixed a bug). Simply adding `keywords` can be an exception to this rule.
- Change only what needs to be changed; don't re-lint or rewrite whole files when fixing small bugs
- Linting or major re-organization needs a dedicated commit

*After* you make your changes, we have some housekeeping tasks for you. The PR template will be your guide.


### Setup, Build, and Test

Highlight.js is developed in JavaScript, so you'll need the usual suspects: [Node.js](https://nodejs.dev/download/), npm (or yarn), git, etc.  You'll likely start by forking the repository on GitHub and then cloning it locally.

When contributing a PR (that doesn't make any specific changes to browser
features) it's often more than sufficient to build and test only the Node.js build.  Our CI process will guarantee that the browser build is still green.

Testing the Node.js build:

```console
npm run build
npm run test
```

The browser library is built and tested separately:

```console
npm run build-browser
npm run test-browser
```

There's a developer tool ([tools/developer.html](https://github.com/highlightjs/highlight.js/blob/master/tools/developer.html)) for visually testing and debugging language definitions. It requires a browser build to be present. (ie `npm run build-browser` first)

For more details, see [Building and Testing](https://highlightjs.readthedocs.io/en/latest/building-testing.html) in our docs.

