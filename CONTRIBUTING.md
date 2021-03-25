# Contributing

**Table of Contents**
1. [Welcome](#welcome) (2nd draft)
2. [Philosophy](#philosophy) (1st draft)
3. [Feature Requests](#feature-requests) (1st draft)
4. [Reporting an Issue](#reporting-an-issue) (TBD)
5. [Fixing an Issue (PRs)](#fixing-an-issue-prs) (2nd draft)
6. [Setup and Run](#setup-and-run) (1st draft)


## Welcome
Hi, and welcome to Highlight.js. We're a code-highlighting engine etc., but you probably know that. You want to contribute, and this document will be your guide.

There are many ways to contribute to Highlight.js. Reporting issues is super useful. Feel free to work on an open issue. You can also help by writing [a plugin](https://highlightjs.readthedocs.io/en/latest/plugin-api.html), adding [a 3rd party grammar](https://github.com/highlightjs/highlight.js/blob/master/extra/3RD_PARTY_QUICK_START.md), or developing [a theme](https://highlightjs.readthedocs.io/en/latest/style-guide.html).

If you need support, you can [open a GitHub issue](https://github.com/highlightjs/highlight.js/issues/new/choose).


## Philosophy

Highlight.js makes a strong effort to keep the core engine, it's usage, and it's feature set clean and simple.  We aim to support the happy path (the 90%), not the often innumerable edge cases (the last 10%).  When you're on the happy path everything "just works" with a single line of code.  We do our best to allow those familiar with JavaScript to easily handle the remaining 10% via small extensions or plug-ins.

Some bullet points:

- Our [lack of line numbers is a feature](https://highlightjs.readthedocs.io/en/latest/line-numbers.html). It's usually pretty simple to add them yourself ([example](https://github.com/taufik-nurrohman/highlight.ln.js)).
- We [embrace plug-ins and extensions](https://github.com/highlightjs/highlight.js/issues/2225) rather than adding lots of tiny features and configuration options.
- We are more than a keyword highlighter in that we do make _some_ attempt to understand context...
- ...Yet we are not a full parser for any language, we're still just a fancy nested pattern matcher.
- Our [auto-detect is sadly not powered by magic unicorn dust](https://github.com/highlightjs/highlight.js/issues/1213). It's best effort, not best in class.


## Feature Requests
Feature requests are always welcome but many times the answer is:

> That's a great idea, you should write a plug-in for that! It doesn't belong in the core library and it's probably something you could do with only a small amount of code.

If you'd like to contribute a feature you should always first open an issue to discuss if the feature belongs in core vs a plug-in.  Often this is a great way to get tips for implemention as well or links to prior disussions with context, etc.


## Reporting an Issue
If you find a bug or think of an improvement, feel free to [open an issue](https://github.com/highlightjs/highlight.js/issues/new/choose).
- If you found a language highlighting issue, use [this JSFiddle](https://jsfiddle.net/ajoshguy/2bmdswn6/) to create a test case.


## Fixing an Issue (PRs)
If you're new to contributing to open-source, have a look at [this GitHub Guide](https://guides.github.com/activities/forking). It explains the general process of GitHub collaboration.

If you feel comfortable with our [prerequisites](#prerequisites), you can grab any issue [marked "good first issue"](https://github.com/highlightjs/highlight.js/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).


### Rules
Don't worry; these rules are pretty standard.

Please open an issue before your PR, so we can explore and discuss the topic at hand. Your time is important, and we need to be sure it's well-spent.

**Before** you start coding, keep these tips in mind:
- You should usually add markup tests (ie. whenever you've made a significant grammar change or fixed a bug)
- Change only what needs to be changed; don't re-lint/rewrite whole files when fixing bugs
- Linting needs a dedicated commit

**After** you make your changes, we have some housekeeping tasks for you. See the PR template for details.


## Setup and Run

You'll need [Node.js](https://nodejs.dev/download/), and optionally [yarn](https://yarnpkg.com/).

Often when contributing a PR (that doesn't make any specific changes to browser
features) it's more than sufficient to build and test only the Node.js build.
Our CI process will guarantee that the browser build is still green.

```console
npm run build
npm run test
```

The browser library must be built and tested separately:

```console
npm run build-browser
npm run test-browser
```

There's also a tool for visual testing at [tools/developer.html](https://github.com/highlightjs/highlight.js/blob/master/tools/developer.html). It requires a browser build to be present. (ie `npm run build_browser` first)


For more details, see [Building and Testing](https://highlightjs.readthedocs.io/en/latest/building-testing.html) in our docs.

### Prerequisites
Are you someone who...
- knows JavaScript?
- has a working familiarity with Regex? (you won't get too far without this)
- perhaps has some rough familiarity with the idea of parsing text in general?
- is willing to read our grammar documentation and look at other grammars?
- wants to help, but doesn't fit any of these requirements?
