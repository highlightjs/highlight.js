'use strict';

import autoDetection from './autoDetection.mjs'
import beginKeywords from './beginKeywords.mjs'
import binaryNumber from './binaryNumber.mjs'
import cNumber from './cNumber.mjs'
import getLanguage from './getLanguage.mjs'
import highlight from './highlight.mjs'
import ident from './ident.mjs'
import keywords from './keywords.mjs'
import number from './number.mjs'
import registerAlias from './registerAlias.mjs'
import unregisterLanguage from './unregisterLanguage.mjs'
import starters from './starters.mjs'
import underscoreIdent from './underscoreIdent.mjs'
import multiClassMatch from './multiClassMatch.mjs'
import normalizeLineEncoding from './normalizeLineEncoding.mjs'

describe('api', function() {
  autoDetection.apply(this);
  beginKeywords.apply(this);
  binaryNumber.apply(this);
  cNumber.apply(this);
  getLanguage.apply(this);
  highlight.apply(this);
  ident.apply(this);
  keywords.apply(this);
  number.apply(this);
  registerAlias.apply(this);
  unregisterLanguage.apply(this);
  starters.apply(this);
  underscoreIdent.apply(this);
  multiClassMatch.apply(this);
  normalizeLineEncoding.apply(this);
});
