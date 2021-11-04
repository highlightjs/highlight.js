#!/usr/bin/env node
const { styles, getStyleContrasts, updateJson } = require('../test/contrast');
const minContrasts = require('../test/contrast/min_contrasts.json');

for (const filename of styles) {
  const contrasts = getStyleContrasts(filename);
  const minContrast = Math.min(...contrasts.map(c => c.contrast));

  if (filename in minContrasts && minContrast < minContrasts[filename]) {
    if (process.argv[2] !== '-f') {
      console.warn(`aborting because minimum contrast decreased for style ${filename}, ${minContrast} < ${minContrasts[filename]}, rerun with -f if this is intentional`);
      process.exit(1);
    }
  }
}
updateJson();
