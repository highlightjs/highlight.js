/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/

/**
 * @type {Record<string, boolean>}
 */
const seenDeprecations = {};

/**
 * @param {string} message
 */
export const error = (message) => {
  console.error(message);
};

/**
 * @param {string} message
 * @param {any} args
 */
export const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};

/**
 * @param {string} message
 */
export const notice = (message) => {
  console.log(message);
};

/**
 * @param {string} version
 * @param {string} message
 */
export const deprecated = (version, message) => {
  if (seenDeprecations[`${version}/${message}`]) return;

  console.log(`Deprecated as of ${version}. ${message}`);
  seenDeprecations[`${version}/${message}`] = true;
};
