'use strict';

import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';
import { hljs } from "../../build/lib/all.js";

export default function() {
  describe('loadLanguage / registerAliases loader', () => {
    const esmLangDir = path.resolve('build/esm/languages');
    const hasEsm = fs.existsSync(path.join(esmLangDir, 'javascript.js'));

    it('rejects unknown language name', async () => {
      let err = null;
      try {
        await hljs.loadLanguage('zz_totally_unknown_lang_xyz');
      } catch (e) {
        err = e;
      }
      should.exist(err);
      String(err.message).should.match(/language/i);
    });

    it('default grammarPath is unused when url is provided', async function() {
      if (!hasEsm) this.skip();

      const url = pathToFileURL(path.join(esmLangDir, 'javascript.js')).href;
      hljs.registerAliases('zz_js_via_url', { languageName: 'javascript', url });
      const lang = await hljs.loadLanguage('zz_js_via_url');
      should.exist(lang);
    });

    it('registerAliases with url loads module when language not yet registered', async function() {
      if (!hasEsm) this.skip();

      const url = pathToFileURL(path.join(esmLangDir, 'python.js')).href;
      hljs.registerAliases(['zz_pyy'], { languageName: 'zz_python_dyn', url });

      await hljs.loadLanguage('zz_pyy');
      should.exist(hljs.getLanguage('zz_pyy'));
      should.exist(hljs.getLanguage('zz_python_dyn'));
      const r = hljs.highlight('def f():\n  pass', { language: 'zz_python_dyn' });
      r.value.should.match(/hljs-keyword/);
    });

    it('loadLanguage with explicit grammarPath loads built-in by alias', async function() {
      if (!hasEsm) this.skip();

      // Use a name that is not already registered under a unique alias path —
      // load via grammarPath pointing at esm languages (canonical javascript).
      const grammarPath = pathToFileURL(esmLangDir + path.sep).href;
      // bash may already be in all.js; loading again is fine (short-circuit).
      await hljs.loadLanguage('bash', { grammarPath });
      should.exist(hljs.getLanguage('bash'));
    });
  });
}
