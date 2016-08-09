/*
Language: PARI/GP
Author: Charles R Greathouse IV <charles@crg4.com>
Category: scientific
*/

function(hljs) {
  var GP_KEYWORDS  = {
    keyword: 'abs acosh acos addhelp addprimes agm algabsdim algadd algalgtobasis algaut algbasis algbasistoalg algb algcenter algchar algcharpoly algdegree algdep algdim algdisc algdivl algdivr alggroup alghassef alghassei alghasse algindex alginit alginvbasis alginv algisassociative algiscommutative algisdivision algisdivl algisinv algisramified algissemisimple algissimple algissplit alglathnf algleftmultable algmul algmultable algneg algnorm algpoleval algpow algprimesubalg algradical algramifiedplaces algrandom algrelmultable algsimpledec algsplittingdata algsplittingfield algsplittingmatrix algsqr algsubalg algsub algtableinit algtensor algtrace algtype alias allocatemem apply arg asinh asin asympnum atanh atan' +
  ' bernfrac bernpol bernreal bernvec besselh1 besselh2 besseli besseljh besselj besselk besseln bestappr bestapprPade bezout bezoutres bigomega binary binomial bitand bitnegimply bitneg bitor bitprecision bittest bitxor bnfcertify bnfcompress bnfdecodemodule bnfinit bnfisintnorm bnfisnorm bnfisprincipal bnfissunit bnfisunit bnfnarrow bnfsignunit bnfsunit bnrchar bnrclassno bnrclassnolist bnrconductor bnrconductorofchar bnrdisc bnrdisclist bnrgaloisapply bnrgaloismatrix bnrinit bnrisconductor bnrisgalois bnrisprincipal bnrL1 bnrrootnumber bnrstark break' +
  ' call ceil centerlift characteristic charconj chardiv chareval charker charmul charorder charpoly chinese clone cmp Col Colrev component concat conj conjvec content contfraceval contfracinit contfrac contfracpnqn copy coredisc core cosh cos cotanh cotan' +
  ' default denominator deriv derivnum diffop digits dilog dirdiv direuler dirmul dirzetak divisors divrem' +
  ' eint1 elladd ellak ellan ellap ellbil ellcard ellchangecurve ellchangepointinv ellchangepoint ellconvertname elldivpol elleisnum elleta ellformaldifferential ellformalexp ellformallog ellformalpoint ellformalw ellfromeqn ellfromj ellgenerators ellglobalred ellgroup ellheegner ellheight ellheightmatrix ellidentify ellinit ellisdivisible ellisogenyapply ellisogeny ellisomat ellisoncurve ellissupersingular ellj elllocalred elllog elllseries ellminimalmodel ellminimaltwist ellmoddegree ellmodulareqn ellmul ellneg ellnonsingularmultiple ellorder ellordinate ellpadicfrobenius ellpadicheight ellpadicheightmatrix ellpadicL ellpadiclog ellpadics2 ellperiods ellpointtoz ellpow ellrootno ellsea ellsearch ellsigma ellsub elltaniyama elltatepairing elltors elltwist ellweilpairing ellwp ellxn ellzeta ellztopoint erfc errname error eta eulerphi eval exp expm1 extern externstr' +
  ' factorback factorcantor factorff factorial factorint factor factormod factornf factorpadic ffgen ffinit fflog ffnbirred fforder ffprimroot fibonacci floor fold forcomposite fordiv forell for forpart forprime forqfvec forstep forsubgroup forvec frac fromdigits' +
  ' galoisexport galoisfixedfield galoisgetpol galoisidentify galoisinit galoisisabelian galoisisnormal galoispermtopol galoissubcyclo galoissubfields galoissubgroups gammah gamma gammamellininvasymp gammamellininv gammamellininvinit gcdext gcd genus2red getabstime getenv getheap getrand getstack gettime getwalltime global' +
  ' hammingweight hilbert hyperellcharpoly hyperellpadicfrobenius hyperu' +
  ' idealadd idealaddtoone idealappr idealchinese idealcoprime idealdiv idealfactorback idealfactor idealfrobenius idealhnf idealintersect idealinv ideallistarch ideallist ideallog idealmin idealmul idealnorm idealnumden idealpow idealprimedec idealprincipalunits idealramgroups idealred idealstar idealtwoelt idealval iferr if imag incgamc incgam inline input install intcirc intformal intfuncinit intnumgaussinit intnumgauss intnuminit intnum intnumromb isfundamental ispolygonal ispowerful ispower isprime isprimepower ispseudoprime ispseudoprimepower issquarefree issquare istotient' +
  ' kill kronecker' +
  ' lambertw lcm length lex lfun lfunabelianrelinit lfunan lfunartin lfuncheckfeq lfunconductor lfuncost lfuncreate lfundiv lfunetaquo lfungenus2 lfunhardy lfuninit lfunlambda lfunmfspec lfunmul lfunorderzero lfunqf lfunrootres lfunsymsq lfuntheta lfunthetacost lfunthetainit lfunzeros liftall liftint lift liftpol limitnum lindep listcreate listinsert List listkill listpop listput listsort lngamma localbitprec local localprec logint log' +
  ' mapdelete mapget mapisdefined Map mapput matadjoint matalgtobasis matbasistoalg matcompanion matconcat matdetint matdet matdiagonal mateigen matfrobenius mathess mathilbert mathnf mathnfmodid mathnfmod mathouseholder matid matimagecompl matimage matindexrank matintersect matinverseimage matisdiagonal matkerint matker Mat matmuldiagonal matmultodiagonal matpascal matqr matrank matrix matrixqz matsize matsnf matsolve matsolvemod matsupplement mattranspose max min minpoly Mod modreverse moebius msatkinlehner mscuspidal mseisenstein mseval msfromcusp msfromell msfromhecke msgetlevel msgetsign msgetweight mshecke msinit msissymbol msnew msomseval mspadicinit mspadicL mspadicmoments mspadicseries mspathgens mspathlog msqexpansion mssplit msstar mstooms my' +
  ' newtonpoly next nextprime nfalgtobasis nfbasis nfbasistoalg nfcertify nfcompositum nfdetint nfdisc nfeltadd nfeltdiveuc nfeltdiv nfeltdivmodpr nfeltdivrem nfeltmod nfeltmul nfeltmulmodpr nfeltnorm nfeltpow nfeltpowmodpr nfeltreduce nfeltreducemodpr nfelttrace nfeltval nffactorback nffactor nffactormod nfgaloisapply nfgaloisconj nfgrunwaldwang nfhilbert nfhnf nfhnfmod nfinit nfisideal nfisincl nfisisom nfkermodpr nfmodprinit nfnewprec nfroots nfrootsof1 nfsnf nfsolvemodpr nfsplitting nfsubfields norm norml2 normlp numbpart numdiv numerator numtoperm' +
  ' O omega' +
  ' padicappr padicfields padicprec parapply pareval parfor parforprime parforvec parselect parsum partitions parvector permtonum plotbox plotclip plotcolor plotcopy plotcursor plotdraw ploth plothraw plothsizes plotinit plot plotkill plotlines plotlinetype plotmove plotpointsize plotpoints plotpointtype plotrbox plotrecth plotrecthraw plotrline plotrmove plotrpoint plotscale plotstring polchebyshev polclass polcoeff polcompositum polcyclofactors polcyclo poldegree poldisc poldiscreduced polgalois polgraeffe polhensellift polhermite polinterpolate poliscyclo poliscycloprod polisirreducible Pol pollead pollegendre polmodular polrecip polredabs polredbest polred polredord polresultantext polresultant Polrev polrootsff polroots polrootsmod polrootspadic polrootsreal polsturm polsubcyclo polsylvestermatrix polsym poltchebi poltschirnhaus polylog polzagier powers precision precprime prime primepi primes print1 printf print printp1 printp printsep1 printsep printtex prodeuler prodinf prod psdraw psi psploth psplothraw' +
  ' qfautoexport qfauto qfbclassno qfbcompraw qfbhclassno qfbil Qfb qfbnucomp qfbnupow qfbpowraw qfbprimeform qfbred qfbredsl2 qfbsolve qfgaussred qfisominit qfisom qfjacobi qflllgram qflll qfminim qfnorm qforbits qfparam qfperfection qfrep qfsign qfsolve quadclassunit quaddisc quadgen quadhilbert quadpoly quadray quadregulator quadunit quit' +
  ' ramanujantau random randomprime read readstr readvec real removeprimes return rnfalgtobasis rnfbasis rnfbasistoalg rnfcharpoly rnfconductor rnfdedekind rnfdet rnfdisc rnfeltabstorel rnfeltdown rnfeltnorm rnfeltreltoabs rnfelttrace rnfeltup rnfequation rnfhnfbasis rnfidealabstorel rnfidealdown rnfidealfactor rnfidealhnf rnfidealmul rnfidealnormabs rnfidealnormrel rnfidealprimedec rnfidealreltoabs rnfidealtwoelt rnfidealup rnfinit rnfisabelian rnfisfree rnfisnorminit rnfisnorm rnfkummer rnflllgram rnfnormgroup rnfpolredabs rnfpolredbest rnfpolred rnfpseudobasis rnfsteinitz round' +
  ' select seralgdep serconvol Ser serlaplace serprec serreverse setbinop setintersect setisset Set setminus setrand setsearch setunion shift shiftmul sigma sign simplify sinc sinh sin sizebyte sizedigit solve solvestep sqr sqrtint sqrt sqrtnint sqrtn stirling Strchr Strexpand Str Strprintf Strtex subgrouplist subst substpol substvec sumalt sumdedekind sumdigits sumdiv sumdivmult sumformal suminf sum sumnumalt sumnuminit sumnum sumnummonieninit sumnummonien sumpos system' +
  ' tanh tan taylor teichmuller theta thetanullk thueinit thue trace trap truncate type' +
  ' uninline until' +
  ' valuation varhigher variable varlower vecextract Vec vecmax vecmin Vecrev vecsearch Vecsmall vecsort vecsum vector vectorsmall vectorv' +
  ' warning weber whatnow while write1 writebin write writetex' +
  ' zeta zetakinit zetak zetamult zncharinduce zncharisodd znconreychar znconreyconductor znconreyexp znconreylog zncoppersmith znlog znorder znprimroot znstar',
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
