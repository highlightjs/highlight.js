const fs = require("fs").promises;
const config = require("./build_config");
const { getLanguages } = require("./lib/language");
const { install, mkdir } = require("./lib/makestuff");
const { filter } = require("./lib/dependencies");
const { rollupWrite } = require("./lib/bundling.js");
const log = (...args) => console.log(...args);

async function buildNodeIndex(languages) {
  const header = "var hljs = require('./core');";
  const footer = "module.exports = hljs;";

  const registration = languages.map((lang) => {
    let require = `require('./languages/${lang.name}')`;
    if (lang.loader) {
      require = require += `.${lang.loader}`;
    }
    return `hljs.registerLanguage('${lang.name}', ${require});`;
  });

  // legacy
  await fs.writeFile(`${process.env.BUILD_DIR}/lib/highlight.js`,
    "// This file has been deprecated in favor of core.js\n" +
    "var hljs = require('./core');\n"
  );

  const index = `${header}\n\n${registration.join("\n")}\n\n${footer}`;
  await fs.writeFile(`${process.env.BUILD_DIR}/lib/index.js`, index);
}

async function buildNodeLanguage(language) {
  const input = { ...config.rollup.node.input, input: language.path };
  const output = { ...config.rollup.node.output, file: `${process.env.BUILD_DIR}/lib/languages/${language.name}.js` };
  await rollupWrite(input, output);
}

async function buildNodeHighlightJS() {
  const input = { ...config.rollup.node.input, input: `src/highlight.js` };
  const output = { ...config.rollup.node.output, file: `${process.env.BUILD_DIR}/lib/core.js` };
  await rollupWrite(input, output);
}

async function buildPackageJSON() {
  const CONTRIBUTOR = /^- ([^<(]+( ?<.+>)?( ?\(http.+\))?)/;

  const authors = await fs.readFile("AUTHORS.txt", { encoding: "utf8" });
  const lines = authors.split(/\r?\n/);
  const packageJson = require("../package");

  packageJson.contributors = lines
    .map(line => line.match(CONTRIBUTOR))
    .filter((matches) => matches)
    .map((matches) => matches[1]);

  await fs.writeFile(`${process.env.BUILD_DIR}/package.json`, JSON.stringify(packageJson, null, 2));
}

async function buildLanguages(languages) {
  log("Writing languages.");
  await Promise.all(
    languages.map(async(lang) => {
      await buildNodeLanguage(lang);
      process.stdout.write(".");
    })
  );
  log("");
}

async function buildNode(options) {
  mkdir("lib/languages");
  mkdir("scss");
  mkdir("styles");
  mkdir("types");

  install("./LICENSE", "LICENSE");
  install("./README.md", "README.md");
  install("./types/index.d.ts", "types/index.d.ts");

  log("Writing styles.");
  const styles = await fs.readdir("./src/styles/");
  styles.forEach((file) => {
    install(`./src/styles/${file}`, `styles/${file}`);
    install(`./src/styles/${file}`, `scss/${file.replace(".css", ".scss")}`);
  });
  log("Writing package.json.");
  await buildPackageJSON();

  let languages = await getLanguages();
  // filter languages for inclusion in the highlight.js bundle
  languages = filter(languages, options.languages);

  await buildNodeIndex(languages);
  await buildLanguages(languages);

  log("Writing highlight.js");
  await buildNodeHighlightJS();
}

module.exports.build = buildNode;
module.exports.buildPackageJSON = buildPackageJSON;
