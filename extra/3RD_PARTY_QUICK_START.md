*This is a work in progress.  PRs to improve these docs (or the process) would be welcome.*

## Getting Started

So you'd like to create and share your own language for Highlight.js.  That's awesome.

Take a look at some of the real-life examples first:

- https://github.com/highlightjs/highlightjs-cypher
- https://github.com/highlightjs/highlightjs-structured-text
- https://github.com/highlightjs/highlightjs-robots-txt

### Routine

Let's say your language is called `xyz`.


- Checkout highlight-js from github...

- Create directory `extra/highlightjs-xyz`. This is home directory of your extension. Init repository there, and `package.json`. Here is the structure of your folder.

    ```
    - dist
    - - xyz.min.js
    - src
    - - xyz.js
    - test
    - - detect
    - - - detect.txt
    - - markup
    - - - sample.txt
    - - - sample.expect.txt
    - - index.js
    - package.json
    - LICENSE
    - README.md
    ```

    And other project files like `.gitignore`, `CHANGES.md` and so on..

    
- Init NPM package

    Create `package.json` file. You can do that by running command inside you `highlightjs-xyz` directory.

    ```
    npm init
    ```

    Then add there dependencies and scripts. Here is how your file might look like.

    ```json
    {
        "name": "highlightjs-xyz",
        "version": "0.0.1",
        "description": "XYZ",
        "main": "src/xyz.js",
        "scripts": {
            "postpublish": "PACKAGE_VERSION=$(cat package.json | grep \\\"version\\\" | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') && git tag v$PACKAGE_VERSION && git push --tags",
            "test": "./node_modules/.bin/mocha --reporter spec"
        },
        "files": [
            "src/xyz.js",
            "dist/xyz.min.js"
        ],
        "devDependencies": {
            "highlight.js": "^10.4.1",
            "mocha": "^8.3.2",
            "should": "^13.2.3",
        }
    }
    ```

    Now run command

    ```
    npm install
    ```
- Create your source file

    Create file `src/xyz.js`. Something like this.

    ```js
    /*
    * highlight.js XYZ syntax highlighting definition
    *
    * @see https://github.com/highlightjs/highlight.js
    *
    * @package: highlightjs-xyz
    * @author:  Jhon Smith <johm@smith.com>
    * @since:   2019-08-02
    *
    * Description: XYZ is new language.
    * Category: scripting
    */

    module.exports = function (hljs) {
        return {
            aliases: ["xyz"],
            name: "XYZ",
            case_insensitive: true,
            keywords: {
                keyword: "if else",
                title: "program function",
                literal: "false true null ",
                built_in: "array pointer",
                function: "mod abs acos asin atan",
            },
            contains: [
                hljs.C_NUMBER_MODE,
                hljs.COMMENT("//", "$"),
                hljs.C_BLOCK_COMMENT_MODE,
                hljs.COMMENT("\\/\\*", "\\*\\/"),
            ],
        };
    };
    ```

    This is just a bootstrap, of course follow documentation to add extensive syntax highlight rules.


## Test

Since there is no way to run test against only your language and test will run for all languages and overwelm terminal, we suggest for you to create your own test sute.

- Create `highlightjs-xyz/test/detect/detect.txt` and place there part of your code example.

- Create `highlightjs-xyz/test/markup/sample.txt` and place there part of your code example.

- Create `highlightjs-xyz/test/markup/sample.expect.txt` and place there HTML markup that is expected to be after your code is highlighted by HLJS. You can leave it empty for now and you will see how it should look like when run the test.

- Create `highlightjs-xyz/test/index.js` file that will be automatically executed my mocha. 

```js
var should = require('should');
var promisify = require("util").promisify;
let path = require('path');

let hljs = require("highlightjs");
let xyz = require("../src/xyz");
hljs.registerLanguage("xyz", xyz);

const fs = require("fs");

const readdir = promisify(fs.readdir),
      readFile = promisify(fs.readFile);

describe("Test markups", () => {
    it("Test markup", async () => {
        var files = await readdir(path.join(__dirname, "markup"));
        files = files.filter(f => !f.includes(".expect."));
        for (var f of files) {
            let fn = path.join(__dirname, "markup", f);
            let expectFn = fn.replace(".txt", ".expect.txt");
            var code = await readFile(fn, "utf-8");
            var exp = await readFile(expectFn, "utf-8");
            var actual = hljs.highlight("xyz", code).value;
            actual.trim().should.eql(exp.trim(), f);
        }
    });

    it("Test detection", async () => {
        var code = await readFile(path.join(__dirname, "detect/detect.txt"), "utf-8");
        var actual = hljs.highlightAuto(code,['xyz']).language;
        actual.should.eql("xyz");
    });
});
```

Now all that is left to do is to run command in the root of your repository.

```
npm run test
```

This should execute `./node_modules/.bin/mocha --reporter spec` command that is set in our `package.json` file in `scrips` list.

### Legacy testing

The old way to test is run test command inside highlightjs repository root directory. ершы will test your extension along with few dozens of other that are built into highlightjs. 

To test (detect and markup tests), just build highlight.js and test it.  Your tests should be automatically run with the suite:

```
node ./tools/build.js -t node
npm run test
```

If you can't get the auto-detect tests passing you should simply turn off auto-detection for your language in its definition with `disableAutodetect: true`.  Auto-detection is hard.

## Packaging

Users will expect your package to include a minified CDN distributable in your `dist` folder. This should allow them to add the module to their website with only a single `<script>` tag.

If users use highlight.js CDN, it is going to build this file for you automatically. You can simply commit and push your repo, and done.

But you can also generate it manually for using your extension outside of highlight.js CDN.

Run following command in the highlightjs repository root directory.

```bash
node ./tools/build.js -t cdn
```

The following file wil be generated

```
extra/highlightjs-xyz/dist/xyz.min.js
```

## Publish

We're happy to host 3rd party module repos inside the `highlightjs` organization on GitHub.  Just file an issue and request a repository.

Publish it to NPM also if you'd like. This will make it much easier for anyone using Node to use it.

Commit and push everything to Github. Run 

```
npm login
npm publish
```

When your language module is ready create a PR that adds it to the `README.md` file in highlightjs repository root directory in the list of languages.

This will add your packages to npm repository automatically.

## The Future

More work could be done on:

- Allowing you to ONLY run your own tests, not the whole suite.
- Allowing you to maintain a 3rd party module WITHOUT it being inside of a `highlight-js` checkout (this requires discussion though)
- Simply make some easier tools or scripts to simply the existing process.
- Improving these docs

## LICENSE

For the license file best option just copy same license as HighlightJS is using, or use any other license you want.


