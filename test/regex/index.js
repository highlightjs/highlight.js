'use strict';

const hljs = require('../../build');
const { BFS, parseRegex, regexFor } = require('./lib/util.js');
const { visitRegExpAST } = require('regexpp');
const { JS, Words, NFA, CharSet } = require('refa');
const { firstOf, underAStar, isFirstMatch, isAlwaysZeroWidth} = require('./lib/analysis.js');

hljs.debugMode();

/**
 * A map for a regex pattern to whether or not it it vulnerable to exponential backtracking.
 *
 * @type {Record<string, boolean>}
 */
const expBacktrackingCache = {};

/**
 * A map for a regex pattern to whether or not it it vulnerable to polynomial backtracking.
 *
 * @type {Record<string, boolean>}
 */
const polyBacktrackingCache = {};

function retrieveRules(language, { name }) {
  // first we need to get the language compiled so we have
  // access to the raw regex
  hljs.highlight(name, "");
  return regexFor(language, { context: name, depth: 0 });
}

function forEachPattern(list, fn) {
  const errors = [];
  for (const rule of list) {
    // console.log(rule)
    const ast = parseRegex(rule.re);
    fn({
      ast,
      pattern: rule.re,
      rulePath: rule.path,
      reportError: message => errors.push(message)
    });
  };
  if (errors.length > 0) {
    throw new Error(errors.map(e => String(e.message || e)).join('\n\n'));
  }
}

