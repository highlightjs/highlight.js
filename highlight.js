/* 
Syntax highlighting with language autodetection.  
http://softwaremaniacs.org/soft/highlight/
*/

var DEFAULT_LANGUAGES = ['python', 'ruby', 'perl', 'php', 'css', 'html', 'django', 'javascript', 'java', 'cpp', 'sql', 'smalltalk'];
var ALL_LANGUAGES = (DEFAULT_LANGUAGES.join(',') + ',' + ['1c', 'axapta', 'delphi', 'rib', 'rsl', 'vbscript'].join(',')).split(',');
var LANGUAGE_GROUPS = {
  'html': 'html',
  'css': 'html',
  'django': 'html'
}

var IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';
var UNDERSCORE_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*';
var NUMBER_RE = '\\b\\d+(\\.\\d+)?';
var C_NUMBER_RE = '\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)';

// Common modes
var APOS_STRING_MODE = {
  className: 'string',
  begin: '\'', end: '\'',
  contains: ['escape'],
  relevance: 0
}
var QUOTE_STRING_MODE = {
  className: 'string',
  begin: '"', end: '"',
  contains: ['escape'],
  relevance: 0
}
var BACKSLASH_ESCAPE = {
  className: 'escape',
  begin: '\\\\.', end: '^',
  relevance: 0
}
var C_LINE_COMMENT_MODE = {
  className: 'comment',
  begin: '//', end: '$',
  relevance: 0
}
var C_BLOCK_COMMENT_MODE = {
  className: 'comment',
  begin: '/\\*', end: '\\*/'
}
var HASH_COMMENT_MODE = {
  className: 'comment',
  begin: '#', end: '$'
}
var C_NUMBER_MODE = {
  className: 'number',
  begin: C_NUMBER_RE, end: '^',
  relevance: 0
}

var LANGUAGES = {}
var selected_languages = {};

