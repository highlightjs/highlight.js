*This is a work in progress.  PRs to improve these docs (or the process) would be welcome.*

## Getting Started

So you'd like to create and share your own language for Highlight.js.  That's awesome.

Take a look at some of the real-life examples first:

- https://github.com/highlightjs/highlightjs-cypher
- https://github.com/highlightjs/highlightjs-robots-txt

Then get started:

- Checkout a clone of the core repo [highlight-js](https://github.com/highlightjs/highlightjs) from GitHub.
- Read [Language contributors checklist](https://highlightjs.readthedocs.io/en/latest/language-contribution.html).
- Start with a [template](https://github.com/highlightjs/highlightjs-language-template) to set up your repository with the suggested file layout.

## Create a repo

Each language is developed in its own repo. This helps keep language definitions and maintainers independent of the core work.
Determine if you will host the repository yourself or you want it to be part of the [highlightjs organization on GitHub](https://github.com/highlightjs).

> To include your new language in the highlightjs organization, [create an issue](https://github.com/highlightjs/highlight.js/issues/new/choose) using the language request template and provide a description of your language and your intent to host it. We will follow up in that issue.

Set your repo directory structure to follow exactly the example(s) above (the template repository does this for you, so if you started with the template you can skip this step.)

For example, if your grammar is named `your-language`, create your repository directory structure as follows (rename `your-language` to match your language name. For example, if your language is `pascal`, then rename all occurrences of `your-language` with `pascal`):

- Put your language file in `src/languages/your-language.js`.
- Add detect tests in `test/detect/your-language`.
- Add markup tests in `test/markup/your-language`.
- Add a `package.json` file.
- Add a `dist` folder (see [Packaging](#packaging), below.)
- Include a license.
- Include a README to help users install and use your language with highlight.js.

## Testing

Going back to your clone of `highlight-js` core repo, `git clone` or symlink your language repo into the `extra` folder. There should be an `extra/your-language` folder for your language.

> Any 3rd party language files placed here should not be committed to the highlight-js repository (by default they are ignored, just don't override that behavior.)

To test (detect and markup tests), just build highlight.js and test it.  Your tests should be automatically run with the suite:

```bash
node ./tools/build.js -t node
npm run test
```

Running the test this way runs the complete suite of tests for all languages. You can set the `ONLY_EXTRA` environment variable to focus the tests on just the language(s) you are currently working on in the `extra` folder.

```bash
ONLY_EXTRA=true
npm run test-markup
```

This only works for markup tests, but those are the most common that need to be run while developing a language grammar.

If you can't get the auto-detect tests passing then turn off auto-detection for your language in its definition with `disableAutodetect: true`.  Auto-detection is hard.

## Packaging

Users will expect your package to include a minified CDN distributable in your `dist` folder. This allows them to add the module to their website with only a single `<script>` tag.

The highlight.js CDN build process will build this file for you automatically. You can simply commit and push your repo, and done.

```bash
node ./tools/build.js -t cdn

...
Building extra/highlightjs-your-language/dist/your-language.min.js.
...
```

Commit `extra/highlightjs-your-language/dist/your-language.min.js` to your repo and push it.

## Publishing

We're happy to host 3rd party module repos inside the `highlightjs` organization on GitHub.  Just [file an issue](https://github.com/highlightjs/highlight.js/issues/new/choose) and request a repository.

Publish it to NPM also if you like. This will make it much easier for anyone using Node to use it.

When your language module is ready, create a PR that adds it to the [`SUPPORTED_LANGUAGES.md`](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) file.

## The Future

More work could be done on:

- Allowing you to ONLY run your own tests, not the whole suite.
- Allowing you to maintain a 3rd party module WITHOUT it being inside of a `highlight-js` checkout (this requires discussion though)
- Simply make some easier tools or scripts to simply the existing process.
- Improving these docs
