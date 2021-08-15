const fs = require("fs").promises;
const fss = require("fs");
const config = require("./build_config");
const glob = require("glob-promise");
const { getLanguages } = require("./lib/language");
const { install, mkdir, installCleanCSS } = require("./lib/makestuff");
const { filter } = require("./lib/dependencies");
const { rollupWrite } = require("./lib/bundling.js");
const log = (...args) => console.log(...args);

// https://nodejs.org/api/packages.html#packages_writing_dual_packages_while_avoiding_or_minimizing_hazards
async function buildESMStub(name) {
  const code =
    `// https://nodejs.org/api/packages.html#packages_writing_dual_packages_while_avoiding_or_minimizing_hazards\n` +
    `import hljs from '../lib/${name}.js';\n` +
    `export { hljs };\n` +
    `export default hljs;\n`;
  await fs.writeFile(`${process.env.BUILD_DIR}/es/${name}.js`, code);
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

async function buildNodeLanguage(language, options) {
  const EMIT = `function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/%%%%" instead of "highlight.js/lib/languages/%%%%.js"'
      );
    }
  }
  emitWarning();`;
  const CJS_STUB = `${EMIT}
    module.exports = require('./%%%%.js');`;
  const ES_STUB = `${EMIT}
    import lang from './%%%%.js';
    export default lang;`;
  const input = { ...config.rollup.core.input, input: language.path };
  const output = { ...config.rollup.node.output, file: `${process.env.BUILD_DIR}/lib/languages/${language.name}.js` };
  await rollupWrite(input, output);
  await fs.writeFile(`${process.env.BUILD_DIR}/lib/languages/${language.name}.js.js`,
    CJS_STUB.replace(/%%%%/g, language.name));
  if (options.esm) {
    await fs.writeFile(`${process.env.BUILD_DIR}/es/languages/${language.name}.js.js`,
      ES_STUB.replace(/%%%%/g, language.name));
    await rollupWrite(input, {...output,
      format: "es",
      file: output.file.replace("/lib/", "/es/")
    });
  }
}

const EXCLUDE = ["join"];

async function buildESMUtils() {
  const input = { ...config.rollup.core.input, input: `src/lib/regex.js` };
  input.plugins = [...input.plugins, {
    transform: (code) => {
      EXCLUDE.forEach((fn) => {
        code = code.replace(`export function ${fn}(`, `function ${fn}(`);
      });
      return code;
    }
  }];
  await rollupWrite(input, {
    ...config.rollup.node.output,
    format: "es",
    file: `${process.env.BUILD_DIR}/es/utils/regex.js`
  });
}

async function buildNodeHighlightJS(options) {
  const input = { ...config.rollup.core.input, input: `src/highlight.js` };
  const output = { ...config.rollup.node.output, file: `${process.env.BUILD_DIR}/lib/core.js` };
  await rollupWrite(input, output);
  if (options.esm) {
    buildESMStub("core");
  }
}

function dual(file) {
  return {
    require: file,
    import: file.replace("/lib/", "/es/")
  };
}

const generatePackageExports = () => ({
  ".": dual("./lib/index.js"),
  "./package.json": "./package.json",
  "./lib/common": dual("./lib/common.js"),
  "./lib/core": dual("./lib/core.js"),
  "./lib/languages/*": dual("./lib/languages/*.js"),
  "./scss/*": "./scss/*",
  "./styles/*": "./styles/*",
  "./types/*": "./types/*",
});
function buildPackageJSON(options) {
  const packageJson = require("../package.json");

  if (options.esm) packageJson.exports = generatePackageExports();

  return packageJson;
}
function writePackageJSON(packageJson) {
  return fs.writeFile(`${process.env.BUILD_DIR}/package.json`, JSON.stringify(packageJson, null, 2));
}

async function buildLanguages(languages, options) {
  log("Writing languages.");
  await Promise.all(
    languages.map(async(lang) => {
      await buildNodeLanguage(lang, options);
      process.stdout.write(".");
    })
  );
  log("");
}

const CORE_FILES = [
  "LICENSE",
  "README.md",
  "VERSION_10_UPGRADE.md",
  "VERSION_11_UPGRADE.md",
  "SUPPORTED_LANGUAGES.md",
  "SECURITY.md",
  "CHANGES.md",
  "types/index.d.ts"
];

async function buildNode(options) {
  mkdir("lib/languages");
  mkdir("scss/base16");
  mkdir("styles/base16");
  mkdir("types");


  CORE_FILES.forEach(file => {
    install(`./${file}`, file);
  });
  install("./src/core.d.ts", "lib/core.d.ts");
  install("./src/core.d.ts", "lib/common.d.ts");

  if (options.esm) {
    mkdir("es/languages");
    install("./src/core.d.ts", "es/core.d.ts");
    install("./src/core.d.ts", "es/common.d.ts");
  }

  log("Writing styles.");
  // const styles = await fs.readdir("./src/styles/");
  glob.sync("**", { cwd: "./src/styles" }).forEach((file) => {
    const stat = fss.statSync(`./src/styles/${file}`);
    if (stat.isDirectory()) return;

    if (file.endsWith(".css")) {
      installCleanCSS(`./src/styles/${file}`, `styles/${file}`);
      installCleanCSS(`./src/styles/${file}`, `scss/${file.replace(".css", ".scss")}`);
    } else {
      // images, etc.
      install(`./src/styles/${file}`, `styles/${file}`);
    }
  });

  let languages = await getLanguages();
  // filter languages for inclusion in the highlight.js bundle
  languages = filter(languages, options.languages);
  const common = languages.filter(l => l.categories.includes("common"));

  log("Writing package.json.");
  await writePackageJSON(buildPackageJSON(options));

  if (options.esm) {
    await fs.writeFile(`${process.env.BUILD_DIR}/es/package.json`, `{ "type": "module" }`);
    await buildESMStub("index");
    await buildESMStub("common");
    await buildESMUtils();
  }
  await buildCJSIndex("index", languages);
  await buildCJSIndex("common", common);
  await buildLanguages(languages, options);

  log("Writing highlight.js");
  await buildNodeHighlightJS(options);
}

module.exports.build = buildNode;
module.exports.buildPackageJSON = buildPackageJSON;
module.exports.writePackageJSON = writePackageJSON;
