const fs = require("fs")
const CleanCSS = require('clean-css');
const path = require('path');
const _        = require('lodash');
const config = require("../build_config")
const del      = require('del');

async function clean(directory) {
  await del([directory]).then(() => {
    fs.mkdirSync(directory, {recursive: true})
  });
};

function install(file, dest=file) {
  fs.copyFileSync(file, `${process.env.BUILD_DIR}/${dest}`)
}

function install_cleancss(file, dest) {
  var content = fs.readFileSync(file, {encoding: "utf8"})
  var out = new CleanCSS(config.clean_css).minify(content).styles;
  fs.writeFileSync(`${process.env.BUILD_DIR}/${dest}`, out)
}

function mkdir(dirname) {
  fs.mkdirSync(`${process.env.BUILD_DIR}/${dirname}`, {recursive: true})
}

function renderTemplate(src, dest, data)
{
  data.path = path;
  var content = fs.readFileSync(src, {encoding: "utf8"})
  var rendered = _.template(content)(data)
  fs.writeFileSync(`${process.env.BUILD_DIR}/${dest}`, rendered)
}

module.exports = { clean, install, install_cleancss, mkdir, renderTemplate }
