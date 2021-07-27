const execSync = require('child_process').execSync;
const fs = require('fs');
const { performance } = require('perf_hooks');

const timeTest = (name, func) => {
  process.stdout.write(`Starting ${name}, building hljs ... `);
  // execSync('npm run build', {'cwd': '..'});
  process.stdout.write(` running ...`);
  let t0 = performance.now();
  func()
  var t1 = performance.now();
  console.log(` done! [${((t1 - t0) / 1000).toFixed(2)}s elapsed]`);
}

const oneLanguageMarkupTests = (lang) => {
  for (let i = 0; i < 100; i++) {
    execSync('npx mocha test/markup', {
      'cwd': '..',
      'env': Object.assign(
        process.env,
        {'ONLY_LANGUAGES': JSON.stringify([lang])}
      )
    });
  }
}

const oneLanguageCheckAutoDetect = (lang) => {
  for (let i = 0; i < 100; i++) {
    execSync('node checkAutoDetect.js', {
      'env': Object.assign(
        process.env,
        {'ONLY_LANGUAGES': JSON.stringify([lang])}
      )
    });
  }
}

const globalCheckAutoDetect = () => {
  for (let i = 0; i < 10; i++) {
    execSync('node checkAutoDetect.js');
  }
}

const highlightFile = (lang) => {
  const source = fs.readFileSync(`./sample_files/${lang}.txt`, { encoding:'utf8' });
  const hljs = require('../build');
  for (let i = 0; i < 2000; i++) {
    hljs.highlight(source, {'language': lang});
  }
}

const main = (lang, fileURL) => {
  timeTest(`${lang}-only markup tests`, () => oneLanguageMarkupTests(lang));
  timeTest(`${lang}-only checkAutoDetect`, () => oneLanguageCheckAutoDetect(lang));
  timeTest(`global checkAutoDetect`, globalCheckAutoDetect);
  timeTest(`highlight large file`, () => highlightFile(lang));
}

main('python')