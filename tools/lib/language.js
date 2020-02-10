const fs = require("fs")
const fsProm = require("fs").promises
const Terser = require("terser");

const REQUIRES_REGEX = /\/\*.*?Requires: (.*?)\n/s
const CATEGORY_REGEX = /\/\*.*?Category: (.*?)\n/s
const LANGUAGE_REGEX = /\/\*.*?Language: (.*?)\n/s
const {buildOutput} = require("./bundling.js")

class Language {

  constructor(name, path) {
    this.name = name
    this.prettyName = name
    this.requires = []
    this.categories = []

    // compiled code
    this.module = ""
    this.minified = ""

    this.data = fs.readFileSync(path, {encoding: "utf8"})
    this.loadMetadata()
  }

  async compile(options) {
    await compileLanguage(this,options);
    return this;
  }

  get sample() {
    if (this._sample) return this._sample;

    this._sample = fs.readFileSync(this.samplePath, {encoding: "utf8"});
    return this._sample;
  }

  get samplePath() {
    return `./test/detect/${this.name}/default.txt`
  }

  loadMetadata() {
    var requiresMatch = REQUIRES_REGEX.exec(this.data)
    var categoryMatch = CATEGORY_REGEX.exec(this.data)
    var languageMatch = LANGUAGE_REGEX.exec(this.data)

    if (requiresMatch)
      this.requires = requiresMatch[1].split(", ").map((n) => n.replace(".js",""))

    if (categoryMatch)
      this.categories = categoryMatch[1].split(/,\s?/)

    if (languageMatch)
      this.prettyName = languageMatch[1]
  }

  static fromFile(filename) {
    var path = `./src/languages/${filename}`
    return new Language(
      filename.replace(".js",""),
      path
    )
  }
}


async function compileLanguage (language, options) {
  const EXPORT = /export default (.*);/
  const opts = { format: "esm", strict: false,
    outro: "<outro>",
    compact: false,
    interop: false,
    extend: false,
    }

  // TODO: cant we use the source we already have?
  const input = { input: `src/languages/${language.name}.js` }
  const output = { ...opts,  name: `hljs`, file: "out.js" }
  var data = await buildOutput(input, output)

  var m = EXPORT.exec(data)
  data = data.replace(EXPORT, "")
  data = data.replace(`function ${m[1]}`,`hljs.registerLanguage('${language.name}',function`)
  data = data.replace(`<outro>`,');')
  language.module = data
  data = Terser.minify(data, options["terser"])
  language.minified = data.code
}

function getLanguages() {
  let languages = []
  fs.readdirSync("./src/languages/").forEach((file) => {
    languages.push(Language.fromFile(file))
  })
  return languages
}

module.exports = { Language, getLanguages }
