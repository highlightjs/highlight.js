const { basename } = require('path');
const glob = require('glob');

// if a language name starts with a number, we convert it to a textual representation
// as variables in JS cannot start with numbers:
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const allLangs = glob.sync("./src/languages/*.js");

/**
 * @param {string} str
 */
const camelcasify = (str) => {
  while (str.match(/-/)) {
    str = str.slice(0, str.indexOf('-')) + str[str.indexOf('-') + 1].toUpperCase() + str.slice(str.indexOf('-') + 2);
  }
  return str;
};

function generateESLanguageIndex() {
  let indexContents = '';
  allLangs.forEach(langDef => {
    const langPath = `./${basename(langDef)}`;
    let langExport = basename(langDef, '.js');
    if (!isNaN(langExport[0])) langExport = `${numbers[parseInt(langExport[0])]}-${langExport.slice(1)}`;
    const exportLine = `export { default as ${camelcasify(langExport)} } from '${langPath}';\n`;
    indexContents += exportLine;
  });
  return indexContents;
}

function generateCJSLanguageIndex() {
  let indexContents = 'module.exports = {\n';
  allLangs.forEach((langDef, i) => {
    const langPath = `./${basename(langDef)}`;
    let langExport = basename(langDef, '.js');
    if (!isNaN(langExport[0])) langExport = `${numbers[parseInt(langExport[0])]}-${langExport.slice(1)}`;
    const exportLine = `  ${camelcasify(langExport)}: require('${langPath}')${i === allLangs.length - 1 ? '' : ','}\n`;
    indexContents += exportLine;
  });
  indexContents += '};\n';
  return indexContents;
}

module.exports = {
  generateCJSLanguageIndex,
  generateESLanguageIndex
};
