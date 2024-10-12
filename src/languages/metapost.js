/*
Language: MetaPost
Description: MetaPost refers to both a programming language and the interpreter
of the MetaPost programming language. Both are derived from Donald Knuth's
Metafont language and interpreter. MetaPost produces vector graphic diagrams
from a geometric/algebraic description. 
Author: Maxime Chupin <notezik@gmail.com>
Category: graphic
Website: https://tug.org/metapost.html
*/

/** @type LanguageFn */
export default function(hljs) {
  const regex = hljs.regex;

  const COMMENT = {
    hljs.COMMENT('%'),
  };


  const MACRO_DEF = {
    className: 'macro',
    beginKeywords: 'def vardef endef',
  };

  const STRING = {
    className: 'string',
    relevance: 0,
    hljs.QUOTE_STRING_MODE
  };
  const MP_KEYWORDS = [
    'beginfig','begingroup','def','end','enddef','endfig','endgroup',
    'hide','image','input','let','makepen','makepath','newinternal',
    'primary','primarydef','save','secondarydef','shipout','special',
    'tertiarydef','vardef','else','elseif','endfor','exitif','exitunless',
    'fi','for','forever', 'forsuffix','if','step','until','upto',
    'bot','dir','direction of','intersectionpoint','intiersectiontimes',
    'lft','llcorner','lrcorner','penoffset of','point of','postcontrol of',
    'precontrol of','rt','ulcorner','unitvector','urcorner','top','z',
    'bbox','center','cutafter','cutbefore','dashpart','dashpattern',
    'glyph of','infont','pathpart','penpart','reverse','subpath of',
    'closefrom','fontpart','readfrom','str','substring of','textpart',
    'ceiling','char','colormodel','cosd','cyanpart','decimal','decr',
    'directionpoint of','directiontime of','div','dotprod','floor',
    'fontsize','greenpart','greypart','hex','incr','length','magentapart',
    'max','mexp','min','mlog','mod','normaldeviate','oct','redpart','round',
    'sind','sqrt','uniformdeviate','xpart','xxpart','xypart','yellowpart',
    'ypart','yxpart','yypart','and','bounded', 'clipped','filled','known','not','odd','or','rgbcolor','stroked','textual','unknown','colorpart', 'inverse',
    'also','buildcycle','contour','controls','cycle','doublepath',
    'setbounds','to','whatever','about','reflected','reflectedaround',
    'rotated','rotatedabout','rotatedaround','scaled','slanted','shifted',
    'transformed','xscaled','yscaled','zscaled','addto','clip','cutdraw','draw',
    'drawarrow','drawdblarrow','drawdot', 'fill','filldraw','undraw','unfill',
    'unfilldraw','dashed','drawoptions','pickup','withcmykcolor','withcolor',
    'withgreyscale','withpen','withpostscript','withprescript','withrgbcolor',
    'curl','tension','errhelp','errmessage','fontmapfile','fontmapline',
    'interim','loggingall', 'message','scantokens','show','showdependencies',
    'showtoken','showvariable','tracingall','tracingnone','write to',           
    'ahangle','ahlength','bboxmargin','charcode','day','defaultcolormodel',
    'defaultpen','defaultscale','dotlabeldiam','hour','labeloffset',
    'linecap','linejoin','minute','miterlimit','month','mpprocset',
    'pausing','prologues','restoreclipcolor','showstopping','time',
    'tracingcapsules','tracingchoices','tracingcommands','tracingequations',
    'tracinglostchars','tracingmacros','tracingonline','tracingoutput',
    'tracingrestores','tracingspecs','tracingstats','tracingtitles',
    'troffmode','truecorners','warningcheck','year', 'filenametemplate',
    'jobname','outputformat','outputtemplate','background','currentpen',
    'currentpicture','cuttings','defaultfont','extra_beginfig','extra_endfig',
    'beveled','black','blue','bp','butt','cc','cm','dd','ditto','down',
    'epsilon','evenly','EOF','false','fullcircle','green','halfcircle',
    'identity','left','mitered','mm','mpversion','nullpen','nullpicture',
    'origin','pc','pencircle','pensquare','pt','quartercircle','red',
    'right','rounded','squared','true','unitsquare','up','white',
    'withdots'
  ];

  const MP_TYPES = [
    'boolean','color','cmykcolor','expr','numeric','pair','path','pen',
    'string','suffix','text','picture','transform'
  ];
  const MP_LITERALS = [
    'beveled','black','blue','bp','butt','cc','cm','dd','ditto','down',
    'epsilon','evenly','EOF','false','fullcircle','green','halfcircle',
    'identity','left','mitered','mm','mpversion','nullpen','nullpicture',
    'origin','pc','pencircle','pensquare','pt','quartercircle','red',
    'right','rounded','squared','true','unitsquare','up','white',
    'withdots'
  ];
  const MP_BUILT_INS = [
    'label','label.bot','label.top','label.llft','label.lft','label.ulft',
    'label.lrt','label.rt','label.urt','labels','labels.bot','labels.top',
    'labels.llft','labels.lft','labels.ulft','labels.lrt','labels.rt',
    'labels.urt','thelabel','thelabel.bot','thelabel.top','thelabel.llft',
    'thelabel.lft','thelabel.ulft','thelabel.lrt','thelabel.rt',
    'thelabel.urt','dotlabel','dotlabel.bot','dotlabel.top','dotlabel.llft',
    'dotlabel.lft','dotlabel.ulft','dotlabel.lrt','dotlabel.rt',
    'dotlabel.urt'
  ];
  return {
    name: 'MetaPost',
    case_insensitive: false,
    aliases: 'mp',
    keywords: {
      $pattern: /\b[a-z][a-z0-9_]+\b|\.[a-z][a-z0-9_]+\./,
      keyword: MP_KEYWORDS,
      literal: MP_LITERALS,
      built_in: MP_BUILT_INS,
      type: MP_TYPES
    },
    contains: [
      STRING,
      MACRO_DEF,
      COMMENT,
    ]
  };
}