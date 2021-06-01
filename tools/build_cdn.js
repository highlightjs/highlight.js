const fs = require("fs").promises;
const fss = require("fs");
const glob = require("glob");
const Terser = require("terser");
const zlib = require('zlib');
const { getLanguages } = require("./lib/language");
const { filter } = require("./lib/dependencies");
const config = require("./build_config");
const { install, installCleanCSS, mkdir } = require("./lib/makestuff");
const log = (...args) => console.log(...args);
const { buildBrowserHighlightJS, buildBrowserESMHighlightJS } = require("./build_browser");
const { buildPackageJSON, writePackageJSON } = require("./build_node");
const { rollupCode } = require("./lib/bundling.js");
const path = require("path");
const bundling = require('./lib/bundling.js');

const textEncoder = new TextEncoder();

async function installPackageJSON(options) {
  const json = buildPackageJSON(options, {
    ".": {
      import: options.minify ? "./es/index.min.js" : "./es/index.js",
      browser: options.minify ? "./highlight.min.js" : "./highlight.js",
    },
    "./lib/languages/*": {
      import: "./es/languages/*.js",
      browser: "./languages/*.js"
    },
    get "./lib/common"(){ return this["."]; },
    "./lib/core": { import: "./es/core.js" },
    "./styles/*": "./styles/*",
    "./package.json": "./package.json",
  });
  json.name = "@highlightjs/cdn-assets";
  json.description = json.description.concat(" (pre-compiled CDN assets)");
  // this is not a replacement for `highlightjs` package
  delete json.exports;
  delete json.type;
  delete json.main;
  delete json.types;
  await writePackageJSON(json);
}

async function buildESMCore(options) {
  const input = { ...config.rollup.node.input, input: `src/highlight.js` };
  const output = {
    ...config.rollup.node.output,
    format: "es",
    file: `${process.env.BUILD_DIR}/es/core.js`,
  };
  const core = await rollupCode(input, output);

  const miniCore = options.minify ? await Terser.minify(core, {...config.terser, module: true}) : { code: core };
  const code = textEncoder.encode(miniCore.code || core);
  await fs.writeFile(output.file, code);
  return code.length;
}

let shas = {};

async function buildCDN(options) {
  install("./LICENSE", "LICENSE");
  install("./README.CDN.md", "README.md");
  await installPackageJSON(options);

  installStyles();

  // all the languages are built for the CDN and placed into `/languages`
  const languages = await getLanguages();
  
  let esmCoreSize, esmIndexSize;
  if (options.esm) {
    mkdir("es");
    await fs.writeFile(`${process.env.BUILD_DIR}/es/package.json`, `{ "type": "module" }`);
    esmCoreSize = await buildESMCore(options);
  }

  await installLanguages(languages, options);

  // filter languages for inclusion in the highlight.js bundle
  let embedLanguages = filter(languages, options.languages);

  // it really makes no sense to embed ALL languages with the CDN build, it's
  // more likely we want to embed NONE and have completely separate run-time
  // loading of some sort
  if (embedLanguages.length === languages.length) {
    embedLanguages = [];
  }

  const size = await buildBrowserHighlightJS(embedLanguages, { minify: options.minify });
  if (options.esm) esmIndexSize = await buildBrowserESMHighlightJS("index", embedLanguages, { minify: options.minify });
  shas = Object.assign({}, size.shas, shas);

  await buildSRIDigests(shas);

  log("-----");
  log("Embedded Lang       :",
    embedLanguages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  log("All Lang            :",
    languages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  log("highlight.js        :",
    size.full, "bytes");

  if (options.minify) {
    log("highlight.min.js    :", size.minified, "bytes");
    log("highlight.min.js.gz :", zlib.gzipSync(size.minifiedSrc).length, "bytes");
  } else {
    log("highlight.js.gz     :", zlib.gzipSync(size.fullSrc).length, "bytes");
  }
  if(options.esm) {
    log("es/index.js         :", esmIndexSize.fullSize, "bytes");
    log("es/core.js          :", esmCoreSize, "bytes");
    if (options.minify) {
      log("es/index.min.js     :", esmIndexSize.minified, "bytes");
      log("es/index.min.js.gz  :", zlib.gzipSync(esmIndexSize.minifiedSrc).length, "bytes");
    } else {
      log("es/index.js.gz      :", zlib.gzipSync(esmIndexSize.fullSrc).length, "bytes");
    }
  }
  log("-----");
}


async function buildSRIDigests(shas) {
  const temp = await fs.readFile("./tools/templates/DIGESTS.md");
  const DIGEST_MD = temp.toString();

  const version = require("../package").version;
  const digestList = Object.entries(shas).map(([k, v]) => `${v} ${k}`).join("\n");

  const out = DIGEST_MD
    .replace("<!-- $DIGEST_LIST -->", digestList)
    .replace("<!-- $MIN_JS_DIGEST -->", shas["highlight.min.js"])
    .replace("<!-- $GO_SHA -->", shas["languages/go.min.js"])
    .replace(/<!-- \$VERSION -->/g, version);
  fs.writeFile(`${process.env.BUILD_DIR}/DIGESTS.md`, out);
}

async function installLanguages(languages, options) {
  log("Building language files.");
  mkdir("languages");
  if(options.esm) mkdir("es/languages");

  await Promise.all(
    languages.map(async(language) => {
      await buildCDNLanguage(language, options);
      process.stdout.write(".");
    })
  );
  log("");

  await Promise.all(
    languages.filter((l) => l.third_party)
      .map(buildDistributable)
  );

  log("");
}

function installStyles() {
  log("Writing style files.");
  mkdir("styles/base16");

  glob.sync("**", { cwd: "./src/styles" }).forEach((file) => {
    const stat = fss.statSync(`./src/styles/${file}`);
    if (stat.isDirectory()) return;

    if (file.endsWith(".css")) {
      installCleanCSS(`./src/styles/${file}`, `styles/${file.replace(".css", ".min.css")}`);
    } else {
      // images, backgrounds, etc
      install(`./src/styles/${file}`, `styles/${file}`);
    }
  });
}

async function buildDistributable(language) {
  const filename = `${language.name}.min.js`;

  const distDir = path.join(language.moduleDir, "dist");
  log(`Building ${distDir}/${filename}.`);
  await fs.mkdir(distDir, { recursive: true });
  await fs.writeFile(path.join(language.moduleDir, "dist", filename), language.minified);
}

async function buildCDNLanguage(language, options) {
  const name = `languages/${language.name}.min.js`;

  await language.compile({ terser: config.terser });
  shas[name] = bundling.sha384(language.minified);
  await fs.writeFile(`${process.env.BUILD_DIR}/${name}`, language.minified);
  if (options.esm)
    await fs.writeFile(`${process.env.BUILD_DIR}/es/${name}`, language.minifiedESM);
}

module.exports.build = buildCDN;