function testLanguage(languageName) {
  const language = hljs.getLanguage(languageName);
  const rules = retrieveRules(language, { name: languageName });
  count += rules.length;
  describe(languageName, function() {
    it("have a name", function() {
      language.name.should.not.equal(undefined);
    });

    // it('should not match the empty string', function () {
    //   forEachPattern(rules, ({ pattern, rulePath }) => {
    //     ''.should.not.match(pattern, `${rulePath}: ${pattern} should not match the empty string.\n\n` +
    //       `Patterns that do match the empty string can potentially cause infinitely many empty tokens. ` +
    //       `Make sure that all patterns always consume at least one character.`);
    //   });
    // });

    it(`have ${rules.length} regex matchers`, () => {} );

    it('should not use octal escapes', function() {
      forEachPattern(rules, ({ ast, rulePath, reportError }) => {
        visitRegExpAST(ast.pattern, {
          onCharacterEnter(node) {
            if (/^\\(?:[1-9]|\d{2,})$/.test(node.raw)) {
              reportError(`${rulePath}: Octal escape ${node.raw}.\n\n` +
                `Octal escapes can be confused with backreferences, so please do not use them.\n` +
                `To fix this, use a different escape method. ` +
                `Note that this could also be an invalid backreference, so be sure to carefully analyse the pattern.`);
            }
          }
        });
      });
    });

    it('should not cause exponential backtracking', function () {
      forEachPattern(rules, ({ pattern, ast, rulePath, reportError }) => {
        const patternStr = String(pattern);
        if (expBacktrackingCache[patternStr] === false) {
          // we know that the pattern won't cause exp backtracking because we checked before
          return;
        }

        const parser = JS.Parser.fromAst(ast);
        /**
         * Parses the given element and creates its NFA.
         *
         * @param {import("refa").JS.ParsableElement} element
         * @returns {NFA}
         */
        function toNFA(element, debug = false) {
          const { expression, maxCharacter } = parser.parseElement(element, {
            backreferences: "resolve",
            lookarounds: "disable",
          });
          return NFA.fromRegex(expression, { maxCharacter });
        }

        /**
         * Checks whether the alternatives of the given node are disjoint. If the alternatives are not disjoint
         * and the give node is a descendant of an effective Kleene star, then an error will be thrown.
         *
         * @param {CapturingGroup | Group | LookaroundAssertion} node
         * @returns {void}
         */
        function checkDisjointAlternatives(node) {
          if (!underAStar(node) || node.alternatives.length < 2) {
            return;
          }

          const alternatives = node.alternatives;

          const total = toNFA(alternatives[0]);
          total.removeEmptyWord();
          for (let i = 1, l = alternatives.length; i < l; i++) {
            const a = alternatives[i];
            const current = toNFA(a);
            current.removeEmptyWord();

            if (!total.isDisjointWith(current)) {
              reportError(`${rulePath}: The alternative \`${a.raw}\` is not disjoint with at least one previous alternative.`
                + ` This will cause exponential backtracking.`
                + `\n\nTo fix this issue, you have to rewrite the ${node.type} \`${node.raw}\`.`
                + ` The goal is that all of its alternatives are disjoint.`
                + ` This means that if a (sub-)string is matched by the ${node.type}, then only one of its alternatives can match the (sub-)string.`
                + `\n\nExample: \`(?:[ab]|\\w|::)+\``
                + `\nThe alternatives of the group are not disjoint because the string "a" can be matched by both \`[ab]\` and \`\\w\`.`
                + ` In this example, the pattern by easily fixed because the \`[ab]\` is a subset of the \`\\w\`, so its enough to remove the \`[ab]\` alternative to get \`(?:\\w|::)+\` as the fixed pattern.`
                + `\nIn the real world, patterns can be a lot harder to fix.`
                + ` If you are trying to make the tests pass for a pull request but can\'t fix the issue yourself, then make the pull request (or commit) anyway.`
                + ` A maintainer will help you.`
                + `\n\nFull pattern:\n${pattern}`);
            } else if (i !== l - 1) {
              total.union(current);
            }
          }
        }

        visitRegExpAST(ast.pattern, {
          onCapturingGroupLeave: checkDisjointAlternatives,
          onGroupLeave: checkDisjointAlternatives,
          onAssertionLeave(node) {
            if (node.kind === "lookahead" || node.kind === "lookbehind") {
              checkDisjointAlternatives(node);
            }
          },

          onQuantifierLeave(node) {
            if (node.max < 10) {
              return; // not a star
            }
            if (node.element.type !== "CapturingGroup" && node.element.type !== "Group") {
              return; // not a group
            }

            // The idea here is the following:
            //
            // We have found a part `A*` of the regex (`A` is assumed to not accept the empty word). Let `I` be
            // the intersection of `A` and `A{2,}`. If `I` is not empty, then there exists a non-empty word `w`
            // that is accepted by both `A` and `A{2,}`. That means that there exists some `m>1` for which `w`
            // is accepted by `A{m}`.
            // This means that there are at least two ways `A*` can accept `w`. It can be accepted as `A` or as
            // `A{m}`. Hence there are at least 2^n ways for `A*` to accept the word `w{n}`. This is the main
            // requirement for exponential backtracking.
            //
            // This is actually only a crude approximation for the real analysis that would have to be done. We
            // would actually have to check the intersection `A{p}` and `A{p+1,}` for all p>0. However, in most
            // cases, the approximation is good enough.

            const nfa = toNFA(node.element, true);
            nfa.removeEmptyWord();
            const twoStar = nfa.copy();
            twoStar.quantify(2, Infinity);

            if (!nfa.isDisjointWith(twoStar)) {
              const example = Words.fromUnicodeToString(firstOf(NFA.intersectionWords(nfa, twoStar)));

              reportError(`${rulePath}: The quantifier \`${node.raw}\` ambiguous for all words ${JSON.stringify(example)}.repeat(n) for any n>1.`
                + ` This will cause exponential backtracking.`
                + `\n\nTo fix this issue, you have to rewrite the element (let's call it E) of the quantifier.`
                + ` The goal is modify E such that it is disjoint with repetitions of itself.`
                + ` This means that if a (sub-)string is matched by E, then it must not be possible for E{2}, E{3}, E{4}, etc. to match that (sub-)string.`
                + `\n\nExample: \`(?:\\w+|::)+\``
                + `\nThe problem lies in \`\\w+\` because \`\\w+\` and \`(?:\\w+){2}\` are not disjoint as the string "aa" is fully matched by both.`
                + ` In this example, the pattern by easily fixed by changing \`\\w+\` to \`\\w\`.`
                + `\nIn the real world, patterns can be a lot harder to fix.`
                + ` If you are trying to make the tests pass for a pull request but can\'t fix the issue yourself, then make the pull request (or commit) anyway.`
                + ` A maintainer will help you.`
                + `\n\nFull pattern:\n${pattern}`);
            }
          },
        });

        expBacktrackingCache[patternStr] = false;
      });
    });
    it('should not cause polynomial backtracking', function () {
      forEachPattern(rules, ({ pattern, ast, rulePath, reportError }) => {
        const patternStr = String(pattern);
        if (polyBacktrackingCache[patternStr] === false) {
          // we know that the pattern won't cause poly backtracking because we checked before
          return;
        }

        const EMPTY = ast.flags.unicode ? CharSet.empty(0x10FFFF) : CharSet.empty(0xFFFF);

        /**
         * @param {Node} node
         * @returns {CharSet}
         */
        function toCharSet(node) {
          switch (node.type) {
            case "Alternative": {
              if (node.elements.length === 1) {
                return toCharSet(node.elements[0]);
              }
              return EMPTY;
            }
            case "CapturingGroup":
            case "Group": {
              let total = EMPTY;
              for (const item of node.alternatives) {
                total = total.union(toCharSet(item));
              }
              return total;
            }
            case "Character":
              return JS.createCharSet([node.value], ast.flags);
            case "CharacterClass": {
              const value = JS.createCharSet(node.elements.map(x => {
                if (x.type === "CharacterSet") {
                  return x;
                } else if (x.type === "Character") {
                  return x.value;
                } else {
                  return { min: x.min.value, max: x.max.value };
                }
              }), ast.flags);
              if (node.negate) {
                return value.negate();
              } else {
                return value;
              }
            }
            case "CharacterSet":
              return JS.createCharSet([node], ast.flags);

            default:
              return EMPTY;
          }
        }

        /**
         * @param {Element} from
         * @returns {Element | null}
         */
        function getAfter(from) {
          const parent = from.parent;
          if (parent.type === "Quantifier") {
            return getAfter(parent);
          } else if (parent.type === "Alternative") {
            const index = parent.elements.indexOf(from);
            const after = parent.elements[index + 1];
            if (after) {
              return after;
            } else {
              const grandParent = parent.parent;
              if (grandParent.type === "Pattern") {
                return null;
              } else {
                return getAfter(grandParent);
              }
            }
          } else {
            throw Error("Unreachable");
          }
        }

        visitRegExpAST(ast.pattern, {
          onQuantifierLeave(node) {
            if (node.max !== Infinity) {
              return;
            }
            const char = toCharSet(node.element);
            tryReachUntil(getAfter(node), char, null);

            /**
             * @param {Quantifier} quantifier
             * @param {CharSet} char
             */
            function assertNoPoly(quantifier, char) {
              if (quantifier.max === Infinity) {
                const qChar = toCharSet(quantifier.element);
                if (qChar && !qChar.isDisjointWith(char)) {
                  const intersection = qChar.intersect(char);
                  const literal = JS.toLiteral({
                    type: "Concatenation",
                    elements: [
                      { type: "CharacterClass", characters: intersection }
                    ]
                  })
                  const lang = `/${literal.source}/${literal.flags}`;

                  const rangeStr = patternStr.substring(node.start + 1, quantifier.end + 1);
                  const rangeHighlight = `^${"~".repeat(node.end - node.start - 1)}${" ".repeat(quantifier.start - node.end)}^${"~".repeat(quantifier.end - quantifier.start - 1)}`;

                  reportError(`${rulePath}: Polynomial backtracking. By repeating any character that matches ${lang}, an attack string can be created.\n\n    ${rangeStr}\n    ${rangeHighlight}\n\nFull pattern:\n${patternStr}\n${" ".repeat(node.start + 1)}${rangeHighlight}`);
                }
              }
            }

            /**
             * @param {Element | null | undefined} element
             * @param {CharSet} char
             * @param {Element | null | undefined} until
             * @returns {CharSet}
             */
            function tryReachUntil(element, char, until) {
              if (!element || element == until || char.isEmpty) {
                return char;
              }

              const after = getAfter(element);

              if (element.type === "Quantifier") {
                assertNoPoly(element, char);
              }

              return tryReachUntil(after, goInto(element, after, char), until);
            }

            /**
             * @param {Element} element
             * @param {Element} after
             * @param {CharSet} char
             * @returns {CharSet}
             */
            function goInto(element, after, char) {
              switch (element.type) {
                case "Assertion": {
                  if (element.kind === "lookahead" || element.kind === "lookbehind") {
                    for (const alt of element.alternatives) {
                      if (alt.elements.length > 0) {
                        tryReachUntil(alt.elements[0], char, after);
                      }
                    }
                  }
                  return EMPTY;
                }
                case "Group":
                case "CapturingGroup": {
                  let total = EMPTY;
                  for (const alt of element.alternatives) {
                    if (alt.elements.length > 0) {
                      total = total.union(tryReachUntil(alt.elements[0], char, after));
                    } else {
                      total = char;
                    }
                  }
                  return total;
                }
                case "Character":
                case "CharacterClass":
                case "CharacterSet": {
                  return char.intersect(toCharSet(element));
                }
                case "Quantifier": {
                  if (element.min === 0) {
                    goInto(element.element, after, char);
                    return char;
                  } else {
                    return goInto(element.element, after, char);
                  }
                }
                default:
                  return EMPTY;
              }
            }
          },
        });

        polyBacktrackingCache[patternStr] = false;
      });
    });
  });
}

let count = 0;
let languages = hljs.listLanguages();
if (process.env.ONLY_LANG) {
  languages = [process.env.ONLY_LANG];
}

for (const language of languages) {
  testLanguage(language);
}

describe("COMBINED: All grammars", () => {
  it(`have ${count} total regex`, () => {});
});
