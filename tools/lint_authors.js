const fs = require('fs');
const path = require('path');

const authorsRegex = /^-[ ].+((?:<[\w.-]+@[\w.-]+>)|(?:\(https?:\/\/[^)]+\)))/;
const authorsFile = path.resolve(__dirname, '..', 'AUTHORS.txt');
const rawContents = fs.readFileSync(authorsFile, 'utf-8').split('\n');

let errorCount = 0;

rawContents.forEach((line, lineNo) => {
  if (line.substring(0, 1) !== '-') {
    return;
  }

  if (!authorsRegex.test(line)) {
    errorCount++;

    console.log(`AUTHORS.txt:${lineNo + 1} does not match expected format`);
  }
});

if (errorCount > 0) {
  console.log('');
  console.log('Expected formats:');
  console.log('');
  console.log('- First Name <email@domain.com>');
  console.log('- First Name (https://example.com)');
}

process.exit(errorCount > 0);
