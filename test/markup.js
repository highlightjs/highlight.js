'use strict';

var fs      = require('fs');
var glob    = require('glob')
var hljs    = require('../build');
var utility = require('./utility');

function testLanguage(filename) {
  var match = filename.match('/([^/]+)/([^/]+).expect.txt$'),
      language = match[1],
      testName = match[2],
      sourceName = filename.replace(/\.expect/, ''),
      source = fs.readFileSync(sourceName, 'utf-8'),
      actual = hljs.highlight(language, source).value,
      expected = fs.readFileSync(filename, 'utf-8');

  it('in '+ language + ': ' + testName, function() {
      actual.should.equal(expected);
  });
}

describe('hljs', function() {
  describe('.markup', function() {
    var files = glob.sync(utility.buildPath('markup') + '/*/*.expect.txt');
    files.forEach(testLanguage);
  });
});
