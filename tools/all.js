'use strict';

let _       = require('lodash');
let path    = require('path');
let cdn     = require('./cdn');
let node    = require('./node');
let browser = require('./browser');

function newBuildDirectory(dir, subdir) {
  const build = path.join(dir.build, subdir);

  return { build: build };
}

module.exports = function(commander, dir) {
  let data = {};

  _.each(['cdn', 'node', 'browser'], function(target) {
    const newDirectory = newBuildDirectory(dir, target),
          directory    = _.defaults(newDirectory, dir),
          options      = _.defaults({ target: target }, commander);

    data[target] = {
      directory: directory,
      commander: options
    };
  });

  return [].concat(
    cdn(data.cdn.commander, data.cdn.directory),
    node(data.node.commander, data.node.directory),
    browser(data.browser.commander, data.browser.directory)
  );
};
