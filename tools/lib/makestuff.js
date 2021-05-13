const fs = require("fs");
const CleanCSS = require('clean-css');
const path = require('path');
const _ = require('lodash');
const config = require("../build_config");
const del = require('del');

async function clean(directory) {
  del.sync([directory]);
  fs.mkdirSync(directory, { recursive: true });
}

function install(file, dest = file) {
  fs.copyFileSync(file, `${process.env.BUILD_DIR}/${dest}`);
}

const DEFAULT_CSS = `
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

code.hljs {
  padding: 3px 5px;
}
`.trim();

function installCleanCSS(file, dest) {
  const theme = fs.readFileSync(file, { encoding: "utf8" });
  const content = DEFAULT_CSS + "\n" + theme;
  const out = new CleanCSS(config.clean_css).minify(content).styles;
  fs.writeFileSync(`${process.env.BUILD_DIR}/${dest}`, out);
}

function mkdir(dirname) {
  fs.mkdirSync(`${process.env.BUILD_DIR}/${dirname}`, { recursive: true });
}

function renderTemplate(src, dest, data) {
  data.path = path;
  const content = fs.readFileSync(src, { encoding: "utf8" });
  const rendered = _.template(content)(data);
  fs.writeFileSync(`${process.env.BUILD_DIR}/${dest}`, rendered);
}

module.exports = { clean, install, installCleanCSS, mkdir, renderTemplate };
