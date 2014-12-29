'use strict';

var _         = require('lodash');
var commander = require('commander');
var path      = require('path');
var Queue     = require('gear').Queue;
var registry  = require('./tasks');

var build, hasTarget, target,
    targets = ['browser', 'cdn', 'node'];

commander
  .usage('[options] [<languages ...>]')
  .option('-n, --no-compress', 'Disable compression')
  .option('-t, --target <name>', 'Build for target <name> ' +
                                 '[browser, cdn, node]',
                                 'browser')
  .parse(process.argv);


hasTarget = _.contains(targets, commander.target);

target = './' + (hasTarget ? commander.target : 'browser');
build  = require(target);

global.dir       = {};
global.dir.root  = path.dirname(__dirname);
global.dir.build = path.join(dir.root, 'build');

new Queue({ registry: registry })
  .clean(dir.build)
  .log('Starting build.')
  .tasks(build(commander))
  .log('Finished build.')
  .run();
