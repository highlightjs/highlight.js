*This is a work in progress.  PRs to improve these docs (or the process) would be welcome.*

## Getting Started

So you'd like to create and share your own language for Highlight.js.  That's awesome.

Take a look at some of the real-life examples first:

- https://github.com/highlightjs/highlightjs-cypher
- https://github.com/highlightjs/highlightjs-robots-txt

- Checkout a clone of the core repo [highlight-js](https://github.com/highlightjs/highlightjs) from GitHub.
- Read [Language contributors checklist](https://highlightjs.readthedocs.io/en/latest/language-contribution.html).

## Create a repo

Each language is developed in its own repo. This helps keep language definitions and maintainers independent of the core work.
Determine if you will host the repository yourself or you want it to be part of the [highlightjs organization on GitHub](https://github.com/highlightjs).

> To include your new language in the highlightjs organization, [create an issue](https://github.com/highlightjs/highlight.js/issues/new/choose) using the language request template and provide a description of your language and your intent to host it. We will follow up in that issue.

Set your repo directory structure to follow exactly the example(s) above.

For example, if you have a `language` language, create your repo directory structure as follows:

- Put your language file in `src/languages/language.js`.
- Add detect tests in `test/detect/language` (rename `language` to match your language name).
- Add markup tests in `test/markup/language`.
- Add a `package.json` file.
- Include a license.

## Testing

Going back to your clone of `highlight-js` core repo, create an `extra/language` folder for your language. Copy your repo `src` and `test` folders here.

> Any 3rd party language files placed here should not be committed to the highlight-js repository (by default they are ignored, just don't override that behavior.)

To test (detect and markup tests), just build highlight.js and test it.  Your tests should be automatically run with the suite:

```bash
node ./tools/build.js -t node
npm run test
```

If you can't get the auto-detect tests passing you should simply turn off auto-detection for your language in its definition with `disableAutodetect: true`.  Auto-detection is hard.

## Packaging

Users will expect your package to include a minified CDN distributable in your `dist` folder. This should allow them to add the module to their website with only a single `<script>` tag.

Luckily, the highlight.js CDN build process will build this file for you automatically.  You can simply commit it to your repo, and done.

```bash
node ./tools/build.js -t cdn

...
Building extra/highlightjs-xyz/dist/xyz.min.js.
...
```

## Publishing

We're happy to host 3rd party module repos inside the `highlightjs` organization on GitHub.  Just file an issue and request a repository.

Publish it to NPM also if you'd like. This will make it much easier for anyone using Node to use it.

When your language module is ready create a PR that adds it to the `README.md` file in the list of languages.

## The Future

More work could be done on:

- Allowing you to ONLY run your own tests, not the whole suite.
- ~~Allowing you to maintain a 3rd party module WITHOUT it being inside of a `highlight-js` checkout (this requires discussion though)~~
- Simply make some easier tools or scripts to simply the existing process.
- Improving these docs
