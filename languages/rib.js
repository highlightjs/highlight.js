/*

RenderMan Interface Bytestream (c) Konstantin Evdokimenko <qewerty@gmail.com>

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
};//rib