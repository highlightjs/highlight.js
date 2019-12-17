const fs = require("fs").promises
const config = require("./build_config")

const { getLanguages } = require("./lib/language")
const { install, mkdir } = require("./lib/makestuff")
const { filter } = require("./lib/dependencies")
const { build } = require("./lib/bundling.js")
const log = (...args) => console.log(...args)

async function buildNodeIndex(languages) {
  const header = "var hljs = require('./highlight');"
  const footer = "module.exports = hljs;"

  const registration = languages.map((lang) =>
    `hljs.registerLanguage('${lang.name}', require('./languages/${lang.name}'));`
  )

  const index = `${header}\n\n${registration.join("\n")}\n\n${footer}`
  await fs.writeFile(`${process.env.BUILD_DIR}/lib/index.js`, index)
}

 async function buildNodeLanguage (language) {
  const input = { input: `src/languages/${language.name}.js` }
  const output = { ...config.CJS,  file: `${process.env.BUILD_DIR}/lib/languages/${language.name}.js` }
  await build(input, output)
}

async function buildNodeHighlightJS() {
  const input = { input: `src/highlight.js` }
  const output = { ...config.CJS, file: `${process.env.BUILD_DIR}/lib/highlight.js` }
  await build(input, output)
}

async function buildPackageJSON() {
  const CONTRIBUTOR = /^- (.*) <(.*)>$/

  var authors = await fs.readFile("AUTHORS.en.txt", {encoding: "utf8"})
  var lines = authors.split(/\r?\n/)
  var json = require("../package")
  json.contributors = lines.reduce((acc, line) => {
    let matches = line.match(CONTRIBUTOR)

    if (matches) {
      acc.push({
        name: matches[1],
        email: matches[2]
      })
    }
    return acc;
  }, [])
  fs.writeFile(`${process.env.BUILD_DIR}/package.json`, JSON.stringify(json, null, '   '))
}

async function buildLanguages(languages) {
  log("Writing languages.")
  await Promise.all(
    languages.map(async (lang) =>  {
      await buildNodeLanguage(lang);
      process.stdout.write(".");
    })
  )
  log("")
}

async function buildNode(options) {
  mkdir("lib/languages")
  mkdir("scss")
  mkdir("styles")

  install("./LICENSE", "LICENSE")
  install("./README.md","README.md")

  log("Writing styles.")
  const styles = await fs.readdir("./src/styles/")
  styles.forEach((file) => {
    install(`./src/styles/${file}`,`styles/${file}`)
    install(`./src/styles/${file}`,`scss/${file.replace(".css",".scss")}`)
  })
  log("Writing package.json.")
  await buildPackageJSON()

  var languages = getLanguages()
  // filter languages for inclusion in the highlight.js bundle
  languages = filter(languages, options["languages"])

  await buildNodeIndex(languages)
  await buildLanguages(languages)
  log("Writing highlight.js")
  await buildNodeHighlightJS()
}

/* glue code to tie into the existing Gear based system until it's replaced */

let gear     = require('gear');
let utility  = require('./utility');

var tasks = {
  build: async function([commander, dir], blobs, done) {
    // console.log("commander", commander)
    process.env.BUILD_DIR = dir.build
    // console.log("dir", dir)
    await buildNode({languages: commander.args});
    return done(null);
  }
}
tasks.build.type = 'collect';
let registry = new gear.Registry({ tasks: tasks });

module.exports = function(commander, dir) {
  return utility.toQueue([{startLog: { task: ['build', [commander, dir]] }}], registry)
};


module.exports.build = buildNode;
