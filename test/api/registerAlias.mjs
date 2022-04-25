'use strict';

import hljs from "../../build/es/index.js";

export default function() {
  describe('.registerAliases()', () => {
    it('should get an existing language by alias', () => {
      hljs.registerAliases('jquery', {
        languageName: 'javascript'
      });
      const result = hljs.getLanguage('jquery');

      result.should.be.instanceOf(Object);
    });

    it('should get an existing language by aliases', () => {
      hljs.registerAliases(['jquery', 'jqueryui'], {
        languageName: 'javascript'
      });
      const result = hljs.getLanguage('jquery');

      result.should.be.instanceOf(Object);
    });
  });
}