const fs = require('fs');
const path = require('path');
const contrast = require('wcag-contrast');

const IGNORED_STYLES = [
  'grayscale.css' // uses background images without fallback colors
];

exports.styles = fs.readdirSync("./src/styles/").filter(f => f.endsWith('.css') && !IGNORED_STYLES.includes(f));

function parseColor(cssValue) {
  if (cssValue.includes('inherit')) {
    return null;
  }
  if (cssValue.includes('highlight')) {
    // used in the a11y themes for -ms-high-contrast
    return null;
  }
  const match = /#([0-9a-fA-F]{3,6})\b/.exec(cssValue);
  if (!match) {
    throw new Error(`expected hexadecimal color without transparency in "${cssValue}"`);
  }
  return match[1];
}

exports.updateJson = function() {
  const data = {};
  for (const filename of exports.styles) {
    data[filename] = Math.min(...exports.getStyleContrasts(filename).map(c => c.contrast));
  }
  fs.writeFileSync(path.join(__dirname, 'min_contrasts.json'), JSON.stringify(data, null, 2));
};

/** Rounds the given number to 1 decimal place. */
function round(num) {
  return Math.round(num * 10) / 10;
}

function parseColors(cssRule) {
  const bgColor = /background(?:-color)?:([^;]*)/.exec(cssRule);
  const fgColor = /\scolor:([^;]*)/.exec(cssRule);
  return { bg: bgColor ? parseColor(bgColor[1]) : null, fg: fgColor ? parseColor(fgColor[1]) : null };
}

exports.getStyleContrasts = function(filename) {
  const text = fs.readFileSync('./src/styles/' + filename, { encoding: 'utf-8' });
  const colorRules = [];
  for (const match of text.matchAll(/{[^}]*/g)) {
    try {
      const colors = parseColors(match[0]);
      if (colors.bg || colors.fg) {
        colorRules.push(colors);
      }
    } catch (err) {
      err.message = `${filename}: ${err.message}`;
      throw err;
    }
  }
  const defaultColors = colorRules.shift();
  const contrasts = [{ color: defaultColors, contrast: round(contrast.hex(defaultColors.fg, defaultColors.bg)) }];
  for (const color of colorRules) {
    contrasts.push({
      color,
      contrast: round(contrast.hex(color.fg || defaultColors.fg, color.bg || defaultColors.bg))
    });
  }
  return contrasts;
};

