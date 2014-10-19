'use strict';

var _    = require('lodash');
var path = require('path');

var utility      = require('./utility');
var browserBuild = require('./browser');

function moveLanguages() {
  var input   = path.join(dir.root, 'src', 'languages', '*.js'),
      output  = path.join(dir.build, 'languages'),
      regex   = utility.regex,
      replace = utility.replace,

      replaceArgs = replace(regex.header, ''),
      template    = 'hljs.registerLanguage(\'<%= name %>\','+
                    ' <%= content %>);\n';

  return {
    startlogjs: { task: ['log', 'Building language files.'] },
    readjs: {
      requires: 'startlogjs',
      task: ['glob', { pattern: input }]
    },
    replacejs: { requires: 'readjs', task: ['replace', replaceArgs] },
    templatejs: { requires: 'replacejs', task: ['template', template] },
    replacejs2: {
      requires: 'templatejs',
      task: [ 'replaceSkippingStrings'
            , replace(regex.replaces, utility.replaceClassNames)
            ]
    },
    replacejs3: {
      requires: 'replacejs2',
      task: ['replace', replace(regex.classname, '$1.className')]
    },
    compresslogjs: {
      requires: 'replacejs3',
      task: ['log', 'Compressing languages files.']
    },
    minifyjs: { requires: 'compresslogjs', task: 'jsminify' },
    renamejs: {
      requires: 'minifyjs',
      task: ['rename', { extname: '.min.js' }]
    },
    writelogjs: {
      requires: 'renamejs',
      task: ['log', 'Writing language files.']
    },
    writejs: { requires: 'writelogjs', task: ['dest', output] }
  };
}

function moveStyles() {
  var input  = path.join(dir.root, 'src', 'styles', '*.css'),
      output = path.join(dir.build, 'styles');

  return {
    startlogcss: { task: ['log', 'Building style files.'] },
    readcss: {
      requires: 'startlogcss',
      task: ['glob', { pattern: input }]
    },
    compresslogcss: {
      requires: 'readcss',
      task: ['log', 'Compressing style files.']
    },
    minifycss: { requires: 'readcss', task: 'cssminify' },
    renamecss: {
      requires: 'minifycss',
      task: ['rename', { extname: '.min.css' }]
    },
    writelogcss: {
      requires: 'renamecss',
      task: ['log', 'Writing style files.']
    },
    writecss: { requires: 'writelogcss', task: ['dest', output] }
  };
}

module.exports = function(commander) {
  return _.merge(
    browserBuild(commander),
    moveLanguages(),
    moveStyles());
};
