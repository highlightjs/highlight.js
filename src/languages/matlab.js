/*
Language: Matlab
Author: Denis Bardadym <bardadymchik@gmail.com>
*/

hljs.LANGUAGES.matlab = {
  defaultMode: {
    keywords: {
      'keyword': {
       'break': 1, 'case': 1,'catch': 1,'classdef': 1,'continue': 1,'else': 1,'elseif': 1,'end': 1,'enumerated': 1,
       'events': 1,'for': 1,'function': 1,'global': 1,'if': 1,'methods': 1,'otherwise': 1,'parfor': 1,
       'persistent': 1,'properties': 1,'return': 1,'spmd': 1,'switch': 1,'try': 1,'while': 1
      },
      'built_in': {
       'sin': 1,'sind': 1,'sinh': 1,'asin': 1,'asind': 1,'asinh': 1,'cos': 1,'cosd': 1,'cosh': 1,
       'acos': 1,'acosd': 1,'acosh': 1,'tan': 1,'tand': 1,'tanh': 1,'atan': 1,'atand': 1,'atan2': 1,
       'atanh': 1,'sec': 1,'secd': 1,'sech': 1,'asec': 1,'asecd': 1,'asech': 1,'csc': 1,'cscd': 1,
       'csch': 1,'acsc': 1,'acscd': 1,'acsch': 1,'cot': 1,'cotd': 1,'coth': 1,'acot': 1,'acotd': 1,
       'acoth': 1,'hypot': 1,'exp': 1,'expm1': 1,'log': 1,'log1p': 1,'log10': 1,'log2': 1,'pow2': 1,
       'realpow': 1,'reallog': 1,'realsqrt': 1,'sqrt': 1,'nthroot': 1,'nextpow2': 1,'abs': 1,
       'angle': 1,'complex': 1,'conj': 1,'imag': 1,'real': 1,'unwrap': 1,'isreal': 1,'cplxpair': 1,
       'fix': 1,'floor': 1,'ceil': 1,'round': 1,'mod': 1,'rem': 1,'sign': 1,
       'airy': 1,'besselj': 1,'bessely': 1,'besselh': 1,'besseli': 1,'besselk': 1,'beta': 1,
       'betainc': 1,'betaln': 1,'ellipj': 1,'ellipke': 1,'erf': 1,'erfc': 1,'erfcx': 1,
       'erfinv': 1,'expint': 1,'gamma': 1,'gammainc': 1,'gammaln': 1,'psi': 1,'legendre': 1,
       'cross': 1,'dot': 1,'factor': 1,'isprime': 1,'primes': 1,'gcd': 1,'lcm': 1,'rat': 1,
       'rats': 1,'perms': 1,'nchoosek': 1,'factorial': 1,'cart2sph': 1,'cart2pol': 1,
       'pol2cart': 1,'sph2cart': 1,'hsv2rgb': 1,'rgb2hsv': 1,
       'zeros': 1,'ones': 1,'eye': 1,'repmat': 1,'rand': 1,'randn': 1,'linspace': 1,'logspace': 1,
       'freqspace': 1,'meshgrid': 1,'accumarray': 1,'size': 1,'length': 1,'ndims': 1,'numel': 1,
       'disp': 1,'isempty': 1,'isequal': 1,'isequalwithequalnans': 1,'cat': 1,'reshape': 1,
       'diag': 1,'blkdiag': 1,'tril': 1,'triu': 1,'fliplr': 1,'flipud': 1,'flipdim': 1,'rot90': 1,
       'find': 1,'end': 1,'sub2ind': 1,'ind2sub': 1,'bsxfun': 1,'ndgrid': 1,'permute': 1,
       'ipermute': 1,'shiftdim': 1,'circshift': 1,'squeeze': 1,'isscalar': 1,'isvector': 1,
       'ans': 1,'eps': 1,'realmax': 1,'realmin': 1,'pi': 1,'i': 1,'inf': 1,'nan': 1,'isnan': 1,
       'isinf': 1,'isfinite': 1,'j': 1,'why': 1,'compan': 1,'gallery': 1,'hadamard': 1,'hankel': 1,
       'hilb': 1,'invhilb': 1,'magic': 1,'pascal': 1,'rosser': 1,'toeplitz': 1,'vander': 1,
       'wilkinson': 1
      },
    },
    illegal: '(//|"|#|/\\*|\\s+/\\w+)',
    contains: [
      {
        className: 'function',
        begin: 'function', end: '$',
        keywords: {'function': 1},
        contains: [
          {
              className: 'title',
              begin: hljs.UNDERSCORE_IDENT_RE
          },
          {
              className: 'params',
              begin: '\\(', end: '\\)'
          },
          {
              className: 'params',
              begin: '\\[', end: '\\]'
          }
        ]
      },
      {
        className: 'string',
        begin: '\'', end: '\'',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
      },
      {
        className: 'comment',
        begin: '\\%', end: '$'
      },
      hljs.C_NUMBER_MODE
    ]
  }
};
