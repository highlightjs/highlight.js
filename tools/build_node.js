const fs = require("fs").promises;
const config = require("./build_config");
const { getLanguages } = require("./lib/language");
const { install, mkdir } = require("./lib/makestuff");
const { filter } = require("./lib/dependencies");
const { rollupWrite } = require("./lib/bundling.js");
const log = (...args) => console.log(...args);

const safeImportName = (s) => {
  s = s.replace(/-/g, "_");
  if (/^\d/.test(s)) s = `L_${s}`;
  return s;
};

async function buildESMIndex(name, languages) {
  const header = `import hljs from './core.mjs';`;
  const footer = "export default hljs;";


  const registration = languages.map((lang) => {
    const importName = safeImportName(lang.name);
    return `import ${importName} from './languages/${lang.name}.js';\n` +
      `hljs.registerLanguage('${lang.name}', ${importName});`;
  });

  const index = `${header}\n\n${registration.join("\n")}\n\n${footer}`;
  await fs.writeFile(`${process.env.BUILD_DIR}/es/${name}.js`, index);
}

async function buildCJSIndex(name, languages) {
  const header = "var hljs = require('./core');";
  const footer = "module.exports = hljs;";

  const registration = languages.map((lang) => {
    const require = `require('./languages/${lang.name}')`;
    return `hljs.registerLanguage('${lang.name}', ${require});`;
  });

  const index = `${header}\n\n${registration.join("\n")}\n\n${footer}`;
  await fs.writeFile(`${process.env.BUILD_DIR}/lib/${name}.js`, index);
}

async function buildNodeLanguage(language) {
  const input = { ...config.rollup.node.input, input: language.path };
  const output = { ...config.rollup.node.output, file: `${process.env.BUILD_DIR}/lib/languages/${language.name}.js` };
  await rollupWrite(input, output);
  await rollupWrite(input, {...output,
    format: "es",
    file: output.file.replace("/lib/", "/es/")
  });
}

const EXCLUDE = ["join"];

async function buildESMUtils() {
  const input = { ...config.rollup.node.input, input: `src/lib/regex.js` };
  input.plugins = [...input.plugins, {
    transform: (code) => {
      EXCLUDE.forEach((fn) => {
        code = code.replace(`export function ${fn}(`, `function ${fn}(`);
      });
      return code;
    }
  }];
  const output = {
    ...config.rollup.node.output,
    format: "es",
    file: `${process.env.BUILD_DIR}/es/utils/regex.js`
  };
  await rollupWrite(input, output);
}


async function buildNodeHighlightJS() {
  const input = { ...config.rollup.node.input, input: `src/highlight.js` };
  const output = { ...config.rollup.node.output, file: `${process.env.BUILD_DIR}/lib/core.js` };
  await rollupWrite(input, output);
  await rollupWrite(input, { ...output,
    format: "es",
    file: `${process.env.BUILD_DIR}/es/core.js`
  });
}

function dual(file) {
  return {
    require: file,
    import: file.replace("/lib/", "/es/")
  };
}

async function buildPackageJSON() {
  const packageJson = require("../package");

  const exports = {
    ".": dual("./lib/index.js"),
    "./package.json": "./package.json",
    "./lib/common": dual("./lib/common.js"),
    "./lib/core": dual("./lib/core.js"),
    "./lib/languages/*": dual("./lib/languages/*.js"),
  };
  packageJson.exports = exports;

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

const CORE_FILES = [
  "LICENSE",
  "README.md",
  "VERSION_10_UPGRADE.md",
  "SUPPORTED_LANGUAGES.md",
  "SECURITY.md",
  "CHANGES.md",
  "types/index.d.ts"
];

async function buildNode(options) {
  mkdir("lib/languages");
  mkdir("es/languages");
  mkdir("scss");
  mkdir("styles");
  mkdir("types");


  CORE_FILES.forEach(file => {
    install(`./${file}`, file);
  });
  install("./src/core.d.ts", "lib/core.d.ts");
  install("./src/core.d.ts", "es/core.d.ts");
  install("./src/core.d.ts", "lib/common.d.ts");
  install("./src/core.d.ts", "es/common.d.ts");

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

  const common = languages.filter(l => l.categories.includes("common"));
  await buildESMIndex("index", languages);
  await buildESMIndex("common", common);
  await buildESMUtils();
  await buildCJSIndex("index", languages);
  await buildCJSIndex("common", common);
  await buildLanguages(languages);

  log("Writing highlight.js");
  await buildNodeHighlightJS();

}

module.exports.build = buildNode;
module.exports.buildPackageJSON = buildPackageJSON;
