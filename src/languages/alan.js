/*
Language: Alan
Author: Tristano Ajmone <tajmone@gmail.com>
Description: Alan Interactive Fiction (www.alanif.se)
Category: misc
*/
// ====================================
// v1.0.0 (2018/09/30) | Alan v3.0beta6 
// ====================================
// NOTE: This syntax required some tweaking in relevance of keywords and modes,
//       and defining some illegals to prevent autodetection errors in Mocha
//       tests. The syntaxes it tended to prevail where: axapta, inform7 and diff.
//       Inform7 (which is also an Interactive Fiction language) was the syntax
//       that tended to create more autodetection conflicts, as it's similar and
//       it doesn't define any explicit relevance values. 
// -----------------------------------------------------------------------------
function(hljs) {
  var STRINGS = {
    className: 'string',
    begin: '"', end: '"',
    contains: [{begin: '""'}], // Escaped double quotes
    relevance: 0
  };
  var QUOTED_IDS = {
    /*
      We need this just to prevent false-positive keywords matches inside
      quoted identifiers...
    */
    begin: "'.*?'(?!'')",
    relevance: 0
  };
  var ALAN_KEYWORDS = {
    // Relevance added to selected keywords which are Alan specific.
    keyword:
      'add after an and are article|10 at attributes before between by can ' +
      'cancel character characters check container|10 contains count current ' +
      'decrease definite depend depending describe description directly do does ' +
      'each else elsif empty end entered event every exclude exit extract first ' +
      'for form from has header here if import in include increase indefinite ' +
      'indirectly initialize into is isa|10 it last limits list locate look make ' +
      'max mentioned|10 message meta min name near nearby negative no not of off ' +
      'on only opaque option options or play prompt pronoun|10 quit random ' +
      'restart restore save say schedule score script set show start step stop ' +
      'strip style sum synonyms|10 syntax system taking the then this to ' +
      'transcript transitively until use verb|10 visits wait when where with ' +
      'word words',
    built_in:
      'actor entity integer literal location|10 object string thing'
  };
  var ALAN_KEYWORDS_ALT = {
    /*
      We'll also capture as keywords the following symbols (which in Alan are
      never used as operators):
        =>   (shorthand for 'THEN' in rules)
        .    (dot terminator)
        :    (alterantive for 'OF' in attributes chains)
    */
    className: 'keyword',
    begin: '(\\=>|\\.|:)',
    relevance: 0
  };
  var INTEGERS = {
    // There only integer numerals in Alan.
    className: 'number',
    begin: '(\\d+)\\b',
    relevance: 0
  };

  return {
    aliases: ['i'],
    case_insensitive: true,
    keywords: ALAN_KEYWORDS,
    illegal:
      // Needed to prevent autodetection errors in Mocha tests:
      '\\/[\\/|\\*]' +  // C style comments:  // /*
      '|\\[' +          // Inform7 comments:  [
      '|\\#',           // hash comments:     #
    contains: [
      hljs.COMMENT('--', '$', {relevance: 10}),
      ALAN_KEYWORDS_ALT,
      INTEGERS,
      QUOTED_IDS,
      STRINGS
    ]
  };
}
