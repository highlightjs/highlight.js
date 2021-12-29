#!/usr/bin/env node
// For the basic introductions on using this build script, see:
//
// <https://highlightjs.readthedocs.org/en/latest/building-testing.html>
//
// Otherwise, lets explain what each build target does in more detail, for
// those that wish to know before running this script.
//
// Build Targets
// -------------
//
// * browser
//
//   The default target. This will package up the core `highlight.js` along
//   with all the language definitions into the file `highlight.js`. A
//   minified version is also created unless `--no-minify` is passed.
//   It also builds the documentation for our readthedocs page, mentioned
//   above, along with a local instance of the demo found at:
//
//   <https://highlightjs.org/static/demo/>.
//
// * cdn
//
//   This will package up the core `highlight.js` along with any specified
//   language definitions into the file `highlight.min.js` and also package
//   _all_ languages and styles into separate files. The intended use is for
//   CDNs -- like cdnjs and jsdelivr -- so `--no-minify` is ignored.
//   Do keep in mind that we don't provide the build results in the main
//   repository; however, there is a separate repository for those that want
//   the CDN builds without using a third party site or building it
//   themselves. For those curious, head over to:
//
//   <https://github.com/highlightjs/cdn-release>
//
// * node
//
//   This build will transform the library into a CommonJS module. It
//   includes the generation of an `index.js` file that will be the main
//   file imported for use with Node.js or browserify. Do note that this
//   includes all languages by default and it might be too heavy to use for
//   browserify. Luckily, you can easily do two things to make the build
//   smaller; either specify the specific language/category you need or you
//   can use the browser or cdn builds and it will work like any CommonJS
//   file. Also with the CommonJS module, it includes the documentation for
//   our readthedocs page and the uncompressed styles. Getting this build is
//   pretty easy as it is the one that gets published to npm with the
//   standard `npm install highlight.js`, but you can also visit the package
//   page at:
//
//   <https://www.npmjs.com/package/highlight.js>
//
// * all
//
//   Builds every target and places the results into a sub-directory based
//   off of the target name relative to the `build` directory; for example,
//   "node" with go into `build/node`, "cdn" will go into `build/cdn`,
//   "browser" will go into `build/browser` and so forth.
//
// All build targets will end up in the `build` directory.

'use strict';

const commander = require('commander');
const path = require('path');
const { clean } = require("./lib/makestuff.js");
const log = (...args) => console.log(...args);

const TARGETS = ["cdn", "browser", "node"];
const dir = {};

commander
  .usage('[options] [<language>...]')
  .option('-n, --no-minify', 'Disable minification')
  .option('-ne, --no-esm', 'Disable building ESM')
  .option('-t, --target <name>',
    'Build for target '
    + '[all, browser, cdn, node]',
    'browser')
  .parse(process.argv);

const TARGET = commander.opts().target.toLowerCase();

dir.root = path.dirname(__dirname);
dir.buildRoot = path.join(dir.root, 'build');

async function doTarget(target, buildDir) {
  const build = require(`./build_${target}`);
  process.env.BUILD_DIR = buildDir;
  await clean(buildDir);
  await build.build({ languages: commander.args, minify: commander.opts().minify, esm: commander.opts().esm });
}

async function doBuild() {
  log("Starting build.");
  if (TARGET === "all") {
    await clean(dir.buildRoot);
    for (const target of TARGETS) {
      log(`** Building ${target.toUpperCase()}. **`);
      const buildDir = path.join(dir.buildRoot, target);
      await doTarget(target, buildDir);
    }
  } else if (TARGETS.includes(TARGET)) {
    doTarget(TARGET, dir.buildRoot);
  } else {
    log(`ERROR: I do not know how to build '${TARGET}'`);
  }
  log("Finished build.");
}

doBuild();
