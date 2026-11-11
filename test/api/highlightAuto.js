'use strict';

const hljs   = require('../../build');
const should = require('should');

describe('.highlightAuto()', () => {
  it('should render HTML for the best and second best results', () => {
    const code = 'def foo(x):\n    return "<b>" + x\n';
    const result = hljs.highlightAuto(code, ['python', 'ruby', 'javascript']);

    result.language.should.equal('python');
    result.value.should.equal(hljs.highlight(code, { language: 'python' }).value);
    result.secondBest.language.should.be.a.String();
    result.secondBest.value.should.equal(
      hljs.highlight(code, { language: result.secondBest.language }).value
    );
  });

  it('should render embedded sub-languages', () => {
    const code = '<style>a { color: red }</style>\n<script>let x = 1 < 2;</script>';
    const result = hljs.highlightAuto(code, ['xml', 'css']);

    result.language.should.equal('xml');
    result.value.should.equal(hljs.highlight(code, { language: 'xml' }).value);
    result.value.should.containEql('<span class="language-css">');
    result.value.should.containEql('<span class="language-javascript">');
  });

  it('should fall back to plaintext', () => {
    const result = hljs.highlightAuto('a < b', []);

    should.not.exist(result.language);
    result.value.should.equal('a &lt; b');
  });
});
