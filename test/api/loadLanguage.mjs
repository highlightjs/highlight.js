'use strict';

import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';
import { hljs } from "../../build/lib/all.js";

export default function() {
  describe('loadLanguage / registerAliases loader', () => {
    const esmLangDir = path.resolve('build/esm/languages');
    const hasEsm = fs.existsSync(path.join(esmLangDir, 'javascript.js'));

    it('rejects when grammarPath unset and no url', async () => {
      let err = null;
      try {
        // use a built-in id that is already registered in all.js — loadLanguage
        // short-circuits if getLanguage hits. Pick a unique 3rd-party alias only.
        hljs.registerAliases('zz_loader_missing_path', { languageName: 'zz_loader_lang' });
        await hljs.loadLanguage('zz_loader_missing_path');
      } catch (e) {
        err = e;
      }
      should.exist(err);
      String(err.message).should.match(/grammarPath|Language/);
    });

    it('resolves built-in alias via baked map and loads from grammarPath', async function() {
      if (!hasEsm) this.skip();

      // unload is not available for builtins; use a fresh alias pointing at js file via url
      const url = pathToFileURL(path.join(esmLangDir, 'javascript.js')).href;
      hljs.registerAliases('zz_js_via_url', { languageName: 'javascript', url });
      // language already registered in all.js — should resolve immediately
      const lang = await hljs.loadLanguage('zz_js_via_url');
      should.exist(lang);
    });

    it('registerAliases with url loads module when language not yet registered', async function() {
      if (!hasEsm) this.skip();

      // Use a unique canonical name so it is not already in all.js
      const url = pathToFileURL(path.join(esmLangDir, 'python.js')).href;
      hljs.registerAliases(['zz_pyy'], { languageName: 'zz_python_dyn', url });

      // The module still exports a language fn; register under our canonical id
      await hljs.loadLanguage('zz_pyy');
      should.exist(hljs.getLanguage('zz_pyy'));
      should.exist(hljs.getLanguage('zz_python_dyn'));
      const r = hljs.highlight('def f():\n  pass', { language: 'zz_python_dyn' });
      r.value.should.match(/hljs-keyword/);
    });
  });
}
