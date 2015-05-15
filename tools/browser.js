'use strict';

var _    = require('lodash');
var path = require('path');

var utility  = require('./utility');

var directory;

function copyDocs() {
  var input  = path.join(directory.root, 'docs', '*.rst'),
      output = path.join(directory.build, 'docs');

  return {
    logDocs: { task: ['log', 'Copying documentation.'] },
    readDocs: {
      requires: 'logDocs',
      task: ['glob', utility.glob(input)]
    },
    writeDocsLog: {
      requires: 'readDocs',
      task: ['log', 'Writing documentation.']
    },
    writeDocs: { requires: 'writeDocsLog', task: ['dest', output] }
  };
}

function generateDemo(filterCB, readArgs) {
  var staticArgs = utility.glob(path.join('demo', '*.{js,css}')),
      stylesArgs = utility.glob(path.join('src', 'styles', '*'), 'bin'),
      demoRoot   = path.join(directory.build, 'demo');

  return {
    logDemoStart: { task: ['log', 'Generating demo.'] },

    readLanguages: { requires: 'logDemoStart', task: ['glob', readArgs] },
    filterSnippets: { requires: 'readLanguages', task: ['filter', filterCB] },
    readSnippet: { requires: 'filterSnippets', task: 'readSnippet' },
    templateDemo: { requires: 'readSnippet', task: 'templateDemo' },
    writeDemo: {
      requires: 'templateDemo',
      task: ['write', path.join(demoRoot, 'index.html')] },

    readStatic: { requires: 'logDemoStart', task: ['glob', staticArgs] },
    writeStatic: { requires: 'readStatic', task: ['dest', demoRoot] },

    readStyles: { requires: 'logDemoStart', task: ['glob', stylesArgs] },
    writeStyles: {
      requires: 'readStyles',
      task: ['dest', path.join(demoRoot, 'styles')]
    }
  };
}

module.exports = function(commander, dir) {
  directory = dir;

  var hljsExt, output, requiresTask, tasks,
      replace           = utility.replace,
      regex             = utility.regex,
      replaceClassNames = utility.replaceClassNames,

      coreFile     = path.join('src', 'highlight.js'),
      languages    = utility.glob(path.join('src', 'languages', '*.js')),
      filterCB     = utility.buildFilterCallback(commander.args),
      replaceArgs  = replace(regex.header, ''),
      templateArgs = { template: 'hljs.registerLanguage(' +
                          '\'<%= name %>\', <%= content %>);\n'
                     , skip: 'highlight'
                     };

  tasks = {
    startlog: { task: ['log', 'Building highlight.js pack file.'] },
    readCore: { requires: 'startlog', task: ['read', coreFile] },
    read: { requires: 'startlog', task: ['glob', languages] },
    filter: { requires: 'read', task: ['filter', filterCB] },
    reorder: { requires: 'filter', task: 'reorderDeps' },
    replace: { requires: 'reorder', task: ['replace', replaceArgs] },
    template: { requires: 'replace', task: ['template', templateArgs] },
    packageFiles: {
      requires: ['readCore', 'template'],
      task: 'packageFiles'
    }
  };
  requiresTask = 'packageFiles';

  if(commander.compress || commander.target === 'cdn') {
    tasks.compresslog = {
      requires: requiresTask,
      task: ['log', 'Compressing highlight.js pack file.']
    };

    tasks.replace2 = {
      requires: 'compresslog',
      task: [ 'replaceSkippingStrings'
            , replace(regex.replaces, replaceClassNames)
            ]
    };

    tasks.replace3 = {
      requires: 'replace2',
      task: ['replace', replace(regex.classname, '$1.className')]
    };

    tasks.minify  = { requires: 'replace3', task: 'jsminify' };
    requiresTask  = 'minify';
  }

  tasks.writelog = {
    requires: requiresTask,
    task: ['log', 'Writing highlight.js pack file.']
  };

  hljsExt = commander.target === 'cdn' ? 'min' : 'pack';
  output  = path.join(directory.build, 'highlight.' + hljsExt + '.js');

  tasks.write = {
    requires: 'writelog',
    task: ['write', output]
  };

  if(commander.target === 'browser') {
    tasks = _.merge(copyDocs(), generateDemo(filterCB, languages), tasks);
  }

  return tasks;
};
