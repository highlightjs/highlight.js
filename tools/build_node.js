const fs = require("fs").promises;
const config = require("./build_config");
const { getLanguages } = require("./lib/language");
const { install, mkdir } = require("./lib/makestuff");
const { filter } = require("./lib/dependencies");
const { rollupWrite } = require("./lib/bundling.js");
const log = (...args) => console.log(...args);

async function buildNodeIndex(languages) {
  const header = "import hljs from './core.mjs';";
  const footer = "export default hljs;";

  const registration = languages.map((lang) => {
    let out = '';
    const importName = "L_" + lang.name.replace("-","_")
    let require = `import ${importName} from './languages/${lang.name}.mjs';`;
    // TODO: break this with v11? All modules must export default?
    if (lang.loader) {
      require = require += `.${lang.loader}`;
    } else {
      out += require;
      out += `hljs.registerLanguage('${lang.name}', ${importName});`;
    }
    return out;
  });

  const index = `${header}\n\n${registration.join("\n")}\n\n${footer}`;
  await fs.writeFile(`${process.env.BUILD_DIR}/lib/index.mjs`, index);
}

async function buildNodeLanguage(language) {
  const input = { ...config.rollup.node.input, input: language.path };
  const output = { ...config.rollup.node.output, file: `${process.env.BUILD_DIR}/lib/languages/${language.name}.mjs` };
  await rollupWrite(input, output);
}

async function buildNodeHighlightJS() {
  const input = { ...config.rollup.node.input, input: `src/highlight.js` };
  const output = { ...config.rollup.node.output, file: `${process.env.BUILD_DIR}/lib/core.mjs` };
  await rollupWrite(input, output);
}

async function buildPackageJSON() {
  const packageJson = require("../package");
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
  install("./src/core.d.ts","lib/core.d.ts");

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
