'use strict';

var commander = require('commander');
var path      = require('path');
var Queue     = require('gear').Queue;
var registry  = require('./tasks');

var build;

commander
  .usage('[options] [<languages ...>]')
  .option('-n, --no-compress', 'Disable compression')
  .option('-t, --target <name>', 'Build for target <name> ' +
                                 '[amd, browser, cdn, node]',
                                 'browser')
  .parse(process.argv);

switch(commander.target) {
  case 'cdn':
    build = require('./cdn');
    break;
  case 'node':
    build = require('./node');
    break;
  case 'amd':
  case 'browser':
  default:
    build = require('./browser');
    break;
}

global.dir       = {};
global.dir.root  = path.dirname(__dirname);
global.dir.build = path.join(dir.root, 'build');

new Queue({ registry: registry })
  .clean(dir.build)
  .log('Starting build.')
  .tasks(build(commander))
  .log('Finished build.')
  .run();
