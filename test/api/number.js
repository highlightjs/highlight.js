'use strict';

const _       = require('lodash');
const hljs    = require('../../build');

const pattern      = new RegExp(`${hljs.NUMBER_RE}$`);

describe('.NUMBER_RE', () => {
  it('should match regular numbers and decimals', () => {
    const number        = _.range(0, 1001).map(x => x.toString());
    const decimal       = _.range(0, 1.001, 0.001).map(x => x.toString());
    const noLeadingZero = ['.1234', '.5206', '.0002', '.9998'];

    const numbers = [].concat(number, decimal, noLeadingZero);

    numbers.should.matchEach(pattern);
  });

  it('should not match hex or binary numbers', () => {
    const numbers = [ '0xbada55', '0xfa1755', '0x45362e'
                    , '0b0101'  , '0b1100'  , '0b1001'
                    ];

    numbers.should.not.matchEach(pattern);
  });
});
