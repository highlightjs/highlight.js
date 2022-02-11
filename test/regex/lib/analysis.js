/**
 * Returns whether the given element will always have zero width meaning that it doesn't consume characters.
 *
 * @param {Element} element
 * @returns {boolean}
 */
function isAlwaysZeroWidth(element) {
  switch (element.type) {
    case 'Assertion':
      // assertions == ^, $, \b, lookarounds
      return true;
    case 'Quantifier':
      return element.max === 0 || isAlwaysZeroWidth(element.element);
    case 'CapturingGroup':
    case 'Group':
      // every element in every alternative has to be of zero length
      return element.alternatives.every(alt => alt.elements.every(isAlwaysZeroWidth));
    case 'Backreference':
      // on if the group referred to is of zero length
      return isAlwaysZeroWidth(element.resolved);
    default:
      return false; // what's left are characters
  }
}

/**
 * Returns whether the given element will always at the start of the whole match.
 *
 * @param {Element} element
 * @returns {boolean}
 */
function isFirstMatch(element) {
  const parent = element.parent;
  switch (parent.type) {
    case 'Alternative':
      // all elements before this element have to of zero length
      if (!parent.elements.slice(0, parent.elements.indexOf(element)).every(isAlwaysZeroWidth)) {
        return false;
      }
      const grandParent = parent.parent;
      if (grandParent.type === 'Pattern') {
        return true;
      } else {
        return isFirstMatch(grandParent);
      }

    case 'Quantifier':
      if (parent.max >= 2) {
        return false;
      } else {
        return isFirstMatch(parent);
      }

    default:
      throw new Error(`Internal error: The given node should not be a '${element.type}'.`);
  }
}

/**
 * Returns whether the given node either is or is a child of what is effectively a Kleene star.
 *
 * @param {import("regexpp/ast").Node} node
 * @returns {boolean}
 */
function underAStar(node) {
  if (node.type === "Quantifier" && node.max > 10) {
    return true;
  } else if (node.parent) {
    return underAStar(node.parent);
  } else {
    return false;
  }
}

/**
 * @param {Iterable<T>} iter
 * @returns {T | undefined}
 * @template T
 */
function firstOf(iter) {
  for (const item of iter) {
    return item;
  }
  return undefined;
}

module.exports = { firstOf, underAStar, isFirstMatch, isAlwaysZeroWidth};
