const _ = require('lodash');
const fs = require("fs").promises;
const fss = require("fs");
const glob = require("glob-promise");
const path = require("path");
const zlib = require('zlib');
const Terser = require("terser");
const child_process = require('child_process');
const { getLanguages } = require("./lib/language.js");
const { filter } = require("./lib/dependencies.js");
const config = require("./build_config.js");
const { install, installCleanCSS, mkdir, renderTemplate } = require("./lib/makestuff.js");
const log = (...args) => console.log(...args);
const { rollupCode } = require("./lib/bundling.js");
const bundling = require('./lib/bundling.js');
const Table = require('cli-table');

const getDefaultHeader = () => ({
  ...require('../package.json'),
  git_sha: child_process
    .execSync("git rev-parse --short=10 HEAD")
    .toString().trim()
});
function buildHeader(args = getDefaultHeader()) {
  return "/*!\n"
  + `  Highlight.js v${args.version} (git: ${args.git_sha})\n`
  + `  (c) ${config.copyrightYears} ${args.author.name} and other contributors\n`
  + `  License: ${args.license}\n`
  + ` */`;
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    const x = a[key];
    const y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function detailedGrammarSizes(languages) {
  if (languages.length > 180) return;

  const resultTable = new Table({
    head: ['lang', 'minified'],
    // colWidths: [20,20,10,20,10,20],
    chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
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

  const size = await buildCore("highlight", languages, { minify: options.minify, format: "cjs" });

  log("-----");
  log("Languages (raw)     :",
    languages.map((el) => el.data.length).reduce((acc, curr) => acc + curr, 0), "bytes");
  log("highlight.js        :", size.fullSize, "bytes");
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

  function nameForStyle(file) {
    let name = _.startCase(path.basename(file, ".css"));
    if (file.includes("base16/")) {
      name = `Base16 / ${name}`;
    }
    return name;
  }

  const css = await glob("styles/**/*.css", { cwd: "./src" });
  let styles = css
    .map((el) => ({ name: nameForStyle(el), path: el }))
    .filter((style) => style.name !== "Default");
  styles = sortByKey(styles, "name");

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
  mkdir("demo/styles/base16");

  glob.sync("**", { cwd: "./src/styles" }).forEach((file) => {
    const stat = fss.statSync(`./src/styles/${file}`);
    if (stat.isDirectory()) return;

    if (file.endsWith(".css")) {
      installCleanCSS(`./src/styles/${file}`, `demo/styles/${file}`);
    } else {
      // images, backgrounds, etc
      install(`./src/styles/${file}`, `demo/styles/${file}`);
    }
  });
}

const builtInLanguagesPlugin = (languages) => ({
  name: "hljs-index",
  resolveId(source) {
    if (source === "builtInLanguages") {
      return source; // this signals that rollup should not ask other plugins or check the file system to find this id
    }
    return null; // other ids should be handled as usually
  },
  load(id) {
    const escape = (s) => "grmr_" + s.replace("-", "_");
    if (id === "builtInLanguages") {
      return languages.map((lang) =>
        `export { default as ${escape(lang.name)} } from ${JSON.stringify(lang.path)};`
      ).join("\n");
    }
    return null;
  }
});

async function buildCore(name, languages, options) {
  const header = buildHeader();
  let relativePath = "";
  const input = {
    ...config.rollup.core.input,
    input: `src/stub.js`
  };
  input.plugins = [
    ...input.plugins,
    builtInLanguagesPlugin(languages)
  ];
  const output = {
    ...(options.format === "es" ? config.rollup.node.output : config.rollup.browser_iife.output),
    file: `${process.env.BUILD_DIR}/${name}.js`
  };

  // optimize for no languages by not including the language loading stub
  if (languages.length === 0) {
    input.input = "src/highlight.js";
  }

  if (options.format === "es") {
    output.format = "es";
    output.file = `${process.env.BUILD_DIR}/es/${name}.js`;
    relativePath = "es/";
  }

  log(`Building ${relativePath}${name}.js.`);

  const index = await rollupCode(input, output);
  const sizeInfo = { shas: [] };
  const writePromises = [];
  if (options.minify) {
    const { code } = await Terser.minify(index, { ...config.terser, module: (options.format === "es") });
    const src = `${header}\n${code}`;
    writePromises.push(fs.writeFile(output.file.replace(/js$/, "min.js"), src));
    sizeInfo.minified = src.length;
    sizeInfo.minifiedSrc = src;
    sizeInfo.shas[`${relativePath}${name}.min.js`] = bundling.sha384(src);
  }
  {
    const src = `${header}\n${index}`;
    writePromises.push(fs.writeFile(output.file, src));
    sizeInfo.fullSize = src.length;
    sizeInfo.fullSrc = src;
    sizeInfo.shas[`${relativePath}${name}.js`] = bundling.sha384(src);
  }
  await Promise.all(writePromises);
  return sizeInfo;
}

// CDN build uses the exact same highlight.js distributable
module.exports.buildCore = buildCore;
module.exports.build = buildBrowser;
