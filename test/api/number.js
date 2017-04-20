'use strict';

let _       = require('lodash');
let hljs    = require('../../build');
let utility = require('../utility');

const pattern      = new RegExp(`${hljs.NUMBER_RE}$`);
let numberToString = utility.numberToString;

describe('.NUMBER_RE', function() {
  it('should match regular numbers and decimals', function() {
    const number        = _.map(_.range(0, 1001), numberToString);
    const decimal       = _.map(_.range(0, 1.001, 0.001), numberToString);
    const noLeadingZero = ['.1234', '.5206', '.0002', '.9998'];

    const numbers = [].concat(number, decimal, noLeadingZero);

    numbers.should.matchEach(pattern);
  });

  it('should not match hex or binary numbers', function() {
    const numbers = [ '0xbada55', '0xfa1755', '0x45362e'
                    , '0b0101'  , '0b1100'  , '0b1001'
                    ];

    numbers.should.not.matchEach(pattern);
  });
});
