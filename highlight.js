/* node-highlight is based on highlight.js (see src)       */
/* usage: html = require("highlight").Highlight(code_string);              */
/* NB! You also need to include a CSS file from src/styles */

// load syntax highlighter
var hljs = require('./src/highlight.js').hljs,
    fs = require('fs'),
    vm = require('vm');

var loaded = [];
function loadLang(filename) {
  if (loaded.indexOf(filename) >= 0) return;
  var _filename = __dirname + '/src/languages/' + filename;
  var code = fs.readFileSync(_filename, 'utf-8');
  var headers = getHeaders(code);
  if (!headers) return;
  if (headers.requires) loadLang(headers.requires);
  vm.runInNewContext(code, {hljs: hljs}, _filename);
  loaded.push(filename);
}

/**
 * Parses possible language description header from a file. If a header is found returns it
 * as dict, otherwise returns None.
 */
function getHeaders(content) {
  var match = /^\s*\/\*([\s\S]*)\*\//.exec(content);
  if (!match) return;
  var headers = {}, has_language = false;
  var lines = match[1].split('\n');
  for (var i = 0; i < lines.length; i++) {
      var h = lines[i].trim().split(': ');
      headers[h[0].toLowerCase()] = h[1];
  }
  return headers;
}

// load langs
['javascript', 'java', 'python', 'css', 'xml', 'php', 'avrasm']
.forEach(function(lang){
    loadLang(lang + '.js')
});

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
    return text.replace(/\n/g,'\uffff').replace(/<code(\s[^>]*)?>(.*?)<\/code>/gm, function(original, attributes, source) {
        var classes = /\sclass=['"](.*)['"]/.exec(attributes);
        classes = classes ? classes[1] : '';
        var language = blockLanguage(classes);
        source = decodeXML(source).replace(/\uffff/g,"\n");
        var result = hljs.selectHighlight(source, language)[0];
        if(language !== result.language) {
          classes = classes ? (classes + ' ' + result.language) : result.language;
        }
        hljs.fixResult(result, tabReplace)
        return '<code class="' + classes + '">' + result.value + '</code>';
    }).replace(/&amp;(\w+;)/g, '&$1').replace(/\uffff/g,"\n");
  }else
    return hljs.highlightText(text, tabReplace);
};

function blockLanguage(className){
  var classes = className.split(/\s+/)
  for (var i = 0; i < classes.length; i++) {
    var class_ = classes[i].replace(/^language-/, '');
    if (hljs.LANGUAGES[class_] || class_ == 'no-highlight') {
      return class_;
    }
  }
}

var xml_special_to_escaped_one_map = {
  '&': '&amp;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;'
};

var escaped_one_to_xml_special_map = {
  '&amp;': '&',
  '&quot;': '"',
  '&lt;': '<',
  '&gt;': '>'
};

function encodeXML(string) {
  return string.replace(/([\&"<>])/g, function(str, item) {
      return xml_special_to_escaped_one_map[item];
  });
}

function decodeXML(string) {
  return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g,
    function(str, item) {
      return escaped_one_to_xml_special_map[item];
  });
}
