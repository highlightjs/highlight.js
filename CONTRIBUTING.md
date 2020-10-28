# Contributing

**Table of Contents**
1. [Welcome](#welcome) (2nd draft)
2. [Philosophy](#philosophy) (TBD)
3. [Reporting an Issue](#reporting-an-issue) (TBD)
4. [Fixing an Issue (PRs)](#fixing-an-issue-prs) (2nd draft)
5. [Setup and Run](#setup-and-run) (TBD)


## Welcome
Hi, and welcome to Highlight.js. We're a code-highlighting engine etc., but you probably know that. You want to contribute, and this document will be your guide.

There are many ways to contribute to Highlight.js. Reporting issues is super useful. Feel free to work on an open issue. You can also help by writing [a plugin](https://highlightjs.readthedocs.io/en/latest/plugin-api.html), adding [a 3rd party grammar](https://github.com/highlightjs/highlight.js/blob/master/extra/3RD_PARTY_QUICK_START.md), or creating [a theme](https://highlightjs.readthedocs.io/en/latest/style-guide.html).

In terms of getting help, GitHub issues are the primary method of communication. We're exploring the idea of creating a Gitter chat room.


## Philosophy

Highlight.js makes a strong effort to keep the core engine, it's usage, and it's feature set clean and simple.  We aim to support the happy path (the 90%), not the often innumerable edge cases (the last 10%).  When you're on the happy path everything "just works" with a single line of code.  We do our best to allow those familiar with JavaScript to easily handle the remaining 10% via small extensions or plug-ins.

Feature requests are always welcome but many times the answer is:

> That's a great idea, you should write a plug-in for that! It doesn't belong in the core library and it's probably something you could do with only a small amount of code.

If you'd like to contribute a feature you should always first open an issue to discuss if the feature belongs in core vs a plug-in.  Often this is a great way to get tips for implemention as well or links to prior disussions with context, etc.

Some bullet points:

- Our [lack of line numbers is a feature](https://highlightjs.readthedocs.io/en/latest/line-numbers.html). The simple case isn't hard to add though with a little custom JavaScript.
- We [embrace plug-ins and extensions](https://github.com/highlightjs/highlight.js/issues/2225) rather than adding lots of tiny features and configuration options.
- We are much more than a keyword highlighter. We do make attempts to understand context...
- ...Yet we are not a full parser for any language, we're still just a fancy nested pattern matcher.
- Our [auto-detect is sadly not powered by magic unicorn dust](https://github.com/highlightjs/highlight.js/issues/1213). It's best effort, not best in class.


## Reporting an Issue
(Misc.)
- If you found a language highlighting issue, use [this JSFiddle](https://jsfiddle.net/ajoshguy/2bmdswn6/) to create a test case.


## Fixing an Issue (PRs)
If you're new to contributing to open-source, have a look at [this GitHub Guide](https://guides.github.com/activities/forking). It explains the general process of GitHub collaboration.

If you feel comfortable with our [prerequisites](#prerequisites), you can grab any issue [marked `beginner friendly`](https://github.com/highlightjs/highlight.js/issues?q=is%3Aopen+is%3Aissue+label%3A%22beginner+friendly%22).


### Rules
Don't worry; these rules are pretty standard.

Please open an issue before your PR, so we can explore and discuss the topic at hand. Your time is important, and we need to be sure it's well-spent.

**Before** you start coding, keep these tips in mind:
- You should usually add markup tests (ie. whenever you've made a significant grammar change or fixed a bug)
- Change only what needs to be changed; don't re-lint/rewrite whole files when fixing bugs
- Linting needs a dedicated commit

**When you're ready** to open a PR, we have some housekeeping tasks for you.
- Find and link to the relevant issue
- Add a changelog entry to [CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/CHANGES.md)
- If necessary, add your name to [AUTHORS.txt](https://github.com/highlightjs/highlight.js/blob/master/AUTHORS.txt) under Contributors


## Setup and Run

You'll of course need Node.js and npm or yarn.

Often when contributing a PR (that doesn't make any specific changes to browser
features) it's more than sufficient to build and test only the Node.js build.
Our CI process will guarantee that the browser build is still green.

**Should we shown yarn examples also?**

```
npm run build
npm run test
```

The browser library must be built and tested separately:

```
npm run build-browser
npm run test-browser
```

**Where should we mention the developer tool? ./tools/developer.html**

The "run" here made me think of that because otherwise there isn't really
much to "run" (other than tests).



For more details see [Building and Testing](https://highlightjs.readthedocs.io/en/latest/building-testing.html).


### Prerequisites
Are you someone who...
- knows JavaScript?
- has a working familiarity with Regex? (you won't get too far without this)
- perhaps has some rough familiarity with the idea of parsing text in general?
- is willing to read our grammar documentation and look at other grammars?


(We should link somewhere to the "in-depth docs at https://highlightjs.readthedocs.io/")
