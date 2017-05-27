/*
Language: Csound
Author: Nathan Whetsell <nathan.whetsell@gmail.com>
Category: miscellaneous
*/

function(hljs) {
  function bracedStringModesWithSubLanguage(subLanguage) {
    return [
      {
        className: 'string',
        begin: /{{/,
        starts: {
          end: /}}/, returnEnd: true,
          subLanguage: subLanguage
        }
      },
      {
        className: 'string',
        begin: /}}/,
        endsParent: true
      }
    ];
  }

  var Csound = {
    illegal: '`',
    COMMENT_MODES: [
      hljs.COMMENT(';', '$', {relevance: 0}),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ],
    MACRO_USE_MODE: {
      className: 'meta',
      begin: /\$[A-Z_a-z]\w*(?:\.|\b)/
    },
    NUMBER_MODE: {
      className: 'number',
      relevance: 0,
      variants: [
        {begin: /\b(?:(?:\d+[Ee][+-]?\d+)|(?:\d+\.\d*|\d*\.\d+)(?:[Ee][+-]?\d+)?)\b/},
        {begin: /\b0[Xx][0-9A-Fa-f]+\b/},
        {begin: /\b\d+\b/}
      ]
    },
    PREPROCESSOR_MODES: [
      {
        className: 'meta',
        begin: /#(?:(?:e(?:lse|nd(?:if)?)|include)\b|##)|@+[ \t]*\d*/
        // This handles #include directives, and the following file path is
        // handled as a quoted string. However, file paths after #include
        // directives can begin and end with any character, not just "
        // <https://csound.github.io/docs/manual/include.html>.
      },
      {
        className: 'meta',
        begin: /#[ \t]*define/, end: '#',
        contains: [
          {
            className: 'meta-params',
            begin: /\(/, end: /\)/
          },
          {
            begin: '#', end: '#',
            endsParent: true
          }
        ]
      },
      {
        className: 'meta',
        begin: /#(?:i(?:fn?def)|undef)/, end: /\n/
      }
    ]
  };

  Csound.contains = Csound.COMMENT_MODES.concat([
    Csound.MACRO_USE_MODE,
    {
      beginKeywords: 'instr', end: /$/,
      contains: [
        {
          className: 'title',
          begin: /\d+|[A-Z_a-z]\w*/
        }
      ]
    },
    {
      beginKeywords: 'opcode', end: /$/,
      contains: [
        {
          className: 'params',
          begin: /,\s*/, end: /\b(?:0|[afijkKoOpPStV\[\]]+)\b/,
          excludeBegin: true
        },
        {
          className: 'title',
          begin: /[A-Z_a-z]\w*\b/
        }
      ]
    },
    {
      className: 'symbol',
      begin: /^[ \t]*\w+:/
    }
  ]).concat(
    Csound.PREPROCESSOR_MODES
  ).concat([
    {
      className: 'built_in',
      relevance: 10,
      begin: /\b0dbfs\b/
    },
    {
      className: 'built_in',
      begin: /\b(?:A4|k(?:r|smps)|nchnls(?:_i)?|sr)\b/
    },
    Csound.NUMBER_MODE,
    {
      className: 'string',
      begin: '"', end: '"',
      illegal: /\n/,
      contains: [
        Csound.MACRO_USE_MODE,
        hljs.BACKSLASH_ESCAPE
      ]
    },
    {
      className: 'string',
      begin: /{{/, end: /}}/
    },
    {
      className: 'keyword',
      variants: [
        {begin: /\b(?:do|else(?:if)?|end(?:i[fn]|op|until)|fi|i(?:f|then)|kthen|od|r(?:ir)?eturn|then|until|while)\b/},
        {begin: /\b((?:c(?:g|in?|k|nk?)goto)|goto|igoto|kgoto|loop_[gl][et]|r(?:einit|igoto)|ti(?:goto|mout))\b/}
      ]
    },
    {
      begin: /\b(?:readscore|scoreline(?:_i)?)\b/, end: /}}/,
      keywords: {built_in: 'readscore scoreline scoreline_i'},
      contains: bracedStringModesWithSubLanguage('csound-score')
    },
    {
      begin: /\bpyl?run[it]?\b/, end: /}}/,
      keywords: {built_in: 'pylrun pylruni pylrunt pyrun pyruni pyrunt'},
      contains: bracedStringModesWithSubLanguage('python')
    },
    {
      begin: /\blua_(?:exec|opdef)\b/, end: /}}/,
      keywords: {built_in: 'lua_exec lua_opdef'},
      contains: bracedStringModesWithSubLanguage('lua')
    },
    {
      className: 'built_in',
      begin: /\bp\d+\b/
    },
    {
      className: 'built_in',
      // To update this regex, enter
      /*
         curl https://bitbucket.org/nwhetsell/pygments-main/raw/tip/pygments/regexopt.py > regexopt.py
         curl https://bitbucket.org/nwhetsell/pygments-main/raw/tip/pygments/lexers/_csound_builtins.py > _csound_builtins.py
         python -c "import re; from _csound_builtins import OPCODES, DEPRECATED_OPCODES; from regexopt import regex_opt; print '/' + (regex_opt(OPCODES, r'\b', r'\b') + '|' + regex_opt(DEPRECATED_OPCODES, r'\b', r'\b')).replace('\\_', '_') + '/'"
      */
      // in Terminal, and then paste the output.
      begin: /\b(ATS(?:add(?:(?:nz)?)|bufread|cross|in(?:fo|terpread)|partialtap|read(?:(?:nz)?)|sinnoi)|FL(?:b(?:ox|ut(?:Bank|ton))|c(?:loseButton|o(?:lor(?:(?:2)?)|unt))|execButton|g(?:etsnap|roup(?:(?:(?:E|_e)nd)?))|h(?:ide|vsBox(?:(?:SetValue)?))|joy|k(?:eyIn|nob)|l(?:abel|oadsnap)|mouse|p(?:a(?:ck(?:(?:(?:E|_e)nd)?)|nel(?:(?:(?:E|_e)nd)?))|rintk(?:(?:2)?))|r(?:oller|un)|s(?:avesnap|croll(?:(?:(?:E|_e)nd)?)|et(?:Align|Box|Color(?:(?:2)?)|Font|Position|S(?:ize|napGroup)|Text(?:(?:Color|(?:Siz|Typ)e)?)|Val(?:(?:(?:(?:_)?)i)?)|snap)|how|lid(?:Bnk(?:(?:2(?:(?:Set(?:(?:k)?))?)|GetHandle|Set(?:(?:k)?))?)|er))|t(?:abs(?:(?:(?:E|_e)nd)?)|ext)|update|v(?:alue|keybd|slidBnk(?:(?:2)?))|xyin)|Jacko(?:Audio(?:In(?:(?:Connect)?)|Out(?:(?:Connect)?))|Freewheel|In(?:fo|it)|Midi(?:(?:InConnec|Ou(?:(?:tConnec)?))t)|NoteOut|On|Transport)|K35_(?:(?:[hl])pf)|Mixer(?:Clear|GetLevel|Receive|Se(?:nd|tLevel(?:(?:_i)?)))|OSC(?:init(?:(?:M)?)|listen|raw|send(?:(?:A|_lo)?))|STK(?:B(?:andedWG|eeThree|low(?:Botl|Hole)|owed|rass)|Clarinet|Drummer|F(?:MVoices|lute)|HevyMetl|M(?:andolin|o(?:dalBar|og))|P(?:ercFlut|lucked)|R(?:esonate|hodey)|S(?:axofony|hakers|i(?:mple|tar)|tifKarp)|TubeBell|VoicForm|W(?:histle|urley))|a(?:bs|ctive|ds(?:r|yn(?:(?:t(?:(?:2)?))?))|ftouch|l(?:pass|wayson)|mp(?:db(?:(?:fs)?)|midi(?:(?:d)?))|reson(?:(?:k)?)|tone(?:(?:[kx])?))|b(?:a(?:bo|lance|mboo|rmodel)|bcut(?:[ms])|e(?:(?:tara|xpr)nd)|form(?:(?:de|en)c1)|i(?:nit|quad(?:(?:a)?)|rnd)|pf|qrez|u(?:chla|t(?:b(?:[pr])|hp|lp|t(?:er(?:b(?:[pr])|(?:[hl])p)|on))|zz))|c(?:2r|a(?:basa|uchy(?:(?:i)?))|brt|e(?:il|ll|nt(?:(?:roid)?)|ps(?:(?:inv)?))|h(?:an(?:ctrl|ged(?:(?:2)?)|[io])|e(?:byshevpoly|ckbox)|n(?:_(?:[Sak])|clear|export|get|mix|params|set)|uap)|l(?:ear|filt|ip|ocko(?:ff|n))|mp(?:(?:lxprod)?)|o(?:m(?:b(?:(?:inv)?)|p(?:ile(?:csd|orc|str)|ress(?:(?:2)?)))|n(?:nect|trol|v(?:(?:l|olv)e))|py(?:a2ftab|f2array)|s(?:(?:h|inv|seg(?:(?:[br])?))?))|p(?:s(?:2pch|midi(?:(?:b|nn)?)|oct|pch|t(?:mid|un(?:(?:i)?))|xpch)|u(?:meter|prc))|r(?:oss(?:2|fm(?:(?:i|pm(?:(?:i)?))?)|pm(?:(?:i)?))|unch)|t(?:lchn|rl(?:14|21|7|init))|userrnd)|d(?:a(?:m|te(?:(?:s)?))|b(?:(?:(?:(?:fs)?)amp)?)|c(?:block(?:(?:2)?)|onv|t(?:(?:inv)?))|e(?:l(?:ay(?:(?:[1krw])?)|tap(?:(?:xw|[3inx])?))|norm)|i(?:ff|ode_ladder|rectory|s(?:k(?:grain|in(?:(?:2)?))|p(?:fft|lay)|tort(?:(?:1)?))|vz)|o(?:ppler|t|wnsamp)|ripwater|ssi(?:a(?:ctivate|udio)|ctls|(?:ini|lis)t)|u(?:mpk(?:(?:[234])?)|s(?:errnd|t(?:(?:2)?))))|e(?:nvlpx(?:(?:r)?)|phasor|qfil|v(?:alstr|ent(?:(?:_i)?))|x(?:citer|itnow|p(?:(?:curve|on|rand(?:(?:i)?)|seg(?:(?:ba|[abr])?))?)))|f(?:a(?:reylen(?:(?:i)?)|ust(?:audio|c(?:ompile|tl)|gen))|ft(?:(?:inv)?)|i(?:close|l(?:e(?:bit|len|nchnls|peak|s(?:cal|r)|valid)|larray|ter2)|n(?:(?:[ik])?)|open)|l(?:a(?:nger|shtxt)|oo(?:per(?:(?:2)?)|r)|uid(?:AllOut|C(?:C(?:[ik])|ontrol)|Engine|Load|Note|Out|ProgramSelect|SetInterpMethod))|m(?:anal|b(?:3|ell)|metal|percfl|(?:rhod|voic|wurli)e)|o(?:f(?:2|ilter)|l(?:d|low(?:(?:2)?))|scil(?:(?:i)?)|ut(?:(?:ir|[ik])?)|[fg])|print(?:(?:(?:k)?)s)|r(?:a(?:c(?:(?:talnoise)?)|mebuffer)|eeverb)|t(?:c(?:hnls|onv|ps)|free|gen(?:(?:once|tmp)?)|l(?:en|oad(?:(?:k)?)|ptim)|morf|om|resize(?:(?:i)?)|s(?:a(?:mplebank|ve(?:(?:k)?))|r)))|g(?:a(?:in(?:(?:slider)?)|uss(?:(?:i|trig)?))|buzz|e(?:n(?:array(?:(?:_i)?)|dy(?:(?:[cx])?))|t(?:c(?:fg|ol)|ftargs|row|seed))|ogobel|ra(?:in(?:(?:[23])?)|nule)|uiro)|h(?:armon(?:(?:[234])?)|df5(?:read|write)|ilbert(?:(?:2)?)|rtf(?:early|move(?:(?:2)?)|reverb|stat)|sboscil|vs(?:[123]))|i(?:hold|mage(?:create|free|getpixel|load|s(?:ave|etpixel|ize))|n(?:(?:32|ch|it(?:(?:c(?:14|21|7))?)|let(?:kid|[afkv])|rg|s(?:global|remot)|te(?:g|rp)|value|[hoqstxz])?))|j(?:acktransport|itter(?:(?:2)?)|oystick|spline)|l(?:a_(?:i_(?:a(?:dd_(?:m(?:[cr])|v(?:[cr]))|ssign_(?:m(?:[cr])|t|v(?:[cr])))|conjugate_(?:m(?:[cr])|v(?:[cr]))|d(?:i(?:stance_v(?:[cr])|vide_(?:m(?:[cr])|v(?:[cr])))|ot_(?:m(?:c_vc|r_vr|[cr])|v(?:[cr])))|get_(?:m(?:[cr])|v(?:[cr]))|invert_m(?:[cr])|l(?:ower_solve_m(?:[cr])|u_(?:det_m(?:[cr])|factor_m(?:[cr])|solve_m(?:[cr])))|m(?:c_(?:create|set)|r_(?:create|set)|ultiply_(?:m(?:[cr])|v(?:[cr])))|norm(?:1_(?:m(?:[cr])|v(?:[cr]))|_(?:euclid_(?:m(?:[cr])|v(?:[cr]))|inf_(?:m(?:[cr])|v(?:[cr]))|max_m(?:[cr])))|print_(?:m(?:[cr])|v(?:[cr]))|qr_(?:eigen_m(?:[cr])|factor_m(?:[cr])|sym_eigen_m(?:[cr]))|random_(?:m(?:[cr])|v(?:[cr]))|s(?:ize_(?:m(?:[cr])|v(?:[cr]))|ubtract_(?:m(?:[cr])|v(?:[cr])))|t(?:_assign|ra(?:ce_m(?:[cr])|nspose_m(?:[cr])))|upper_solve_m(?:[cr])|v(?:c_(?:create|set)|r_(?:create|set)))|k_(?:a(?:_assign|dd_(?:m(?:[cr])|v(?:[cr]))|ssign_(?:m(?:[cr])|v(?:[cr])|[aft]))|c(?:onjugate_(?:m(?:[cr])|v(?:[cr]))|urrent_(?:f|vr))|d(?:i(?:stance_v(?:[cr])|vide_(?:m(?:[cr])|v(?:[cr])))|ot_(?:m(?:c_vc|r_vr|[cr])|v(?:[cr])))|f_assign|get_(?:m(?:[cr])|v(?:[cr]))|invert_m(?:[cr])|l(?:ower_solve_m(?:[cr])|u_(?:det_m(?:[cr])|factor_m(?:[cr])|solve_m(?:[cr])))|m(?:c_set|r_set|ultiply_(?:m(?:[cr])|v(?:[cr])))|norm(?:1_(?:m(?:[cr])|v(?:[cr]))|_(?:euclid_(?:m(?:[cr])|v(?:[cr]))|inf_(?:m(?:[cr])|v(?:[cr]))|max_m(?:[cr])))|qr_(?:eigen_m(?:[cr])|factor_m(?:[cr])|sym_eigen_m(?:[cr]))|random_(?:m(?:[cr])|v(?:[cr]))|subtract_(?:m(?:[cr])|v(?:[cr]))|t(?:_assign|race_m(?:[cr]))|upper_solve_m(?:[cr])|v(?:(?:[cr])_set)))|enarray|fo|i(?:mit(?:(?:1)?)|n(?:e(?:(?:n(?:(?:r)?)|to)?)|k_(?:beat_(?:force|(?:ge|reques)t)|create|enable|is_enabled|metro|peers|tempo_(?:(?:[gs])et))|lin|rand|seg(?:(?:[br])?))|veconv)|o(?:cs(?:end|ig)|g(?:(?:10|2|btwo|curve)?)|op(?:seg(?:(?:p)?)|(?:[tx])seg)|renz|scil(?:(?:[3x])?)|w(?:pass2|res(?:(?:x)?)))|p(?:f(?:18|orm|reson)|hasor|interp|oscil(?:(?:sa(?:(?:2)?)|[3a])?)|re(?:ad|son)|s(?:hold(?:(?:p)?)|lot))|ua_(?:exec|i(?:aopcall(?:(?:_off)?)|kopcall(?:(?:_off)?)|opcall(?:(?:_off)?))|opdef))|m(?:a(?:ca|dsr|gs|nd(?:(?:[eo])l)|parray(?:(?:_i)?)|rimba|ssign|x(?:_k|a(?:bs(?:(?:accum)?)|ccum|lloc|rray))|[cx])|clock|delay|e(?:dian(?:(?:k)?)|tro)|fb|i(?:d(?:global|i(?:arp|c(?:14|21|7|h(?:annelaftertouch|n)|ontrolchange|trl)|default|filestatus|in|noteo(?:ff|n(?:cps|key|oct|pch))|o(?:n(?:(?:2)?)|ut)|p(?:gm|itchbend|olyaftertouch|rogramchange)|tempo)|remot)|n(?:(?:a(?:bs(?:(?:accum)?)|ccum|rray)|cer)?)|rror)|o(?:d(?:e|matrix)|nitor|og(?:(?:ladder(?:(?:2)?)|vcf(?:(?:2)?))?)|scil)|p(?:3(?:bitrate|in|len|nchnls|s(?:cal(?:(?:_(?:check|load(?:(?:2)?)|play(?:(?:2)?)))?)|r))|ulse)|rtmsg|to(?:[fn])|u(?:ltitap|te)|vc(?:hpf|lpf(?:[1234]))|xadsr)|n(?:chnls_hw|estedap|l(?:alp|filt(?:(?:2)?))|o(?:ise|t(?:eo(?:ff|n(?:(?:dur(?:(?:2)?))?))|num))|r(?:everb|pn)|s(?:amp|t(?:ance|rnum))|t(?:om|rpol)|xtpow2)|o(?:ct(?:ave|cps|midi(?:(?:b|nn)?)|pch)|labuffer|sc(?:bnk|il(?:(?:1i|ikt(?:(?:[ps])?)|[13insx])?))|ut(?:(?:32|ch|i(?:at|c(?:(?:14)?)|p(?:at|[bc]))|k(?:at|c(?:(?:14)?)|p(?:at|[bc]))|let(?:kid|[afkv])|q(?:[1234])|rg|s(?:[12])|value|[choqsxz])?))|p(?:5g(?:connect|data)|a(?:n(?:(?:2)?)|r(?:eq|t(?:2txt|i(?:als|kkel(?:(?:get|s(?:et|ync))?))))|ssign|ulstretch)|c(?:auchy|h(?:bend|midi(?:(?:b|nn)?)|oct|tom)|o(?:nvolve|unt))|d(?:clip|half(?:(?:y)?))|eak|gm(?:(?:assig|ch)n)|h(?:as(?:er(?:[12])|or(?:(?:bnk)?))|s)|i(?:n(?:dex|k(?:er|ish))|tch(?:(?:a(?:c|mdf))?))|l(?:a(?:net|terev)|(?:ltra|u)ck)|o(?:isson|l(?:2rect|y(?:aft|nomial))|rt(?:(?:k)?)|scil(?:(?:3)?)|w(?:(?:ershape|oftwo|s)?))|r(?:e(?:alloc|piano)|int(?:(?:_type|f_i|k(?:s2|[2s])|[fks])?)|oduct)|set|t(?:able(?:(?:iw|[3iw])?)|rack)|uts|v(?:add|bufread|cross|interp|oc|read|s(?:2(?:array|tab)|a(?:dsyn|nal|rp)|b(?:and(?:[pr])|in|lur|uf(?:fer|read(?:(?:2)?)))|c(?:ale|e(?:nt|ps)|ross)|d(?:emix|is(?:kin|p))|envftw|f(?:ilter|r(?:e(?:ad|eze)|omarray)|t(?:[rw])|write)|g(?:ain|endy)|hift|i(?:fd|n(?:(?:fo|it)?))|lock|m(?:aska|ix|o(?:(?:ot|rp)h))|o(?:sc|ut)|pitch|t(?:anal|encil|race)|voc|warp|ynth))|wd|y(?:assign(?:(?:[it])?)|call(?:(?:1(?:[it])|2(?:[it])|3(?:[it])|4(?:[it])|5(?:[it])|6(?:[it])|7(?:[it])|8(?:[it])|ni|[12345678int])?)|e(?:val(?:(?:[it])?)|xec(?:(?:[it])?))|init|l(?:assign(?:(?:[it])?)|call(?:(?:1(?:[it])|2(?:[it])|3(?:[it])|4(?:[it])|5(?:[it])|6(?:[it])|7(?:[it])|8(?:[it])|ni|[12345678int])?)|e(?:val(?:(?:[it])?)|xec(?:(?:[it])?))|run(?:(?:[it])?))|run(?:(?:[it])?)))|q(?:inf|nan)|r(?:2c|and(?:(?:om(?:(?:[hi])?)|[hi])?)|bjeq|e(?:ad(?:clock|fi|k(?:[234s])|sc(?:ore|ratch)|[fk])|ct2pol|init|lease|mo(?:teport|ve)|pluck|s(?:on(?:(?:xk|[krxyz])?)|yn)|verb(?:(?:2|sc)?)|windscore|zzy)|fft|ifft|ms|nd(?:(?:31)?)|ound|spline|tclock)|s(?:16b14|32b14|a(?:mphold|ndpaper)|c(?:_(?:lag(?:(?:ud)?)|phasor|trig)|a(?:le(?:(?:array)?)|n(?:hammer|table|[su]))|hed(?:kwhen(?:(?:named)?)|ule|when)|oreline(?:(?:_i)?))|e(?:ed|kere|lect|mitone|nse(?:(?:key)?)|qtime(?:(?:2)?)|rial(?:Begin|End|Flush|Print|Read|Write(?:(?:_i)?))|t(?:c(?:(?:o|tr)l)|ksmps|row|scorepos))|f(?:i(?:list|nstr(?:(?:3m|[3m])?))|lo(?:ad|oper)|p(?:assign|l(?:ay(?:(?:3m|[3m])?)|ist)|reset))|h(?:aker|ift(?:in|out))|i(?:gn(?:alflowgraph|um)|n(?:(?:h|inv|syn)?))|l(?:eighbells|i(?:cearray|der(?:16(?:(?:f|table(?:(?:f)?))?)|32(?:(?:f|table(?:(?:f)?))?)|64(?:(?:f|table(?:(?:f)?))?)|8(?:(?:f|table(?:(?:f)?))?)|Kawai)))|nd(?:loop|warp(?:(?:st)?))|o(?:ck(?:recv(?:(?:s)?)|send(?:(?:_k|s)?))|rt(?:[ad])|undin)|p(?:a(?:ce|t3d(?:(?:[it])?))|dist|litrig|rintf(?:(?:k)?)|send)|qrt|t(?:atevar|ix|r(?:c(?:at(?:(?:k)?)|har(?:(?:k)?)|mp(?:(?:k)?)|py(?:(?:k)?))|e(?:cv|son)|fromurl|get|index(?:(?:k)?)|l(?:en(?:(?:k)?)|ower(?:(?:k)?))|rindex(?:(?:k)?)|s(?:et|ub(?:(?:k)?))|to(?:(?:[dl])k|[dl])|upper(?:(?:k)?))|send)|u(?:binstr(?:(?:init)?)|m(?:(?:TableFilter|array)?))|vfilter|y(?:nc(?:grain|loop|phasor)|st(?:em(?:(?:_i)?)|ime)))|t(?:a(?:b(?:2pvs|_i|ifd|le(?:(?:3kt|copy|filter(?:(?:i)?)|gpw|i(?:copy|gpw|kt|mix|w)|kt|mix|ng|ra|s(?:eg|huffle(?:(?:i)?))|w(?:a|kt)|x(?:kt|seg)|[3iw])?)|morph(?:(?:ak|[ai])?)|play|rec|sum|w(?:(?:_i)?))|mbourine|n(?:h|inv(?:(?:2)?))|[bn])|b(?:0_init|1(?:(?:(?:[012345])?)_init|[012345])|2_init|3_init|4_init|5_init|6_init|7_init|8_init|9_init|vcf|[0123456789])|emp(?:est|o(?:(?:(?:sc|v)al)?))|i(?:me(?:dseq|inst(?:[ks])|[ks])|val)|lineto|one(?:(?:[kx])?)|r(?:a(?:dsyn|n(?:dom|seg(?:(?:[br])?)))|cross|filter|highest|i(?:g(?:ger|seq)|rand)|lowest|mix|s(?:cale|(?:hif|pli)t))|urno(?:ff(?:(?:2)?)|n)|vconv)|u(?:n(?:irand|wrap)|psamp|r(?:andom|d))|v(?:a(?:ctrol|dd(?:(?:_i|v(?:(?:_i)?))?)|get|lpass|set)|bap(?:(?:1move|gmove|lsinit|(?:(?:z)?)move|[gz])?)|c(?:ella|o(?:(?:2(?:(?:(?:f|i(?:f|ni))t)?)|mb|py(?:(?:_i)?))?))|d(?:el(?:_k|ay(?:(?:x(?:w(?:[qs])|[qsw])|[3kx])?))|ivv(?:(?:_i)?))|e(?:cdelay|loc|xp(?:(?:_i|seg|v(?:(?:_i)?))?))|i(?:b(?:es|r(?:(?:ato)?))|ncr)|l(?:i(?:mit|nseg)|owres)|m(?:ap|irror|ult(?:(?:_i|v(?:(?:_i)?))?))|o(?:ice|sim)|p(?:haseseg|o(?:rt|w(?:(?:_i|v(?:(?:_i)?))?))|voc)|rand(?:[hi])|subv(?:(?:_i)?)|tab(?:le(?:1k|w(?:[aik])|[aik])|w(?:[aik])|[aik])|wrap)|w(?:aveset|e(?:bsocket|ibull)|g(?:b(?:ow(?:(?:edbar)?)|rass)|clar|flute|pluck(?:(?:2)?)|uide(?:[12]))|i(?:i(?:connect|data|range|send)|ndow)|r(?:ap|itescratch)|terrain)|x(?:adsr|in|out|scan(?:map|smap|[su])|tratim|yscale)|z(?:a(?:cl|kinit|mod|rg|wm|[rw])|df_(?:1pole(?:(?:_mode)?)|2pole(?:(?:_mode)?)|ladder)|filter2|i(?:wm|[rw])|k(?:cl|mod|wm|[rw]))|[Saikp])\b|\b(array|bform(?:(?:de|en)c)|copy2(?:(?:[ft])tab)|hrtfer|ktableseg|lentab|m(?:(?:ax|in)tab)|p(?:op(?:(?:_f)?)|ush(?:(?:_f)?))|s(?:calet|ndload|oundout(?:(?:s)?)|pec(?:addm|di(?:ff|sp)|filt|hist|ptrk|s(?:cal|um)|trum)|tack|umtab)|tab(?:gen|map(?:(?:_i)?)|slice)|vbap(?:16|(?:[48])move|[48])|xyin)\b/
    }
  ]);

  return Csound;
}
