const _        = require('lodash');
const fs = require("fs").promises
const glob = require("glob-promise")
const path = require("path")
const zlib = require('zlib')
const Terser = require("terser");
const child_process = require('child_process');
const { getLanguages } = require("./lib/language")
const { filter } = require("./lib/dependencies")
const config = require("./build_config")

const { install, install_cleancss, mkdir, renderTemplate } = require("./lib/makestuff")
const log = (...args) => console.log(...args)

function buildHeader(args) {
  return "/*\n" +
  `  Highlight.js ${args.version} (${args.git_sha})\n` +
  `  License: ${args.license}\n` +
  `  Copyright (c) ${config.copyrightYears}, ${args.author.name}\n*/`
}

async function buildBrowser(options) {
  var languages = getLanguages()
  // filter languages for inclusion in the highlight.js bundle
  languages = filter(languages, options["languages"])

  await installDocs();
  await installDemo(languages);


  log("Preparing languages.")
  await Promise.all(
    languages.map(async (lang) => {
      await lang.compile({terser: config.terser});
      process.stdout.write(".");
     } )
  )
  log("")

  // config.terser.mangle.properties.cache.props.delete("className")

  var size = await buildBrowserHighlightJS(languages)

  log("-----")
  log("Core                :", size.core ,"bytes")
  log("Core (min)          :", size.core_min ,"bytes")
  log("Languages           :", languages.map((el) => el.data.length).reduce((acc, curr) => acc + curr, 0), "bytes")
  log("Languages (min)     :", languages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes")
  log("highlight.js        :", size.regular ,"bytes")
  log("highlight.min.js    :", size.minified ,"bytes")
  log("highlight.min.js.gz :", zlib.gzipSync(size.data).length ,"bytes")
  log("-----")
}

async function installDemo(languages) {
  log("Writing demo files.")
  mkdir("demo")
  installDemoStyles();

  const assets = await glob("./demo/*.{js,css}")
  assets.forEach((file) => install(file))

  const css = await glob("styles/*.css", {cwd:"./src"})
  const styles = css.map((el) => (
    { "name": _.startCase(path.basename(el,".css")), "path": el }
  ) )
  renderTemplate("./demo/index.html", "./demo/index.html", { styles , languages })
}

async function installDocs() {
  log("Writing docs files.")
  mkdir("docs")

  let docs = await glob("./docs/*.rst")
  docs.forEach((file) => install(file))
}

function installDemoStyles() {
  log("Writing style files.")
  mkdir("demo/styles")

  glob.sync("*", {cwd: "./src/styles"}).forEach((file) => {
    if (file.endsWith(".css"))
      install_cleancss(`./src/styles/${file}`,`demo/styles/${file}`)
    else // images, backgrounds, etc
      install(`./src/styles/${file}`,`demo/styles/${file}`)
  })
}

async function buildBrowserHighlightJS(languages) {
  log("Building highlight.js library file.")

  var git_sha = child_process
    .execSync("git rev-parse HEAD")
    .toString().trim()
    .slice(0,8)
  var versionDetails = {...require("../package"), git_sha}
  var header = buildHeader(versionDetails)

  var outFile = `${process.env.BUILD_DIR}/highlight.js`
  var minifiedFile = outFile.replace(/js$/,"min.js")
  var librarySrc = await fs.readFile("src/highlight.js", {encoding: "utf8"})
  var coreSize = librarySrc.length

  // strip off the original top comment
  librarySrc = librarySrc.replace(/\/\*.*?\*\//s,"")

  var workerStub = "if (typeof importScripts === 'function') { var hljs = self.hljs; }"
  var tersed = Terser.minify(librarySrc, config.terser)

  var minifiedSrc = [
    header, tersed.code, workerStub,
    ...languages.map((lang) => lang.minified) ].join("\n")

  var fullSrc = [
    header, librarySrc, workerStub,
    ...languages.map((lang) => lang.module) ].join("\n")

  // get approximate core minified size
  var core_min = [ header, tersed.code, workerStub].join().length

  await Promise.all([
    fs.writeFile(outFile, fullSrc, {encoding: "utf8"}),
    fs.writeFile(minifiedFile, minifiedSrc, {encoding: "utf8"})
  ])
  return {core: coreSize, core_min: core_min, minified: minifiedSrc.length, data: minifiedSrc, regular: fullSrc.length }
}

/* glue code to tie into the existing Gear based system until it's replaced */

let gear     = require('gear');
let utility  = require('./utility');

var tasks = {
  build: async function([commander, dir], blobs, done) {
    // console.log("commander", commander)
    process.env.BUILD_DIR = dir.build
    // console.log("dir", dir)
    await buildBrowser({languages: commander.args});
    return done(null);
  }
}
tasks.build.type = 'collect';
let registry = new gear.Registry({ tasks: tasks });

module.exports = function(commander, dir) {
  return utility.toQueue([{startLog: { task: ['build', [commander, dir]] }}], registry)
};

module.exports.buildBrowserHighlightJS = buildBrowserHighlightJS
