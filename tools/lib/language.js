const fs = require("fs")
const fsProm = require("fs").promises
const Terser = require("terser");
const glob = require("glob")
const path = require("path")
const build_config = require("../build_config")

const packageJSON = require("../../package.json")
const REQUIRES_REGEX = /\/\*.*?Requires: (.*?)\r?\n/s
const CATEGORY_REGEX = /\/\*.*?Category: (.*?)\r?\n/s
const LANGUAGE_REGEX = /\/\*.*?Language: (.*?)\r?\n/s
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
    if (this.moduleDir) {
      // this is the 'extras' case.
      return `${this.moduleDir}/test/detect/${this.name}/default.txt`;
    }
    else {
      // this is the common/built-in case.
      return `./test/detect/${this.name}/default.txt`;
    }
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
    return new Language(
      path.basename(filename).replace(".js",""),
      filename
    );
  }
}


async function compileLanguage (language, options) {
  const HEADER = `/*! \`${language.name}\` grammar compiled for Highlight.js ${packageJSON.version} */`;

  // TODO: cant we use the source we already have?
  const input = { ...build_config.rollup.browser_iife.input, input: language.path };
  const output = { ...build_config.rollup.browser_iife.output, name: `hljsGrammar`, file: "out.js" };
  output.footer = null;

  const data = await rollupCode(input, output);
  const iife = `
  ${HEADER}
  (function(){
    ${data}
    hljs.registerLanguage('${language.name}', hljsGrammar);
  })();
  `.trim();
  const esm = `${HEADER}\n${data};\nexport default hljsGrammar;`;

  language.module = iife;
  const miniESM = await Terser.minify(esm, options.terser);
  const miniIIFE = await Terser.minify(iife, options.terser);
  language.minified = miniIIFE.code;
  language.minifiedESM = miniESM.code;
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
