import { promises as fs } from "fs";
const { readFile } = fs;
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Build a path relative to `test/`
export const buildPath = function() {
  const args  = [...arguments],
        paths = [__dirname].concat(args);

  return path.join.apply(this, paths);
};

export const expectedFile = (filename, encoding, actual) => {
  return readFile(filename, encoding)
    .then(expected => actual.trim().should.equal(expected.trim()));
};

export const setupFile = (filename, encoding, that, testHTML) => {
  return readFile(filename, encoding)
    .then(expected => {
      that.expected = expected.trim();
      that.blocks   = [...testHTML].map(x => x.innerHTML);
    });
};
