'use strict';

var fs      = require('fs');
var hljs    = require('../build');
var utility = require('./utility');

describe('hljs', function() {
  describe('.highlightAuto', function() {
    var language, filename,

        languages = utility.languagesList(),
        length    = languages.length;

    for(var i = 0; i < length; i++) {
      language = languages[i];
      filename = language + '.txt';

      it('should be detected as ' + language, function() {
        var languagePath = utility.buildPath('language', filename),

            expected     = language,
            content      = fs.readFileSync(languagePath, 'utf-8'),

            actual       = hljs.highlightAuto(content).language;

        actual.should.equal(expected);
      });
    }
  });
});