function Highlighter(language_name, value) {
  function subMode(lexem) {
    if (!modes[modes.length - 1].contains)
      return null;
    for (var i in modes[modes.length - 1].contains) {
      var className = modes[modes.length - 1].contains[i];
      for (var key in language.modes)
        if (language.modes[key].className == className && language.modes[key].beginRe.test(lexem))
          return language.modes[key];
    }//for
    return null;
  }//subMode
  
  function endOfMode(mode_index, lexem) {
    if (modes[mode_index].end && modes[mode_index].endRe.test(lexem))
      return 1;
    if (modes[mode_index].endsWithParent) {
      var level = endOfMode(mode_index - 1, lexem);
      return level ? level + 1 : 0;
    }//if
    return 0;
  }//endOfMode
  
  function isIllegal(lexem) {
    if (!modes[modes.length - 1].illegalRe)
      return false;
    return modes[modes.length - 1].illegalRe.test(lexem);
  }//isIllegal

  function eatModeChunk(value, index) {
    if (!modes[modes.length - 1].terminators) {
      var terminators = [];
      
      if (modes[modes.length - 1].contains)
        for (var key in language.modes) {
          if (contains(modes[modes.length - 1].contains, language.modes[key].className) &&
              !contains(terminators, language.modes[key].begin))
            terminators[terminators.length] = language.modes[key].begin;
        }//for
      
      var mode_index = modes.length - 1;
      do {
        if (modes[mode_index].end && !contains(terminators, modes[mode_index].end))
          terminators[terminators.length] = modes[mode_index].end;
        mode_index--;
      } while (modes[mode_index + 1].endsWithParent);
      
      if (modes[modes.length - 1].illegal)
        if (!contains(terminators, modes[modes.length - 1].illegal))
          terminators[terminators.length] = modes[modes.length - 1].illegal;
      
      var terminator_re = '(' + terminators[0];
      for (var i = 0; i < terminators.length; i++)
        terminator_re += '|' + terminators[i];
      terminator_re += ')';
      modes[modes.length - 1].terminators = langRe(language, terminator_re);
    }//if
    value = value.substr(index);
    var match = modes[modes.length - 1].terminators.exec(value);
    if (!match) 
      return [value, '', true];
    if (match.index == 0)
      return ['', match[0], false];
    else
      return [value.substr(0, match.index), match[0], false];
  }//eatModeChunk
  
  function escape(value) {
    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
  }//escape
  
  function keywordMatch(mode, match) {
    var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0]
    for (var className in mode.keywordGroups) {
      var value = mode.keywordGroups[className].hasOwnProperty(match_str);
      if (value)
        return [className, value];
    }//for
    return false;
  }//keywordMatch
  
  function processKeywords(buffer) {
    var mode = modes[modes.length - 1];
    if (!mode.keywords || !mode.lexems)
      return escape(buffer);
    if (!mode.lexemsRe) {
      var lexems = [];
      for (var key in mode.lexems)
        if (!contains(lexems, mode.lexems[key]))
          lexems[lexems.length] = mode.lexems[key];
      var lexems_re = '(' + lexems[0];
      for (var i = 1; i < lexems.length; i++)
        lexems_re += '|' + lexems[i];
      lexems_re += ')';
      mode.lexemsRe = langRe(language, lexems_re, true);
    }//if
    var result = '';
    var last_index = 0;
    mode.lexemsRe.lastIndex = 0;
    var match = mode.lexemsRe.exec(buffer);
    while (match) {
      result += escape(buffer.substr(last_index, match.index - last_index));
      keyword_match = keywordMatch(mode, match);
      if (keyword_match) {
        keyword_count += keyword_match[1];
        result += '<span class="'+ keyword_match[0] +'">' + escape(match[0]) + '</span>';
      } else {
        result += escape(match[0]);
      }//if
      last_index = mode.lexemsRe.lastIndex;
      match = mode.lexemsRe.exec(buffer);
    }//while
    result += escape(buffer.substr(last_index, buffer.length - last_index));
    return result;
  }//processKeywords
  
  function processModeInfo(buffer, lexem, end) {
    if (end) {
      result += processKeywords(modes[modes.length - 1].buffer + buffer);
      return;
    }//if
    if (isIllegal(lexem))
      throw 'Illegal';
    var new_mode = subMode(lexem);
    if (new_mode) {
      modes[modes.length - 1].buffer += buffer;
      result += processKeywords(modes[modes.length - 1].buffer);
      if (new_mode.excludeBegin) {
        result += lexem + '<span class="' + new_mode.className + '">';
        new_mode.buffer = '';
      } else {
        result += '<span class="' + new_mode.className + '">';
        new_mode.buffer = lexem;
      }//if
      modes[modes.length] = new_mode;
      relevance += modes[modes.length - 1].relevance != undefined ? modes[modes.length - 1].relevance : 1;
      return;
    }//if
    var end_level = endOfMode(modes.length - 1, lexem);
    if (end_level) {
      modes[modes.length - 1].buffer += buffer;
      if (modes[modes.length - 1].excludeEnd) {
        result += processKeywords(modes[modes.length - 1].buffer) + '</span>' + lexem;
      } else {
        result += processKeywords(modes[modes.length - 1].buffer + lexem) + '</span>';
      }
      while (end_level > 1) {
        result += '</span>';
        end_level--;
        modes.length--;
      }//while
      modes.length--;
      modes[modes.length - 1].buffer = '';
      return;
    }//if
  }//processModeInfo

  function highlight(value) {
    var index = 0;
    language.defaultMode.buffer = '';
    do {
      var mode_info = eatModeChunk(value, index);
      processModeInfo(mode_info[0], mode_info[1], mode_info[2]);
      index += mode_info[0].length + mode_info[1].length;
    } while (!mode_info[2]); 
    if(modes.length > 1)
      throw 'Illegal';
  }//highlight
  
  this.language_name = language_name;
  var language = LANGUAGES[language_name];
  var modes = [language.defaultMode];
  var relevance = 0;
  var keyword_count = 0;
  var result = '';
  try {
    highlight(value);
    this.relevance = relevance;
    this.keyword_count = keyword_count;
    this.result = result;
  } catch (e) {
    if (e == 'Illegal') {
      this.relevance = 0;
      this.keyword_count = 0;
      this.result = escape(value);
    } else {
      throw e;
    }//if
  }//try
}//Highlighter

function contains(array, item) {
  if (!array)
    return false;
  for (var key in array)
    if (array[key] == item)
      return true;
  return false;
}//contains

function blockText(block) {
  var result = '';
  for (var i = 0; i < block.childNodes.length; i++)
    if (block.childNodes[i].nodeType == 3)
      result += block.childNodes[i].nodeValue;
    else if (block.childNodes[i].nodeName == 'BR')
      result += '\n';
    else
      throw 'Complex markup';
  return result;
}//blockText

function initHighlight(block) {
  if (block.className.search(/\bno\-highlight\b/) != -1)
    return;
  try {
    blockText(block);
  } catch (e) {
    if (e == 'Complex markup')
      return;
  }//try
  var classes = block.className.split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    if (LANGUAGES[classes[i]]) {
      highlightLanguage(block, classes[i]);
      return;
    }//if
  }//for
  highlightAuto(block);
}//initHighlight

