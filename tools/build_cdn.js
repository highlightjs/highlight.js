const fs = require("fs").promises;
const glob = require("glob");
const zlib = require('zlib');
const { getLanguages } = require("./lib/language");
const { filter } = require("./lib/dependencies");
const config = require("./build_config");
const { install, install_cleancss, mkdir } = require("./lib/makestuff");
const log = (...args) => console.log(...args);
const { buildBrowserHighlightJS } = require("./build_browser");
const { buildPackageJSON } = require("./build_node");
const path = require("path");

async function installPackageJSON() {
  await buildPackageJSON();
  let json = require(`${process.env.BUILD_DIR}/package`);
  json.name = "@highlightjs/cdn-assets";
  json.description = json.description.concat(" (pre-compiled CDN assets)");
  fs.writeFile(`${process.env.BUILD_DIR}/package.json`, JSON.stringify(json, null, '   '));
}

async function buildCDN(options) {
  install("./LICENSE", "LICENSE");
  install("./README.CDN.md","README.md");
  installPackageJSON();

  installStyles();

  // all the languages are built for the CDN and placed into `/languages`
  const languages = await getLanguages();
  await installLanguages(languages);

  // filter languages for inclusion in the highlight.js bundle
  let embedLanguages = filter(languages, options["languages"])

  // it really makes no sense to embed ALL languages with the CDN build, it's
  // more likely we want to embed NONE and have completely separate run-time
  // loading of some sort
  if (embedLanguages.length == languages.length) {
    embedLanguages = []
  }

  var size = await buildBrowserHighlightJS(embedLanguages, {minify: options.minify})

  log("-----")
  log("Embedded Lang       :",
    embedLanguages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  log("All Lang            :",
    languages.map((el) => el.minified.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  log("highlight.js        :",
    size.full, "bytes");

  if (options.minify) {
    log("highlight.min.js    :", size.minified ,"bytes");
    log("highlight.min.js.gz :", zlib.gzipSync(size.minifiedSrc).length ,"bytes");
  } else {
    log("highlight.js.gz     :", zlib.gzipSync(size.fullSrc).length ,"bytes");
  }
  log("-----");
}

async function installLanguages(languages) {
  log("Building language files.");
  mkdir("languages");

  await Promise.all(
    languages.map(async (language) => {
      await buildCDNLanguage(language);
      process.stdout.write(".");
     })
  );
  log("");

  await Promise.all(
    languages.filter((l) => l.third_party)
      .map(async (language) => {
        await buildDistributable(language);
     })
  );

  log("");
}

function installStyles() {
  log("Writing style files.");
  mkdir("styles");

  glob.sync("*", {cwd: "./src/styles"}).forEach((file) => {
    if (file.endsWith(".css"))
      install_cleancss(`./src/styles/${file}`,`styles/${file.replace(".css",".min.css")}`);
    else // images, backgrounds, etc
      install(`./src/styles/${file}`,`styles/${file}`);
  })
}

async function buildDistributable(language) {
  const filename = `${language.name}.min.js`;

  let distDir = path.join(language.moduleDir,"dist")
  log(`Building ${distDir}/${filename}.`)
  await fs.mkdir(distDir, {recursive: true});
  fs.writeFile(path.join(language.moduleDir,"dist",filename), language.minified);

}

 async function buildCDNLanguage (language) {
  const filename = `${process.env.BUILD_DIR}/languages/${language.name}.min.js`;

  await language.compile({terser: config.terser});
  fs.writeFile(filename, language.minified);
}

module.exports.build = buildCDN;

