/*
Language: OSL (version 1.9)
Description: Open Shading Language
Author: Renan Lavarec <renan.lavarec@ti-r.com>
Category: graphics
*/

function(hljs) {
	var STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '(u8?|U)?L?"', end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '(u8?|U)?R"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      {
        begin: '\'\\\\?.', end: '\'',
        illegal: '.'
      }
    ]
  };
  
	var PREPROCESSOR =       {
    className: 'meta',
    begin: /#\s*[a-z]+\b/, end: /$/,
    keywords: {
      'meta-keyword':
        'define undef if ifdef ifndef elif else endif include pragma'
    },
    contains: [
      {
        begin: /\\\n/, relevance: 0
      },
      hljs.inherit(STRINGS, {className: 'meta-string'}),
      {
        className: 'meta-string',
        begin: /<[^\n>]*>/, end: /$/,
        illegal: '\\n',
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  return {
	aliases: ['osl'],
    keywords: {
      keyword:
        // Statements
        'and break closure color continue do else emit for if illuminance illuminate ' +
		'matrix normal not or output point public return string struct vector void while ',
      type:
        'point vector normal float int color matrix string void',
      built_in:
        // Constants
        'M_PI M_PI_2 M_PI_4 M_2_PI M_2PI M_4PI M_2_SQRTPI M_E M_LN2 M_LN10 M_LOG2E M_LOG10E M_SQRT2 M_SQRT1_2 ' +
        // Variables
        'P I N Ng dPdu dPdv Ps u v time dtime dPdtime Ci ' +
        // Functions
        'radians degrees cos sin tan sincos acos asin atan atan2 cosh sinh tanh pow exp exp2 expm1 ' +
		'log log2 log10 logb sqrt inversesqrt hypot abs fabs sign floor ceil round trunc fmod mod ' +
		'min max clamp mix isnan isinf isfinite select erf erfc ptype dot cross length distance normalize ' +
		'faceforward reflect refract fresnel rotate transform transformu color luminance ' +
		'blackbody wavelength_color transformc matrix getmatrix determinant transpose step linearstep ' +
		'smoothstep smooth_linearstep noise pnoise snoise psnoise cellnoise hashnoise hash spline splineinverse Dx Dy Dz ' +
		'filterwidth area calculatenormal aastep displace bump printf format error warning fprintf ' +
		'concat strlen startswith endswith stoi stof split substr getchar hash regex_search regex_match ' +
		'texture texture3d environment gettextureinfo pointcloud_search pointcloud_get pointcloud_write ' +
		'diffuse phong oren_nayar ward microfacet reflection refraction transparent translucent ' +
		'isotropic henyey_greenstein absorption emission background holdout debug getattribute ' +
		'setmessage getmessage surfacearea raytype backfacing isconnected isconstant dict_find ' +
		'dict_next dict_value trace arraylength exit ' ,
      literal: 'true false'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      PREPROCESSOR,
      STRINGS,
      {
        className: 'class',
        beginKeywords: 'surface displacement volume shader', end: '\\('
      },
      hljs.C_NUMBER_MODE,
      {
        className: 'meta',
        begin: '#', end: '$'
      }
    ]
  };
}