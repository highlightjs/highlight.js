const rollup = require('rollup')

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

module.exports = { rollupWrite, rollupCode };
