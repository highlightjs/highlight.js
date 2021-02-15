import hljs from '#hljs';
import _ from 'lodash';

const pattern      = new RegExp(`${hljs.C_NUMBER_RE}$`);

describe('.C_NUMBER_RE', () => {
  it('should match regular numbers', () => {
    const numbers = _.range(0, 1001).map(x => x.toString());

    numbers.should.matchEach(pattern);
  });

  it('should match decimals', () => {
    const decimal       = _.range(0, 1.001, 0.001).map(x => x.toString());
    const noLeadingZero = ['.1234', '.5206', '.0002', '.9998'];

    const numbers = [].concat(decimal, noLeadingZero);

    numbers.should.matchEach(pattern);
  });

  it('should match hex numbers', () => {
    const numbers = [ '0xbada55', '0xfa1755', '0x45362e', '0xfedcba'
                    , '0x123456', '0x00000f', '0xfff000', '0xf0e1d2'
                    ];

    numbers.should.matchEach(pattern);
  });

  it('should not match hex numbers greater than "f"', () => {
    const numbers = ['0xgada55', '0xfh1755', '0x45i62e'];

    numbers.should.not.matchEach(pattern);
  });

  it('should not match binary numbers', () => {
    const numbers = ['0b0101', '0b1100', '0b1001'];

    numbers.should.not.matchEach(pattern);
  });
});
