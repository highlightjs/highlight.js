/*
Language: LESS
Author: Calvin Juárez <calvin.juarez@gmail.com>
*/

function(hljs) {
  var css = {}
  css.COLOR_HEX = {
    className: 'hexcolor', begin: /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/, relevance: 0
  }
  css.COLOR_KEYWORD = { // it'd be nice to include it in CSS and SCSS, too, imo
    beginWithKeyword: true,
    relevance: 0,
    keywords: {
      color:
        'AliceBlue AntiqueWhite Aqua Aquamarine Azure Beige Bisque Black BlanchedAlmond Blue ' +
        'BlueViolet Brown BurlyWood CadetBlue Chartreuse Chocolate Coral CornflowerBlue Cornsilk ' +
        'Crimson Cyan DarkBlue DarkCyan DarkGoldenrod DarkGray DarkGreen DarkKhaki DarkMagenta ' +
        'DarkOliveGreen DarkOrange DarkOrchid DarkRed DarkSalmon DarkSeaGreen DarkSlateBlue ' +
        'DarkSlateGray DarkTurquoise DarkViolet DeepPink DeepSkyBlue DimGray DodgerBlue FireBrick ' +
        'FloralWhite ForestGreen Fuchsia Gainsboro GhostWhite Gold Goldenrod Gray Green GreenYellow ' +
        'Honeydew HotPink IndianRed Indigo Ivory Khaki Lavender LavenderBlush LawnGreen LemonChiffon ' +
        'LightBlue LightCoral LightCyan LightGoldenrodYellow LightGreen LightGrey LightPink ' +
        'LightSalmon LightSeaGreen LightSkyBlue LightSlateGray LightSteelBlue LightYellow Lime ' +
        'LimeGreen Linen Magenta Maroon MediumAquamarine MediumBlue MediumOrchid MediumPurple ' +
        'MediumSeaGreen MediumSlateBlue MediumSpringGreen MediumTurquoise MediumVioletRed ' +
        'MidnightBlue MintCream MistyRose Moccasin NavajoWhite Navy OldLace Olive OliveDrab Orange ' +
        'OrangeRed Orchid PaleGoldenrod PaleGreen PaleTurquoise PaleVioletRed PapayaWhip PeachPuff ' +
        'Peru Pink Plum PowderBlue Purple Red RosyBrown RoyalBlue SaddleBrown Salmon SandyBrown ' +
        'SeaGreen Seashell Sienna Silver SkyBlue SlateBlue SlateGray Snow SpringGreen SteelBlue Tan ' +
        'Teal Thistle Tomato Turquoise Violet Wheat White WhiteSmoke Yellow YellowGreen' +
        'aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue ' +
        'blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk ' +
        'crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkkhaki darkmagenta ' +
        'darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen darkslateblue ' +
        'darkslategray darkturquoise darkviolet deeppink deepskyblue dimgray dodgerblue firebrick ' +
        'floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow ' +
        'honeydew hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon ' +
        'lightblue lightcoral lightcyan lightgoldenrodyellow lightgreen lightgrey lightpink ' +
        'lightsalmon lightseagreen lightskyblue lightslategray lightsteelblue lightyellow lime ' +
        'limegreen linen magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple ' +
        'mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred ' +
        'midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange ' +
        'orangered orchid palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff ' +
        'peru pink plum powderblue purple red rosybrown royalblue saddlebrown salmon sandybrown ' +
        'seagreen seashell sienna silver skyblue slateblue slategray snow springgreen steelblue tan ' +
        'teal thistle tomato turquoise violet wheat white whitesmoke yellow yellowgreen'
    }
  }
  css.FUNCTION = {
    className: 'function',
    begin: /[a-zA-Z-][a-zA-Z0-9_-]*\(/, end: /\)/,
    relevance: 0,
    contains: [
      'self',
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      css.COLOR_KEYWORD,
      css.COLOR_HEX
    ]
  }
  css.AT_RULE = {
    className: 'at_rule',
    begin: /@(charset|font-face|import|keyframes|media|namespace|page|region|supports|viewport)/, end: /[{;]/,
    lexemes: '[a-z-]+',
    keywords: {
      keyword: 'charset font-face import keyframes media namespace page region supports viewport'
    },
    relevance: 0,
    contains: [
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        begin: /\s/, endsWithParent: true, excludeEnd: true,
        keywords: {
          operator: 'and not',
          option: 'inline reference less' // I'm not sure what to call these. At lesscss.org they're
                                          // called options, so that's what I'm calling them, but if
                                          // there is a css class already in Highlight.js that works
                                          // better, we should use that.
        },
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.NUMBER_MODE,
          css.FUNCTION
        ]
      }
    ]
  }
  css.VALUE = {
    className: 'value',
    endsWithParent: true, excludeEnd: true,
    relevance: 0,
    contains: [
      // less.VARIABLE will be defined and added here later
      // less.FUNCTION will be defined and added here later
      // less.ESCAPED_VALUE will be defined and added here later
      css.FUNCTION,
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      css.COLOR_HEX,
      { className: 'important', begin: '!important' }
    ]
  }
  css.PROPERTY = {
    begin: /[a-z-+]+:/, end: /[;}]/,
    returnBegin: true, endsWithParent: true, excludeEnd: true,
    relevance: 0,
    contains: [
      { // I really think CSS, LESS, and SCSS should use 'property' instead of 'attribute'
        className: 'attribute',
        begin: /\S[a-z-]/, end: /(\+?:)\s*/,
        excludeEnd: true,
        relevance: 0,
        starts: css.VALUE
      },
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  }
  css.SELECTOR = {
    begin: /([.#&@[]{1}||:{1,2})?[a-zA-Z-]/, end: /\{/,
    returnBegin: true, endsWithParent: true, excludeEnd: true,
    relevance: 0,
    contains: [
      {
        className: 'class',
        begin: /\.[a-zA-Z-][a-zA-Z0-9_-]*/, end: /[&,\s.#@[:]/,
        endsWithParent: true, returnEnd: true,
        relevance: 0
      },
      {
        className: 'id',
        begin: /\#[a-zA-Z-][a-zA-Z0-9_-]*/, end: /[&,\s.#@[:]/,
        endsWithParent: true, returnEnd: true,
        relevance: 0
      },
      {
        className: 'attr_selector',
        begin: /\[/, end: /\]/,
        endsWithParent: true,
        relevance: 0,
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
        ]
      },
      {
        className: 'pseudo',
        begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)\"\']+/, end: /[&,\s.#@[:]/,
        endsWithParent: true, returnEnd: true,
        relevance: 0,
        contains: [
          hljs.NUMBER_MODE,
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
        ]
      },
      {
        className: 'tag',
        begin: /[a-zA-Z][a-zA-Z0-9]*/, end: /[&,\s.#@[:]/,
        endsWithParent: true, returnEnd: true,
        relevance: 0
      }
    ]
  }
  
  var less = {}
  less.VARIABLE = {
    className: 'variable',
    begin: /@\{?[a-zA-Z0-9_-]*\}?/,
    relevance: 2,
  }
  less.EXTEND = {
    begin: /(&)?:extend\(/, end: /\)/,
    keywords: { preprocessor: 'extend' },
    relevance: 2,
    contains: [
      {
        beginWithKeyword: true,
        keywords: 'all',
      },
      {
        className: 'class',
        begin: /\.[a-zA-Z-][a-zA-Z0-9_-]*/, end: /[,\s.#@[:]/,
        endsWithParent: true, excludeEnd: true,
        relevance: 0
      },
      {
        className: 'id',
        begin: /\#[a-zA-Z-][a-zA-Z0-9_-]*/, end: /[,\s.#@[:]/,
        endsWithParent: true, excludeEnd: true,
        relevance: 0
      },
      {
        className: 'attr_selector',
        begin: /\[/, end: /\]/,
        endsWithParent: true,
        relevance: 0
      },
      {
        className: 'pseudo',
        begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)\"\']+/, end: /[,\s.#@[:]/,
        endsWithParent: true, excludeEnd: true,
        relevance: 0
      },
      {
        className: 'tag',
        begin: /[a-zA-Z][a-zA-Z0-9]*/, end: /[,\s.#@[:]/,
        endsWithParent: true, excludeEnd: true,
        relevance: 0
      }
    ]
  }
  less.ESCAPED_VALUE = {
    className: 'string',
    begin: /~('|")/, end: /('|")/,
    relevance: 2
  }
  less.FUNCTION = {
    begin: '(escape|e|%|unit|color|data-uri|' +
      'ceil|floor|percentage|round|sqrt|abs|sin|asin|cos|acos|tan|atan|pi|pow|mod|convert|unit|' + // math
      'rgb|rgba|argb|hsl|hsla|hsv|hsva|hue|saturation|lightness|hsvhue|hsvsaturation|hsvvalue|' + // color
      'red|green|blue|alpha|luma|saturate|desaturate|lighten|darken|fadein|fadeout|fade|spin|' +
      'mix|tint|shade|greyscale|contrast|multiply|' +
      'iscolor|isnumber|isstring|iskeyword|isurl|ispixel|ispercentage|isem|isunit)\\(', end: '\\)', // type
    lexemes: '[a-z-\\%]+',
    keywords: {
      built_in: 'escape e % unit color data-uri ' + // math
      'ceil floor percentage round sqrt abs sin asin cos acos tan atan pi pow mod convert unit ' + // color
      'rgb rgba argb hsl hsla hsv hsva hue saturation lightness hsvhue hsvsaturation hsvvalue ' +
      'red green blue alpha luma saturate desaturate lighten darken fadein fadeout fade spin ' +
      'mix tint shade greyscale contrast multiply ' +
      'iscolor isnumber isstring iskeyword isurl ispixel ispercentage isem isunit', // type
    },
    contains: [
      'self',
      hljs.NUMBER_MODE,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      less.VARIABLE,
      css.COLOR_KEYWORD,
      css.COLOR_HEX
    ]
  }
  less.MIX_IN = {
    begin: /[.#]{1}[a-zA-Z-][a-zA-Z0-9_-]*\s*\(/, end: /\)/,
    returnBegin: true,
    relevance: 2,
    contains: [
      {
        className: 'preprocessor',
        begin: /[.#]{1}[a-zA-Z-][a-zA-Z0-9_-]*/,
        contains: [
          less.VARIABLE,
          less.FUNCTION,
          css.FUNCTION,
          css.COLOR_KEYWORD,
          css.COLOR_HEX
        ]
      },
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      less.VARIABLE,
      less.FUNCTION,
      css.FUNCTION,
      css.COLOR_KEYWORD,
      css.COLOR_HEX
    ]
  }
  
  
  // Allow the CSS to contain the previously undeclared but necessary LESS stuff.
  css.FUNCTION.contains.push(less.VARIABLE)
  css.VALUE.contains.unshift(less.ESCAPED_VALUE, less.FUNCTION, less.VARIABLE)
  css.SELECTOR.contains.unshift(less.VARIABLE)
  
  return {
    case_insensitive: true,
    keywords: {
      keyword:
        'when and not',
      literal:
        'true false null undefined NaN'
    },
    illegal: '[=/|\']',
    contains: [
      hljs.NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      
      { className: 'operator', begin: /(when|and|not)/, relevance: 0 },
      
      { className: 'important', begin: '!important' },
      
      css.AT_RULE,
      
      less.ESCAPED_VALUE,
      less.FUNCTION,
      
      css.COLOR_HEX,
      css.COLOR_KEYWORD,
      
      less.VARIABLE,
      less.EXTEND,
      less.MIX_IN,
      
      css.FUNCTION,
      
      css.PROPERTY,
      css.SELECTOR
    ]
  };
}
