const fs = require("fs")
const fsProm = require("fs").promises
const glob = require("glob-promise")
const path = require("path")


class ExternalLanguage {
  constructor(dir) {
    this.dir = dir
  }

  async trySrcLanguages() {
    var dir = path.join(this.dir,"src/languages/*")
    var langs = await glob(dir)
    if (langs[0]) {
      this.file = path.join(process.cwd(), langs[0])
      this.name = path.basename(this.file,".js")
      this.bundle = true
      this._valid = true
      return true
    }
  }

  get markupTestPath() {
    if (this.bundle) {
      return `${this.dir}/test/markup/${this.name}`
    } else {
      return `${this.dir}/test/markup`
    }
  }

  get detectTestPath() {
    if (this.bundle) {
      return `${this.dir}/test/detect/${this.name}`
    } else {
      return `${this.dir}/test/detect`
    }
  }

  async tryPackageJSON() {
    var pack = path.join(this.dir,"package.json")
    if (fs.existsSync(pack)) {
      var data = await fsProm.readFile(pack)
      var json = JSON.parse(data)
      if (json.main) {
        this.type = "npm"
        let file = path.join(process.cwd(),this.dir, json.main)
        let x = require(file)
        if (x.definer) {
          this.loader = "definer"
        } else {
          this.loader = null
        }
        // this.language = Language.fromFile(file)
        this.file = file
        this.name = path.basename(file,".js")
        this._valid = true
        return true
      }
    }
  }

  async detect() {
    await this.tryPackageJSON() ||
      await this.trySrcLanguages()
  }

  async valid() {
    await this.detect()
    return this._valid;
  }
}

async function getThirdPartyLanguages() {
  var languages = []
  var other = await glob("./extra/*")
  // var other = await glob("./extra/highlightjs-lustre")
  for (var dir of other) {
    let thirdPartyLanguage = new ExternalLanguage(dir)
    var v = await thirdPartyLanguage.valid();
    if (v) {
      languages.push(thirdPartyLanguage)
    }
  }
  return languages;
}

module.exports = { ExternalLanguage, getThirdPartyLanguages}
