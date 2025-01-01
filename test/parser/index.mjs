'use strict';

import lookAheadEndMatchers from './look-ahead-end-matchers.mjs';
import resumeScan from './resume-scan.mjs';
import reuseEndsWithParent from './reuse-endsWithParent.mjs';
import shouldNotDestroyData from './should-not-destroyData.mjs';
import compilerExtensions from './compiler-extensions.mjs';
import beginEndScope from './beginEndScope.mjs';

describe('hljs', function() {
  describe('look-ahead end matchers', lookAheadEndMatchers.bind(this));
  describe('resume scanning', resumeScan.bind(this));
  describe('ends with parent', reuseEndsWithParent.bind(this));
  describe('should not destroy data', shouldNotDestroyData.bind(this));
  // not quite ready to become a plugin yet, so these hooks
  // have been removed and we're skipping this test for now
  describe.skip('compiler extensions', compilerExtensions.bind(this));
  describe('beginScope and endScope', beginEndScope.bind(this));
});
