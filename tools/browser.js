'use strict';

let _        = require('lodash');
let bluebird = require('bluebird');
let readFile = bluebird.promisify(require('fs').readFile);
let path     = require('path');

let registry = require('./tasks');
let utility  = require('./utility');

let directory;

function templateAllFunc(blobs) {
  const name = path.join('demo', 'index.html');

  blobs = _.compact(blobs);

  return bluebird.join(
    readFile(name),
    utility.getStyleNames(),
    (template, styles) => ({ template, path, blobs, styles })
  );
}

function copyDocs() {
  const input  = path.join(directory.root, 'docs', '*.rst'),
        output = path.join(directory.build, 'docs');

  return {
    startLog: { task: ['log', 'Copying documentation.'] },
    read: { requires: 'startLog', task: ['glob', utility.glob(input)] },
    writeLog: { requires: 'read', task: ['log', 'Writing documentation.'] },
    write: { requires: 'writeLog', task: ['dest', output] }
  };
}

function generateDemo(filterCB, readArgs) {
  let styleDir     = path.join('src', 'styles'),
      staticArgs   = utility.glob(path.join('demo', '*.min.{js,css}')),
      imageArgs    = utility.glob(path.join(styleDir,  '*.{png,jpg}'),
                                  'binary'),
      stylesArgs   = utility.glob(path.join(styleDir,  '*.css')),
      demoRoot     = path.join(directory.build, 'demo'),
      templateArgs = { callback: templateAllFunc },
      destArgs     = {
        dir: path.join(demoRoot, 'styles'),
        encoding: 'binary'
      };

  return {
    logStart: { task: ['log', 'Generating demo.'] },
    readLanguages: { requires: 'logStart', task: ['glob', readArgs] },
    filterSnippets: { requires: 'readLanguages', task: ['filter', filterCB] },
    readSnippet: { requires: 'filterSnippets', task: 'readSnippet' },
    template: {
      requires: 'readSnippet',
      task: ['templateAll', templateArgs]
    },
    write: {
      requires: 'template',
      task: ['write', path.join(demoRoot, 'index.html')]
    },
    readStatic: { requires: 'logStart', task: ['glob', staticArgs] },
    writeStatic: { requires: 'readStatic', task: ['dest', demoRoot] },
    readStyles: { requires: 'logStart', task: ['glob', stylesArgs] },
    compressStyles: { requires: 'readStyles', task: 'cssminify' },
    writeStyles: { requires: 'compressStyles', task: ['dest', destArgs] },
    readImages: { requires: 'logStart', task: ['glob', imageArgs] },
    writeImages: { requires:'readImages', task: ['dest', destArgs] },
    readDemoJS: {
      requires: 'logStart',
      task: ['read', path.join('demo', 'demo.js')]
    },
    minifyDemoJS: { requires: 'readDemoJS', task: 'jsminify' },
    writeDemoJS: { requires: 'minifyDemoJS', task: ['dest', demoRoot] },
    readDemoCSS: {
      requires: 'logStart',
      task: ['read', path.join('demo', 'style.css')]
    },
    minifyDemoCSS: { requires: 'readDemoCSS', task: 'cssminify' },
    writeDemoCSS: { requires: 'minifyDemoCSS', task: ['dest', demoRoot] }
  };
}

module.exports = function(commander, dir) {
  directory = dir;

  let hljsExt, output, requiresTask, tasks,
      replace           = utility.replace,
      regex             = utility.regex,
      replaceClassNames = utility.replaceClassNames,

      coreFile     = path.join('src', 'highlight.js'),
      languages    = utility.glob(path.join('src', 'languages', '*.js')),
      filterCB     = utility.buildFilterCallback(commander.args),
      replaceArgs  = replace(regex.header, ''),
      templateArgs =
        'hljs.registerLanguage(\'<%= name %>\', <%= content %>);\n';

  tasks = {
    startLog: { task: ['log', 'Building highlight.js pack file.'] },
    readCore: { requires: 'startLog', task: ['read', coreFile] },
    read: { requires: 'startLog', task: ['glob', languages] },
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

  tasks.insertLicenseTag = {
    requires: requiresTask,
    task: 'insertLicenseTag'
  };

  tasks.writelog = {
    requires: 'insertLicenseTag',
    task: ['log', 'Writing highlight.js pack file.']
  };

  hljsExt = commander.target === 'cdn' ? 'min' : 'pack';
  output  = path.join(directory.build, `highlight.${hljsExt}.js`);

  tasks.write = {
    requires: 'writelog',
    task: ['write', output]
  };

  tasks = (commander.target === 'browser')
        ? [copyDocs(), generateDemo(filterCB, languages), tasks]
        : [tasks];

  return utility.toQueue(tasks, registry);
};
