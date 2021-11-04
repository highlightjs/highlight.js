const { styles, getStyleContrasts } = require('.');

it('style contrast', function() {
  const minContrasts = require('./min_contrasts.json');
  for (const filename of styles) {
    const contrasts = getStyleContrasts(filename);
    const minContrast = Math.min(...contrasts.map(c => c.contrast));

    if (!(filename in minContrasts)) {
      throw Error(`found a new style ${filename}, please run tools/updateContrasts.js`);
    } else if (minContrast < minContrasts[filename]) {
      throw Error(`minimum contrast decreased for style ${filename} (${minContrast} < ${minContrasts[filename]})\n`
        + ' if this is intentional please run tools/updateContrasts.js -f');
    } else if (minContrast > minContrasts[filename]) {
      throw Error(`congrats, you improved the minimum contrast of ${filename}, please run tools/updateContrasts.js`);
    }
  }
});
