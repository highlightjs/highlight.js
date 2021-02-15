'use strict';

describe('hljs', async function() {
  await import('./look-ahead-end-matchers.js');
  await import('./resume-scan.js');
  await import('./reuse-endsWithParent.js');
  await import('./should-not-destroyData.js');
  await import('./compiler-extensions.js');
});
