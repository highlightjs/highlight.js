'use strict';

var _        = require('lodash');
var del      = require('del');
var Registry = require('gear').Registry;
var path     = require('path');

var parseHeader = require('./utility').parseHeader;
var tasks       = require('gear-lib');
var headerRegex = /^\s*\/\*((.|\r?\n)*?)\*/;

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
        content  = blob.result,
        fileInfo = {},
        match    = content.match(headerRegex);

    if(!match || basename === 'highlight.js') {
      fileInfo.blob      = blob;
      fileInfo.processed = false;
      buffer[basename]   = fileInfo;

      return;
    }

    fileInfo = parseHeader(match[1]);
    fileInfo.processed = false;
    fileInfo.blob      = blob;

    buffer[basename] = fileInfo;
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
      object = buffer[buf.Requires];
      pushInBlob(object);
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
      data, hasTemplate, template;

  if(_.isString(options)) options = { _: options };

  data = {
    name: basename,
    filename: filename,
    content: content
  };

  hasTemplate = _.contains(_.keys(options), basename);
  template    = hasTemplate ? options[basename] : options._;
  content     = _.template(template, data);

  return done(null, new blob.constructor(content, blob));
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

tasks.dest = function(options, blob, done) {
  options = _.isString(options) ? {dir: options} : options;

  var basename = options.base ? path.relative(options.base, blob.name)
                              : path.basename(blob.name),
      output   = path.join(options.dir, basename);

  blob.writeFile(output, blob, 'utf8', done);
};

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
      quotes  = /['"\/]/,

      result  = [],
      chunk, end, match, start, terminator;

  while(offset < length) {
    chunk = content.slice(offset);
    match = chunk.match(quotes);
    end   = match ? match.index : length;

    chunk = content.slice(offset, end + offset);
    result.push(chunk.replace(regex, replace));

    offset += end;

    if(match) {
      terminator = new RegExp('[' + match[0] + '\\\\]');
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
    var fileInfo, filename, fileFound,
        dirname  = path.dirname(blob.name),
        content  = blob.result,
        match    = content.match(headerRegex);

    if(match) {
      fileInfo = parseHeader(match[1]);

      if(fileInfo.Requires) {
        filename  = path.join(dirname, fileInfo.Requires);
        fileFound = _.find(filteredBlobs, { name: filename });

        if(!fileFound) {
          filteredBlobs.push(
            _.find(blobs, { name: filename }));
        }
      }
    }
  });

  return done(null, filteredBlobs);
};
tasks.filter.type = 'collect';

module.exports = new Registry({ tasks: tasks });
