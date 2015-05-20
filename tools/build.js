// For the basic introductions on using this build script, see:
//
// <https://highlightjs.readthedocs.org/en/latest/building-testing.html>
//
// Otherwise, lets explain what each build target does in more detail, for
// those that wish to know before running this script.
'use strict';

var commander = require('commander');
var path      = require('path');
var Queue     = require('gear').Queue;
var registry  = require('./tasks');

var build, dir = {};

commander
  .usage('[options] [<languages ...>]')
  .option('-n, --no-compress', 'Disable compression')
  .option('-t, --target <name>', 'Build for target [browser, cdn, node]',
                                 /^(browser|cdn|node)$/i, 'browser')
  .parse(process.argv);

commander.target = commander.target.toLowerCase();

build     = require('./' + commander.target);
dir.root  = path.dirname(__dirname);
dir.build = path.join(dir.root, 'build');

new Queue({ registry: registry })
  .clean(dir.build)
  .log('Starting build.')
  .tasks(build(commander, dir))
  .log('Finished build.')
  .run();
