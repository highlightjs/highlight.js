const fs = require("fs").promises;
const fss = require("fs");
const glob = require("glob");
const zlib = require('zlib');
const { getLanguages } = require("./lib/language");
const { filter } = require("./lib/dependencies");
const config = require("./build_config");
const { install, installCleanCSS, mkdir } = require("./lib/makestuff");
const log = (...args) => console.log(...args);
const { buildBrowserHighlightJS } = require("./build_browser");
const { buildPackageJSON } = require("./build_node");
const path = require("path");
const bundling = require('./lib/bundling.js');

async function installPackageJSON(options) {
  await buildPackageJSON(options);
  const json = require(`${process.env.BUILD_DIR}/package`);
  json.name = "@highlightjs/cdn-assets";
  json.description = json.description.concat(" (pre-compiled CDN assets)");
  fs.writeFile(`${process.env.BUILD_DIR}/package.json`, JSON.stringify(json, null, '   '));
}

let shas = {};

async function buildCDN(options) {
  install("./LICENSE", "LICENSE");
  install("./README.CDN.md", "README.md");
  installPackageJSON(options);

  installStyles();

  // all the languages are built for the CDN and placed into `/languages`
  const languages = await getLanguages();
  await installLanguages(languages);

  // filter languages for inclusion in the highlight.js bundle
  let embedLanguages = filter(languages, options.languages);

  // it really makes no sense to embed ALL languages with the CDN build, it's
  // more likely we want to embed NONE and have completely separate run-time
  // loading of some sort
  if (embedLanguages.length === languages.length) {
    embedLanguages = [];
  }

  const size = await buildBrowserHighlightJS(embedLanguages, { minify: options.minify });
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

async function installLanguages(languages) {
  log("Building language files.");
  mkdir("languages");

  await Promise.all(
    languages.map(async(language) => {
      await buildCDNLanguage(language);
      process.stdout.write(".");
    })
  );
  log("");

  await Promise.all(
    languages.filter((l) => l.third_party)
      .map(async(language) => {
        await buildDistributable(language);
      })
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
  fs.writeFile(path.join(language.moduleDir, "dist", filename), language.minified);
}

async function buildCDNLanguage(language) {
  const name = `languages/${language.name}.min.js`;
  const filename = `${process.env.BUILD_DIR}/${name}`;

  await language.compile({ terser: config.terser });
  shas[name] = bundling.sha384(language.minified);
  fs.writeFile(filename, language.minified);
}

module.exports.build = buildCDN;

