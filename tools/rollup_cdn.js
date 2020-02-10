const fs = require("fs").promises
const glob = require("glob")
const zlib = require('zlib')
const { getLanguages } = require("./lib/language")
const {filter} = require("./lib/dependencies")
const config = require("./build_config")

const { install, install_cleancss, mkdir } = require("./lib/makestuff")
const log = (...args) => console.log(...args)

const { buildBrowserHighlightJS } = require("./roll_browser")

async function buildCDN(options) {
  installStyles();

  // all the languages are built for the CDN and placed into `/languages`
  const languages = getLanguages()
  await installLanguages(languages);

  // filter languages for inclusion in the highlight.js bundle
  const embedLanguages = filter(languages, options["languages"])

  var size = await buildBrowserHighlightJS(embedLanguages)

  log("-----")
  log("Embedded Lang   :", embedLanguages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes")
  log("All Lang        :", languages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes")
  log("highlight.js    :", size.regular, "bytes")
  log("highlight.min.js:", size.minified, "bytes")
  log("highlight.min.js.gz :", zlib.gzipSync(size.data).length ,"bytes")
  log("-----")
}

async function installLanguages(languages) {
  log("Building language files.")
  mkdir("languages")

  await Promise.all(
    languages.map(async (lang) => {
      await buildCDNLanguage(lang);
      process.stdout.write(".");
     } )
  )
  log("")
}

function installStyles() {
  log("Writing style files.")
  mkdir("styles")

  glob.sync("*", {cwd: "./src/styles"}).forEach((file) => {
    if (file.endsWith(".css"))
      install_cleancss(`./src/styles/${file}`,`styles/${file.replace(".css",".min.css")}`)
    else // images, backgrounds, etc
      install(`./src/styles/${file}`,`styles/${file}`)
  })
}

 async function buildCDNLanguage (language) {
  const out_file = `${process.env.BUILD_DIR}/languages/${language.name}.min.js`

  await language.compile({terser: config.terser});
  fs.writeFile(out_file, language.minified)
}

/* glue code to tie into the existing Gear based system until it's replaced */

let gear     = require('gear');
let utility  = require('./utility');

var tasks = {
  build: async function([commander, dir], blobs, done) {
    // console.log("commander", commander)
    // console.log("dir", dir)
    process.env.BUILD_DIR = dir.build
    await buildCDN({languages: commander.args});
    return done(null);
  }
}
tasks.build.type = 'collect';
let registry = new gear.Registry({ tasks: tasks });

module.exports = function(commander, dir) {
  return utility.toQueue([{startLog: { task: ['build', [commander, dir]] }}], registry)
};


