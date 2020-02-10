const fs = require("fs")
const fsProm = require("fs").promises
const Terser = require("terser");
const glob = require("glob")
const path = require("path")
const build_config = require("../build_config")

const REQUIRES_REGEX = /\/\*.*?Requires: (.*?)\n/s
const CATEGORY_REGEX = /\/\*.*?Category: (.*?)\n/s
const LANGUAGE_REGEX = /\/\*.*?Language: (.*?)\n/s
const {rollupCode} = require("./bundling.js")
const { getThirdPartyPackages } = require("./external_language")

class Language {

  constructor(name, path) {
    this.name = name
    this.prettyName = name
    this.requires = []
    this.categories = []
    this.third_party = false

    // compiled code
    this.module = ""
    this.minified = ""

    this.path = path
    this.data = fs.readFileSync(path, {encoding: "utf8"})
    this.loadMetadata()
  }

  async compile(options) {
    await compileLanguage(this,options);
    return this;
  }

  get sample() {
    if (this._sample) return this._sample;

    this._sample = "";
    if (fs.existsSync(this.samplePath))
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
    if (filename.startsWith("/") || filename.startsWith("."))
    {
      var file = filename
    } else {
      var file = `./src/languages/${filename}`
    }
    return new Language(
      path.basename(filename).replace(".js",""),
      file
    )
  }
}


async function compileLanguage (language, options) {
  const EXPORT_REGEX = /export default (.*);/;
  const IIFE_HEADER_REGEX = /^(var dummyName = )?\(function \(\)/;

  // TODO: cant we use the source we already have?
  const input = { ...build_config.rollup.browser.input, input: language.path };
  const output = { ...build_config.rollup.browser.output,  name: `dummyName`, file: "out.js" };
  var data = await rollupCode(input, output)

  data = data.replace(IIFE_HEADER_REGEX, `hljs.registerLanguage('${language.name}', function ()`)

  var original = data;
  language.module = data;
  data = Terser.minify(data, options["terser"]);
  language.minified = data.code || original;
}

async function getLanguages() {
  let languages = [];
  glob.sync("./src/languages/*.js").forEach((file) => {
    languages.push(Language.fromFile(file));
  });
  let extraPackages = await getThirdPartyPackages();
  for (let ext of extraPackages) {
    for (let file of ext.files) {
      let l = Language.fromFile(file);
      l.loader = ext.loader;
      l.third_party = true;
      l.moduleDir = ext.dir;
      languages.push(l);
    }
  }
  return languages;
}

module.exports = { Language, getLanguages };
