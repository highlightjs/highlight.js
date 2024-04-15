#!/usr/bin/env node

/*
 * Input: path to 2 build directories to compare.
 * Output: markdown report of size changes.
 */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const glob = require("glob");

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0 B";
  }

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * The size, in bytes, of the given file after gzip.
 */
function computedFile(dir, filePath) {
  const pathToFile = path.join(dir, filePath);
  const str = fs.readFileSync(pathToFile);
  return zlib.gzipSync(str).length;
}

/**
 * Returns list of minified files in the given directory.
 */
async function minifiedFiles(dir) {
  return await new Promise((res, rej) => {
    glob(dir + "/**/*.min.{js,css}", {}, (err, files) => {
      if (err) {
        rej(err);
      } else {
        res(files.map((f) => f.replace(dir + "/", "")));
      }
    });
  });
}

/**
 * Returns object of changes between the given lists of strings.
 */
function itemChanges(baseList, newList) {
  const baseSet = new Set(baseList);
  const newSet = new Set(newList);

  let added = [];
  for (const str of newList) {
    if (!baseSet.has(str)) {
      added.push(str);
    }
  }

  let changed = [];
  let removed = [];
  for (const str of baseList) {
    newSet.has(str) ? changed.push(str) : removed.push(str);
  }

  return {
    added,
    changed,
    removed,
  };
}

function reportHeader() {
  return (
    "# Build Size Report\n\n" +
    "Changes to minified artifacts in `/build`, after **gzip** compression."
  );
}

function reportAddedFilesSection(_base, pr, addedFiles) {
  let md = "";
  const maybeS = addedFiles.length === 1 ? "" : "s";
  md += `## ${addedFiles.length} Added File${maybeS}\n\n`;
  md += "<details>\n";
  md += "<summary>View Changes</summary>\n\n";
  md += "| file | size |\n";
  md += "| --- | --- |\n";
  for (const file of addedFiles) {
    const computedSize = computedFile(pr, file);
    md += `| ${file} | +${formatBytes(computedSize)} |\n`;
  }
  md += "\n";
  md += "</details>\n";
  return md;
}

function reportRemovedFilesSection(base, _pr, removedFiles) {
  let md = "";
  const maybeS = removedFiles.length === 1 ? "" : "s";
  md += `## ${removedFiles.length} Removed File${maybeS}\n\n`;
  md += "<details>\n";
  md += "<summary>View Changes</summary>\n\n";
  md += "| file | size |\n";
  md += "| --- | --- |\n";
  for (const file of removedFiles) {
    const computedSize = computedFile(base, file);
    md += `| ${file} | -${formatBytes(computedSize)} |\n`;
  }
  md += "\n";
  md += "</details>\n";
  return md;
}

function reportChangedFilesSection(base, pr, changedFiles) {
  let md = "";
  let numFilesChanged = 0;
  let combinedSizeChange = 0;
  let sizeChangeMd = "| file | base | pr | diff |\n";
  sizeChangeMd += "| --- | --- | --- | --- |\n";
  for (const file of changedFiles) {
    const computedBase = computedFile(base, file);
    const computedPR = computedFile(pr, file);
    const diff = computedPR - computedBase;
    if (diff !== 0) {
      combinedSizeChange += diff;
      numFilesChanged += 1;
      const sign = diff >= 0 ? "+" : "";
      sizeChangeMd += `| ${file} | ${formatBytes(computedBase)} | ${formatBytes(
        computedPR
      )} | ${sign}${formatBytes(diff)} |\n`;
    }
  }

  if (numFilesChanged > 0) {
    const maybeS = numFilesChanged === 1 ? "" : "s";
    const sign = combinedSizeChange >= 0 ? "+" : "";
    md += `## ${numFilesChanged} file${maybeS} changed\n`;
    md += `Total change ${sign}${formatBytes(combinedSizeChange)}\n\n`;
    md += "<details>\n";
    md += "<summary>View Changes</summary>\n\n";
    md += sizeChangeMd;
    md += "\n";
    md += "</details>\n";
  } else {
    md += "## No changes\n";
    md += "No existing files changed.\n";
  }

  return md;
}

/**
 * Returns markdown report of size differences.
 */
async function createReport() {
  const [base, pr] = process.argv.slice(2);
  const baseFiles = await minifiedFiles(base);
  const prFiles = await minifiedFiles(pr);

  const {
    added: addedFiles,
    removed: removedFiles,
    changed: changedFiles,
  } = itemChanges(baseFiles, prFiles);

  let md = reportHeader();
  md += "\n\n";

  if (addedFiles.length > 0) {
    md += reportAddedFilesSection(base, pr, addedFiles);
    md += "\n";
  }

  if (removedFiles.length > 0) {
    md += reportRemovedFilesSection(base, pr, removedFiles);
    md += "\n";
  }

  md += reportChangedFilesSection(base, pr, changedFiles);

  return md;
}

(async () => {
  console.log(await createReport());
})();
