/* 
Syntax highlighting with language autodetection.  
http://softwaremaniacs.org/soft/highlight/
*/

var hljs = new function() {

  var DEFAULT_LANGUAGES = ['python', 'ruby', 'perl', 'php', 'css', 'xml', 'html', 'django', 'javascript', 'java', 'cpp', 'sql', 'smalltalk'];
  var ALL_LANGUAGES = (DEFAULT_LANGUAGES.join(',') + ',' + ['1c', 'axapta', 'delphi', 'rib', 'rsl', 'vbscript', 'profile'].join(',')).split(',');
  var LANGUAGE_GROUPS = {
    'xml': 'www',
    'html': 'www',
    'css': 'www',
    'django': 'www',
    'python': 'dynamic',
    'perl': 'dynamic',
    'php': 'dynamic',
    'ruby': 'dynamic',
    'cpp': 'static',
    'java': 'static',
    'delphi': 'static',
    'rib': 'renderman',
    'rsl': 'renderman'
  }

  var LANGUAGES = {}
  var selected_languages = {};
  
  function escape(value) {
    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
  }//escape
  
  function contains(array, item) {
    if (!array)
      return false;
    for (var key in array)
      if (array[key] == item)
        return true;
    return false;
  }//contains
  
  function highlight(language_name, value) {
    function compileSubModes(mode, language) {
      mode.sub_modes = [];
      for (var i in mode.contains) {
        for (var j in language.modes) {
          if (language.modes[j].className == mode.contains[i]) {
            mode.sub_modes[mode.sub_modes.length] = language.modes[j];
          }//if
        }//for
      }//for
    }//compileSubModes
  
    function subMode(lexem, mode) {
      if (!mode.contains) {
        return null;
      }//if
      if (!mode.sub_modes) {
        compileSubModes(mode, language);
      }//if
      for (var i in mode.sub_modes) {
        if (mode.sub_modes[i].beginRe.test(lexem)) {
          return mode.sub_modes[i];
        }//if
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
    
    function isIllegal(lexem, mode) {
      return mode.illegalRe && mode.illegalRe.test(lexem);
    }//isIllegal
    
    function compileTerminators(mode, language) {
      var terminators = [];
      
      function addTerminator(re) {
        if (!contains(terminators, re)) {
          terminators[terminators.length] = re;
        }//if
      }//addTerminator
      
      if (mode.contains)
        for (var key in language.modes) {
          if (contains(mode.contains, language.modes[key].className)) {
            addTerminator(language.modes[key].begin);
          }//if
        }//for
      
      var index = modes.length - 1;
      do {
        if (modes[index].end) {
          addTerminator(modes[index].end);
        }//if
        index--;
      } while (modes[index + 1].endsWithParent);
      
      if (mode.illegal) {
        addTerminator(mode.illegal);
      }//if
      
      var terminator_re = '(' + terminators[0];
      for (var i = 0; i < terminators.length; i++)
        terminator_re += '|' + terminators[i];
      terminator_re += ')';
      return langRe(language, terminator_re);
    }//compileTerminators

    function eatModeChunk(value, index) {
      var mode = modes[modes.length - 1];
      if (!mode.terminators) {
        mode.terminators = compileTerminators(mode, language);
      }//if
      value = value.substr(index);
      var match = mode.terminators.exec(value);
      if (!match) 
        return [value, '', true];
      if (match.index == 0)
        return ['', match[0], false];
      else
        return [value.substr(0, match.index), match[0], false];
    }//eatModeChunk
    
    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0]
      for (var className in mode.keywordGroups) {
        var value = mode.keywordGroups[className].hasOwnProperty(match_str);
        if (value)
          return [className, value];
      }//for
      return false;
    }//keywordMatch
    
    function processKeywords(buffer, mode) {
      if (!mode.keywords || !mode.lexems)
        return escape(buffer);
      if (!mode.lexemsRe) {
        var lexems_re = '(' + mode.lexems[0];
        for (var i = 1; i < mode.lexems.length; i++)
          lexems_re += '|' + mode.lexems[i];
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
    
    function processBuffer(buffer, mode) {
      if (mode.subLanguage && selected_languages[mode.subLanguage]) {
        var result = highlight(mode.subLanguage, buffer);
        keyword_count += result.keyword_count;
        relevance += result.relevance;
        return result.value;
      } else {
        return processKeywords(buffer, mode);
      }//if
    }//processBuffer
    
    function startNewMode(mode, lexem) {
      if (mode.returnBegin) {
        result += '<span class="' + mode.className + '">';
        mode.buffer = '';
      } else if (mode.excludeBegin) {
        result += escape(lexem) + '<span class="' + mode.className + '">';
        mode.buffer = '';
      } else {
        result += '<span class="' + mode.className + '">';
        mode.buffer = lexem;
      }//if
      modes[modes.length] = mode;
    }//startNewMode
    
    function processModeInfo(buffer, lexem, end) {
      var current_mode = modes[modes.length - 1];
      if (end) {
        result += processBuffer(current_mode.buffer + buffer, current_mode);
        return false;
      }//if
      if (isIllegal(lexem, current_mode))
        throw 'Illegal';
      
      var new_mode = subMode(lexem, current_mode);
      if (new_mode) {
        result += processBuffer(current_mode.buffer + buffer, current_mode);
        startNewMode(new_mode, lexem);
        relevance += new_mode.relevance;
        return new_mode.returnBegin;
      }//if
      
      var end_level = endOfMode(modes.length - 1, lexem);
      if (end_level) {
        if (current_mode.returnEnd) {
          result += processBuffer(current_mode.buffer + buffer, current_mode) + '</span>';
        } else if (current_mode.excludeEnd) {
          result += processBuffer(current_mode.buffer + buffer, current_mode) + '</span>' + escape(lexem);
        } else {
          result += processBuffer(current_mode.buffer + buffer + lexem, current_mode) + '</span>';
        }
        while (end_level > 1) {
          result += '</span>';
          end_level--;
          modes.length--;
        }//while
        modes.length--;
        modes[modes.length - 1].buffer = '';
        if (current_mode.starts) {
          for (var i = 0; i < language.modes.length; i++) {
            if (language.modes[i].className == current_mode.starts) {
              startNewMode(language.modes[i], '');
              break;
            }//if
          }//for
        }//if
        return current_mode.returnEnd;
      }//if
    }//processModeInfo
    
    var language = LANGUAGES[language_name];
    var modes = [language.defaultMode];
    var relevance = 0;
    var keyword_count = 0;
    var result = '';
    try {
      var index = 0;
      language.defaultMode.buffer = '';
      do {
        var mode_info = eatModeChunk(value, index);
        var return_lexem = processModeInfo(mode_info[0], mode_info[1], mode_info[2]);
        index += mode_info[0].length;
        if (!return_lexem) {
          index += mode_info[1].length;
        }//if
      } while (!mode_info[2]); 
      if(modes.length > 1)
        throw 'Illegal';
      return {
        relevance: relevance,
        keyword_count: keyword_count,
        value: result
      }
    } catch (e) {
      if (e == 'Illegal') {
        return {
          relevance: 0,
          keyword_count: 0,
          value: escape(value)
        }
      } else {
        throw e;
      }//if
    }//try
  }//highlight
  
  function blockText(block) {
    var result = '';
    for (var i = 0; i < block.childNodes.length; i++)
      if (block.childNodes[i].nodeType == 3)
        result += block.childNodes[i].nodeValue;
      else if (block.childNodes[i].nodeName == 'BR')
        result += '\n';
      else
        throw 'No highlight';
    return result;
  }//blockText
  
  function blockLanguage(block) {
    var classes = block.className.split(/\s+/);
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] == 'no-highlight') {
        throw 'No highlight'
      }//if
      if (LANGUAGES[classes[i]]) {
        return classes[i];
      }//if
    }//for
  }//blockLanguage

  function highlightBlock(block) {
    try {
      var text = blockText(block);
      var language = blockLanguage(block);
    } catch (e) {
      if (e == 'No highlight')
        return;
    }//try
    
    if (language) {
      var result = highlight(language, text).value;
    } else {
      var max_relevance = 2;
      var relevance = 0;
      for (var key in selected_languages) {
        var r = highlight(key, text);
        relevance = r.keyword_count + r.relevance;
        if (relevance > max_relevance) {
          max_relevance = relevance;
          var result = r.value;
          language = key;
        }//if
      }//for
    }//if
    
    if (result) {
      var className = block.className;
      if (!className.match(language)) {
        className += ' ' + language;
      }//if
      // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
      var container = document.createElement('div');
      container.innerHTML = '<pre><code class="' + className + '">' + result + '</code></pre>';
      var environment = block.parentNode.parentNode;
      environment.replaceChild(container.firstChild, block.parentNode);
    }//if
  }//highlightBlock
  
  function langRe(language, value, global) {
    var mode =  'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '');
    return new RegExp(value, mode);
  }//langRe

  function compileModes() {
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
        if (language.modes[key].relevance == undefined) {
          language.modes[key].relevance = 1;
        }//if
      }//for
    }//for
  }//compileModes

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
    compileModes();
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
        highlightBlock(pres[i].firstChild);
    }//for
  }//initHighlighting

  function injectScripts(languages) {
    var scripts = document.getElementsByTagName('SCRIPT');
    for (var i=0; i < scripts.length; i++) {
      if (scripts[i].src.match(/highlight\.js(\?.+)?$/)) {
        var path = scripts[i].src.replace(/highlight\.js(\?.+)?$/, '');
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
  
  this.LANGUAGES = LANGUAGES;
  this.ALL_LANGUAGES = ALL_LANGUAGES;
  this.initHighlightingOnLoad = initHighlightingOnLoad;
  this.highlightBlock = highlightBlock;
  
  // Common regexps
  this.IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';
  this.UNDERSCORE_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*';
  this.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  this.C_NUMBER_RE = '\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)';

  // Common modes
  this.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: ['escape'],
    relevance: 0
  };
  this.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: ['escape'],
    relevance: 0
  };
  this.BACKSLASH_ESCAPE = {
    className: 'escape',
    begin: '\\\\.', end: '^',
    relevance: 0
  };
  this.C_LINE_COMMENT_MODE = {
    className: 'comment',
    begin: '//', end: '$',
    relevance: 0
  };
  this.C_BLOCK_COMMENT_MODE = {
    className: 'comment',
    begin: '/\\*', end: '\\*/'
  };
  this.HASH_COMMENT_MODE = {
    className: 'comment',
    begin: '#', end: '$'
  };
  this.C_NUMBER_MODE = {
    className: 'number',
    begin: this.C_NUMBER_RE, end: '^',
    relevance: 0
  };
}();

var initHighlightingOnLoad = hljs.initHighlightingOnLoad;