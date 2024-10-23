/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

// @ts-ignore
import deepFreeze from 'deep-freeze-es6'; // Prevents objects from being modified
import Response from './lib/response.js'; // Handles responses
import TokenTreeEmitter from './lib/token_tree.js'; // Manages token trees for highlighting
import * as regex from './lib/regex.js'; // Contains regex utilities
import * as utils from './lib/utils.js'; // Contains utility functions
import * as MODES from './lib/modes.js'; // Different modes for syntax highlighting
import { compileLanguage } from './lib/mode_compiler.js'; // Compiles language definitions
import * as packageJSON from '../package.json'; // Package information
import * as logger from "./lib/logger.js"; // Logging utility
import HTMLInjectionError from "./lib/html_injection_error.js"; // Error handling for HTML injection

const escape = utils.escapeHTML; // Function to escape HTML
const inherit = utils.inherit; // Function to inherit properties
const NO_MATCH = Symbol("nomatch"); // Symbol for no match found
const MAX_KEYWORD_HITS = 7; // Maximum keyword hits for relevance scoring

// Main function that initializes the highlighter
const HLJS = function(hljs) {
  const languages = Object.create(null); // Object to store languages
  const aliases = Object.create(null); // Object to store language aliases
  const plugins = []; // Array to hold plugins
  let SAFE_MODE = true; // Flag for safe mode
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?"; // Error message for missing languages
  const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: 'Plain text', contains: [] }; // Fallback for plaintext

  // Options for highlighting configuration
  let options = {
    ignoreUnescapedHTML: false, // Option to ignore unescaped HTML
    throwUnescapedHTML: false, // Option to throw error for unescaped HTML
    noHighlightRe: /^(no-?highlight)$/i, // Regex for languages to skip highlighting
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i, // Regex to detect language from class names
    classPrefix: 'hljs-', // CSS class prefix
    cssSelector: 'pre code', // Selector for code blocks
    languages: null, // List of languages to highlight
    __emitter: TokenTreeEmitter // Emitter for token trees
  };

  // Check if a language should not be highlighted
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName); // Test against noHighlight regex
  }

  // Function to highlight code based on the provided language or code snippet
  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals = true) {
    let code = ""; // Initialize variable for code
    let languageName = ""; // Initialize variable for language name

    // Check if options are provided
    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName; // Assign code
      ignoreIllegals = optionsOrCode.ignoreIllegals; // Get ignore illegals option
      languageName = optionsOrCode.language; // Get language name
    } else {
      languageName = codeOrLanguageName; // Assign language name
      code = optionsOrCode; // Assign code
      console.warn("Old API usage detected. Please switch to the new API."); // Warn for old API usage
    }

    // Prepare context for highlighting
    const context = { code, language: languageName };
    fire("before:highlight", context); // Trigger event before highlighting

    // Perform the actual highlighting
    const result = context.result || _highlight(context.language, context.code, ignoreIllegals);
    result.code = context.code; // Store the original code
    fire("after:highlight", result); // Trigger event after highlighting

    return result; // Return the result of highlighting
  }

  // Function to perform highlighting based on language and code
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const language = getLanguage(languageName); // Get the language object
    if (!language) {
      console.error(LANGUAGE_NOT_FOUND.replace("{}", languageName)); // Log error for missing language
      throw new Error(`Unknown language: "${languageName}"`); // Throw error for unknown language
    }

    const md = compileLanguage(language); // Compile the language definition
    let result = ''; // Initialize result variable
    let top = continuation || md; // Set top mode
    const emitter = new options .__emitter(options); // Create a new emitter
    let modeBuffer = ''; // Initialize mode buffer
    let relevance = 0; // Initialize relevance score
    let index = 0; // Initialize index

    try {
      while (true) {
        const match = top.matcher.exec(codeToHighlight); // Execute the matcher
        if (!match) break; // Break if no match found

        const textBeforeMatch = codeToHighlight.substring(index, match.index); // Get text before match
        processLexeme(textBeforeMatch, match); // Process the lexeme
        index = match.index + match[0].length; // Move index forward
      }
    } catch (err) {
      handleHighlightError(err, codeToHighlight, index); // Handle highlighting errors
    }

    emitter.finalize(); // Finalize the emitter
    return {
      language: languageName,
      value: emitter.toHTML(), // Convert to HTML
      relevance,
      illegal: false,
      _emitter: emitter,
      _top: top
    };
  }

  // Function to handle highlighting errors
  function handleHighlightError(err, codeToHighlight, index) {
    if (err.message.includes('Illegal')) {
      return {
        language: languageName,
        value: escape(codeToHighlight), // Escape the code
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
      throw err; // Rethrow the error
    }
  }

  // Function to process lexemes
  function processLexeme(textBeforeMatch, match) {
    modeBuffer += textBeforeMatch; // Add to mode buffer

    if (match.type === "begin") {
      startNewMode(match.rule, match); // Start a new mode
    } else if (match.type === "end") {
      endOfMode(top, match, codeToHighlight.substring(match.index)); // End the current mode
    }
  }

  // Function to start a new mode
  function startNewMode(newMode, match) {
    top = Object.create(newMode, { parent: { value: top } }); // Create a new mode
  }

  // Function to end the current mode
  function endOfMode(mode, match, matchPlusRemainder) {
    if (mode.endRe.test(matchPlusRemainder)) {
      top = mode.parent; // Go back to parent mode
    }
  }

  // Function to detect language from class names
  function blockLanguage(block) {
    let classes = block.className + ' '; // Get class names

    classes += block.parentNode ? block.parentNode.className : ''; // Add parent class names

    const match = options.languageDetectRe.exec(classes); // Detect language from class names
    if (match) {
      const language = getLanguage(match[1]); // Get the language object
      if (!language) {
        logger.warn(LANGUAGE_NOT_FOUND.replace("{}", match[1])); // Log warning for missing language
        logger.warn("Falling back to no-highlight mode for this block.", block); // Log warning for fallback
      }
      return language ? match[1] : 'no-highlight'; // Return language name or 'no-highlight'
    }

    return classes
      .split(/\s+/)
      .find((_class) => shouldNotHighlight(_class) || getLanguage(_class)); // Find language from class names
  }

  // Function to highlight an element
  function highlightElement(element) {
    let node = null; // Initialize node variable
    const language = blockLanguage(element); // Detect language from class names

    if (shouldNotHighlight(language)) return; // Skip highlighting if language is not supported

    fire("before:highlightElement", { el: element, language }); // Trigger event before highlighting

    if (element.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."); // Log warning for unescaped HTML
        console.warn("https://github.com/highlightjs/highlight.js/wiki/security"); // Log warning for security
        console.warn("The element with unescaped HTML:"); // Log warning for element
        console.warn(element); // Log the element
      }
      if (options.throwUnescapedHTML) {
        const err = new HTMLInjectionError("One of your code blocks includes unescaped HTML.", element.innerHTML); // Create error for unescaped HTML
        throw err; // Throw the error
      }
    }

    node = element; // Assign node
    const text = node.textContent; // Get text content
    const result = language ? highlight(text, { language, ignoreIllegals: true }) : highlightAuto(text); // Highlight the text

    element.innerHTML = result.value; // Set the highlighted HTML
    element.dataset.highlighted = "yes"; // Mark the element as highlighted
    updateClassName(element, language, result.language); // Update the class names
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

    fire("after:highlightElement", { el: element, result, text }); // Trigger event after highlighting
  }

  // Function to update class names
  function updateClassName(element, currentLang, resultLang) {
    const language = (currentLang && aliases[currentLang]) || resultLang; // Get the language name

    element.classList.add("hljs"); // Add the hljs class
    element.classList.add(`language-${language}`); // Add the language class
  }

  // Function to highlight code automatically
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages); // Get the language subset
    const plaintext = justTextHighlightResult(code); // Get the plaintext result

    const results = languageSubset.filter(getLanguage).filter(autoDetection).map(name =>
      _highlight(name, code, false)
    );
    results.unshift(plaintext); // Add the plaintext result

    const sorted = results.sort((a, b) => {
      if (a.relevance !== b.relevance) return b.relevance - a.relevance; // Sort by relevance

      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }

      return 0;
    });

    const [best, secondBest] = sorted; // Get the best and second best results

    const result = best;
    result.secondBest = secondBest; // Set the second best result

    return result; // Return the best result
  }

  // Function to get a language object
  function getLanguage(name) {
    name = (name || '').toLowerCase(); // Normalize the language name
    return languages[name] || languages[aliases[name]]; // Get the language object
  }

  // Function to register a new programming language for highlighting
  function registerLanguage(languageName, languageDefinition) {
    let lang = null; // Initialize variable for language

    try {
      lang = languageDefinition(hljs); // Call the language definition function
    } catch (error) {
      logger.error("Language definition for '{}' could not be registered.".replace("{}", languageName)); // Log error for language registration
      if (!SAFE_MODE) { throw error; } else { logger.error(error); } // Rethrow error if not in safe mode
      lang = PLAINTEXT_LANGUAGE; // Fallback to plaintext if registration fails
    }

    languages[languageName] = lang; // Store the registered language
    lang.rawDefinition = languageDefinition.bind(null, hljs); // Bind the language definition

    if (lang.aliases) {
      registerAliases(lang.aliases, { languageName }); // Register aliases
    }
  }

  // Function to unregister a language
  function unregisterLanguage(languageName) {
    delete languages[languageName]; // Remove the language
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias]; // Remove the alias
      }
    }
  }

  // Function to list all registered languages
  function listLanguages() {
    return Object.keys(languages); // Return the list of languages
  }

  // Function to register aliases for a language
  function registerAliases(aliasList, { languageName }) {
    if (typeof aliasList === 'string') {
      aliasList = [aliasList]; // Convert to array if string
    }
    aliasList.forEach(alias => { aliases[alias.toLowerCase()] = languageName; }); // Register aliases
  }

  // Function to detect if a language should be autodetected
  function autoDetection(name) {
    const lang = getLanguage(name); // Get the language object
    return lang && !lang.disableAutodetect; // Check if autodetection is enabled
  }

  // Function to upgrade a plugin's API
  function upgradePluginAPI(plugin) {
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement "] = (data) => {
        plugin["before:highlightBlock"](Object.assign({ block: data.el }, data)); // Upgrade the plugin
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](Object.assign({ block: data.el }, data)); // Upgrade the plugin
      };
    }
  }

  // Function to add a plugin
  function addPlugin(plugin) {
    upgradePluginAPI(plugin); // Upgrade the plugin's API
    plugins.push(plugin); // Add the plugin
  }

  // Function to remove a plugin
  function removePlugin(plugin) {
    const index = plugins.indexOf(plugin); // Find the plugin index
    if (index !== -1) {
      plugins.splice(index, 1); // Remove the plugin
    }
  }

  // Function to trigger an event
  function fire(event, args) {
    const cb = event; // Get the callback
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args); // Trigger the event
      }
    });
  }

  // Function to highlight all code blocks on the page
  function highlightAll() {
    if (document.readyState === "loading") {
      window.addEventListener('DOMContentLoaded', highlightAll, false); // Wait for the DOM to load
      return;
    }

    const blocks = document.querySelectorAll(options.cssSelector); // Select all code blocks
    blocks.forEach(highlightElement); // Highlight each block
  }

  // Function to deprecate the highlightBlock function
  function deprecateHighlightBlock(el) {
    logger.deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0"); // Log deprecation warning
    logger.deprecated("10.7.0", "Please use highlightElement now."); // Log deprecation warning

    return highlightElement(el); // Call the highlightElement function
  }

  // Assign the highlighter functions to the hljs object
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

  // Set the debug mode
  hljs.debugMode = function() { SAFE_MODE = false; };
  hljs.safeMode = function() { SAFE_MODE = true; };
  hljs.versionString = packageJSON.version;

  // Assign the regex utilities
  hljs.regex = {
    concat: regex.concat,
    lookahead: regex.lookahead,
    either: regex.either,
    optional: regex.optional,
    anyNumberOfTimes: regex.anyNumberOfTimes
  };

  // Freeze the MODES object
  for (const key in MODES) {
    if (typeof MODES[key] === "object") {
      deepFreeze(MODES[key]);
    }
  }

  // Assign the MODES object to the hljs object
  Object.assign(hljs, MODES);

  return hljs; // Return the highlighter instance
};

// Create a new highlighter instance
const highlight = HLJS({});

// Create a new instance of the highlighter
highlight.newInstance = () => HLJS({});

// Export the highlighter instance
export default highlight;
