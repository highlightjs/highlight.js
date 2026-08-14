# Language Contribution Guide

So you'd like to create and share your own language definition for Highlight.js.  That's awesome.

## Getting started

- [ ] Have a look at some real-life examples first
  - https://github.com/highlightjs/highlightjs-cypher
  - https://github.com/highlightjs/highlightjs-robots-txt
- [ ] Read our [Language Contributor Checklist](https://highlightjs.readthedocs.io/en/latest/language-contribution.html)
- [ ] Review the [Language Definition Guide](https://highlightjs.readthedocs.io/en/latest/language-guide.html)
- [ ] Start with our [grammar template](https://github.com/highlightjs/highlightjs-grammar-template) to more easily follow the suggested layout.

You do **not** need a clone of highlight.js to write, test, or package a third-party grammar. That is the recommended approach.

## Create your repository

Each grammar is developed in its own repo. This helps keep grammar definitions and maintenance independent of the core work.
Determine if you will host the repository yourself or you want it to be part of the [highlightjs organization on GitHub](https://github.com/highlightjs).

> To host your new grammar with the highlightjs organization, [create an issue](https://github.com/highlightjs/highlight.js/issues/new/choose) using the language request template and provide a description of your grammar and your intent to host it. We will follow up in that issue.

Setup your directory structure to follow the template (it already does this for you):

- Put your grammar file in `src/languages/your-grammar.js`.
- Add markup tests in `test/markup/your-grammar`.
- Add a `package.json` file.
- Add a `dist` folder (the template `npm run build` fills it).
- Include a LICENSE.
- Include a README.

## Develop and test (recommended)

Work entirely inside your grammar repo. The template installs `highlight.js` from npm, builds ESM / CJS / CDN files with Rollup, and runs markup tests against the ESM build:

```bash
npm install
npm test
npm run build
```

Commit the generated `dist/` files.

## Optional: develop inside highlight.js `extra/`

If you still want the core test suite or the highlight.js CDN compiler, clone [highlight.js](https://github.com/highlightjs/highlight.js) and clone or symlink your grammar repo into the `extra` folder.

> 3rd party grammar directories placed in `extra` should not be committed to the highlight.js repository (by default they are ignored, just don't override that behavior.)

If your grammar uses the same name as a built-in language, the build prefers the copy from `extra` so third-party packages can intentionally override core grammars.

```bash
npm run build
ONLY_EXTRA=true npm run test-markup
```

```bash
npm run build-cdn
```

That writes `extra/your-repo/dist/your-grammar.min.js` via the core compiler. Commit those files from your grammar repo if you want them.

## Publishing

We're happy to host 3rd party module repos inside the `highlightjs` organization on GitHub.  Just [file an issue](https://github.com/highlightjs/highlight.js/issues/new/choose) and request a repository.

Please also consider publishing your package to NPM. This will make it much easier for many using Node.js or bundlers to use your package.

When your grammar is ready, create a PR that adds it to our [`SUPPORTED_LANGUAGES.md`](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) file.
