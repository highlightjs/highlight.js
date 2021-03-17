const _ = require('lodash');
const fs = require("fs").promises;
const glob = require("glob-promise");
const path = require("path");
const zlib = require('zlib');
const Terser = require("terser");
const child_process = require('child_process');
const { getLanguages } = require("./lib/language");
const { filter } = require("./lib/dependencies");
const config = require("./build_config");
const { install, installCleanCSS, mkdir, renderTemplate } = require("./lib/makestuff");
const log = (...args) => console.log(...args);
const { rollupCode } = require("./lib/bundling.js");
const bundling = require('./lib/bundling.js');
const Table = require('cli-table');
const { result } = require('lodash');

function buildHeader(args) {
  return "/*\n" +
  `  Highlight.js ${args.version} (${args.git_sha})\n` +
  `  License: ${args.license}\n` +
  `  Copyright (c) ${config.copyrightYears}, ${args.author.name}\n*/`;
}

function detailedGrammarSizes(languages) {
  if (languages.length > 180) return;

  const resultTable = new Table({
    head: ['lang','minified'],
    // colWidths: [20,20,10,20,10,20],
    chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
    style: {
      head: ['grey']
    }
  });
  languages.map(async(lang) => {
    resultTable.push([lang.name, lang.data.length]);
  });
  console.log(resultTable.sort((b, a) => a[1] - b[1]).toString());
}

async function buildBrowser(options) {
  let languages = await getLanguages();
  // filter languages for inclusion in the highlight.js bundle
  languages = filter(languages, options.languages);

  await installDocs();
  await installDemo(languages, { minify: options.minify });

  log("Preparing languages.");
  await Promise.all(
    languages.map(async(lang) => {
      // await lang.compile({ terser: config.terser });
      process.stdout.write(".");
    })
  );
  log("");

  detailedGrammarSizes(languages);

  const size = await buildBrowserHighlightJS(languages, { minify: options.minify });

  log("-----");
  log("Core                :", size.core, "bytes");
  if (options.minify) { log("Core (min)          :", size.core_min, "bytes"); }
  log("Languages (raw)     :",
    languages.map((el) => el.data.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  log("highlight.js        :", size.full, "bytes");
  if (options.minify) {
    log("highlight.min.js    :", size.minified, "bytes");
    log("highlight.min.js.gz :", zlib.gzipSync(size.minifiedSrc).length, "bytes");
  } else {
    log("highlight.js.gz     :", zlib.gzipSync(size.fullSrc).length, "bytes");
  }
  log("-----");
}

async function installDemo(languages, { minify }) {
  log("Writing demo files.");
  mkdir("demo");
  installDemoStyles();

  const assets = await glob("./demo/*.{js,css}");
  assets.forEach((file) => install(file));

  renderIndex(languages, minify);
}

async function renderIndex(languages, minify) {
  languages = languages.filter((lang) =>
    // hide a few languages
    lang.name !== "plaintext"
    && lang.name !== "c-like"
    // no sample means no demo
    && lang.sample
  );

  languages.forEach((language) => {
    if (!language.categories.length) {
      language.categories.push("misc");
    }
    language.categories.push("all");
  });

  const categoryCounter = languages
    .flatMap((language) => language.categories)
    .reduce((map, category) => map.set(category, (map.get(category) || 0) + 1), new Map());
  const categories = [
    "common",
    ...Array.from(categoryCounter.keys())
      .filter((category) => !["common", "misc", "all"].includes(category))
      .sort(),
    "misc",
    "all"
  ]
    .filter((category) => categoryCounter.has(category))
    .map((category) => ({
      category,
      count: categoryCounter.get(category)
    }));

  const css = await glob("styles/*.css", { cwd: "./src" });
  const styles = css
    .map((el) => ({ name: _.startCase(path.basename(el, ".css")), path: el }))
    .filter((style) => style.name !== "Default");

  renderTemplate("./demo/index.html", "./demo/index.html", {
    categories,
    languages,
    minify,
    styles
  });
}

async function installDocs() {
  log("Writing docs files.");
  mkdir("docs");

  const docs = await glob("./docs/*.rst");
  docs.forEach((file) => install(file));
}

function installDemoStyles() {
  log("Writing style files.");
  mkdir("demo/styles");

  glob.sync("*", { cwd: "./src/styles" }).forEach((file) => {
    if (file.endsWith(".css")) {
      installCleanCSS(`./src/styles/${file}`, `demo/styles/${file}`);
    } else {
      // images, backgrounds, etc
      install(`./src/styles/${file}`, `demo/styles/${file}`);
    }
  });
}

async function buildBrowserHighlightJS(languages, { minify }) {
  log("Building highlight.js.");

  const git_sha = child_process
    .execSync("git rev-parse HEAD")
    .toString().trim()
    .slice(0, 8);
  const versionDetails = { ...require("../package"), git_sha };
  const header = buildHeader(versionDetails);

  const outFile = `${process.env.BUILD_DIR}/highlight.js`;
  const minifiedFile = outFile.replace(/js$/, "min.js");

  const built_in_langs = {
    name: "dynamicLanguages",
    resolveId: (source) => {
      if (source == "builtInLanguages") { return "builtInLanguages"}
      return null;
    },
    load: (id) => {
      if (id == "builtInLanguages") {
        let escape = (s) => s.replace("-","_");
        let src = "";
        src += languages.map((x) => `import ${escape(x.name)} from '${x.path}'`).join("\n");
        src += `\nexport {${languages.map((x) => escape(x.name)).join(",")}}`;
        return src;
      }
      return null;
    }
  }

  const plugins = [...config.rollup.browser_core.input.plugins, built_in_langs];

  const input = { ...config.rollup.browser_core.input, input: `src/stub.js`, plugins };
  const output = { ...config.rollup.browser_core.output, file: outFile };
  let librarySrc = await rollupCode(input, output);


  // we don't use this, we just use it to get a size approximation for the build stats
  const coreSrc = await rollupCode({ ...config.rollup.browser_core.input, input: `src/highlight.js`, plugins }, output);
  const coreSize = coreSrc.length;

  // strip off the original top comment
  librarySrc = librarySrc.replace(/\/\*.*?\*\//s, "");

  const fullSrc = [
    header, librarySrc,
    // ...languages.map((lang) => lang.module)
  ].join("\n");

  const tasks = [];
  tasks.push(fs.writeFile(outFile, fullSrc, { encoding: "utf8" }));
  const shas = {
    "highlight.js": bundling.sha384(fullSrc)
  };

  let core_min = [];
  let minifiedSrc = "";

  if (minify) {
    const tersed = await Terser.minify(librarySrc, config.terser);
    const tersedCore = await Terser.minify(coreSrc, config.terser);

    minifiedSrc = [
      header, tersed.code,
      // ...languages.map((lang) => lang.minified)
    ].join("\n");

    // get approximate core minified size
    core_min = [header, tersedCore.code].join().length;

    tasks.push(fs.writeFile(minifiedFile, minifiedSrc, { encoding: "utf8" }));
    shas["highlight.min.js"] = bundling.sha384(minifiedSrc);
  }

  await Promise.all(tasks);
  return {
    core: coreSize,
    core_min: core_min,
    minified: Buffer.byteLength(minifiedSrc, 'utf8'),
    minifiedSrc,
    fullSrc,
    shas,
    full: Buffer.byteLength(fullSrc, 'utf8')
  };
}

// CDN build uses the exact same highlight.js distributable
module.exports.buildBrowserHighlightJS = buildBrowserHighlightJS;
module.exports.build = buildBrowser;
