/*
  Language: MaskJS
  Category: template
  Requires: css.js, javascript.js, xml.js
*/
function(hljs) {
  var Mask = {
    aliases: ['mask'],
    contains: []
  };
  var clone;
  (function(){
    var cached = [];
    clone = function(obj){
      cached.length = 0;
      return cloneObject(obj);
    };
    
    function cloneObject(obj) {
      if (obj == null){
        return null;
      }
      if (typeof obj !== 'object' || obj instanceof RegExp){
        return obj;
      }
      var i = cached.indexOf(obj);
      if (i !== -1)
        return cached[i + 1];

      var cloned = {};
      cached.push(obj, cloned);
      for(var key in obj) {
        if (COPY[key] === 1) {
          cloned[key] = obj[key];
          continue;
        }
        if (CLONE[key] === 1){
          var val = obj[key];
          if (val == null) {
            continue;
          }
          if (val instanceof Array) {
            var arr = cloned[key] = [];
            var imax = val.length;
            var i = -1;
            while(++i < imax) {
              arr.push(cloneObject(val[i]));
            }
            continue;
          }
          cloned[key] = cloneObject(val);
          continue;
        }        
      }
      return cloned;
    };
    var COPY = {
      begin:1,
      end: 1,
      beginKeywords: 1,
      keywords: 1,
      variants: 1,
      subLanguage: 1,
      className: 1,
      relevance: 1,
      lexemes: 1,
      illegal: 1,
      excludeBegin: 1,
      excludeEnd: 1,
      returnBegin: 1,
      returnEnd: 1,
      endsParent: 1,
      endsWithParent: 1
    };
    var CLONE = {
      contains: 1,
      starts: 1,
    };
  }());

  var jsLang = hljs.getLanguage('javascript');
  var cssLang = hljs.getLanguage('css');
  var cssMods = cssLang.contains;
  var jsMods = [{begin: /\[/, end: /\]/, relevance: 0, contains: ['self']}]
        .concat(clone(jsLang).contains);

  function createBlock(def, isSub) {
    return {
      begin: def.begin, end: def.end,
      className: def.className,
      endsParent: 'endsParent' in def ? def.endsParent : false,
      returnBegin: true,
      returnEnd: 'returnEnd' in def ? def.returnEnd : false,      
      relevance: def.relevance,
      contains: [
        {
          begin: /\s+/,
        },
        {
          begin: def.begin,
          className: 'beginClassName' in def ? def.beginClassName : 'meta',
        },
        {
          begin: def.end,
          className: 'endClassName' in def ? def.endClassName : 'meta',
          endsParent: true,
          returnBegin: 'returnEnd' in def ? def.returnEnd : false,
        },
        {
          end: def.end,
          returnEnd: true,                 
          contains: def.contains
        }
      ]
    };
  }
  var Rgx = {
    PUNC: /[\{\}\(\)>;]/,
    VAR: /[\w+_\-$]+/ 
  };
  var INTERP_EXPR = createBlock({
    begin: /~\[/, 
    end: /\]/, 
    contains: jsMods, 
    relevance: 10,
    className: 'subst hljs-emphasis'
  });
  var INTERP_PROP = {
    begin: /~([\w_$]+\.?)+/, 
    className: 'subst hljs-emphasis'
  };
  var LITERAL = {
    className: 'string',
    variants: [
      {begin: /"""/, end: /"""/},
      {begin: /'''/, end: /'''/},
      {begin: /"/, end: /"/},
      {begin: /'/, end: /'/},
    ],    
    contains: [
      hljs.BACKSLASH_ESCAPE,
      INTERP_EXPR,
      INTERP_PROP
    ]
  };    
  var ATTRIBUTES = {
    returnEnd: true,
    endsWithParent: true,
    contains: [        
      {
        variants: [
          {begin: /#/},
          {begin: /\./},
        ],              
        className: 'string',
        contains: [
          {
            begin: Rgx.VAR
          },
          INTERP_EXPR,
          INTERP_PROP
        ]
      },
      createBlock({
        begin: /\(/, 
        end: /\)/, 
        contains: jsMods, 
        className: 'subst'
      }),
      {
        className: 'attr',
        begin: Rgx.VAR,        
        contains: [
            {
              begin: /\s*=\s*/,          
              contains: [
                LITERAL,
                {
                  begin: /[^\s\{\}\(\);>]+/,
                  className: 'string',
                  contains: [ INTERP_EXPR, INTERP_PROP ]
                }
              ]
            }
        ],
        illegal: /[^\w]/
      }
    ]
  };
  var WHITESPACE = {
    begin: /\s+/
  };  
  Mask.contains.push(
    clone(hljs.C_LINE_COMMENT_MODE)
    , clone(hljs.C_BLOCK_COMMENT_MODE)
    , LITERAL
    , createBlock({
      begin: /\bimport\b/, 
      beginClassName: 'built_in hljs-strong',
      endClassName: null,
      end: /[;>\{\}]/,
      contains: [
        { beginKeywords: 'async from as is' },
        LITERAL
      ]
    })    
    , createBlock({      
      begin: /\b(function|event|slot)\b/, end: /\}/,
      beginClassName: 'built_in hljs-strong', endClassName: 'meta',
      contains: [
        hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/}),
        {
          className: 'params',
          begin: /\(/, end: /\)/,
          excludeBegin: true,
          excludeEnd: true,
          contains: jsMods
        },
        createBlock({
          begin: /\{/,  beginClassName: 'meta', endClassName: 'meta',
          end: /\}/,
          endsParent: true,
          returnEnd: true,
          contains: jsMods
        })
      ]
    })
    , createBlock({      
      begin: /\bvar\b/, end: /;/,
      beginClassName: 'built_in hljs-strong', endClassName: null,
      contains: [{ begin: /;/, endsParent: true, returnBegin: true}].concat(jsMods)
    })
    , createBlock({
      begin: /\b(define|let)\b/, end: /\}/,
      beginClassName: 'meta hljs-strong', endClassName: 'meta', 
      relevance: 10,
      contains: [
        WHITESPACE,
        {
           begin: /(as|extends)/,
           className: 'keyword'
        },
        {
          begin: /[\w\-_:]+/,
          className: 'title',
        },         
        createBlock({
           begin: /\(/, end: /\)/,
           contains: Mask.contains,
           className: 'emphasis'
        }),
        createBlock({
          begin: /\{/, end: /\}/,
          contains: Mask.contains,
          returnEnd: true
        })
      ]
    })
    , createBlock({
      begin: /\bstyle\b/, end: /\}/,
      beginClassName: 'built_in hljs-strong', endClassName: 'meta',
      contains: [
        {
          begin: 'scoped', className: 'variable'
        },
        createBlock({
          begin: /\{/, 
          end: /\}/,
          returnEnd: true,
          endsParent: true,
          contains: cssMods
        })
      ]
    })
    , {
      variants: [
        {begin: /#/, end: /[\.#\{\}\s;\>]/},
        {begin: /\./, end: /[\.#\{\}\s;\>]/}
      ],            
      returnBegin: true,
      contains: [ ATTRIBUTES ]
    }
  ); 
  (function(){
    function createXmlBlock(def) {
      return  {
        className: 'tag',
        begin: '<' + def.name, end: '>',
        keywords: {keyword: def.name},
        starts: {
          end: '</' + def.name + '\\s*>',
          keywords: {name: def.name},
          subLanguage: def.language
        }
      };
    }
    Mask.contains.push(
      createXmlBlock({
        name: 'markdown',
        language: ['markdown']
      })
      , createXmlBlock({
        name: 'script',
        language: ['javascript']
      })
      , createXmlBlock({
        name: 'style',
        language: 'css'
      })
      , createXmlBlock({
        name: 'mask',
        language: 'mask'
      })     
    )

  }());
  (function(){
    function createTag(def){
      return {
        begin: def.begin,
        className: def.className,
        starts: {
          end: Rgx.PUNC,
          excludeEnd: true,
          returnEnd: true,
          illegal: /[^\w\.#]/,
          relevance: def.relevance,
          contains: [ ATTRIBUTES ]  
        }
      };
    };
    Mask.contains.push(
      createTag({
        begin: /(\+?\b(if|else|for|each|switch)|debugger|:template|:?dualbind)(?=[\s.#;\{\}\(]|$)/,
        className: 'built_in hljs-strong',
        relevance: 1
      }),
      createTag({
        begin: /\b(a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|section|select|small|source|span|strike|strong|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|u|ul|video|wbr|xmp)(?=[\s.#;\{\}]|$)/,
        className: 'selector-tag hljs-emphasis'
      }),
      createTag({
        begin: /@[\w_:\-]+(?=[\s.#;\{\}]|$)/,
        className: 'variable hljs-emphasis'
      }),
      createTag({
        begin: /\b([\w_:\-]+)(?=[\s.#;\{\}]|$)/,
        className: 'variable hljs-strong'
      })
    );
  }());

  Mask.contains.push(
    {
      begin: '</', end: '>', 
      contains: [ {begin: /\w+/, className: 'selector-tag hljs-emphasis' } ]
    },
    {
      begin: '<', end: '>', 
      contains: [ 
          {
            begin: /\w+/,
            className: 'selector-tag hljs-emphasis'
          },
          ATTRIBUTES
      ],
      starts: {
        end: '<',
        returnEnd: true,
        contains: [
            {
              end: '<',
              returnEnd: true,
              endsParent: true
            }
        ]
      }
    }
  );
  (function(){
      // Relevance should be disabled per default as almost any text or code is 
      // valid MaskJS syntax: tags, attributes, literals
      disableRelevance(Mask.contains, 0);
      function disableRelevance(modes, deep) {
        if (modes == null) return;
        if (deep > 3) return;
        if (modes === jsMods || modes === cssMods) return;
        var i = modes.length;
        while(--i > -1) {
          !modes[i].relevance && (modes[i].relevance = 0);
          disableRelevance(modes[i].contains, deep + 1);
        }
      }
  }());
  return Mask;
}
