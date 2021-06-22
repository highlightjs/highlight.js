const fs = require("fs");
const fsProm = require("fs").promises;
const glob = require("glob-promise");
const path = require("path");

const MODULE_DEFINER = /module\.exports\.definer\s*=/;

class LanguagePackage {
  constructor(packageDir) {
    this.dir = packageDir;
  }

  // check for language modules in /src/languages
  async trySrcLanguages() {
    const dir = path.join(this.dir, "src/languages/*");
    const languages = await glob(dir);
    if (languages.length > 0) {
      this.files = languages.map(fn => `./${fn}`);
      this.names = this.files.map(fn => path.basename(fn, ".js"));
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

  // try to find a language module by probing package.json
  async tryPackageJSON() {
    const pack = path.join(this.dir, "package.json");
    if (fs.existsSync(pack)) {
      const data = await fsProm.readFile(pack);
      const json = JSON.parse(data);
      if (json.main) {
        this.type = "npm";
        const file = path.join(process.cwd(), this.dir, json.main);
        const content = await fsProm.readFile(file, { encoding: "utf8" });
        // many existing languages seem to export a `definer` function rather than
        // simply export the language module directly.  This checks for that and if
        // so allows those existing modules to work "as is" by allowing the build
        // system to know it should call `definer` to define the language not call
        // the default export
        if (content.match(MODULE_DEFINER)) {
          this.loader = "definer";
        }
        this.files = [file];
        this.names = [path.basename(file, ".js")];
        this._valid = true;
        return true;
      }
    }
  }

  get bundle() { return this._bundle; }

  async detect() {
    // any bundle with files in ROOT/src/languages/ will be considered a potential
    // multi language bundle and any files in that directy will be considered to be
    // language modules
    await this.trySrcLanguages()
      // otherwise we fall back to looking for a package.json and whatever it's
      // `main` entry point is that is the file we assume the language module is
      // defined in
      || await this.tryPackageJSON();
    this._detected = true;
  }

  async valid() {
    if (!this._detected) {
      await this.detect();
    }
    return this._valid;
  }
}

// third party language modules are dropped into the `highlight-js/extra`
// folder and will be auto-detected by the build system
async function getThirdPartyPackages() {
  const packages = [];
  const otherPackages = await glob("./extra/*");
  for (const packageDir of otherPackages) {
    const thirdPartyPackage = new LanguagePackage(packageDir);
    const valid = await thirdPartyPackage.valid();
    if (valid) {
      packages.push(thirdPartyPackage);
    }
  }
  return packages;
}

module.exports = { LanguagePackage, getThirdPartyPackages };
