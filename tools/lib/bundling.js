const rollup = require('rollup')
const crypto = require("crypto");

async function rollupCode(inputOptions, outputOptions) {
  const output = await generate(inputOptions, outputOptions)
  return output[0].code;
}

async function generate(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions).catch(err => console.log(err));
  const { output } = await bundle.generate(outputOptions);
  return output;
}

async function rollupWrite(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions).catch(err => console.log(err));
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

function sha384(contents) {
  const hash = crypto.createHash('sha384');
  const data = hash.update(contents, 'utf-8');
  const gen_hash = data.digest('base64');
  return `sha384-${gen_hash}`;
}

module.exports = { rollupWrite, rollupCode, sha384 };
