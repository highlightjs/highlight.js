#!/usr/bin/env node

/*
 * Input: path to 2 build directories to compare.
 * Output: markdown report of size changes.
 */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const glob = require("glob");

// Utility to format bytes into human-readable sizes
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 B";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Returns the size of a given file after gzip compression
function computeFileSize(dir, filePath) {
  try {
    const fileContent = fs.readFileSync(path.join(dir, filePath));
    return zlib.gzipSync(fileContent).length;
  } catch (error) {
    console.error(`Error reading/compressing file: ${filePath}`, error);
    return 0;
  }
}

// Returns list of minified .js and .css files in a directory
async function getMinifiedFiles(dir) {
  return new Promise((resolve, reject) => {
    glob(`${dir}/**/*.min.{js,css}`, {}, (err, files) => {
      if (err) {
        return reject(err);
      }
      resolve(files.map(file => file.replace(`${dir}/`, "")));
    });
  });
}

// Returns changes (added, removed, modified) between two file lists
function compareFiles(baseFiles, newFiles) {
  const baseSet = new Set(baseFiles);
  const newSet = new Set(newFiles);

  const added = newFiles.filter(file => !baseSet.has(file));
  const removed = baseFiles.filter(file => !newSet.has(file));
  const changed = baseFiles.filter(file => newSet.has(file));

  return { added, removed, changed };
}

// Markdown report generation functions
function generateReportHeader() {
  return "# Build Size Report\n\n" + 
         "Changes to minified artifacts in `/build`, after **gzip** compression.";
}

function generateAddedFilesReport(prDir, addedFiles) {
  if (!addedFiles.length) return "";

  const details = addedFiles.map(file => {
    const size = formatBytes(computeFileSize(prDir, file));
    return `| ${file} | +${size} |`;
  }).join("\n");

  return `
## ${addedFiles.length} Added File${addedFiles.length > 1 ? 's' : ''}

<details>
<summary>View Changes</summary>

| file | size |
| --- | --- |
${details}
</details>
`;
}

function generateRemovedFilesReport(baseDir, removedFiles) {
  if (!removedFiles.length) return "";

  const details = removedFiles.map(file => {
    const size = formatBytes(computeFileSize(baseDir, file));
    return `| ${file} | -${size} |`;
  }).join("\n");

  return `
## ${removedFiles.length} Removed File${removedFiles.length > 1 ? 's' : ''}

<details>
<summary>View Changes</summary>

| file | size |
| --- | --- |
${details}
</details>
`;
}

function generateChangedFilesReport(baseDir, prDir, changedFiles) {
  if (!changedFiles.length) return "## No changes\nNo existing files changed.\n";

  let totalSizeChange = 0;
  const details = changedFiles.map(file => {
    const baseSize = computeFileSize(baseDir, file);
    const prSize = computeFileSize(prDir, file);
    const sizeDiff = prSize - baseSize;
    totalSizeChange += sizeDiff;

    return `| ${file} | ${formatBytes(baseSize)} | ${formatBytes(prSize)} | ${sizeDiff >= 0 ? '+' : ''}${formatBytes(sizeDiff)} |`;
  }).join("\n");

  return `
## ${changedFiles.length} File${changedFiles.length > 1 ? 's' : ''} Changed
Total change: ${totalSizeChange >= 0 ? '+' : ''}${formatBytes(totalSizeChange)}

<details>
<summary>View Changes</summary>

| file | base | pr | diff |
| --- | --- | --- | --- |
${details}
</details>
`;
}

// Main function to generate the report
async function createReport() {
  const [baseDir, prDir] = process.argv.slice(2);

  try {
    const baseFiles = await getMinifiedFiles(baseDir);
    const prFiles = await getMinifiedFiles(prDir);
    const { added, removed, changed } = compareFiles(baseFiles, prFiles);

    let report = generateReportHeader() + "\n\n";
    report += generateAddedFilesReport(prDir, added);
    report += generateRemovedFilesReport(baseDir, removed);
    report += generateChangedFilesReport(baseDir, prDir, changed);

    console.log(report);
  } catch (error) {
    console.error("Error generating report:", error);
  }
}

// Run the script
(async () => {
  await createReport();
})();
