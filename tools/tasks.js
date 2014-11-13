'use strict';

var _        = require('lodash');
var del      = require('del');
var Registry = require('gear').Registry;
var path     = require('path');
var fs       = require('fs');

var parseHeader = require('./utility').parseHeader;
var tasks       = require('gear-lib');

tasks.clean = function(directories, blobs, done) {
  directories = _.isString(directories) ? [directories] : directories;

  del(directories, function(err) {
    return done(err, blobs);
  });
};
tasks.clean.type = 'collect';

tasks.reorderDeps = function(options, blobs, done) {
  var buffer       = {},
      newBlobOrder = [];

  _.each(blobs, function(blob) {
    var basename = path.basename(blob.name),
        fileInfo = parseHeader(blob.result),
        extra = {blob: blob, processed: false};

    buffer[basename] = _.merge(extra, fileInfo || {});
  });

  function pushInBlob(object) {
    if(!object.processed) {
      object.processed = true;
      newBlobOrder.push(object.blob);
    }
  }

  _.each(buffer, function(buf) {
    var object;

    if(buf.Requires) {
      _.each(buf.Requires, function(language) {
        object = buffer[language];
        pushInBlob(object);
      });
    }

    pushInBlob(buf);
  });

  done(null, newBlobOrder);
};
tasks.reorderDeps.type = 'collect';

tasks.template = function(options, blob, done) {
  options = options || {};

  var content  = blob.result.trim(),
      filename = path.basename(blob.name),
      basename = filename.replace(/\.js$/, ''),
      data, hasTemplate, newBlob, template;

  if(_.isString(options)) options = { template: options };

  if(basename !== options.skip) {
    data = {
      name: basename,
      filename: filename,
      content: content
    };

    hasTemplate = _.contains(_.keys(options), basename);
    template    = hasTemplate ? options[basename] : options.template;
    content     = _.template(template, data);

    newBlob = new blob.constructor(content, blob);
  } else {
    newBlob = blob;
  }

  return done(null, newBlob);
};

tasks.templateAll = function(template, blobs, done) {
  var names, content;

  names = _.map(blobs, function(blob) {
    return path.basename(blob.name, '.js');
  });

  content = _.template(template, { names: names });

  return done(null, [new blobs[0].constructor(content, blobs)]);
};
tasks.templateAll.type = 'collect';

tasks.rename = function(options, blob, done) {
  options = options || {};

  var name = blob.name,
      ext  = new RegExp(path.extname(name) + '$');

  name = name.replace(ext, options.extname);

  return done(null, new blob.constructor(blob.result, {name: name}));
};

tasks.buildPackage = function(json, blob, done) {
  var contributors = [],

      lines = blob.result.split(/\r?\n/),
      regex = /^- (.*) <(.*)>$/,
      result;

  _.each(lines, function(line) {
    var matches = line.match(regex);

    if(matches) {
      contributors.push({
        name: matches[1],
        email: matches[2]
      });
    }
  });

  json.contributors = contributors;
  result = JSON.stringify(json, null, '  ');

  return done(null, new blob.constructor(result, blob));
};

tasks.replaceSkippingStrings = function(params, blob, done) {
  var content = blob.result,
      length  = content.length,
      offset  = 0,

      replace = params.replace || '',
      regex   = params.regex,
      starts  = /\/\/|['"\/]/,

      result  = [],
      chunk, end, match, start, terminator;

  while(offset < length) {
    chunk = content.slice(offset);
    match = chunk.match(starts);
    end   = match ? match.index : length;

    chunk = content.slice(offset, end + offset);
    result.push(chunk.replace(regex, replace));

    offset += end;

    if(match) {
      // We found a starter sequence: either a `//` or a "quote"
      // In the case of `//` our terminator is the end of line.
      // Otherwise it's either a matching quote or an escape symbol.
      terminator = match[0] !== '//' ? new RegExp('[' + match[0] + '\\\\]') : /$/m;
      start      = offset;
      offset    += 1;

      while(true) {
        chunk = content.slice(offset);
        match = chunk.match(terminator);

        if(!match) {
          return done('Unmatched quote');
        }

        if(match[0] === '\\') {
          offset += match.index + 2;
        } else {
          offset += match.index + 1;
          result.push(content.slice(start, offset));
          break;
        }
      }
    }
  }

  return done(null, new blob.constructor(result.join(''), blob));
};

tasks.filter = function(callback, blobs, done) {
  var filteredBlobs = _.filter(blobs, callback);

  // Re-add in blobs required from header definition
  _.each(filteredBlobs, function(blob) {
    var dirname  = path.dirname(blob.name),
        content  = blob.result,
        fileInfo = parseHeader(content);

    if(fileInfo && fileInfo.Requires) {
      _.each(fileInfo.Requires, function(language) {
        var filename  = dirname + '/' + language,
            fileFound = _.find(filteredBlobs, { name: filename });

        if(!fileFound) {
          filteredBlobs.push(
            _.find(blobs, { name: filename }));
        }
      });
    }
  });

  return done(null, filteredBlobs);
};
tasks.filter.type = 'collect';

tasks.readSnippet = function(options, blob, done) {
  var name        = path.basename(blob.name, '.js'),
      fileInfo    = parseHeader(blob.result),
      snippetName = path.join(dir.root, 'test', 'detect', name, 'default.txt');

  function addMeta(options, blob) {
    var meta = {name: name + '.js', fileInfo: fileInfo},
        blob = new blob.constructor(blob.result, meta);
    return done(null, blob);
  }

  blob.constructor.readFile(snippetName, 'utf8', addMeta, false);
}

tasks.templateDemo = function(options, blobs, done) {
  var name = path.join(dir.root, 'demo', 'index.html'),
      template = fs.readFileSync(name, 'utf8'),
      content = _.template(template, { path: path, blobs: blobs });

  return done(null, [new blobs[0].constructor(content)]);
};
tasks.templateDemo.type = 'collect';

module.exports = new Registry({ tasks: tasks });
