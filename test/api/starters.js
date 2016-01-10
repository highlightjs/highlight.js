'use strict';

let hljs = require('../../build');

let pattern = new RegExp(`^${hljs.RE_STARTERS_RE}$`);

describe('.RE_STARTERS_RE', function() {
  it('should match boolean operators', function() {
    let operators = [ '!', '!=', '!==', '==', '===',  '<=', '>='
                    , '<', '>', '||', '&&', '?'
                    ];

    operators.should.matchEach(pattern);
  });

  it('should match arithmetic operators', function() {
    let operators = [ '*', '*=', '+', '+=', '-', '-=', '/', '/='
                    , '%', '%='
                    ];

    operators.should.matchEach(pattern);
  });

  it('should match binary operators', function() {
    let operators = [ '&', '&=', '|', '|=', '<<', '<<=', '>>', '>>='
                    , '>>>', '>>>=', '^', '^=', '~'
                    ];

    operators.should.matchEach(pattern);
  });

  it('should match miscellaneous operators', function() {
    let operators = [',', '=', ':', ';', '[', '{', '('];

    operators.should.matchEach(pattern);
  });
});
