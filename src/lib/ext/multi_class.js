/* eslint-disable no-throw-literal */
import * as logger from "../../lib/logger.js";
import * as regex from "../regex.js";

const MultiClassError = new Error();

/**
 * Renumbers labeled scope names to account for additional inner match
 * groups that otherwise would break everything.
 *
 * Lets say we 3 match scopes:
 *
 *   { 1 => ..., 2 => ..., 3 => ... }
 *
 * So what we need is a clean match like this:
 *
 *   (a)(b)(c) => [ "a", "b", "c" ]
 *
 * But this falls apart with inner match groups:
 *
 * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
 *
 * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
 * What needs to happen is the numbers are remapped:
 *
 *   { 1 => ..., 2 => ..., 5 => ... }
 *
 * We also need to know that the ONLY groups that should be output
 * are 1, 2, and 5.  This function handles this behavior.
 *
 * @param {CompiledMode} mode
 * @param {Array<RegExp>} regexes
 */
function remapScopeNames(mode, regexes) {
  let offset = 0;
  const scopeNames = mode.scope;
  /** @type Record<number,boolean> */
  const emit = {};
  /** @type Record<number,string|true> */
  const positions = {};

  for (let i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += regex.countMatchGroups(regexes[i - 1]);
  }
  // we use _emit to keep track of which match groups are "top-level" to avoid double
  // output from inside match groups
  mode._emit = emit;
  mode.scope = positions;
}

/**
 * @param {CompiledMode} mode
 */
export function MultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;

  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    logger.error("skip, excludeBegin, returnBegin not compatible with multi-class");
    throw MultiClassError;
  }

  if (typeof mode.scope !== "object" || mode.scope == null) {
    logger.error("scope/className must be object");
    throw MultiClassError;
  }

  const matchers = mode.begin;
  remapScopeNames(mode, matchers);
  mode.begin = regex._rewriteBackreferences(mode.begin, { joinWith: "" });
  mode.isMultiClass = true;
}