function highlightLanguage(block, language) {
  var highlight = new Highlighter(language, blockText(block));
  // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
  var container = document.createElement('div');
  container.innerHTML = '<pre><code class="' + block.className + '">' + highlight.result + '</code></pre>';
  var environment = block.parentNode.parentNode;
  environment.replaceChild(container.firstChild, block.parentNode);
}//highlightLanguage
    
function highlightAuto(block) {
  var result = null;
  var language = '';
  var max_relevance = 2;
  var relevance = 0;
  var block_text = blockText(block);
  for (var key in selected_languages) {
    var highlight = new Highlighter(key, block_text);
    relevance = highlight.keyword_count + highlight.relevance;
    if (relevance > max_relevance) {
      max_relevance = relevance;
      result = highlight;
    }//if
  }//for
  
  if(result) {
    // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
    var container = document.createElement('div');
    container.innerHTML = '<pre><code class="' + result.language_name + '">' + result.result + '</code></pre>';
    var environment = block.parentNode.parentNode;
    environment.replaceChild(container.firstChild, block.parentNode);
  }//if
}//highlightAuto

function langRe(language, value, global) {
  var mode =  'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '');
  return new RegExp(value, mode);
}//re

function compileRes() {
  for (var i in LANGUAGES) {
    var language = LANGUAGES[i];
    for (var key in language.modes) {
      if (language.modes[key].begin)
        language.modes[key].beginRe = langRe(language, '^' + language.modes[key].begin);
      if (language.modes[key].end)
        language.modes[key].endRe = langRe(language, '^' + language.modes[key].end);
      if (language.modes[key].illegal)
        language.modes[key].illegalRe = langRe(language, '^(?:' + language.modes[key].illegal + ')');
      language.defaultMode.illegalRe = langRe(language, '^(?:' + language.defaultMode.illegal + ')');
    }//for
  }//for
}//compileRes

function compileKeywords() {

  function compileModeKeywords(mode) {
    if (!mode.keywordGroups) {
      for (var key in mode.keywords) {
        if (mode.keywords[key] instanceof Object)
          mode.keywordGroups = mode.keywords;
        else
          mode.keywordGroups = {'keyword': mode.keywords};
        break;
      }//for
    }//if
  }//compileModeKeywords
  
  for (var i in LANGUAGES) {
    var language = LANGUAGES[i];
    compileModeKeywords(language.defaultMode);
    for (var key in language.modes) {
      compileModeKeywords(language.modes[key]);
    }//for
  }//for
}//compileKeywords

function initHighlighting() {
  if (initHighlighting.called)
    return;
  initHighlighting.called = true;
  compileRes();
  compileKeywords();
  if (arguments.length) {
    for (var i = 0; i < arguments.length; i++) {
      if (LANGUAGES[arguments[i]]) {
        selected_languages[arguments[i]] = LANGUAGES[arguments[i]];
      }//if
    }//for
  } else
    selected_languages = LANGUAGES;
  var pres = document.getElementsByTagName('pre');
  for (var i = 0; i < pres.length; i++) {
    if (pres[i].firstChild && pres[i].firstChild.nodeName == 'CODE')
      initHighlight(pres[i].firstChild);
  }//for
}//initHighlighting

function injectScripts(languages) {
  var scripts = document.getElementsByTagName('SCRIPT');
  for (var i=0; i < scripts.length; i++) {
    if (scripts[i].src.match(/highlight\.js$/)) {
      var path = scripts[i].src.replace(/highlight\.js$/, '');
      break;
    }//if
  }//for
  if (languages.length == 0) {
    languages = DEFAULT_LANGUAGES;
  }//if
  var injected = {}
  for (var i=0; i < languages.length; i++) {
    var filename = LANGUAGE_GROUPS[languages[i]] ? LANGUAGE_GROUPS[languages[i]] : languages[i];
    if (!injected[filename]) {
      document.write('<script type="text/javascript" src="' + path + 'languages/' + filename + '.js"></script>');
      injected[filename] = true;
    }//if
  }//for
}//injectScripts

function initHighlightingOnLoad() {
  var original_arguments = arguments;
  injectScripts(arguments);
  var handler = function(){initHighlighting.apply(null, original_arguments)};
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', handler, false);
    window.addEventListener('load', handler, false);
  } else if (window.attachEvent)
    window.attachEvent('onload', handler);
  else
    window.onload = handler;
}//initHighlightingOnLoad