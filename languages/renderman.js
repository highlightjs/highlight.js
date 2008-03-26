/*

RenderMan Languages (c) Konstantin Evdokimenko <qewerty@gmail.com>

*/

hljs.LANGUAGES.rib  = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    illegal: '</',
    contains: ['comment', 'string', 'number'],
    keywords: {
      'keyword': {'ReadArchive': 1, 'FrameBegin': 1, 'FrameEnd': 1, 'WorldBegin': 1, 'WorldEnd': 1,
                  'Attribute': 1, 'Display': 1, 'Option': 1, 'Format': 1, 'ShadingRate': 1,
                  'PixelFilter': 1, 'PixelSamples': 1, 'Projection': 1, 'Scale': 1, 'ConcatTransform': 1,
                  'Transform': 1, 'Translate': 1, 'Rotate': 1,
                  'Surface': 1, 'Displacement': 1, 'Atmosphere': 1,
                  'Interior': 1, 'Exterior': 1},
      'commands': {'WorldBegin': 1, 'WorldEnd': 1, 'FrameBegin': 1, 'FrameEnd': 1,
                   'ReadArchive': 1, 'ShadingRate': 1}
    }
  },
  modes: [
    hljs.HASH_COMMENT_MODE,
    hljs.C_NUMBER_MODE,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.BACKSLASH_ESCAPE
  ]
};

hljs.LANGUAGES.rsl  = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    illegal: '</',
    contains: ['comment', 'string', 'number', 'preprocessor',
               'shader', 'shading'],
    keywords: {
      'keyword': {'float': 1, 'color': 1, 'point': 1, 'normal': 1, 'vector': 1,
                  'matrix': 1, 'while': 1, 'for': 1, 'if': 1, 'do': 1,
                  'return': 1, 'else': 1, 'break': 1, 'extern': 1, 'continue': 1},
      'built_in': {'smoothstep': 1, 'calculatenormal': 1, 'faceforward': 1,
                   'normalize': 1, 'ambient': 1, 'diffuse': 1, 'specular': 1,
                   'visibility': 1}
    }
  },
  modes: [
    {
      className: 'shader',
      begin: 'surface |displacement |light |volume |imager ', end: '\\(',
      lexems: [hljs.IDENT_RE],
      keywords: {'surface': 1, 'displacement': 1, 'light': 1, 'volume': 1, 'imager': 1}
    },
    {
      className: 'shading',
      begin: 'illuminate|illuminance|gather', end: '\\(',
      lexems: [hljs.IDENT_RE],
      keywords: {'illuminate': 1, 'illuminance': 1, 'gather': 1}
    },
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_NUMBER_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.APOS_STRING_MODE,
    hljs.BACKSLASH_ESCAPE,
    {
      className: 'preprocessor',
      begin: '#', end: '$'
    }
  ]
};
