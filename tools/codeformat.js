'use strict';

var _         = require('lodash');
var bluebird  = require('bluebird');
var path      = require('path');
var glob      = bluebird.promisify(require('glob'));
var fs        = require('fs');
var readFile  = bluebird.promisify(fs.readFile);
var writeFile = bluebird.promisify(fs.writeFile);
var beautify  = require('js-beautify').js_beautify;

var beautify_options = {
  "indent_size": 2,
  "indent_char": " ",
  "eol": "\n",
  "indent_level": 0,
  "indent_with_tabs": false,
  "preserve_newlines": true,
  "max_preserve_newlines": 10,
  "jslint_happy": false,
  "space_after_anon_function": false,
  "brace_style": "collapse",
  "keep_array_indentation": false,
  "keep_function_indentation": false,
  "space_before_conditional": true,
  "break_chained_methods": false,
  "eval_code": false,
  "end_with_newline": true
};

console.log("Starting formatting.");

var sources = path.join('src', 'languages', '*.js');

bluebird.map(glob(sources), function (name) {
  var basename = path.basename(name, '.js');

  return readFile(name).then(function (blob) {
    return beautify(blob.toString(), beautify_options);
  }).then(function (blob) {
    return writeFile(name, blob).then(function () {
      console.log(" ✓ " + basename);
    });
  });
}).then(function () {
  console.log("Finished formatting.");
});
