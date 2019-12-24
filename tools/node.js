'use strict';

let _        = require('lodash');
let bluebird = require('bluebird');
let path     = require('path');

let packageJSON = require('../package');
let registry    = require('./tasks');
let utility     = require('./utility');

let directory, filterCB,
    languages = utility.glob(path.join('src', 'languages', '*.js')),
    header    = utility.regex.header;

function templateAllFunc(blobs) {
  const names = _.map(blobs, blob => path.basename(blob.name, '.js'));

  return bluebird.resolve({ names: names });
}

function buildLanguages() {
  let input  = languages,
      output = path.join(directory.build, 'lib', 'languages'),

      replaceArgs = utility.replace(header, ''),
      template    = 'module.exports = <%= content %>;';

  return {
    logStart: { task: ['log', 'Building language files.'] },
    read: { requires: 'logStart', task: ['glob', input] },
    filter: { requires: 'read', task: ['filter', filterCB] },
    replace: { requires: 'filter', task: ['replace', replaceArgs] },
    template: { requires: 'replace', task: ['template', template] },
    writeLog: {
      requires: 'template',
      task: ['log', 'Writing language files.']
    },
    write: { requires: 'writeLog', task: ['dest', output] }
  };
}

function buildCore() {
  const input  = path.join(directory.root, 'src', 'highlight.js'),
        output = path.join(directory.build, 'lib');

  return {
    startLog: { task: ['log', 'Building core file.'] },
    read: { requires: 'startLog',  task: ['read', input] },
    writeLog: { requires: 'read', task: ['log', 'Writing core file.'] },
    write: { requires: 'writeLog', task: ['dest', output] }
  };
}

function buildIndex() {
  let input  = languages,
      output = path.join(directory.build, 'lib', 'index.js'),

      templateArgs = {
        template: [ 'var hljs = require(\'./highlight\');\n'
                  , '<% _.each(names, function(name) { %>' +
                    'hljs.registerLanguage(\'<%= name %>\', ' +
                    'require(\'./languages/<%= name %>\'));'
                  , '<% }); %>'
                  , 'module.exports = hljs;'
                  ].join('\n'),
        callback: templateAllFunc
      };

  return {
    startLog: { task: ['log', 'Building index file.'] },
    read: { requires: 'startLog', task: ['glob', input] },
    filter: { requires: 'read', task: ['filter', filterCB] },
    reorder: { requires: 'filter', task: 'reorderDeps' },
    template: { requires: 'reorder', task: ['templateAll', templateArgs] },
    writeLog: { requires: 'template', task: ['log', 'Writing index file.'] },
    write: { requires: 'writeLog', task: ['write', output] }
  };
}

function copyMetaFiles() {
  let docs   = path.join('docs', '*.rst'),
      glob   = `{README.md,LICENSE,${docs}}`,

      input  = utility.glob(path.join(directory.root, glob)),
      output = { dir: directory.build, base: '.' };

  return {
    startLog: { task: ['log', 'Copying meta files.'] },
    read: { requires: 'startLog', task: ['glob', input] },
    writeLog: { requires: 'read', task: ['log', 'Writing meta files.'] },
    write: { requires: 'writeLog', task: ['dest', output] }
  };
}

function buildSCSSStyles() {
  let input   = path.join(directory.root, 'src', 'styles', '*.css'),
      output  = path.join(directory.build, 'scss'),
      options = { encoding: 'utf8', dir: output }

  return {
    startLog: { task: ['log', 'Building SCSS styles.'] },
    read: { requires: 'startLog', task: ['glob', utility.glob(input)] },
    writeLog: { requires: 'read', task: ['log', 'Writing SCSS styles.'] },
    rename: { requires: 'writeLog', task: ['rename', { extname: '.scss' }] },
    write: { requires: 'rename', task: ['dest', options] }
  };
}

function buildSCSSImages() {
  let input   = path.join(directory.root, 'src', 'styles', '*.{jpg,png}'),
      output  = path.join(directory.build, 'scss'),
      options = { encoding: 'binary', dir: output }

  return {
    startLog: { task: ['log', 'Building SCSS files.'] },
    read: { requires: 'startLog', task: ['glob', utility.glob(input, 'binary')] },
    writeLog: { requires: 'read', task: ['log', 'Writing SCSS files.'] },
    write: { requires: 'writeLog', task: ['dest', options] }
  };
}

function buildStyles() {
  let input   = path.join(directory.root, 'src', 'styles', '*.css'),
      output  = path.join(directory.build, 'styles'),
      options = { encoding: 'utf8', dir: output };

  return {
    startLog: { task: ['log', 'Building style files.'] },
    read: {
      requires: 'startLog',
      task: ['glob', utility.glob(input, 'binary')]
    },
    writeLog: { requires: 'read', task: ['log', 'Writing style files.'] },
    write: { requires: 'writeLog', task: ['dest', options] }
  };
}

function buildCSSImages() {
  let input   = path.join(directory.root, 'src', 'styles', '*.{jpg,png}'),
      output  = path.join(directory.build, 'styles'),
      options = { encoding: 'binary', dir: output }

  return {
    startLog: { task: ['log', 'Building CSS image files.'] },
    read: { requires: 'startLog', task: ['glob', utility.glob(input, 'binary')] },
    writeLog: { requires: 'read', task: ['log', 'Writing CSS images files.'] },
    write: { requires: 'writeLog', task: ['dest', options] }
  };
}

function buildPackageFile() {
  const input  = path.join(directory.root, 'AUTHORS.en.txt'),
        output = path.join(directory.build, 'package.json');

  return {
    startLog: { task: ['log', 'Building package.json file.'] },
    read: { requires: 'startLog', task: ['read', input] },
    build: { requires: 'read', task: ['buildPackage', packageJSON] },
    writeLog: {
      requires: 'build',
      task: ['log', 'Writing package.json file.']
    },
    write: { requires: 'writeLog', task: ['write', output] }
  };
}

module.exports = function(commander, dir) {
  directory = dir;
  filterCB  = utility.buildFilterCallback(commander.args);
  let tasks = [
    buildLanguages(),
    buildCore(),
    buildIndex(),
    buildStyles(),
    buildCSSImages(),
    buildSCSSStyles(),
    buildSCSSImages(),
    copyMetaFiles(),
    buildPackageFile()
  ];

  return utility.toQueue(tasks, registry);
};
