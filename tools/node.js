'use strict';

var _        = require('lodash');
var bluebird = require('bluebird');
var path     = require('path');

var packageJSON = require('../package');
var registry    = require('./tasks');
var utility     = require('./utility');

var directory, filterCB,
    languages = utility.glob(path.join('src', 'languages', '*.js')),
    header    = utility.regex.header;

function templateAllFunc(blobs) {
  var names = _.map(blobs, function(blob) {
    return path.basename(blob.name, '.js');
  });

  return bluebird.resolve()
    .then(function() {
      return { names: names };
    });
}

function buildLanguages() {
  var input  = languages,
      output = path.join(directory.build, 'lib', 'languages'),

      replaceArgs = utility.replace(header, ''),
      template    = 'module.exports = <%= content %>;';

  return {
    logjs: { task: ['log', 'Building language files.'] },
    readjs: { requires: 'logjs', task: ['glob', input] },
    filterjs: { requires: 'readjs', task: ['filter', filterCB] },
    replacejs: { requires: 'filterjs', task: ['replace', replaceArgs] },
    templatejs: { requires: 'replacejs', task: ['template', template] },
    writejslog: {
      requires: 'templatejs',
      task: ['log', 'Writing language files.']
    },
    writejs: { requires: 'writejslog', task: ['dest', output] }
  };
}

function buildCore() {
  var input    = path.join(directory.root, 'src', 'highlight.js'),
      output   = path.join(directory.build, 'lib');

  return {
    logCore: { task: ['log', 'Building core file.'] },
    readCore: { requires: 'logCore',  task: ['read', input] },
    writeCoreLog: {
      requires: 'readCore',
      task: ['log', 'Writing core file.']
    },
    writeCore: { requires: 'writeCoreLog', task: ['dest', output] }
  };
}

function buildIndex() {
  var input  = languages,
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
    logIndex: { task: ['log', 'Building index file.'] },
    readIndex: { requires: 'logIndex', task: ['glob', input] },
    filterIndex: { requires: 'readIndex', task: ['filter', filterCB] },
    reorderIndex: { requires: 'filterIndex', task: 'reorderDeps' },
    templateIndex: {
      requires: 'reorderIndex',
      task: ['templateAll', templateArgs]
    },
    writeIndexLog: {
      requires: 'templateIndex',
      task: ['log', 'Writing index file.']
    },
    writeIndex: { requires: 'writeIndexLog', task: ['write', output] }
  };
}

function copyMetaFiles() {
  var docs   = path.join('docs', '*.rst'),
      glob   = '{README.md,LICENSE,' + docs + '}',

      input  = utility.glob(path.join(directory.root, glob)),
      output = { dir: directory.build, base: '.' };

  return {
    logMeta: { task: ['log', 'Copying meta files.'] },
    readMeta: { requires: 'logMeta', task: ['glob', input] },
    writeMetaLog: {
      requires: 'readMeta',
      task: ['log', 'Writing meta files.']
    },
    writeMeta: { requires: 'writeMetaLog', task: ['dest', output] }
  };
}

function buildStyles() {
  var input   = path.join(directory.root, 'src', 'styles', '*'),
      output  = path.join(directory.build, 'styles'),
      options = { encoding: 'binary', dir: output };

  return {
    logcss: { task: ['log', 'Building style files.'] },
    readcss: {
      requires: 'logcss',
      task: ['glob', utility.glob(input, 'binary')]
    },
    writecsslog: {
      requires: 'readcss',
      task: ['log', 'Writing style files.']
    },
    writecss: { requires: 'writecsslog', task: ['dest', options] }
  };
}

function buildPackageFile() {
  var input  = path.join(directory.root, 'AUTHORS.en.txt'),
      output = path.join(directory.build, 'package.json');

  return {
    logpkg: { task: ['log', 'Building package.json file.'] },
    readpkg: { requires: 'logpkg', task: ['read', input] },
    buildpkg: {
      requires: 'readpkg',
      task: ['buildPackage', packageJSON]
    },
    writepkglog: {
      requires: 'buildpkg',
      task: ['log', 'Writing package.json file.']
    },
    writepkg: { requires: 'writepkglog', task: ['write', output] }
  };
}

module.exports = function(commander, dir) {
  directory = dir;
  filterCB  = utility.buildFilterCallback(commander.args);

  var tasks = [
    buildLanguages(),
    buildCore(),
    buildIndex(),
    buildStyles(),
    copyMetaFiles(),
    buildPackageFile()
  ];

  return utility.toQueue(tasks, registry);
};
