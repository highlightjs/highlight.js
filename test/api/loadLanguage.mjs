'use strict';

import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';
import { hljs } from "../../build/lib/all.js";

export default function() {
  describe('loadLanguage / registerAliases loader', () => {
    // Legacy node build emits grammars here; matches default import.meta.url layout for core.js
    const langDir = path.resolve('build/lib/languages');
    const hasLangs = fs.existsSync(path.join(langDir, 'javascript.js'));

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

    it('registerAliases with url loads module', async function() {
      if (!hasLangs) this.skip();

      const url = pathToFileURL(path.join(langDir, 'javascript.js')).href;
      hljs.registerAliases('zz_js_via_url', { languageName: 'javascript', url });
      const lang = await hljs.loadLanguage('zz_js_via_url');
      should.exist(lang);
    });

    it('registerAliases with url loads when language not yet registered', async function() {
      if (!hasLangs) this.skip();

      const url = pathToFileURL(path.join(langDir, 'python.js')).href;
      hljs.registerAliases(['zz_pyy'], { languageName: 'zz_python_dyn', url });

      await hljs.loadLanguage('zz_pyy');
      should.exist(hljs.getLanguage('zz_pyy'));
      should.exist(hljs.getLanguage('zz_python_dyn'));
      const r = hljs.highlight('def f():\n  pass', { language: 'zz_python_dyn' });
      r.value.should.match(/hljs-keyword/);
    });

    it('loadLanguage with explicit grammarPath loads by name', async function() {
      if (!hasLangs) this.skip();

      const grammarPath = pathToFileURL(langDir + path.sep).href;
      await hljs.loadLanguage('bash', { grammarPath });
      should.exist(hljs.getLanguage('bash'));
    });

    it('default grammarPath loads sibling languages/ from core module', async function() {
      if (!hasLangs) this.skip();

      // Fresh instance via core only (no langs pre-registered)
      const { HighlightJS } = await import('../../build/lib/core.js');
      const core = HighlightJS();
      await core.loadLanguage('xml');
      should.exist(core.getLanguage('xml'));
      const r = core.highlight('<a/>', { language: 'xml' });
      r.value.should.match(/hljs-tag|hljs-name/);
    });
  });
}
