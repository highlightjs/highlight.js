'use strict';

import { hljs } from "../../build/lib/all.js";

const pattern = new RegExp(`^${hljs.RE_STARTERS_RE}$`);

export default function() {
  describe('.RE_STARTERS_RE', () => {
    it('should match boolean operators', () => {
      const operators = [ '!', '!=', '!==', '==', '===',  '<=', '>='
                        , '<', '>', '||', '&&', '?'
                        ];

      operators.should.matchEach(pattern);
    });

    it('should match arithmetic operators', () => {
      const operators = [ '*', '*=', '+', '+=', '-', '-=', '/', '/='
                        , '%', '%='
                        ];

      operators.should.matchEach(pattern);
    });

    it('should match binary operators', () => {
      const operators = [ '&', '&=', '|', '|=', '<<', '<<=', '>>', '>>='
                        , '>>>', '>>>=', '^', '^=', '~'
                        ];

      operators.should.matchEach(pattern);
    });

    it('should match miscellaneous operators', () => {
      const operators = [',', '=', ':', ';', '[', '{', '('];

      operators.should.matchEach(pattern);
    });
  });
}