'use strict';

var _    = require('lodash');
var path = require('path');

var utility  = require('./utility');

function copyDocs() {
  var input  = path.join(dir.root, 'docs', '*.rst'),
      output = path.join(dir.build, 'docs');

  return {
    logDocs: { task: ['log', 'Copying documentation.'] },
    readDocs: {
      requires: 'logDocs',
      task: ['glob', { pattern: input }]
    },
    writeDocsLog: {
      requires: 'readDocs',
      task: ['log', 'Writing documentation.']
    },
    writeDocs: { requires: 'writeDocsLog', task: ['dest', output] }
  };
}

module.exports = function(commander) {
  var amdArgs, hljsExt, output, requiresTask, tasks,
      replace           = utility.replace,
      regex             = utility.regex,
      replaceClassNames = utility.replaceClassNames,

      readArgs     = { pattern: path.join('src', '**', '*.js') },
      filterCB     = utility.buildFilterCallback(commander.args),
      replaceArgs  = replace(regex.header, ''),
      templateArgs = { _: 'hljs.registerLanguage(\'<%= name %>\',' +
                          ' <%= content %>);\n'
                     , highlight: 'var hljs = new <%= content %>();\n'
                     };

  tasks = {
    startlog: { task: ['log', 'Building highlight.js pack file.'] },
    read: { requires: 'startlog', task: ['glob', readArgs] },
    filter: { requires: 'read', task: ['filter', filterCB] },
    reorder: { requires: 'filter', task: 'reorderDeps' },
    replace: { requires: 'reorder', task: ['replace', replaceArgs] },
    template: { requires: 'replace', task: ['template', templateArgs] },
    concat: { requires: 'template', task: 'concat' }
  };
  requiresTask = 'concat';

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
  output  = path.join(dir.build, 'highlight.' + hljsExt + '.js');

  tasks.write = {
    requires: 'writelog',
    task: ['write', output]
  };

  if(commander.target === 'browser') {
    tasks = _.merge(copyDocs(), tasks);
  }

  return tasks;
};
