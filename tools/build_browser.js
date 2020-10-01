const _        = require('lodash');
const fs = require("fs").promises;
const glob = require("glob-promise");
const path = require("path");
const zlib = require('zlib');
const Terser = require("terser");
const child_process = require('child_process');
const { getLanguages } = require("./lib/language");
const { filter } = require("./lib/dependencies");
const config = require("./build_config");
const { install, install_cleancss, mkdir, renderTemplate } = require("./lib/makestuff");
const log = (...args) => console.log(...args);
const { rollupCode } = require("./lib/bundling.js");

function buildHeader(args) {
  return "/*\n" +
  `  Highlight.js ${args.version} (${args.git_sha})\n` +
  `  License: ${args.license}\n` +
  `  Copyright (c) ${config.copyrightYears}, ${args.author.name}\n*/`;
}

async function buildBrowser(options) {
  var languages = await getLanguages()
  // filter languages for inclusion in the highlight.js bundle
  languages = filter(languages, options["languages"]);

  await installDocs();
  await installDemo(languages, { minify: options.minify });

  log("Preparing languages.")
  await Promise.all(
    languages.map(async (lang) => {
      await lang.compile({terser: config.terser});
      process.stdout.write(".");
     } )
  );
  log("");

  var size = await buildBrowserHighlightJS(languages, {minify: options.minify})

  log("-----")
  log("Core                :", size.core ,"bytes");
  if (options.minify)
    log("Core (min)          :", size.core_min ,"bytes");
  log("Languages           :",
    languages.map((el) => el.data.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  if (options.minify) {
    log("Languages (min)     :",
      languages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  }
  log("highlight.js        :", size.full ,"bytes");
  if (options.minify) {
    log("highlight.min.js    :", size.minified ,"bytes");
    log("highlight.min.js.gz :", zlib.gzipSync(size.minifiedSrc).length ,"bytes");
  } else {
    log("highlight.js.gz     :", zlib.gzipSync(size.fullSrc).length ,"bytes");
  }
  log("-----");
}

async function installDemo(languages, { minify }) {
  log("Writing demo files.");
  mkdir("demo");
  installDemoStyles();

  const assets = await glob("./demo/*.{js,css}");
  assets.forEach((file) => install(file));

  const css = await glob("styles/*.css", {cwd:"./src"})
  const styles = css.map((el) => (
    { "name": _.startCase(path.basename(el,".css")), "path": el }
  ));
  renderTemplate("./demo/index.html", "./demo/index.html", { styles, languages, minify });
}

async function installDocs() {
  log("Writing docs files.");
  mkdir("docs");

  let docs = await glob("./docs/*.rst");
  docs.forEach((file) => install(file));
}

function installDemoStyles() {
  log("Writing style files.");
  mkdir("demo/styles");

  glob.sync("*", {cwd: "./src/styles"}).forEach((file) => {
    if (file.endsWith(".css"))
      install_cleancss(`./src/styles/${file}`,`demo/styles/${file}`);
    else // images, backgrounds, etc
      install(`./src/styles/${file}`,`demo/styles/${file}`);
  })
}

async function buildBrowserHighlightJS(languages, {minify}) {
  log("Building highlight.js.");

  var git_sha = child_process
    .execSync("git rev-parse HEAD")
    .toString().trim()
    .slice(0,8)
  var versionDetails = {...require("../package"), git_sha};
  var header = buildHeader(versionDetails);

  var outFile = `${process.env.BUILD_DIR}/highlight.js`;
  var minifiedFile = outFile.replace(/js$/,"min.js");

  const input = { ...config.rollup.browser_core.input, input: `src/highlight.js` }
  const output = { ...config.rollup.browser_core.output, file: outFile };
  var librarySrc = await rollupCode(input, output);

  // var librarySrc = await fs.readFile("src/highlight.js", {encoding: "utf8"});
  var coreSize = librarySrc.length;

  // strip off the original top comment
  librarySrc = librarySrc.replace(/\/\*.*?\*\//s,"");

  var fullSrc = [
    header, librarySrc,
    ...languages.map((lang) => lang.module) ].join("\n");

  var tasks = [];
  tasks.push(fs.writeFile(outFile, fullSrc, {encoding: "utf8"}));

  var core_min = [];
  var minifiedSrc = "";

  if (minify) {
    var tersed = Terser.minify(librarySrc, config.terser)

    minifiedSrc = [
      header, tersed.code,
      ...languages.map((lang) => lang.minified) ].join("\n");

    // get approximate core minified size
    core_min = [ header, tersed.code].join().length;

    tasks.push(fs.writeFile(minifiedFile, minifiedSrc, {encoding: "utf8"}));
  }

  await Promise.all(tasks);
  return {
    core: coreSize,
    core_min: core_min,
    minified: Buffer.byteLength(minifiedSrc, 'utf8'),
    minifiedSrc,
    fullSrc,
    full: Buffer.byteLength(fullSrc, 'utf8') };
}

// CDN build uses the exact same highlight.js distributable
module.exports.buildBrowserHighlightJS = buildBrowserHighlightJS;
module.exports.build = buildBrowser;
