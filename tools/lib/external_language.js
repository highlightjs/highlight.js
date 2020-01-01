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
    if (languages.length > 0) {
      this.files = languages.map(fn => path.join(process.cwd(), fn));
      this.names = this.files.map(fn => path.basename(fn,".js"));
      this._bundle = true;
      this._valid = true;
      return true;
    } else { return false; }
  }

  get markupTestPaths() {
    if (this.bundle) {
      return this.names.map(name => `${this.dir}/test/markup/${name}`);
    } else {
      return [`${this.dir}/test/markup`];
    }
  }

  get detectTestPaths() {
    if (this.bundle) {
      return this.names.map(name => `${this.dir}/test/detect/${name}`);
    } else {
      return [`${this.dir}/test/detect`];
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
        this.files = [file];
        this.names = [path.basename(file,".js")];
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

async function getThirdPartyPackages() {
  let packages = [];
  let otherPackages = await glob("./extra/*");
  for (let packageDir of otherPackages) {
    let thirdPartyPackage = new LanguagePackage(packageDir)
    let valid = await thirdPartyPackage.valid();
    if (valid) {
      packages.push(thirdPartyPackage)
    }
  }
  return packages;
}

module.exports = { LanguagePackage, getThirdPartyPackages}
