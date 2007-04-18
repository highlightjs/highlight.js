/*

RenderMan Shading Language (c) Konstantin Evdokimenko <qewerty@gmail.com>

*/

RSL_BUILT_IN = 'smoothstep|calculatenormal|faceforward|normalize|ambient|diffuse|specular|visibility';

LANGUAGES.rsl  = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    illegal: '</',
    contains: ['comment', 'string', 'number', 'preprocessor',
               'shader', 'shading', 'built_in'],
    keywords: {'float': 1, 'color': 1, 'point': 1, 'normal': 1, 'vector': 1,
               'matrix': 1, 'while': 1, 'for': 1, 'if': 1, 'do': 1,
               'return': 1, 'else': 1, 'break': 1, 'extern': 1, 'continue': 1}
  },
  modes: [
    {
      className: 'shader',
      begin: 'surface |displacement |light |volume |imager ', end: '\\(',
      lexems: [IDENT_RE],
      keywords: {'surface': 1, 'displacement': 1, 'light': 1, 'volume': 1, 'imager': 1}
    },
    {
      className: 'shading',
      begin: 'illuminate|illuminance|gather', end: '\\(',
      lexems: [IDENT_RE],
      keywords: {'illuminate': 1, 'illuminance': 1, 'gather': 1}
    },
    {
      className: 'built_in',
      begin: '\\b(' + RSL_BUILT_IN + ')\\b', end: '^',
      lexems: [IDENT_RE],
      keywords: {'smoothstep': 1, 'calculatenormal': 1, 'faceforward': 1,
                 'normalize': 1, 'ambient': 1, 'diffuse': 1, 'specular': 1,
                 'visibility': 1}
    },
    C_LINE_COMMENT_MODE,
    C_BLOCK_COMMENT_MODE,
    C_NUMBER_MODE,
    QUOTE_STRING_MODE,
    APOS_STRING_MODE,
    BACKSLASH_ESCAPE,
    {
      className: 'preprocessor',
      begin: '#', end: '$'
    }
  ]
};//rsl