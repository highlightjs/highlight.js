/*
Language: MKB
Description: BASIC Scripting language interpretted by the minecraft macro/keybind mod.
Author: Mumfrey
Website: https://beta.mkb.gorlem.ml/docs/actions/
Category: scripting
*/
// node tools/build.js -n mkb

import { KEYWORDS } from "./lib/ecmascript";

export default function(hljs) {

    const MKB_ACTIONS = [
        'ACHIEVEMENTGET ', 'ARRAYSIZE', 'ASSIGN ', 'BIND ', 'BINDGUI ', 'BREAK ', 'CALCYAWTO ', 'CAMERA ', 'CHATFILTER',
        'CHATHEIGHT', 'CHATHEIGHTFOCUSED', 'CHATOPACITY', 'CHATSCALE', 'CHATVISIBLE', 'CHATWIDTH',
        'CLEARCHAT', 'CLEARCRAFTING', 'CONFIG', 'CRAFT', 'CRAFTANDWAIT', 'DEC', 'DECODE', 'DISCONNECT',
        'DO', 'ECHO', 'ELSE', 'ELSEIF', 'ENCODE', 'ENDIF', 'ENDUNSAFE', 'EXEC', 'FILTER', 'FOG', 'FOR', 'FOREACH', 'FOV',
        'GAMMA', 'GETID', 'GETIDREL', 'GETITEMINFO', 'GETPROPERTY', 'GETSLOT', 'GETSLOTITEM', 'GUI', 'IF', 'IFBEGINSWITH',
        'IFCONTAINS', 'IFENDSWITH', 'IFMATCHES', 'IIF', 'IMPORT', 'INC', 'INDEXOF', 'INVENTORYDOWN', 'INVENTORYUP',
        'ISRUNNING', 'ITEMID', 'ITEMNAME', 'JOIN', 'KEY', 'KEYDOWN', 'KEYUP', 'LCASE', 'LOG', 'LOGRAW', 'LOGTO', 'LOOK', 'LOOKS',
        'LOOP', 'MATCH', 'MODIFY', 'MUSIC', 'NEXT', 'PASS', 'PICK', 'PLACESIGN', 'PLAYSOUND', 'POP', 'POPUPMESSAGE', 'PRESS', 'PROMPT',
        'PUSH', 'PUT', 'RANDOM', 'REGEXREPLACE', 'RELOADRESOURCES', 'REPL', 'REPLACE', 'RESOURCEPACK', 'RESOURCEPACKS',
        'RESPAWN', 'SELECTCHANNEL', 'SENDMESSAGE', 'SENSITIVITY', 'SET', 'SETLABEL', 'SETPROPERTY', 'SETRES', 'SETSLOTITEM',
        'SHADERGROUP', 'SHOWGUI', 'SLOT', 'SLOTCLICK', 'SPLIT', 'SPRINT', 'SQRT', 'STOP', 'STORE', 'STOREOVER', 'STRIP', 'TEXTUREPACK',
        'TILEID', 'TILENAME', 'TIME', 'TITLE', 'TOAST', 'TOGGLE', 'TOGGLEKEY', 'TRACE', 'TYPE', 'UCASE', 'UNIMPORT', 'UNSAFE', 'UNSET',
        'UNSPRINT', 'UNTIL', 'VOLUME', 'WAIT', 'WALKTO', 'WHILE'
    ];
    const MKB_EVENTS = [
        'onArmourChange', 'onArmourDurabilityChange', 'onAutoCraftingComplete', 'onChat', 'onConfigChange',
        'onFilterableChat', 'onFoodChange', 'onHealthChange', 'onInventorySlotChange', 'onItemDurabilityChange',
        'onJoinGame', 'onLevelChange', 'onModeChange', 'onOxygenChange', 'onPickupItem', 'onPlayerJoined',
        'onSendChatMessage', 'onShowGui', 'onWeatherChange', 'onWorldChange', 'onXPChange'
    ];
    const MKB_ITERATORS = [
        'controls', 'effects', 'enchantments', 'env', 'players', 'properties', 'running'
    ];
    // \$\$(?:\!|\?|\d|\w*(?::\d*)?)|(?:\[\[(?:\w|\d|\s)*\]\])|(?:\[\w*|\d*\])|(?:\<\w*\.txt\>)
    const MKB_PARAMETERS = [
        '$$!', '$$?', '$$[[array of things]]', '$$[name]', '$$<file.txt>', '$$0-9', '$$d', '$$f', '$$h', '$$i', '$$i:d', '$$k', '$$m', '$$p', '$$pn', '$$px', '$$py', '$$pz', '$$s', '$$t', '$$u', '$$w'
    ];
    /* REPL Reserved.
    const MKB_REPL = [
        'BEGIN', 'CAT', 'CLS', 'EDIT', 'END', 'EXIT', 'EXPAND', 'HELP', 'KILL', 'LIST', 'LIVE', 'RM', 'RUN', 'SAY', 'SHUTDOWN', 'TASKS', 'VERSION', 'WHOAMI'
    ]
    */
    const MKB_VARIABLES = [
        '~ALT', '~CTRL', '~KEY_<name>', '~KEY_0', '~KEY_1', '~KEY_2', '~KEY_3', '~KEY_4', '~KEY_5', '~KEY_6', '~KEY_7',
        '~KEY_8', '~KEY_9', '~KEY_A', '~KEY_ADD', '~KEY_APOSTROPHE', '~KEY_APPS', '~KEY_AT', '~KEY_AX', '~KEY_B', '~KEY_BACK',
        '~KEY_BACKSLASH', '~KEY_C', '~KEY_CAPITAL', '~KEY_CIRCUMFLEX', '~KEY_CLEAR', '~KEY_COLON', '~KEY_COMMA',
        '~KEY_CONVERT', '~KEY_D', '~KEY_DECIMAL', '~KEY_DELETE', '~KEY_DIVIDE', '~KEY_DOWN', '~KEY_E', '~KEY_END',
        '~KEY_EQUALS', '~KEY_ESCAPE', '~KEY_F', '~KEY_F1', '~KEY_F10', '~KEY_F11', '~KEY_F12', '~KEY_F13', '~KEY_F14',
        '~KEY_F15', '~KEY_F16', '~KEY_F17', '~KEY_F18', '~KEY_F19', '~KEY_F2', '~KEY_F3', '~KEY_F4', '~KEY_F5', '~KEY_F6',
        '~KEY_F7', '~KEY_F8', '~KEY_F9', '~KEY_FUNCTION', '~KEY_G', '~KEY_GRAVE', '~KEY_H', '~KEY_HOME', '~KEY_I',
        '~KEY_INSERT', '~KEY_J', '~KEY_K', '~KEY_KANA', '~KEY_KANJI', '~KEY_L', '~KEY_LBRACKET', '~KEY_LCONTROL',
        '~KEY_LEFT', '~KEY_LMENU', '~KEY_LMETA', '~KEY_LSHIFT', '~KEY_M', '~KEY_MINUS', '~KEY_MOUSE3', '~KEY_MOUSE4',
        '~KEY_MULTIPLY', '~KEY_N', '~KEY_NEXT', '~KEY_NOCONVERT', '~KEY_NONE', '~KEY_NUMLOCK', '~KEY_NUMPAD0',
        '~KEY_NUMPAD1', '~KEY_NUMPAD2', '~KEY_NUMPAD3', '~KEY_NUMPAD4', '~KEY_NUMPAD5', '~KEY_NUMPAD6', '~KEY_NUMPAD7',
        '~KEY_NUMPAD8', '~KEY_NUMPAD9', '~KEY_NUMPADCOMMA', '~KEY_NUMPADENTER', '~KEY_NUMPADEQUALS', '~KEY_O', '~KEY_P',
        '~KEY_PAUSE', '~KEY_PERIOD', '~KEY_POWER', '~KEY_PRIOR', '~KEY_Q', '~KEY_R', '~KEY_RBRACKET', '~KEY_RCONTROL',
        '~KEY_RETURN', '~KEY_RIGHT', '~KEY_RMENU', '~KEY_RMETA', '~KEY_RSHIFT', '~KEY_S', '~KEY_SCROLL', '~KEY_SECTION',
        '~KEY_SEMICOLON', '~KEY_SLASH', '~KEY_SLEEP', '~KEY_SPACE', '~KEY_STOP', '~KEY_SUBTRACT', '~KEY_SYSRQ', '~KEY_T',
        '~KEY_TAB', '~KEY_U', '~KEY_UNDERLINE', '~KEY_UNLABELED', '~KEY_UP', '~KEY_V', '~KEY_W', '~KEY_X', '~KEY_Y', '~KEY_YEN',
        '~KEY_Z', '~LMOUSE', '~MIDDLEMOUSE', '~RMOUSE', '~SHIFT', 'ALT', 'AMBIENTVOLUME', 'ARMOUR', 'ATTACKPOWER', 'ATTACKSPEED',
        'BIOME', 'BLOCKVOLUME', 'BOOTSDAMAGE', 'BOOTSDURABILITY', 'BOOTSID', 'BOOTSNAME', 'BOWCHARGE', 'CAMERA', 'CANFLY',
        'CARDINALYAW', 'CHAT', 'CHATCLEAN', 'CHATMESSAGE', 'CHATPLAYER', 'CHESTPLATEDAMAGE', 'CHESTPLATEDURABILITY',
        'CHESTPLATEID', 'CHESTPLATENAME', 'CHUNKUPDATES', 'CONFIG', 'CONTAINERSLOTS', 'CONTROLID', 'CONTROLNAME',
        'CONTROLTYPE', 'COOLDOWN', 'CTRL', 'DATE', 'DATETIME', 'DAY', 'DAYTICKS', 'DAYTIME', 'DIFFICULTY', 'DIMENSION', 'DIRECTION',
        'DISPLAYHEIGHT', 'DISPLAYNAME', 'DISPLAYWIDTH', 'DURABILITY', 'EFFECT', 'EFFECTID', 'EFFECTNAME', 'EFFECTPOWER',
        'EFFECTTIME', 'ENCHANTMENT', 'ENCHANTMENTNAME', 'ENCHANTMENTPOWER', 'FLYING', 'FOV', 'FPS', 'GAMEMODE', 'GAMMA', 'GUI',
        'HEALTH', 'HELMDAMAGE', 'HELMDURABILITY', 'HELMID', 'HELMNAME', 'HIT', 'HIT_<name>', 'HIT_AGE', 'HIT_ATTACHED',
        'HIT_AXIS', 'HIT_BITES', 'HIT_CHECK_DECAY', 'HIT_COLOR', 'HIT_CONDITIONAL', 'HIT_CONTENTS', 'HIT_DAMAGE',
        'HIT_DECAYABLE', 'HIT_DELAY', 'HIT_DISARMED', 'HIT_DOWN', 'HIT_EAST', 'HIT_ENABLED', 'HIT_EXPLODE', 'HIT_EXTENDED',
        'HIT_EYE', 'HIT_FACING', 'HIT_HALF', 'HIT_HAS_BOTTLE_0', 'HIT_HAS_BOTTLE_1', 'HIT_HAS_BOTTLE_2', 'HIT_HAS_RECORD',
        'HIT_HINGE', 'HIT_IN_WALL', 'HIT_LAYERS', 'HIT_LEGACY_DATA', 'HIT_LEVEL', 'HIT_LOCKED', 'HIT_MODE', 'HIT_MOISTURE',
        'HIT_NODROP', 'HIT_NORTH', 'HIT_OCCUPIED', 'HIT_OPEN', 'HIT_PART', 'HIT_POWER', 'HIT_POWERED', 'HIT_ROTATION',
        'HIT_SEAMLESS', 'HIT_SHAPE', 'HIT_SHORT', 'HIT_SNOWY', 'HIT_SOUTH', 'HIT_STAGE', 'HIT_TRIGGERED', 'HIT_TYPE', 'HIT_UP',
        'HIT_VARIANT', 'HIT_WEST', 'HIT_WET', 'HITDATA', 'HITID', 'HITNAME', 'HITPROGRESS', 'HITSIDE', 'HITUUID', 'HITX', 'HITY', 'HITZ',
        'HOSTILEVOLUME', 'HUNGER', 'INVSLOT', 'ITEM', 'ITEMCODE', 'ITEMDAMAGE', 'ITEMIDDMG', 'ITEMNAME', 'ITEMUSEPCT', 'ITEMUSETICKS',
        'JOINEDPLAYER', 'KEY_<name>', 'KEY_0', 'KEY_1', 'KEY_2', 'KEY_3', 'KEY_4', 'KEY_5', 'KEY_6', 'KEY_7', 'KEY_8', 'KEY_9', 'KEY_A',
        'KEY_ADD', 'KEY_APOSTROPHE', 'KEY_APPS', 'KEY_AT', 'KEY_AX', 'KEY_B', 'KEY_BACK', 'KEY_BACKSLASH', 'KEY_C', 'KEY_CAPITAL',
        'KEY_CIRCUMFLEX', 'KEY_CLEAR', 'KEY_COLON', 'KEY_COMMA', 'KEY_CONVERT', 'KEY_D', 'KEY_DECIMAL', 'KEY_DELETE', 'KEY_DIVIDE',
        'KEY_DOWN', 'KEY_E', 'KEY_END', 'KEY_EQUALS', 'KEY_ESCAPE', 'KEY_F', 'KEY_F1', 'KEY_F10', 'KEY_F11', 'KEY_F12', 'KEY_F13',
        'KEY_F14', 'KEY_F15', 'KEY_F16', 'KEY_F17', 'KEY_F18', 'KEY_F19', 'KEY_F2', 'KEY_F3', 'KEY_F4', 'KEY_F5', 'KEY_F6', 'KEY_F7', 'KEY_F8',
        'KEY_F9', 'KEY_FUNCTION', 'KEY_G', 'KEY_GRAVE', 'KEY_H', 'KEY_HOME', 'KEY_I', 'KEY_INSERT', 'KEY_J', 'KEY_K', 'KEY_KANA', 'KEY_KANJI',
        'KEY_L', 'KEY_LBRACKET', 'KEY_LCONTROL', 'KEY_LEFT', 'KEY_LMENU', 'KEY_LMETA', 'KEY_LSHIFT', 'KEY_M', 'KEY_MINUS', 'KEY_MOUSE3',
        'KEY_MOUSE4', 'KEY_MULTIPLY', 'KEY_N', 'KEY_NEXT', 'KEY_NOCONVERT', 'KEY_NONE', 'KEY_NUMLOCK', 'KEY_NUMPAD0', 'KEY_NUMPAD1',
        'KEY_NUMPAD2', 'KEY_NUMPAD3', 'KEY_NUMPAD4', 'KEY_NUMPAD5', 'KEY_NUMPAD6', 'KEY_NUMPAD7', 'KEY_NUMPAD8', 'KEY_NUMPAD9',
        'KEY_NUMPADCOMMA', 'KEY_NUMPADENTER', 'KEY_NUMPADEQUALS', 'KEY_O', 'KEY_P', 'KEY_PAUSE', 'KEY_PERIOD', 'KEY_POWER',
        'KEY_PRIOR', 'KEY_Q', 'KEY_R', 'KEY_RBRACKET', 'KEY_RCONTROL', 'KEY_RETURN', 'KEY_RIGHT', 'KEY_RMENU', 'KEY_RMETA',
        'KEY_RSHIFT', 'KEY_S', 'KEY_SCROLL', 'KEY_SECTION', 'KEY_SEMICOLON', 'KEY_SLASH', 'KEY_SLEEP', 'KEY_SPACE', 'KEY_STOP',
        'KEY_SUBTRACT', 'KEY_SYSRQ', 'KEY_T', 'KEY_TAB', 'KEY_U', 'KEY_UNDERLINE', 'KEY_UNLABELED', 'KEY_UP', 'KEY_V', 'KEY_W', 'KEY_X',
        'KEY_Y', 'KEY_YEN', 'KEY_Z', 'KEYID', 'KEYNAME', 'LEGGINGSDAMAGE', 'LEGGINGSDURABILITY', 'LEGGINGSID', 'LEGGINGSNAME',
        'LEVEL', 'LIGHT', 'LMOUSE', 'LOCALDIFFICULTY', 'MACROID', 'MACRONAME', 'MACROTIME', 'MAINHANDCOOLDOWN',
        'MAINHANDDURABILITY', 'MAINHANDITEM', 'MAINHANDITEMCODE', 'MAINHANDITEMDAMAGE', 'MAINHANDITEMIDDMG',
        'MAINHANDITEMNAME', 'MAINHANDSTACKSIZE', 'MAXPLAYERS', 'MIDDLEMOUSE', 'MODE', 'MUSIC', 'NEUTRALVOLUME',
        'OFFHANDCOOLDOWN', 'OFFHANDDURABILITY', 'OFFHANDITEM', 'OFFHANDITEMCODE', 'OFFHANDITEMDAMAGE', 'OFFHANDITEMIDDMG',
        'OFFHANDITEMNAME', 'OFFHANDSTACKSIZE', 'OLDINVSLOT', 'ONLINEPLAYERS', 'OXYGEN', 'PICKUPAMOUNT', 'PICKUPDATA',
        'PICKUPID', 'PICKUPITEM', 'PITCH', 'PLAYER', 'PLAYERNAME', 'PLAYERVOLUME', 'PROPNAME', 'PROPVALUE', 'RAIN', 'REASON',
        'RECORDVOLUME', 'RESOURCEPACKS[]', 'RMOUSE', 'SATURATION', 'SCREEN', 'SCREENNAME', 'SEED', 'SENSITIVITY', 'SERVER',
        'SERVERMOTD', 'SERVERNAME', 'SHADERGROUP', 'SHADERGROUPS[]', 'SHIFT', 'SIGNTEXT[]', 'SOUND', 'STACKSIZE', 'TEXTUREPACK',
        'TICKS', 'TIME', 'TIMESTAMP', 'TOTALTICKS', 'TOTALXP', 'TRACE_<name>', 'TRACE_AGE', 'TRACE_ATTACHED', 'TRACE_AXIS',
        'TRACE_BITES', 'TRACE_CHECK_DECAY', 'TRACE_COLOR', 'TRACE_CONDITIONAL', 'TRACE_CONTENTS', 'TRACE_DAMAGE',
        'TRACE_DECAYABLE', 'TRACE_DELAY', 'TRACE_DISARMED', 'TRACE_DOWN', 'TRACE_EAST', 'TRACE_ENABLED', 'TRACE_EXPLODE',
        'TRACE_EXTENDED', 'TRACE_EYE', 'TRACE_FACING', 'TRACE_HALF', 'TRACE_HAS_BOTTLE_0', 'TRACE_HAS_BOTTLE_1',
        'TRACE_HAS_BOTTLE_2', 'TRACE_HAS_RECORD', 'TRACE_HINGE', 'TRACE_IN_WALL', 'TRACE_LAYERS', 'TRACE_LEGACY_DATA',
        'TRACE_LEVEL', 'TRACE_LOCKED', 'TRACE_MODE', 'TRACE_MOISTURE', 'TRACE_NODROP', 'TRACE_NORTH', 'TRACE_OCCUPIED',
        'TRACE_OPEN', 'TRACE_PART', 'TRACE_POWER', 'TRACE_POWERED', 'TRACE_ROTATION', 'TRACE_SEAMLESS', 'TRACE_SHAPE',
        'TRACE_SHORT', 'TRACE_SNOWY', 'TRACE_SOUTH', 'TRACE_STAGE', 'TRACE_TRIGGERED', 'TRACE_TYPE', 'TRACE_UP',
        'TRACE_VARIANT', 'TRACE_WEST', 'TRACE_WET', 'TRACEDATA', 'TRACEID', 'TRACENAME', 'TRACESIDE', 'TRACETYPE', 'TRACEUUID',
        'TRACEX', 'TRACEY', 'TRACEZ', 'UNIQUEID', 'UUID', 'VARNAME', 'VEHICLE', 'VEHICLEHEALTH', 'WEATHERVOLUME', 'XP', 'XPOS', 'XPOSF',
        'YAW', 'YPOS', 'YPOSF', 'ZPOS', 'ZPOSF'
    ]
    const VARIABLE = {
      scope: 'variable',
      className: 'variable',
      begin: '@?(?:&|#|)[a-zA-Z]{1,}',
      endsParent: false,
      relevance: 1,
      keywords: MKB_VARIABLES
    }
    const LITTERAL_VARIABLE = {
      scope: 'variable',
      className: 'variable',
      begin: '%',
      end: '%',
      excludeBegin: false,
      excludeEnd: false,
      contains:[VARIABLE]
    }
    const STRING = {
        scope: 'string',
        className:'string',
        begin: '"',
        end: '"',
        contains:[
          LITTERAL_VARIABLE
        ]
    }
    const PARAMS = {
        scope: 'params',
        className:'params',
        begin: '\\(',
        end: '\\)',
        excludeBegin: false,
        excludeEnd: false,
        endsParent: true,
        relevance: 0,
        contains: [
          STRING,
          VARIABLE
        ]
    }
    const ACTION = {
      scope: 'title.function',
      className:'function',
      keywords: MKB_ACTIONS,
      begin: '^[a-zA-Z]',
      end: '\\(',
      excludeBegin: false,
      excludeEnd: true,
      returnBegin: true,
      relevance: 0,
      contains: [
        PARAMS
      ]
    }
    const NUMBER = { 
      scope: 'number',
      className: 'number',
      begin: '[0-9](_?[0-9])*'
    };
    const OPERATORS = {
      scope: 'operator',
      className: 'operator',
      relevance: 0,
      begin: '=|>|<|\\+'
    };
    return {
        name: 'MKB',
        case_insensitive: true,
        keywords: {
          keyword: MKB_VARIABLES,
          built_in: MKB_ACTIONS
        },
        contains: [
          hljs.COMMENT('//', '$'),
          STRING,
          ACTION,
          NUMBER,
          OPERATORS,
          VARIABLE,
        ]
    };
}