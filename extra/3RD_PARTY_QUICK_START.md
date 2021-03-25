# Language Contribution Guide

So you'd like to create and share your own language definition for Highlight.js.  That's awesome.

## Getting started

- [ ] Have a look at some real-life examples first
  - https://github.com/highlightjs/highlightjs-cypher
  - https://github.com/highlightjs/highlightjs-robots-txt
- [ ] Clone the main [highlight-js](https://github.com/highlightjs/highlightjs) repository from GitHub
- [ ] Read our [Language Contributor Checklist](https://highlightjs.readthedocs.io/en/latest/language-contribution.html)
- [ ] Review the [Language Definition Guide](https://highlightjs.readthedocs.io/en/latest/language-guide.html)
- [ ] Start with our [repository template](https://github.com/highlightjs/highlightjs-language-template) to more easily follow the suggested layout. (this isn't ready yet!)

## Create your repository

Each language is developed in its own repo. This helps keep language definitions and maintenance independent of the core work.
Determine if you will host the repository yourself or you want it to be part of the [highlightjs organization on GitHub](https://github.com/highlightjs).

> To host your new language with the highlightjs organization, [create an issue](https://github.com/highlightjs/highlight.js/issues/new/choose) using the language request template and provide a description of your language and your intent to host it. We will follow up in that issue.

Setup your directory structure to follow exactly the example(s) above.  Note: The template repository does this for you, so if you started with the template you can skip this step.

For example, if your grammar is named `your-language`, create your repository directory structure as follows (renaming `your-language` to match your language name of course. For example, if your language is `pascal`, then replace all occurrences of `your-language` with `pascal`):

- Put your language file in `src/languages/your-language.js`.
- Add detect tests in `test/detect/your-language`.
- Add markup tests in `test/markup/your-language`.
- Add a `package.json` file.
- Add a `dist` folder (see [Packaging](#packaging), below.)
- Include a LICENSE.
- Include a README.

## Testing

Switching back to your clone of the `highlight-js` core repository now, `git clone` or symlink your language repo into the `extra` folder. There should now be an `extra/your-language` folder for your language.

> 3rd party language directories placed in `extra` should not be committed to the highlight-js repository (by default they are ignored, just don't override that behavior.)

To test (detect and markup tests), just build Highlight.js and test it.  Your tests should be automatically run with the full suite:

```bash
node ./tools/build.js -t node
npm run test
```

Running the tests this way runs the complete suite of tests for all languages. You can set the `ONLY_EXTRA` environment variable to focus the tests on just the language(s) you are currently working on in the `extra` folder.

```bash
ONLY_EXTRA=true
npm run test-markup
```

*This currently only works for markup tests*, but those are the most common tests that need to be run while developing a language grammar.

If you can't get the auto-detect tests passing then turn off auto-detection for your language in its definition with `disableAutodetect: true`.  [Auto-detection is hard.](https://github.com/highlightjs/highlight.js/issues/1213)

## Packaging

Users will expect your package to include a minified CDN distributable in your `dist` folder. This allows them to add your language to their website using only a single `<script>` tag and no additional JavaScript.

*The Highlight.js CDN build process will build this file for you automatically.* You can simply commit and push your repo, and done.

```bash
node ./tools/build.js -t cdn

...
Building extra/highlightjs-your-language/dist/your-language.min.js.
...
```

After building, simply commit the `dist/your-language.min.js` that was generated for you inside your repository.

```
cd extra/highlightjs-your-language
git add dist
git commit -m'(chore) add CDN distributable`
git push
```

## Publishing

We're happy to host 3rd party module repos inside the `highlightjs` organization on GitHub.  Just [file an issue](https://github.com/highlightjs/highlight.js/issues/new/choose) and request a repository.

Please also consider publishing your package to NPM. This will make it much easier for many using Node.js or bundlers to use your package.

When your language definition is ready, create a PR that adds it to our [`SUPPORTED_LANGUAGES.md`](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) file.

## The Future

More work could be done on:

- Allowing you to ONLY run your own tests, not the whole suite.
- Allowing you to maintain a 3rd party module WITHOUT it being inside of a `highlight-js` checkout (this requires discussion though)
- Simply make some easier tools or scripts to simply the existing process.
