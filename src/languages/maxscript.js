/*
Language: MAXScript
Author: imaoki <imaoki117@gmail.com>
Description: MAXScript is the built-in scripting language of 3ds Max.
Category: graphics
*/

function(hljs) {
  var MXS_KEYWORDS = {
    keyword: 'about and animate as at by case catch collect continue coordsys do else exit fn for from function global if in local macroscript mapped max not of off on or parameters persistent plugin private public rcmenu return rollout set struct then throw to tool try undo utility when where while with',
    literal: 'black blue brown dontcollect e false gray green ok orange pi red true undefined unsupplied white x_axis y_axis yellow z_axis',
    built_in: 'active activegrid activeviewport altpressed ambientcolor ambientcolorcontroller animationrange animbuttonenabled animbuttonstate antialiasfilter antialiasfiltersize autobackup axisconstraint axisconstraints backgroundcolor backgroundcolorcontroller backgroundimagefilename commandmode commandmodeid commandpanelopen constantreferencesystem controlpressed coordsysnode cui currentmateriallibrary currenttime customname customunit customvalue desktopbpp desktopsize display displaygamma displayrubberband displaysafeframes displaytype dontrepeatrefmsg editorfont editorfontsize editorshowpath editortabwidth enabled enablepixelsampler environmentmap escapeenable escpressed fileingamma fileoutgamma filter flags flyofftime framerate globaltracks hardwarelockid heapfree heapsize hilite hit hitpoint hotspotangleseparation inputtextcolor invalidatetmopt keyboard lightlevel lightlevelcontroller lighttintcolor lighttintcolorcontroller listener localtime logsystem macrorecorder manipulatemode marksize maxfilename maxfilepath maximumgbufferlayers maxops maxpriority meditmaterials messagetextcolor metrictype node numatmospherics numeffects numosnaps numsubobjectlevels numviews okforrelativesnap oldprintstyles options outputtextcolor playactiveonly playbackloop playbackspeed preferences productappid quietmode realtimeplayback refpoint renderdisplacements rendereffects renderer renderheight renderpixelaspect renderwidth rendoutputfilename rendsimplifyarealights rootnode rootscene scanlinerender scenematerials screenhitpoint scriptspath selectionsets shiftpressed showendresult showgcstatus skiprenderedframes slidertime snapmode snappreviewradius snapradius spinnerprecision spinnersnap spinnerwrap stacklimit strength subobjectlevel sysinfo systemscale systemtype ticksperframe time timeconfiguration timedisplaymode tofrozen toolmode toprefpoint trackbar trackviewnodes type units useenvironmentmap uselargevertexdots usespinnersnap usetrackbar usetransformgizmos usevertexdots usfrac ustype videoposttracks viewport visible worldhitpoint'
  };

  var MXS_SUBST = {
    className: 'subst',
    begin: /#?[\(\{]/, end: /[\)\}]/,
    keywords: MXS_KEYWORDS,
    relevance: 10,
    contains: []
  };

  var MXS_BLOCK_COMMENT = {
    className: 'comment',
    begin: /\/\*/, end: /\*\//,
    relevance: 0
  };

  var MXS_LINE_COMMENT = {
    className: 'comment',
    begin: /--/, end: /$/,
    relevance: 0
  };

  var MXS_NUMBER = {
    className: 'number',
    begin: /(-?)(\b0[xX][A-Fa-f0-9]+|(\b\d+(\.\d*)?|\.\d+)([eEdD][+-]?\d+|L|P)?)/,
    relevance: 0
  };

  var MXS_STRING = {
    className: 'string',
    begin: /@?"/, end: /"/,
    illegal: /\n/,
    relevance: 0,
    contains: [hljs.BACKSLASH_ESCAPE]
  };

  var MXS_ENUM = {
    className: 'enum',
    begin: /#[A-Za-z0-9_]+|#'[A-Za-z0-9_]+'/,
    relevance: 10
  };

  var MXS_TIME = {
    className: 'time',
    begin: /(-?)(\b((\d+(\.\d*)?|\.\d+)[msft])+|\b\d+:(\d+(\.\d*)?|\.\d+))/,
    relevance: 10
  };

  var MXS_PATHNAME = {
    className: 'pathname',
    begin: "\\$?'", end:"'",
    relevance: 10
  };

  var MXS_FUNCTION = {
    className: 'function',
    beginKeywords: 'function fn', end: /[^=]=[^=]/,
    returnBegin: true,
    excludeEnd: true,
    relevance: 10,
    contains: [
      MXS_SUBST,
      {
        className: 'title',
        begin: /(function|fn)\s+/, end: /\b[A-Za-z_]\w*\b/,
        relevance: 10,
        excludeBegin: true
      },
      {
        className: 'param',
        begin: /\s+(?![=])/, end: /&?[A-Za-z_]\w*:?/,
        relevance: 10,
        excludeBegin: true
      },
      {
        begin: /[^=]=[^=]/,
        relevance: 10,
        skip: true,
        endsParent: true
      }
    ]
  };

  var MXS_EVENT = {
    className: 'event',
    begin: /on +[^\n]+\bdo\b/,
    keywords: 'on',
    returnBegin: true,
    relevance: 10,
    contains: [
      {
        className: 'title',
        begin: /(on\s+(?!clone|create)[A-Za-z_]\w*\s+|on\s+)/, end: /\b[A-Za-z_]\w*\b/,
        relevance: 10,
        excludeBegin: true
      },
      {
        className: 'param',
        begin: /\s+(?!do)/, end: /&?[A-Za-z_]\w*\b/,
        relevance: 10,
        excludeBegin: true
      },
      {
        begin: /\bdo\b/,
        relevance: 10,
        endsParent: true
      }
    ]
  };

  var MXS_CLASS = {
    className: 'class',
    beginKeywords: 'struct', end: /\(/,
    returnBegin: true,
    excludeEnd: true,
    relevance: 10,
    contains: [
      {
        className: 'title',
        begin: /struct\s+/, end: /[A-Za-z_]\w*\b/,
        relevance: 10,
        excludeBegin: true
      },
      {
        bigin: /\(/,
        relevance: 10,
        endsParent: true
      }
    ]
  };

  /* keep the order */
  var MXS_CONTAINS = [
    MXS_BLOCK_COMMENT,
    MXS_LINE_COMMENT,
    MXS_STRING,
    MXS_TIME,
    MXS_NUMBER,
    MXS_ENUM,
    MXS_PATHNAME,
    MXS_FUNCTION,
    MXS_EVENT,
    MXS_CLASS
  ];
  MXS_SUBST.contains = MXS_CONTAINS;

  return {
    case_insensitive: true,
    aliases: ['mxs'],
    keywords: MXS_KEYWORDS,
    relevance: 10,
    contains: MXS_CONTAINS
  };
}
