/* node-highlight is based on highlight.js (see src)       */
/* usage: html = require("highlight").Highlight(code_string);              */
/* NB! You also need to include a CSS file from src/styles */

// load syntax highlighter
var hljs = require('./src/highlight.js').hljs,
    fs = require('fs'),
    vm = require('vm');

var loaded = [];
function loadLang(filename) {
  if(loaded.indexOf(filename) >= 0) return;
  var _filename = __dirname + '/src/languages/' + filename;
  var code = fs.readFileSync(_filename, 'utf-8');
  var req = getRequire(code);
  console.log(filename + ' dep: ' + req);
  if(req) loadLang(req);
  vm.runInNewContext(code, {hljs: hljs}, _filename);
  loaded.push(filename);
}

/**
 * Parses possible language description header from a file. If a header is found returns it
 * as dict, otherwise returns None.
 */
function getRequire(content) {
  var match = /^\s*\/\*([\s\S]*)\*\//.exec(content)
  if(!match) return
  //var headers = {}, has_language = false;
  var headers = match[1].split('\n');
  for(var i = 0; i< headers.length; i++){
      var h = headers[i].trim().split(': ');
      //headers[h[0]] = h[1];
      if(h[0] == 'Requires') return h[1];
  }
  return null;
}

// load langs
fs.readdirSync(__dirname + '/src/languages').forEach(loadLang);

/**
 * highlight(text, tabReplace, useCodeBlocks) -> HTML
 * - text (String): text to be highlighted
 * - tabReplace (String): defaults to 4 spaces if none, replaces \t chars
 * - useCodeBlocks (Boolean): If TRUE use only text between <code> and </code>
 *
 * Highlights program code inside a string by setting appropriate CSS class
 * elements.
 **/
this.Highlight = function(text, tabReplace, useCodeBlocks) {
    tabReplace = tabReplace || '    ';
    if (!!useCodeBlocks) {
        // JS regexpes have some multiline issues, so we temporarily remove them
        return text.replace(/\n/g, '\uffff').replace(/<code>(.*?)<\/code>/gm, function(original, source) {
            return '<code>' + hljs.highlightText(source.replace(/\uffff/g, '\n'), tabReplace) + '</code>';
        }).replace(/&amp;(\w+;)/g, '&$1').replace(/\uffff/g, '\n');
    }else
        return hljs.highlightText(text, tabReplace);
};
