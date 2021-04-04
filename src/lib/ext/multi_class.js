/* eslint-disable no-throw-literal */
import * as regex from "../regex.js";

const MultiClassError = new Error();

/**
 *
 * @param {CompiledMode} mode
 */
export function MultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;

  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    console.error("skip, excludeBegin, returnBegin not compatible with multi-class")
    throw MultiClassError;
  }

  if (typeof mode.className !== "object") {
    console.error("className must be object or array");
    throw MultiClassError;
  }

  const items = mode.begin.map(x => regex.concat("(", x, ")"));
  mode.begin = regex.concat(...items);
  mode.isMultiClass = true;

}
