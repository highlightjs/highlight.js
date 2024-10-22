/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

// @ts-ignore
import deepFreeze from 'deep-freeze-es6';
import Response from './lib/response.js';
import TokenTreeEmitter from './lib/token_tree.js';
import * as regex from './lib/regex.js';
import * as utils from './lib/utils.js';
import * as MODES from './lib/modes.js';
import { compileLanguage } from './lib/mode_compiler.js';
import * as packageJSON from '../package.json';
import * as logger from "./lib/logger.js";
import HTMLInjectionError from "./lib/html_injection_error.js";

const escape = utils.escapeHTML;
const inherit = utils.inherit;
const NO_MATCH = Symbol("nomatch");
const MAX_KEYWORD_HITS = 7;

const HLJS = function(hljs) {
  const languages = Object.create(null);
  const aliases = Object.create(null);
  const plugins = [];
  let SAFE_MODE = true;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] };

  let options = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    cssSelector: 'pre code',
    languages: null,
    __emitter: TokenTreeEmitter
  };

  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }

  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals = true) {
    let code = "";
    let languageName = "";

    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      languageName = codeOrLanguageName;
      code = optionsOrCode;
      console.warn("Old API usage detected. Please switch to the new API.");
    }

    const context = { code, language: languageName };
    fire("before:highlight", context);

    const result = context.result || _highlight(context.language, context.code, ignoreIllegals);
    result.code = context.code;
    fire("after:highlight", result);

    return result;
  }

  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const language = getLanguage(languageName);
    if (!language) {
      console.error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error(`Unknown language: "${languageName}"`);
    }

    const md = compileLanguage(language);
    let result = '';
    let top = continuation || md;
    const emitter = new options.__emitter(options);
    let modeBuffer = '';
    let relevance = 0;
    let index = 0;

    try {
      while (true) {
        const match = top.matcher.exec(codeToHighlight);
        if (!match) break;

        const textBeforeMatch = codeToHighlight.substring(index, match.index);
        processLexeme(textBeforeMatch, match);
        index = match.index + match[0].length; // Move index forward
      }
      
      emitter.finalize();
      return {
        language: languageName,
        value: emitter.toHTML(),
        relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      handleHighlightError(err, codeToHighlight, index);
    }
  }

  function handleHighlightError(err, codeToHighlight, index) {
    if (err.message.includes('Illegal')) {
      return {
        language: languageName,
        value: escape(codeToHighlight),
        illegal: true,
        relevance: 0,
        _illegalBy: {
          message: err.message,
          index,
          context: codeToHighlight.slice(index - 100, index + 100),
          mode: err.mode,
          resultSoFar: ''
        },
        _emitter: new options.__emitter(options)
      };
    } else {
      throw err;
    }
  }

  function processLexeme(textBeforeMatch, match) {
    modeBuffer += textBeforeMatch;

    if (match.type === "begin") {
      startNewMode(match.rule, match);
    } else if (match.type === "end") {
      endOfMode(top, match, codeToHighlight.substring(match.index));
    }
  }

  function start NewMode(newMode, match) {
    top = Object.create(newMode, { parent: { value: top } });
  }

  function endOfMode(mode, match, matchPlusRemainder) {
    if (mode.endRe.test(matchPlusRemainder)) {
      top = mode.parent;
    }
  }

  function blockLanguage(block) {
    let classes = block.className + ' ';

    classes += block.parentNode ? block.parentNode.className : '';

    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        logger.warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        logger.warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : 'no-highlight';
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }

  function highlightElement(element) {
    let node = null;
    const language = blockLanguage(element);

    if (shouldNotHighlight(language)) return;

    fire("before:highlightElement",
      { el: element, language });

    if (element.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
      return;
    }

    if (element.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
        console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
        console.warn("The element with unescaped HTML:");
        console.warn(element);
      }
      if (options.throwUnescapedHTML) {
        const err = new HTMLInjectionError(
          "One of your code blocks includes unescaped HTML.",
          element.innerHTML
        );
        throw err;
      }
    }

    node = element;
    const text = node.textContent;
    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text);

    element.innerHTML = result.value;
    element.dataset.highlighted = "yes";
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relevance: result.relevance
    };
    if (result.secondBest) {
      element.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }

    fire("after:highlightElement", { el: element, result, text });
  }

  function updateClassName(element, currentLang, resultLang) {
    const language = (currentLang && aliases[currentLang]) || resultLang;

    element.classList.add("hljs");
    element.classList.add(`language-${language}`);
  }

  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);

    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
      _highlight(name, code, false)
    );
    results.unshift(plaintext); // plaintext is always an option

    const sorted = results.sort((a, b) => {
      if (a.relevance !== b.relevance) return b.relevance - a.relevance;

      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }

      return 0;
    });

    const [best, secondBest] = sorted;

    const result = best;
    result.secondBest = secondBest;

    return result;
  }

  function justTextHighlightResult(code) {
    const result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };
    result._emitter.addText(code);
    return result;
  }

  function configure(userOptions) {
    options = inherit(options, userOptions);
  }

  function initHighlighting() {
    highlightAll();
    logger.deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };

  function initHighlightingOnLoad() {
    highlightAll();
    logger.deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  };

  let wantsHighlight = false;

  function highlightAll() {
    function boot() {
      highlightAll();
    }

    if (document.readyState === "loading") {
      if (!wantsHighlight) {
        window.addEventListener('DOMContentLoaded', boot, false);
      }
      wantsHighlight = true;
      return;
    }

    const blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }

  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error) {
      logger.error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      if (!SAFE_MODE) { throw error; } else { logger.error(error); }
      lang = PLAINTEXT_LANGUAGE;
    }
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName });
    }
  }

  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }

  function listLanguages() {
    return Object.keys(languages);
  }

  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }

  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }
    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; });
  }

  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }

  function upgradePluginAPI(plugin) {
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](
          Object.assign({ block: data.el }, data)
        );
      };
    }
  }

  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }

  function removePlugin(plugin) {
    const index = plugins.indexOf(plugin);
    if (index !== -1) {
      plugins.splice(index, 1);
    }
  }

  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }

  function deprecateHighlightBlock(el) {
    logger.deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    logger.deprecated("10.7.0", "Please use highlightElement now.");

    return highlightElement(el);
  }

  Object.assign(hljs, {
    highlight,
    highlightAuto,
    highlightAll,
    highlightElement,
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    autoDetection,
    inherit,
    addPlugin,
    removePlugin
  });

  hljs.debugMode = function() { SAFE_MODE = false; };
  hljs.safeMode = function() { SAFE_MODE = true; };
  hljs.versionString = packageJSON.version;

  hljs.regex = {
    concat: regex.concat,
    lookahead: regex.lookahead,
    either: regex.either,
    optional: regex.optional,
    anyNumberOfTimes: regex.anyNumberOfTimes
  };

  for (const key in MODES) {
    if (typeof MODES[key] === "object") {
      deepFreeze(MODES[key]);
    }
  }

  Object.assign(hljs, MODES);

  return hljs;
};

const highlight = HLJS({});

highlight.newInstance = () => HLJS({});

// export an "instance" of the highlighter
export default highlight;
