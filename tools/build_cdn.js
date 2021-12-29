const fs = require("fs").promises;
const fss = require("fs");
const glob = require("glob");
const zlib = require('zlib');
const { getLanguages } = require("./lib/language.js");
const { filter } = require("./lib/dependencies.js");
const config = require("./build_config.js");
const { install, installCleanCSS, mkdir } = require("./lib/makestuff.js");
const log = (...args) => console.log(...args);
const { buildCore } = require("./build_browser.js");
const { buildPackageJSON, writePackageJSON } = require("./build_node.js");
const path = require("path");
const bundling = require('./lib/bundling.js');

async function installPackageJSON(options) {
  const json = buildPackageJSON(options);
  json.name = "@highlightjs/cdn-assets";
  json.description = json.description.concat(" (pre-compiled CDN assets)");
  // this is not a replacement for `highlightjs` package
  // CDN assets do not need an export map, they are just a bunch of files.
  // The NPM package mostly only exists to populate CDNs and provide raw files.
  delete json.exports;
  delete json.type;
  delete json.main;
  delete json.types;
  await writePackageJSON(json);
}

let shas = {};

async function buildCDN(options) {
  install("./LICENSE", "LICENSE");
  install("./README.CDN.md", "README.md");
  await installPackageJSON(options);

  installStyles();

  // all the languages are built for the CDN and placed into `/languages`
  const languages = await getLanguages();

  let esmCoreSize = {};
  let esmCommonSize = {};

  await installLanguages(languages, options);

  // filter languages for inclusion in the highlight.js bundle
  let embedLanguages = filter(languages, options.languages);

  // it really makes no sense to embed ALL languages with the CDN build, it's
  // more likely we want to embed NONE and have completely separate run-time
  // loading of some sort
  if (embedLanguages.length === languages.length) {
    embedLanguages = [];
  }

  const size = await buildCore("highlight", embedLanguages, { minify: options.minify, format: "cjs" });
  if (options.esm) {
    mkdir("es");
    await fs.writeFile(`${process.env.BUILD_DIR}/es/package.json`, `{ "type": "module" }`);
    esmCoreSize = await buildCore("core", [], { minify: options.minify, format: "es" });
    esmCommonSize = await buildCore("highlight", embedLanguages, { minify: options.minify, format: "es" });
  }
  shas = {
    ...size.shas, ...esmCommonSize.shas, ...esmCoreSize.shas, ...shas
  };

  await buildSRIDigests(shas);

  log("-----");
  log("Embedded Lang           :",
    embedLanguages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  log("All Lang                :",
    languages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  log("highlight.js            :",
    size.fullSize, "bytes");

  if (options.minify) {
    log("highlight.min.js        :", size.minified, "bytes");
    log("highlight.min.js.gz     :", zlib.gzipSync(size.minifiedSrc).length, "bytes");
  } else {
    log("highlight.js.gz         :", zlib.gzipSync(size.fullSrc).length, "bytes");
  }
  if (options.esm) {
    log("es/core.js              :", esmCoreSize.fullSize, "bytes");
    log("es/highlight.js         :", esmCommonSize.fullSize, "bytes");
    if (options.minify) {
      log("es/core.min.js          :", esmCoreSize.minified, "bytes");
      log("es/core.min.js.gz       :", zlib.gzipSync(esmCoreSize.minifiedSrc).length, "bytes");
      log("es/highlight.min.js     :", esmCommonSize.minified, "bytes");
      log("es/highlight.min.js.gz  :", zlib.gzipSync(esmCommonSize.minifiedSrc).length, "bytes");
    } else {
      log("es/highlight.js.gz      :", zlib.gzipSync(esmCommonSize.fullSrc).length, "bytes");
    }
  }
  log("-----");
}


async function buildSRIDigests(shas) {
  const temp = await fs.readFile("./tools/templates/DIGESTS.md");
  const DIGEST_MD = temp.toString();

  const version = require("../package.json").version;
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
  if (options.esm) mkdir("es/languages");

  await Promise.all(
    languages.map(async(language) => {
      await buildCDNLanguage(language, options);
      process.stdout.write(".");
    })
  );
  log("");

  await Promise.all(
    languages.filter((l) => l.third_party)
      .map(async(lang) => await buildDistributable(lang, options))
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

async function buildDistributable(language, options) {
  const filename = `${language.name}.min.js`;

  const distDir = path.join(language.moduleDir, "dist");
  log(`Building ${distDir}/${filename}.`);
  await fs.mkdir(distDir, { recursive: true });
  await fs.writeFile(path.join(language.moduleDir, "dist", filename), language.minified);
  if (options.esm) {
    await fs.writeFile(path.join(language.moduleDir, "dist", filename.replace(".min.js", ".es.min.js")), language.minifiedESM);
  }
}

async function buildCDNLanguage(language, options) {
  const name = `languages/${language.name}.min.js`;

  await language.compile({ terser: config.terser });
  shas[name] = bundling.sha384(language.minified);
  await fs.writeFile(`${process.env.BUILD_DIR}/${name}`, language.minified);
  if (options.esm) {
    shas[`es/${name}`] = bundling.sha384(language.minifiedESM);
    await fs.writeFile(`${process.env.BUILD_DIR}/es/${name}`, language.minifiedESM);
  }
}

module.exports.build = buildCDN;

