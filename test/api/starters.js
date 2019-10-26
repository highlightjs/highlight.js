'use strict';

const hljs = require('../../build');

const pattern = new RegExp(`^${hljs.RE_STARTERS_RE}$`);

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
