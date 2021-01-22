*This is a work in progress.  PRs to improve these docs (or the process) would be welcome.*

## Getting Started

So you'd like to create and share your own language for Highlight.js.  That's awesome.

Take a look at some of the real-life examples first:

- https://github.com/highlightjs/highlightjs-cypher
- https://github.com/highlightjs/highlightjs-robots-txt

Basically:

- Checkout highlight-js from github...
- 3rd party languages are placed into the `extra` directory

So if you had a `xyz` language you'd create an `extra/xyz` folder, and that would be your language module. All paths below are relative to that.

- Put your language file in `src/languages/name.js`.
- Add detect tests in `test/detect/`.
- Add markup tests in `test/markup/`.
- Perhaps add a `package.json` for Node.
- Add a nice `README`.
- Don't forget to add a `LICENSE`.


## Testing

To test (detect and markup tests), just build highlight.js and test it.  Your tests should be automatically run with the suite:

```
node ./tools/build.js -t node
npm run test
```

If you can't get the auto-detect tests passing you should simply turn off auto-detection for your language in its definition with `disableAutodetect: true`.  Auto-detection is hard.


## Packaging

Users will expect your package to include a minified CDN distributable in your `dist` folder. This should allow them to add the module to their website with only a single `<script>` tag.

Luckily, the highlight.js CDN build process will build this file for you automatically.  You can simply commit it to your repo, and done.

```
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
- Allowing you to maintain a 3rd party module WITHOUT it being inside of a `highlight-js` checkout (this requires discussion though)
- Simply make some easier tools or scripts to simply the existing process.
- Improving these docs
