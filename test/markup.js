'use strict';

var fs      = require('fs');
var glob    = require('glob');
var hljs    = require('../build');
var path    = require('path');
var utility = require('./utility');

function testLanguage(language) {
  var filePath  = utility.buildPath('markup', language, '*.expect.txt'),
      filenames = glob.sync(filePath);

  describe(language, function() {
    filenames.forEach(function(filename) {
      var testName   = path.basename(filename, '.expect.txt'),
          sourceName = filename.replace(/\.expect/, ''),
          source     = fs.readFileSync(sourceName, 'utf-8');

      it('should markup ' + testName, function() {
        var actual   = hljs.highlight(language, source).value,
            expected = fs.readFileSync(filename, 'utf-8');

        actual.should.equal(expected);
      });
    });
  });
}

describe('markup generation test', function() {
  var languages = fs.readdirSync(utility.buildPath('markup'));

  languages.forEach(testLanguage);
});
