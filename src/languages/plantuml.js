/*
Language: PlantUML
Author: Palani Raja <palaniraja@live.com>
Category: planttext, uml, plantuml

credits to kkeisuke for the codemirror work - https://github.com/kkeisuke/plantuml-editor

*/

function(hljs) {

  var BLOCK_COMMENT = hljs.COMMENT(
    "/\\'",
    "\\'/",
    {
      contains: ['self']
    }
  );
  var SINGLE_LINE_COMMENT = hljs.COMMENT("'", '$');

  var META = {
    className: 'meta',
    begin: /(!\w+|^!pragma)/
  }

  var NAME = {
    className: 'name',
    begin: /(\[(.*?)\]|\:(.*?)\;)/ //todo - activity \:(.*?)\; component \[(.*?)\]
  }

  var SYMBOLS = {
    className: 'symbol',
    begin: /\+|\-+|\:|\<<|\>>|\;|\.+|\(/
  }

  return {
      case_insensitive: true,
      keywords: {
        keyword: 'AliceBlue AntiqueWhite Aqua Aquamarine Azure Beige Bisque Black BlanchedAlmond Blue BlueViolet Brown BurlyWood CadetBlue Chartreuse Chocolate Coral CornflowerBlue Cornsilk Crimson Cyan Cyan Dyan DarkGoldenRod DarkGray DarkGreen DarkGrey DarkKhaki DarkMagenta DarkOliveGreen DarkOrchid DarkRed DarkSalmon DarkSeaGreen DarkSlateBlue DarkSlateGray DarkSlateGrey DarkTurquoise DarkVeepDep Fuchsia Gainsboro GhostWhite Gold GoldenRod Gray Green GreenYellow Grey HoneyDew HotPink IndianRed Indigo Ivory Khaki Lavender LavenderBlush LawnGreen LemonGreen LemonChiffon LightBlue LightCral LightCyan LightGlightenLight LightGrey LightPink LightSalmon LightSeaGreen LightSkyBlue LightSlateGray LightSlateGrey LightSteelBlue LightYellow Lime LimeGreen Linen Magenta Maroon MediumAquaMarine MediumBlue MediumOrchid MediumPurple MediumSeaGreen MediumSquoBlue e MediumVioletRed MidnightBlue MintCream MistyRose Moccasin NavajoWhite Navy Old Lace Olive OliveDrab Orange OrangeRed Orchid PaleGoldenRod PaleGreen PaleTurquoise PaleVioletRed PapayaWhip PowderP  Red RosyBrown RoyalBlue SaddleBrown Salmon SandyBrown SeaGreen SeaShell Sienna Silver SkyBlue SlateBlue SlateGray SlateGrey Snow SpringGreen SteelBlue Tan Teal Thistle Tomato Turquoise Violet Wheat White WhiteSmoke Yellow YellowGreen',
          literal: 'false true',
        built_in: 'startuml enduml abstract actor agent class component database enum interface node note object participant partition rectangle state static storage usecase activate again allow_mixing also alt as autonumber bottom box break caption center create critical deactivate destroy direction down else end endfooter endheader endif endlegend endwhile entity footbox footer fork group header hide if is left legend link loop namespace newpage of on opt over package page par ref repeat return right rotate scale show skin skinparam start stop title then top up while'
      },
      contains: [
        SINGLE_LINE_COMMENT,
        BLOCK_COMMENT,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        META,
        NAME,
        SYMBOLS
      ]
  };
}
