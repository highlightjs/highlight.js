'use strict';

var _    = require('lodash');
var path = require('path');

var browserBuild = require('./browser');
var registry     = require('./tasks');
var utility      = require('./utility');

var directory;

function moveLanguages() {
  var input   = path.join(directory.root, 'src', 'languages', '*.js'),
      output  = path.join(directory.build, 'languages'),
      regex   = utility.regex,
      replace = utility.replace,

      replaceArgs = replace(regex.header, ''),
      template    = 'hljs.registerLanguage(\'<%= name %>\','+
                    ' <%= content %>);\n';

  return {
    startlogjs: { task: ['log', 'Building language files.'] },
    readjs: {
      requires: 'startlogjs',
      task: ['glob', utility.glob(input)]
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
  var css     = path.join(directory.root, 'src', 'styles', '*.css'),
      images  = path.join(directory.root, 'src', 'styles', '*.{jpg,png}'),
      output  = path.join(directory.build, 'styles'),
      options = { dir: output, encoding: 'binary' };

  return {
    startlogcss: { task: ['log', 'Building style files.'] },
    readcss: {
      requires: 'startlogcss',
      task: ['glob', utility.glob(css)]
    },
    readcssimages: {
      requires: 'startlogcss',
      task: ['glob', utility.glob(images, 'binary')]
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
      requires: ['renamecss', 'readcssimages'],
      task: ['log', 'Writing style files.']
    },
    writecss: { requires: 'writelogcss', task: ['dest', options] }
  };
}

module.exports = function(commander, dir) {
  directory = dir;

  return utility.toQueue([moveLanguages(), moveStyles()], registry)
    .concat(browserBuild(commander, dir));
};
