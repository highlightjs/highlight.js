const fs = require("fs")
const fsProm = require("fs").promises
const glob = require("glob-promise")
const path = require("path")

const MODULE_DEFINER = /module\.exports\.definer\s*=/;

class LanguagePackage {
  constructor(packageDir) {
    this.dir = packageDir;
  }

  async trySrcLanguages() {
    let dir = path.join(this.dir,"src/languages/*");
    let languages = await glob(dir);
    if (languages[0]) {
      this.file = path.join(process.cwd(), languages[0]);
      this.name = path.basename(this.file,".js");
      this._bundle = true;
      this._valid = true;
      return true;
    }
  }

  get markupTestPath() {
    if (this.bundle) {
      return `${this.dir}/test/markup/${this.name}`;
    } else {
      return `${this.dir}/test/markup`;
    }
  }

  get detectTestPath() {
    if (this.bundle) {
      return `${this.dir}/test/detect/${this.name}`;
    } else {
      return `${this.dir}/test/detect`;
    }
  }

  async tryPackageJSON() {
    let pack = path.join(this.dir,"package.json");
    if (fs.existsSync(pack)) {
      let data = await fsProm.readFile(pack);
      let json = JSON.parse(data);
      if (json.main) {
        this.type = "npm";
        let file = path.join(process.cwd(),this.dir, json.main);
        let content = await fsProm.readFile(file, { encoding: "utf8" });
        if (content.match(MODULE_DEFINER)) {
          this.loader = "definer";
        }
        this.file = file;
        this.name = path.basename(file,".js");
        this._valid = true;
        return true;
      }
    }
  }

  get bundle() { return this._bundle; }

  async detect() {
    await this.trySrcLanguages() ||
      await this.tryPackageJSON();
    this._detected = true;
  }

  async valid() {
    if (!this._detected) {
      await this.detect()
    }
    return this._valid;
  }
}

async function getThirdPartyLanguages() {
  let languages = [];
  let otherLanguages = await glob("./extra/*");
  for (let packageDir of otherLanguages) {
    let thirdPartyLanguage = new LanguagePackage(packageDir)
    let valid = await thirdPartyLanguage.valid();
    if (valid) {
      languages.push(thirdPartyLanguage)
    }
  }
  return languages;
}

module.exports = { LanguagePackage, getThirdPartyLanguages}
