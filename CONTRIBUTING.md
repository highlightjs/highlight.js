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
*build & test instructions go here...*

### Prerequisites
Are you someone who...
- knows JavaScript?
- has a working familiarity with Regex? (you won't get too far without this)
- perhaps has some rough familiarity with the idea of parsing text in general?
- is willing to read our grammar documentation and look at other grammars?


(We should link somewhere to the "in-depth docs at https://highlightjs.readthedocs.io/")
