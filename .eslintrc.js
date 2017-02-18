module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'amd': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'indent': [
      'warn',
      2,
      { 'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 3 } }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'warn',
      'always'
    ],
    'no-constant-condition': [
      'warn'
    ]
  }
};
