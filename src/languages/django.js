/*
Language: Django
Requires: xml.js
*/

hljs.LANGUAGES.django = function() {

  function allowsDjangoSyntax(mode, parent) {
    return (
      parent == undefined || // defaultMode
      (!mode.className && parent.className == 'tag') || // tag_internal
      mode.className == 'value' // value
    );
  }

  function copy(mode, parent) {
    var result = {};
    for (var key in mode) {
      if (key != 'contains') {
        result[key] = mode[key];
      }
      var contains = [];
      for (var i = 0; mode.contains && i < mode.contains.length; i++) {
        contains.push(copy(mode.contains[i], mode));
      }
      if (allowsDjangoSyntax(mode, parent)) {
        contains = DJANGO_CONTAINS.concat(contains);
      }
      if (contains.length) {
        result.contains = contains;
      }
    }
    return result;
  }

  var FILTER = {
    className: 'filter',
    begin: '\\|[A-Za-z]+\\:?', excludeEnd: true,
    keywords: {
      'truncatewords': 1, 'removetags': 1, 'linebreaksbr': 1, 'yesno': 1, 'get_digit': 1, 'timesince': 1, 'random': 1,
      'striptags': 1, 'filesizeformat': 1, 'escape': 1, 'linebreaks': 1, 'length_is': 1, 'ljust': 1, 'rjust': 1,
      'cut': 1, 'urlize': 1, 'fix_ampersands': 1, 'title': 1, 'floatformat': 1, 'capfirst': 1, 'pprint': 1,
      'divisibleby': 1, 'add': 1, 'make_list': 1, 'unordered_list': 1, 'urlencode': 1, 'timeuntil': 1,
      'urlizetrunc': 1, 'wordcount': 1, 'stringformat': 1, 'linenumbers': 1, 'slice': 1, 'date': 1, 'dictsort': 1,
      'dictsortreversed': 1, 'default_if_none': 1, 'pluralize': 1, 'lower': 1, 'join': 1, 'center': 1, 'default': 1,
      'truncatewords_html': 1, 'upper': 1, 'length': 1, 'phone2numeric': 1, 'wordwrap': 1, 'time': 1, 'addslashes': 1,
      'slugify': 1, 'first': 1, 'escapejs': 1, 'force_escape': 1, 'iriencode': 1, 'last': 1, 'safe': 1, 'safeseq': 1,
      'truncatechars': 1, 'localize': 1, 'unlocalize': 1, 'localtime': 1, 'utc': 1, 'timezone': 1
    },
    contains: [
      {className: 'argument', begin: '"', end: '"'}
    ]
  };

  var DJANGO_CONTAINS = [
    {
      className: 'template_comment',
      begin: '{%\\s*comment\\s*%}', end: '{%\\s*endcomment\\s*%}'
    },
    {
      className: 'template_comment',
      begin: '{#', end: '#}'
    },
    {
      className: 'template_tag',
      begin: '{%', end: '%}',
      keywords: {'comment': 1, 'endcomment': 1, 'load': 1, 'templatetag': 1, 'ifchanged': 1, 'endifchanged': 1, 'if': 1,
        'endif': 1, 'firstof': 1, 'for': 1, 'endfor': 1, 'in': 1, 'ifnotequal': 1, 'endifnotequal': 1, 'widthratio': 1,
        'extends': 1, 'include': 1, 'spaceless': 1, 'endspaceless': 1, 'regroup': 1, 'by': 1, 'as': 1, 'ifequal': 1,
        'endifequal': 1, 'ssi': 1, 'now': 1, 'with': 1, 'cycle': 1, 'url': 1, 'filter': 1, 'endfilter': 1, 'debug': 1,
        'block': 1, 'endblock': 1, 'else': 1, 'autoescape': 1, 'endautoescape': 1, 'csrf_token': 1, 'empty': 1,
        'elif': 1, 'endwith': 1, 'static': 1, 'trans': 1, 'blocktrans': 1, 'endblocktrans': 1,
        'get_static_prefix': 1, 'get_media_prefix': 1, 'plural': 1, 'get_current_language': 1, 'language': 1,
        'get_available_languages': 1, 'get_current_language_bidi': 1, 'get_language_info': 1,
        'get_language_info_list': 1, 'localize': 1, 'endlocalize': 1, 'localtime': 1, 'endlocaltime': 1, 'timezone': 1,
        'endtimezone': 1, 'get_current_timezone': 1
      },
      contains: [FILTER]
    },
    {
      className: 'variable',
      begin: '{{', end: '}}',
      contains: [FILTER]
    }
  ];

  return {
    case_insensitive: true,
    defaultMode: copy(hljs.LANGUAGES.xml.defaultMode)
  };

}();
