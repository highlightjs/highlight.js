const execSync = require('child_process').execSync;
const fs = require('fs');
const { performance } = require('perf_hooks');

const build = () => {
  console.log(`Starting perf tests, building hljs ... `);
  execSync('npm run build', {
    'cwd': '.',
    'env': Object.assign(
      process.env
    )
  });
};

const timeTest = (name, func) => {
  process.stdout.write(` running ${name}...`);
  let t0 = performance.now();
  func()
  var t1 = performance.now();
  console.log(` done! [${((t1 - t0) / 1000).toFixed(2)}s elapsed]`);
}

const oneLanguageMarkupTests = (lang) => {
  for (let i = 0; i < 50; i++) {
    execSync('npx mocha ./test/markup', {
      'cwd': '.',
      'env': Object.assign(
        process.env,
        {'ONLY_LANGUAGES': JSON.stringify([lang])}
      )
    });
  }
}

const oneLanguageCheckAutoDetect = (lang) => {
  for (let i = 0; i < 50; i++) {
    execSync('node ./tools/checkAutoDetect.js', {
      'env': Object.assign(
        process.env,
        {'ONLY_LANGUAGES': JSON.stringify([lang])}
      )
    });
  }
}

const globalCheckAutoDetect = () => {
  for (let i = 0; i < 5; i++) {
    execSync('node ./tools/checkAutoDetect.js');
  }
}

const highlightFile = (lang) => {
  const source = fs.readFileSync(`./tools/sample_files/${lang}.txt`, { encoding:'utf8' });
  const hljs = require('../build');
  for (let i = 0; i < 2000; i++) {
    hljs.highlight(source, {'language': lang});
  }
}

const main = (lang, fileURL) => {
  build();
  timeTest(`global checkAutoDetect`, globalCheckAutoDetect);
  timeTest(`${lang}-only markup tests`, () => oneLanguageMarkupTests(lang));
  timeTest(`${lang}-only checkAutoDetect`, () => oneLanguageCheckAutoDetect(lang));
  timeTest(`highlight large file`, () => highlightFile(lang));
}

main('python')
