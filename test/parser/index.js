'use strict';

const should = require('should');

describe('hljs', function() {
  require('./look-ahead-end-matchers');
  require('./resume-scan');
  require('./reuse-endsWithParent');
  require('./should-not-destroyData');
  require('./compiler-extensions');
  require('./max_keyword_hits');
});
