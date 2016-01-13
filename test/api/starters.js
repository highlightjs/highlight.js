'use strict';

let hljs = require('../../build');

const pattern = new RegExp(`^${hljs.RE_STARTERS_RE}$`);

describe('.RE_STARTERS_RE', function() {
  it('should match boolean operators', function() {
    const operators = [ '!', '!=', '!==', '==', '===',  '<=', '>='
                      , '<', '>', '||', '&&', '?'
                      ];

    operators.should.matchEach(pattern);
  });

  it('should match arithmetic operators', function() {
    const operators = [ '*', '*=', '+', '+=', '-', '-=', '/', '/='
                      , '%', '%='
                      ];

    operators.should.matchEach(pattern);
  });

  it('should match binary operators', function() {
    const operators = [ '&', '&=', '|', '|=', '<<', '<<=', '>>', '>>='
                      , '>>>', '>>>=', '^', '^=', '~'
                      ];

    operators.should.matchEach(pattern);
  });

  it('should match miscellaneous operators', function() {
    const operators = [',', '=', ':', ';', '[', '{', '('];

    operators.should.matchEach(pattern);
  });
});
