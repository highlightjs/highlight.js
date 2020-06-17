/*
Language: P4
Description: 
Author: zhankangbao
Email: 778942512@qq.com
Website: https://p4.org/
*/

export default function(hljs) {

    function optional(s) {
        return '(?:' + s + ')?';
    }
    var DECLTYPE_AUTO_RE = 'decltype\\(auto\\)'
    var NAMESPACE_RE = '[a-zA-Z_]\\w*::'
    var FUNCTION_TITLE = optional(NAMESPACE_RE) + hljs.IDENT_RE + '\\s*\\('
    var TITLE_MODE = {
      className: 'title',
      begin: optional(NAMESPACE_RE) + hljs.IDENT_RE,
      relevance: 0
  };
    var P4_PREPROCESSOR_MODE = {
      className: 'meta',
      begin: /#\s*(include|define|undef|ifdef|ifndef|elseif|endif|line|if|else)\b/,
      keywords: {
      'meta-keyword':
        'include define undef ifdef ifndef elseif endif line if else '
      }
    };
    
    var P4_ACTION_MODE = {
      className: 'title',
      begin: /\s*(action)\s+(\w+)\s*(?:\()/,
      returnBegin: true, end: /\(/,
      excludeEnd: true,
      keywords: {
      'keyword':
        'action '
      }
    };
    
    var P4_CONSTANT_LANGUAGE_MODE = {
      className: 'contentText',
      begin: /\b(true|false)\b/,
      keywords: {
      'literal':
        'true false '
      }
    };
    
    var P4_CONTROL_FLOW_MODE = {
      className: 'contentText',
      begin: /\b(if|else|return|hit|miss|default)\b/,
      keywords: {
      'keyword':
        'if else return hit miss default '
      }
    };

    var P4_OPERATOR_MODE = {
      className: 'contentText',
      begin: /\b(and|or|not)\b/,    
      keywords: {
      'keyword':
        'and or not '
      }
    };
    
    var P4_KEYWORD_OTHER_MODE = {
      className: 'contentText',
      begin: /\b(input|algorithm|output_width|width|instance_count|fields|reads|actions)\b/,
      keywords: {
      'keyword':
        'input algorithm output_width width instance_count fields reads actions '
      }
      
    };
    
    var P4_KEYWORD_OTHER_MODE2 = {
      className: 'contentText',
      begin: /\b(header_type|field_list|field_list_calculation|field_list|register|meter|counter|calculated_field)\s+([_a-zA-Z]\w*)\s*(?:\{|\n)\b/,
      returnBegin: true, end: /\(/,
      excludeEnd: true,
      keywords: {
      'title':
        'header_type field_list field_list_calculation field_list register meter counter calculated_field '
      }
    };
    
    var P4_KEYWORD_OTHER_MODE3 = {
      className: 'contentText',
      begin: /\s*(header|metadata)\s+(\w+)\s+(\w+)\s*/,
      keywords: {
      'keyword':
        'header metadata '
      }
    };

    
    var P4_TYPE_MODE = {
      className: 'contentText',
      begin: /\b(bit|varbit|int|bytes|paser|control|table|action_profile|counter)\b/,
      keywords: {
      'keyword':
        'bit varbit int bytes paser control table action_profile counter '
      }
    };
    
    var P4_MODIFIER_MODE = {
      className: 'contentText',
      begin: /\b(direct|static)\b/,
      keywords: {
      'keyword':
        'direct static'
      }
    };

    var P4_VARIABLE_LANGUAGE_MODE = {
      className: 'contentText',
      begin: /\b(current|next|last|length|payloads)\b/,
      keywords: {
      'keyword':
        'current next last length payloads '
      }
    };

    var P4_SUPPORT_CONSTANT_MODE = {
      className: 'contentText',
      begin: /\b(standard_metadata)\b/,
      keywords: {
      'keyword':
        'standard_metadata '
      }
    };
    
    var P4_SUPPORT_CLASS_MODE = {
      className: 'contentText',
      begin: /\b(ingress|egress)\b/,
      keywords: {
      'keyword':
        'ingress egress'
      }
    };
    
    var P4_ENTITY_NAME_TYPE_MODE = {
      className: 'contentText',
      begin: /\b(exact|ternary|lpm|range|valid|mask)\b/,
      keywords: {
      'keyword':
        'exact ternary lpm range valid mask'
      }
    };
    
    var P4_SUPPORT_FUNCTION_MODE = {
      className: 'title',
      begin: /\b(set_metadata|modify_field|modify_field_with_hash_based_offset)\s*(?:\()/,
      returnBegin: true, end: /\(/,
      excludeEnd: true,
      keywords: {
      'title':
        'set_metadata modify_field modify_field_with_hash_based_offset'
      }
    };
    
    var P4_SUPPORT_FUNCTION_MODE2 = {
      className: 'title',
      begin: /b((add|copy|remove)_header|push|pop)\s*(?:\()/,
      returnBegin: true, end: /\(/,
      excludeEnd: true,
      keywords: {
      'keyword':
        'add_header copy_header remove_header push remove '
      }
    };
    
    var P4_SUPPORT_FUNCTION_MODE3 = {
      className: 'title',
      begin: /\b(clone_(in|e)gress_pkt_to_(in|e)gress|truncate|drop|no_op|resubmit|generate_digest|recirculate)\s*(?:\()/,
      returnBegin: true, end: /\(/,
      excludeEnd: true,
      keywords: {
      'keyword':
        'clone_ingress_pkt_to_ingress clone_egress_pkt_to_ingress clone_ingress_pkt_to_egress clone_egress_pkt_to_egress ' +
        'truncate drop no_op resubmit generate_digest recirculate '
      }
    };
    
    var P4_SUPPORT_FUNCTION_MODE4 = {
      className: 'title',
      begin: /\b(execute_meter|count|register_(write|read))\s*(?:\()/,
      returnBegin: true, end: /\(/,
      excludeEnd: true,
      keywords: {
      'keyword':
        'execute_meter count register_write register_read)'
      }
    };
    
    var P4_SUPPORT_FUNCTION_MODE5 = {
      className: 'title',
      begin: /\b(apply|valid|select|current|extract)\s(?:\()/,
      returnBegin: true, end: /\(/,
      excludeEnd: true,
      keywords: {
      'keyword':
        'apply valid select current extract'
      }
    };
    
    
    
    return {
      name: 'P4',
      aliases: ['p4'],
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.NUMBER_MODE,
        P4_PREPROCESSOR_MODE,
        P4_CONSTANT_LANGUAGE_MODE,
        P4_ACTION_MODE,
        P4_CONTROL_FLOW_MODE,
        P4_OPERATOR_MODE,
        P4_KEYWORD_OTHER_MODE,
        P4_KEYWORD_OTHER_MODE2,
        P4_KEYWORD_OTHER_MODE3,
        P4_TYPE_MODE,
        P4_MODIFIER_MODE,
        P4_VARIABLE_LANGUAGE_MODE,
        P4_SUPPORT_CONSTANT_MODE,
        P4_SUPPORT_CLASS_MODE,
        P4_ENTITY_NAME_TYPE_MODE,
        P4_SUPPORT_FUNCTION_MODE,
        P4_SUPPORT_FUNCTION_MODE2,
        P4_SUPPORT_FUNCTION_MODE3,
        P4_SUPPORT_FUNCTION_MODE4,
        P4_SUPPORT_FUNCTION_MODE5,
        hljs.COMMENT(
        '/\\*',
        '\\*/'
        )
      ]
    };
  }
  