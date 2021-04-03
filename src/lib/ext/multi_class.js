/* eslint-disable no-throw-literal */
import * as logger from "./lib/logger.js";
import * as regex from "../regex.js";

const MultiClassError = new Error();

/**
 *
 * @param {CompiledMode} mode
 */
export function MultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;

  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    logger.error("skip, excludeBegin, returnBegin not compatible with multi-class")
    throw MultiClassError;
  }

  if (typeof mode.className !== "object") {
    logger.error("className must be object");
    throw MultiClassError;
  }

  const items = mode.begin.map(x => regex.concat("(", x, ")"));
  mode.begin = regex.concat(...items);
  mode.isMultiClass = true;
}
