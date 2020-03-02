/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

import deepFreeze from './vendor/deep_freeze';
import TokenTreeEmitter from './lib/token_tree';
import * as regex from './lib/regex';
import * as utils from './lib/utils';
import * as MODES from './lib/modes';
import { compileLanguage } from './lib/mode_compiler';

const escape = utils.escapeHTML;
const inherit = utils.inherit;

const { nodeStream, mergeStreams } = utils;


const HLJS = function(hljs) {

  // Convenience variables for build-in objects
  var ArrayProto = [];

  // Global internal variables used within the highlight.js library.
  var languages = {},
      aliases   = {},
      plugins   = [];

  // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error
  var SAFE_MODE = true;

  // Regular expressions used throughout the highlight.js library.
  var fixMarkupRe      = /((^(<[^>]+>|\t|)+|(?:\n)))/gm;

  var LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";

  // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.
  var options = {
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };

  /* Utility functions */

  function shouldNotHighlight(language) {
    return options.noHighlightRe.test(language);
  }

  function blockLanguage(block) {
    var match;
    var classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    // language-* takes precedence over non-prefixed class names.
    match = options.languageDetectRe.exec(classes);
    if (match) {
      var language = getLanguage(match[1]);
      if (!language) {
        console.warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        console.warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class))
  }

  /**
   * Core highlighting function.
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} code - the code to highlight
   * @param {boolean} ignore_illegals - whether to ignore illegal matches, default is to bail
   * @param {array<mode>} continuation - array of continuation modes
   *
   * @returns an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {mode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */
  function highlight(languageName, code, ignore_illegals, continuation) {
    var context = {
      code,
      language: languageName
    };
    // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed
    fire("before:highlight", context);

    // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight
    var result = context.result ?
      context.result :
      _highlight(context.language, context.code, ignore_illegals, continuation);

    result.code = context.code;
    // the plugin can change anything in result to suite it
    fire("after:highlight", result);

    return result;
  }

  // private highlight that's used internally and does not fire callbacks
  function _highlight(languageName, code, ignore_illegals, continuation) {
    var codeToHighlight = code;

    function endOfMode(mode, lexeme) {
      if (regex.startsWith(mode.endRe, lexeme)) {
        while (mode.endsParent && mode.parent) {
          mode = mode.parent;
        }
        return mode;
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }

    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }

    function processKeywords() {
      var keyword_match, last_index, match, result, buf;

      if (!top.keywords) {
        emitter.addText(mode_buffer);
        return;
      }

      last_index = 0;
      top.lexemesRe.lastIndex = 0;
      match = top.lexemesRe.exec(mode_buffer);
      buf = "";

      while (match) {
        buf += mode_buffer.substring(last_index, match.index);
        keyword_match = keywordMatch(top, match);
        var kind = null;
        if (keyword_match) {
          emitter.addText(buf);
          buf = "";

          relevance += keyword_match[1];
          kind = keyword_match[0];
          emitter.addKeyword(match[0], kind);
        } else {
          buf += match[0];
        }
        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }
      buf += mode_buffer.substr(last_index);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (mode_buffer === "") return;

      var explicit = typeof top.subLanguage === 'string';

      if (explicit && !languages[top.subLanguage]) {
        emitter.addText(mode_buffer);
        return;
      }

      var result = explicit ?
                   _highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) :
                   highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);

      // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      if (explicit) {
        continuations[top.subLanguage] = result.top;
      }
      emitter.addSublanguage(result.emitter, result.language)
    }

    function processBuffer() {
      (top.subLanguage != null ? processSubLanguage() : processKeywords());
      mode_buffer = '';
    }

    function startNewMode(mode) {
      if (mode.className) {
        emitter.openNode(mode.className)
      }
      top = Object.create(mode, {parent: {value: top}});
    }

    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexs to potentially match here, so we move the cursor forward one
        // space
        mode_buffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        continueScanAtSamePosition = true;
        return 0;
      }
    }

    function doBeginMatch(match) {
      var lexeme = match[0];
      var new_mode = match.rule;

      if (new_mode.__onBegin) {
        let res = new_mode.__onBegin(match) || {};
        if (res.ignoreMatch)
          return doIgnore(lexeme);
      }

      if (new_mode && new_mode.endSameAsBegin) {
        new_mode.endRe = regex.escape( lexeme );
      }

      if (new_mode.skip) {
        mode_buffer += lexeme;
      } else {
        if (new_mode.excludeBegin) {
          mode_buffer += lexeme;
        }
        processBuffer();
        if (!new_mode.returnBegin && !new_mode.excludeBegin) {
          mode_buffer = lexeme;
        }
      }
      startNewMode(new_mode);
      return new_mode.returnBegin ? 0 : lexeme.length;
    }

    function doEndMatch(match) {
      var lexeme = match[0];
      var matchPlusRemainder = codeToHighlight.substr(match.index);
      var end_mode = endOfMode(top, matchPlusRemainder);
      if (!end_mode) { return; }

      var origin = top;
      if (origin.skip) {
        mode_buffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          mode_buffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          mode_buffer = lexeme;
        }
      }
      do {
        if (top.className) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== end_mode.parent);
      if (end_mode.starts) {
        if (end_mode.endSameAsBegin) {
          end_mode.starts.endRe = end_mode.endRe;
        }
        startNewMode(end_mode.starts);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      var list = []
      for(var current = top; current !== language; current = current.parent) {
        if (current.className) {
          list.unshift(current.className)
        }
      }
      list.forEach(item => emitter.openNode(item))
    }

    var lastMatch = {};
    function processLexeme(text_before_match, match) {

      var lexeme = match && match[0];

      // add non-matched text to the current mode buffer
      mode_buffer += text_before_match;

      if (lexeme == null) {
        processBuffer();
        return 0;
      }



      // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140
      if (lastMatch.type=="begin" && match.type=="end" && lastMatch.index == match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        mode_buffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          var err = new Error('0 width match regex');
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw(err);
        }
        return 1;
      }
      lastMatch = match;

      if (match.type==="begin") {
        return doBeginMatch(match);
      } else if (match.type==="illegal" && !ignore_illegals) {
        // illegal match, we do not continue processing
        var err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
        err.mode = top;
        throw err;
      } else if (match.type==="end") {
        var processed = doEndMatch(match);
        if (processed != undefined)
          return processed;
      }

      /*
      Why might be find ourselves here?  Only one occasion now.  An end match that was
      triggered but could not be completed.  When might this happen?  When an `endSameasBegin`
      rule sets the end rule to a specific match.  Since the overall mode termination rule that's
      being used to scan the text isn't recompiled that means that any match that LOOKS like
      the end (but is not, because it is not an exact match to the beginning) will
      end up here.  A definite end match, but when `doEndMatch` tries to "reapply"
      the end rule and fails to match, we wind up here, and just silently ignore the end.

      This causes no real harm other than stopping a few times too many.
      */

      mode_buffer += lexeme;
      return lexeme.length;
    }

    var language = getLanguage(languageName);
    if (!language) {
      console.error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var result;
    var emitter = new options.__emitter(options);
    processContinuations();
    var mode_buffer = '';
    var relevance = 0;
    var match, processedCount, index = 0;

    try {
      var continueScanAtSamePosition = false;
      top.matcher.considerAll();

      while (true) {
        if (continueScanAtSamePosition) {
          continueScanAtSamePosition = false;
          // only regexes not matched previously will now be
          // considered for a potential match
        } else {
          top.matcher.lastIndex = index;
          top.matcher.considerAll();
        }
        match = top.matcher.exec(codeToHighlight);
        // console.log("match", match[0], match.rule && match.rule.begin)
        if (!match)
          break;
        let beforeMatch = codeToHighlight.substring(index, match.index);
        processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }
      processLexeme(codeToHighlight.substr(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();

      return {
        relevance: relevance,
        value: result,
        language: languageName,
        illegal: false,
        emitter: emitter,
        top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          illegal: true,
          illegalBy: {
            msg: err.message,
            context: codeToHighlight.slice(index-100,index+100),
            mode: err.mode
          },
          sofar: result,
          relevance: 0,
          value: escape(codeToHighlight),
          emitter: emitter,
        };
      } else if (SAFE_MODE) {
        return {
          relevance: 0,
          value: escape(codeToHighlight),
          emitter: emitter,
          language: languageName,
          top: top,
          errorRaised: err
        };
      } else {
        throw err;
      }
    }
  }

  /*
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

  */
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    var result = {
      relevance: 0,
      emitter: new options.__emitter(options),
      value: escape(code)
    };
    var second_best = result;
    languageSubset.filter(getLanguage).filter(autoDetection).forEach(function(name) {
      var current = _highlight(name, code, false);
      current.language = name;
      if (current.relevance > second_best.relevance) {
        second_best = current;
      }
      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }

  /*
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

  */
  function fixMarkup(value) {
    if (!(options.tabReplace || options.useBR)) {
      return value;
    }

    return value.replace(fixMarkupRe, function(match, p1) {
        if (options.useBR && match === '\n') {
          return '<br>';
        } else if (options.tabReplace) {
          return p1.replace(/\t/g, options.tabReplace);
        }
        return '';
    });
  }

  function buildClassName(prevClassName, currentLang, resultLang) {
    var language = currentLang ? aliases[currentLang] : resultLang,
        result   = [prevClassName.trim()];

    if (!prevClassName.match(/\bhljs\b/)) {
      result.push('hljs');
    }

    if (!prevClassName.includes(language)) {
      result.push(language);
    }

    return result.join(' ').trim();
  }

  /*
  Applies highlighting to a DOM node containing code. Accepts a DOM node and
  two optional parameters for fixMarkup.
  */
  function highlightBlock(block) {
    var node, originalStream, result, resultNode, text;
    var language = blockLanguage(block);

    if (shouldNotHighlight(language))
        return;

    fire("before:highlightBlock",
      { block: block, language: language});

    if (options.useBR) {
      node = document.createElement('div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }
    text = node.textContent;
    result = language ? highlight(language, text, true) : highlightAuto(text);

    originalStream = nodeStream(node);
    if (originalStream.length) {
      resultNode = document.createElement('div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
    result.value = fixMarkup(result.value);

    fire("after:highlightBlock", { block: block, result: result});

    block.innerHTML = result.value;
    block.className = buildClassName(block.className, language, result.language);
    block.result = {
      language: result.language,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }

  /*
  Updates highlight.js global options with values passed in the form of an object.
  */
  function configure(user_options) {
    options = inherit(options, user_options);
  }

  /*
  Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
  */
  function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;

    var blocks = document.querySelectorAll('pre code');
    ArrayProto.forEach.call(blocks, highlightBlock);
  }

  /*
  Attaches highlighting to the page load event.
  */
  function initHighlightingOnLoad() {
    window.addEventListener('DOMContentLoaded', initHighlighting, false);
  }

  var PLAINTEXT_LANGUAGE = { disableAutodetect: true };

  function registerLanguage(name, language) {
    var lang;
    try { lang = language(hljs); }
    catch (error) {
      console.error("Language definition for '{}' could not be registered.".replace("{}", name));
      // hard or soft error
      if (!SAFE_MODE) { throw error; } else { console.error(error); }
      // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter
      lang = PLAINTEXT_LANGUAGE;
    }
    // give it a temporary name if it doesn't have one in the meta-data
    if (!lang.name)
      lang.name = name;
    languages[name] = lang;
    lang.rawDefinition = language.bind(null,hljs);

    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {aliases[alias] = name;});
    }
  }

  function listLanguages() {
    return Object.keys(languages);
  }

  /*
    intended usage: When one language truly requires another

    Unlike `getLanguage`, this will throw when the requested language
    is not available.
  */
  function requireLanguage(name) {
    var lang = getLanguage(name);
    if (lang) { return lang; }

    var err = new Error('The \'{}\' language is required, but not loaded.'.replace('{}',name));
    throw err;
  }

  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  function autoDetection(name) {
    var lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  function addPlugin(plugin, options) {
    plugins.push(plugin);
  }

  function fire(event, args) {
    var cb = event;
    plugins.forEach(function (plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }

  /* Interface definition */

  Object.assign(hljs,{
    highlight,
    highlightAuto,
    fixMarkup,
    highlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    listLanguages,
    getLanguage,
    requireLanguage,
    autoDetection,
    inherit,
    addPlugin
  });

  hljs.debugMode = function() { SAFE_MODE = false; }
  hljs.safeMode = function() { SAFE_MODE = true; }

  for (const key in MODES) {
    if (typeof MODES[key] === "object")
      deepFreeze(MODES[key]);
  }

  // merge all the modes/regexs into our main object
  Object.assign(hljs, MODES);

  return hljs;
};

// export an "instance" of the highlighter
export default HLJS({});
