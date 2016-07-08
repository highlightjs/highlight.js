/*
Language: PARI/GP
Author: Charles R Greathouse IV <charles@crg4.com>
Category: scientific
*/

// Note to self: HTML5 spec suggests <code class="language-foobar">, so <code class="language-parigp"> in this case.
// https://html.spec.whatwg.org/multipage/semantics.html#the-code-element

// List of class names: addition, attr, attribute, built_in, builtin-name, bullet, class, code, comment, deletion, doctag,
// emphasis, formula, function, keyword, keywords, link, link_label, literal, meta, meta-keyword, meta-string, name,
// number, params, quote, regexp, section, selector-attr, selector-class, selector-id, selector-pseudo, selector-tag,
// string, strong, stronge, subst, symbol, tag, template-tag, template-variable, title, type, variable

function(hljs) {
  var GP_KEYWORDS  = {
    keyword: 'abs acosh acos addhelp addprimes agm algabsdim|10 algadd algalgtobasis|10 algaut|5 algbasis algbasistoalg|10 algb algcenter algchar algcharpoly|10 algdegree|5 algdep|10 algdim|5 algdisc|10 algdivl|10 algdivr|10 alghassef|10 alghassei|10 alghasse|5 algindex alginit alginvbasis|10 alginv algisassociative|10 algiscommutative|10 algisdivision|10 algisdivl|10 algisinv|10 algisramified|10 algissemisimple|10 algissimple|10 algissplit|10 algleftmultable|10 algmul algmultable|10 algneg algnorm algpoleval|10 algpow algprimesubalg|10 algradical|10 algramifiedplaces|10 algrandom|5 algrelmultable|10 algsimpledec|10 algsplittingdata|10 algsplittingfield|10 algsplittingmatrix|10 algsqr|5 algsubalg|10 algsub algtableinit|10 algtensor|10 algtrace algtype alias allocatemem|5 apply arg asinh asin asympnum|10 atanh atan' +
  ' bernfrac|10 bernpol|5 bernreal|10 bernvec|10 besselh1|10 besselh2|10 besseli besseljh|10 besselj besselk|5 besseln|10 bestappr bestapprPade|10 bezout bezoutres|10 bigomega|10 binary binomial bitand bitnegimply|10 bitneg bitor bittest bitxor bnfcertify|10 bnfcompress|10 bnfdecodemodule|10 bnfinit|10 bnfisintnorm|10 bnfisnorm|10 bnfisprincipal|10 bnfissunit|10 bnfisunit|10 bnfnarrow|10 bnfsignunit|10 bnfsunit|10 bnrchar|10 bnrclassno|5 bnrclassnolist|10 bnrconductor|5 bnrconductorofchar|10 bnrdisc|5 bnrdisclist|10 bnrgaloisapply|10 bnrgaloismatrix|10 bnrinit|10 bnrisconductor|10 bnrisgalois|10 bnrisprincipal|10 bnrL1|10 bnrrootnumber|10 bnrstark|10 break' +
  ' call ceil centerlift|10 characteristic charker|10 charpoly chinese clone cmp Col Colrev|10 component concat conj conjvec|10 content contfraceval|10 contfracinit|10 contfrac contfracpnqn|10 copy coredisc|10 core cosh cos cotanh|10 cotan' +
  ' default denominator deriv derivnum|10 diffop|10 digits dilog|10 dirdiv|10 direuler|10 dirmul|10 dirzetak|10 divisors divrem' +
  ' eint1|10 elladd|10 ellak|10 ellan|10 ellap|10 ellbil|10 ellcard|10 ellchangecurve|10 ellchangepointinv|10 ellchangepoint|5 ellconvertname|10 elldivpol|10 elleisnum|10 elleta|10 ellformaldifferential|10 ellformalexp|10 ellformallog|10 ellformalpoint|10 ellformalw|10 ellfromeqn|10 ellfromj|10 ellgenerators|10 ellglobalred|10 ellgroup|10 ellheegner|10 ellheight|5 ellheightmatrix|10 ellidentify|10 ellinit|10 ellisdivisible|10 ellisogenyapply|10 ellisogeny|5 ellisomat|10 ellisoncurve|10 ellissupersingular|10 ellj|10 elllocalred|10 elllog|10 elllseries|10 ellminimalmodel|10 ellminimaltwist|10 ellmodulareqn|10 ellmul|10 ellneg|10 ellnonsingularmultiple|10 ellorder|10 ellordinate|10 ellpadicfrobenius|5 ellpadicheight|5 ellpadicheightmatrix|10 ellpadicL|10 ellpadiclog|10 ellpadics2|10 ellperiods|10 ellpointtoz|10 ellpow|10 ellrootno|10 ellsearch|10 ellsigma|10 ellsub|10 elltaniyama|10 elltatepairing|10 elltors|10 elltwist|10 ellweilpairing|10 ellwp|10 ellxn|10 ellzeta|10 ellztopoint|10 erfc errname|10 error eta eulerphi|10 eval exp expm1 extern externstr|10' +
  ' factorback factorcantor|10 factorff|10 factorial factorint|10 factor factormod factornf|10 factorpadic|10 ffgen|10 ffinit|10 fflog|10 ffnbirred|10 fforder|10 ffprimroot|10 fibonacci|10 floor fold forcomposite|10 fordiv|10 forell|10 for forpart|10 forprime|5 forqfvec|10 forstep|10 forsubgroup|10 forvec|5 frac fromdigits|10' +
  ' galoisexport|10 galoisfixedfield|10 galoisgetpol|10 galoisidentify|10 galoisinit|10 galoisisabelian|10 galoisisnormal|10 galoispermtopol|10 galoissubcyclo|10 galoissubfields|10 galoissubgroups|10 gammah gamma gammamellininvasymp|10 gcdext|10 gcd genus2red|10 getabstime|10 getenv getheap|10 getrand|10 getstack|10 gettime getwalltime|10 global' +
  ' hammingweight|10 hilbert hyperellcharpoly|10 hyperellpadicfrobenius|10 hyperu|10' +
  ' idealadd|5 idealaddtoone|10 idealappr|10 idealchinese|10 idealcoprime|10 idealdiv|10 idealfactorback|10 idealfactor|5 idealfrobenius|10 idealhnf|5 idealintersect|10 idealinv|10 ideallistarch|10 ideallist|5 ideallog|10 idealmin|10 idealmul|5 idealnorm idealnumden|10 idealpow|10 idealprimedec|10 idealprincipalunits|10 idealramgroups|10 idealred|10 idealstar|10 idealtwoelt|5 idealval|10 iferr|10 if imag incgamc|10 incgam inline input install intcirc|10 intformal|10 intfuncinit|10 intnumgaussinit|10 intnumgauss|5 intnuminit|10 intnum intnumromb|10 isfundamental|10 ispolygonal|10 ispowerful|10 ispower isprime isprimepower|10 ispseudoprime|5 ispseudoprimepower|10 issquarefree|10 issquare istotient|10' +
  ' kill kronecker' +
  ' lambertw|10 lcm length lex lfunan|10 lfunartin|10 lfuncreate|10 lfundiv|10 lfunetaquo|10 lfunmul|10 lfunqf|10 lfunsymsq|10 liftall|10 liftint|10 lift liftpol|10 limitnum|10 lindep|10 listcreate|10 listinsert|10 List listkill|10 listpop|10 listput|10 listsort|10 lngamma localbitprec|10 local localprec|10 logint log' +
  ' mapdelete|10 mapget|10 mapisdefined|10 Map mapput|10 matadjoint|10 matalgtobasis|10 matbasistoalg|10 matcompanion|10 matconcat|10 matdetint|10 matdet matdiagonal|10 mateigen|10 matfrobenius|10 mathess|10 mathilbert|10 mathnf mathnfmodid|10 mathnfmod|5 mathouseholder|10 matid|10 matimagecompl|10 matimage matindexrank|10 matintersect|10 matinverseimage|10 matisdiagonal|10 matkerint|10 matker|5 Mat matmuldiagonal|10 matmultodiagonal|10 matpascal|10 matqr|10 matrank|10 matrix matrixqz|10 matsize|10 matsnf|10 matsolve matsolvemod|10 matsupplement|10 mattranspose|10 max min minpoly|10 Mod modreverse|10 moebius|5 msatkinlehner|10 mscuspidal|10 mseisenstein|10 mseval|10 msfromcusp|10 msfromell|10 mshecke|10 msinit|10 msissymbol|10 msnew|10 mspathgens|10 mspathlog|10 msqexpansion|10 mssplit|10 msstar|10 my' +
  ' newtonpoly|10 next nextprime|10 nfalgtobasis|5 nfbasis nfbasistoalg|5 nfcertify|5 nfcompositum|10 nfdetint|10 nfdisc|5 nfeltadd|10 nfeltdiveuc|10 nfeltdiv nfeltdivmodpr|10 nfeltdivrem|10 nfeltmod|10 nfeltmul|5 nfeltmulmodpr|10 nfeltnorm|5 nfeltpow|5 nfeltpowmodpr|10 nfeltreduce|5 nfeltreducemodpr|10 nfelttrace|5 nfeltval|10 nffactorback|10 nffactor nffactormod|10 nfgaloisapply|10 nfgaloisconj|10 nfgrunwaldwang|10 nfhilbert|10 nfhnf nfhnfmod|10 nfinit nfisideal|10 nfisincl|10 nfisisom|10 nfkermodpr|10 nfmodprinit|10 nfnewprec|10 nfroots|5 nfrootsof1|10 nfsnf|10 nfsolvemodpr|10 nfsplitting|10 nfsubfields|10 norm norml2|10 normlp|10 numbpart|10 numdiv|10 numerator numtoperm|10' +
  ' O omega' +
  ' padicappr|10 padicfields|10 padicprec|10 parapply|10 pareval|10 parfor parforprime|10 parforvec|10 parselect|10 parsum|10 partitions parvector|10 permtonum|10 plotbox|10 plotclip|10 plotcolor|10 plotcopy|10 plotcursor|10 plotdraw|10 ploth plothraw|5 plothsizes|10 plotinit|10 plot plotkill|10 plotlines|10 plotlinetype|10 plotmove|10 plotpointsize|10 plotpoints|5 plotpointtype|10 plotrbox|10 plotrecth|5 plotrecthraw|10 plotrline|10 plotrmove|10 plotrpoint|10 plotscale|10 plotstring|10 polchebyshev|10 polclass|10 polcoeff|10 polcompositum|10 polcyclofactors|10 polcyclo poldegree|10 poldisc poldiscreduced|10 polgalois|10 polgraeffe|10 polhensellift|10 polhermite|10 polinterpolate|10 poliscyclo|5 poliscycloprod|10 polisirreducible|10 Pol pollead|10 pollegendre|10 polmodular|10 polrecip|10 polredabs|5 polredbest|5 polred polredord|10 polresultantext|10 polresultant|5 Polrev|10 polrootsff|10 polroots polrootsmod|10 polrootspadic|10 polrootsreal|10 polsturm|10 polsubcyclo|10 polsylvestermatrix|10 polsym|10 poltchebi|10 poltschirnhaus|10 polylog|10 polzagier|10 powers precision precprime|10 prime primepi|10 primes print1|10 printf print printp1|10 printp printsep1|10 printsep printtex|10 prodeuler|10 prodinf|10 prod psdraw|10 psi psploth|5 psplothraw|10' +
  ' qfautoexport|10 qfauto|5 qfbclassno|10 qfbcompraw|10 qfbhclassno|10 qfbil|10 Qfb|10 qfbnucomp|10 qfbnupow|10 qfbpowraw|10 qfbprimeform|10 qfbred|5 qfbredsl2|10 qfbsolve|10 qfgaussred|10 qfisominit|10 qfisom|5 qfjacobi|10 qflllgram|10 qflll|5 qfminim|10 qfnorm|10 qforbits|10 qfparam|10 qfperfection|10 qfrep|10 qfsign|10 qfsolve|10 quadclassunit|10 quaddisc|10 quadgen|10 quadhilbert|10 quadpoly|10 quadray|10 quadregulator|10 quadunit|10 quit' +
  ' ramanujantau|10 random randomprime|10 read readstr|10 readvec|10 real removeprimes|10 return rnfalgtobasis|10 rnfbasis|5 rnfbasistoalg|10 rnfcharpoly|10 rnfconductor|10 rnfdedekind|10 rnfdet|10 rnfdisc|10 rnfeltabstorel|10 rnfeltdown|10 rnfeltnorm|10 rnfeltreltoabs|10 rnfelttrace|10 rnfeltup|10 rnfequation|10 rnfhnfbasis|10 rnfidealabstorel|10 rnfidealdown|10 rnfidealhnf|10 rnfidealmul|10 rnfidealnormabs|10 rnfidealnormrel|10 rnfidealreltoabs|10 rnfidealtwoelt|10 rnfidealup|10 rnfinit|10 rnfisabelian|10 rnfisfree|10 rnfisnorminit|10 rnfisnorm|5 rnfkummer|10 rnflllgram|10 rnfnormgroup|10 rnfpolredabs|10 rnfpolredbest|10 rnfpolred rnfpseudobasis|10 rnfsteinitz|10 round' +
  ' select seralgdep|10 serconvol|10 Ser serlaplace|10 serreverse|10 setbinop|10 setintersect|10 setisset|10 Set setminus|10 setrand|10 setsearch|10 setunion|10 shift shiftmul|10 sigma sign simplify sinc sinh sin sizebyte|10 sizedigit|10 solve solvestep|10 sqr sqrtint|10 sqrt sqrtnint|10 sqrtn stirling Strchr|10 Strexpand|10 Str Strprintf|10 Strtex|10 subgrouplist|10 subst substpol|10 substvec|10 sumalt|10 sumdedekind|10 sumdigits|10 sumdiv sumdivmult|10 sumformal|10 suminf|10 sum sumnumalt|10 sumnuminit|10 sumnum sumnummonieninit|10 sumnummonien|5 sumpos|10 system' +
  ' tanh tan taylor teichmuller|10 theta thetanullk|10 thueinit|10 thue trace trap truncate type' +
  ' uninline|10 until' +
  ' valuation varhigher|10 variable varlower|10 vecextract|10 Vec vecmax|10 vecmin|10 Vecrev|10 vecsearch|10 Vecsmall|10 vecsort|10 vecsum vector vectorsmall|10 vectorv|10' +
  ' warning weber|10 whatnow|10 while write1|10 writebin|10 write writetex|10' +
  ' zeta zetakinit|10 zetak zetamult|10 zncoppersmith|10 znlog|10 znorder|10 znprimroot|10 znstar|10',
    literal: 'Catalan Euler I oo Pi'
  };
  var LEXEMES = /\b[':.]?[a-zA-Z0-9_]+\b/;
  var GP_NUMBER_REGEX = /\b-?((([0-9]*\.[0-9]+)|([0-9]+(\.[0-9]*)?[Ee]-?[0-9]+)|-?(\.[0-9]+[Ee]-?[0-9]+)|([0-9]+\.))|[0-9]+|0[xX][0-9a-fA-F]*|0[bB][01]*)/;
  var GP_MONOMIAL_REGEX = /'[a-zA-Z][a-zA-Z0-9_]*\b/;
  var GP_TYPE_REGEX = /\bt_(INT|REAL|INTMOD|FRAC|FFELT|COMPLEX|PADIC|QUAD|POLMOD|POL|SER|RFRAC|QFR|QFI|VEC|COL|MAT|LIST|STR|VECSMALL|CLOSURE)/;
  var GP_ERROR_REGEX = /\be_(SYNTAX|BUG|ALARM|FILE|MISC|FLAG|IMPL|ARCH|PACKAGE|NOTFUNC|PREC|TYPE|DIM|VAR|PRIORITY|USER|STACK|OVERFLOW|DOMAIN|COMPONENT|MAXPRIME|CONSTPOL|IRREDPOL|COPRIME|PRIME|MODULUS|ROOTS0|OP|TYPE2|INV|MEM|SQRTN|NONE)\b/;
  var GP_DEFAULT_REGEX = /(breakloop|colors|compatible|datadir|debug|debugfiles|debugmem|echo|factor_add_primes|factor_proven|format|graphcolormap|graphcolors|help|histfile|histsize|lines|linewrap|log|logfile|nbthreads|new_galois_format|output|parisize|parisizemax|path|prettyprinter|primelimit|prompt|prompt_cont|psfile|readline|realbitprecision|realprecision|recover|secure|seriesprecision|simplify|sopath|strictargs|strictmatch|TeXstyle|threadsize|threadsizemax|timer)/;
  var GP_MEMBER_FUNCTION_REGEX = /\.(a[1-6]|b[2-8]|c[4-6]|area|bid|bnf|clgp|cyc|diff|codiff|disc|e|f|fu|gen|group|index|j|mod|nf|no|omega|eta|orders|p|pol|polabs|reg|roots|sign|r[12]|t2|tate|tu|zk|zkst)/;
  
  var GP_NUMBER = {className: 'number', begin: GP_NUMBER_REGEX, relevance: 0};
  var GP_MONOMIAL = {className: 'literal', begin: GP_MONOMIAL_REGEX, relevance: 0};
  var GP2C_TYPE = {className: 'type', begin: /:(void|bool|negbool|small|int|real|mp|var|pol|vecsmall|vec|list|str|genstr|gen|lg|typ|nf|bnf|bnr|ell|gal|prid)/, relevance: 5};
  var GP_TYPE = {className: 'type', begin: GP_TYPE_REGEX, relevance: 10}
  var GP_ERROR = {className: 'meta-keyword', begin: GP_ERROR_REGEX, relevance: 10};
  var GP_MEMBER_FUNCTION = {className: 'keyword', begin: GP_MEMBER_FUNCTION_REGEX, relevance: 0};
  var GP_DEFAULT = {className: 'keyword', begin: GP_DEFAULT_REGEX};
  var GP_LINE_COMMENT = {
    className: 'comment',
    begin: /\\\\/, end: /$/,
    relevance: 5,
    contains: [
      hljs.PHRASAL_WORDS_MODE,
      {
        className: 'doctag',
        begin: /\b(?:TODO|FIXME|NOTE|BUG|XXX)\b/
      }
    ]
  };
  var GP_STRING = {
    className: 'string',
    begin: '"', end: '"',
    illegal: /\n/,
    contains: [
      GP_TYPE,
      GP_ERROR,
      hljs.BACKSLASH_ESCAPE
    ]
  };
  
  return {
    aliases: ['gp', 'gpi'],
    lexemes: LEXEMES,
    keywords: GP_KEYWORDS,
    contains: [
      GP_NUMBER,
      GP_MONOMIAL,
      GP2C_TYPE,
      GP_LINE_COMMENT,
      GP_STRING,
      GP_MEMBER_FUNCTION,
      GP_DEFAULT,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };
}
