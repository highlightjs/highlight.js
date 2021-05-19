/*
Language: Arturo
Description: Simple, expressive & portable programming language for efficient scripting
Website: https://arturo-lang.io
Category: common
*/

export default function(hljs) {
    const COMMENT = hljs.COMMENT(
      ';', '$',
      {
        relevance: 0
      }
    );

    return {
      name: 'Arturo',
      contains: [
        {
          className: 'built_in',
          begin: /(?<!')\b(all|and|any|ascii|attr|attribute|attributeLabel|binary|block|boolean|char|contains|database|date|dictionary|empty|equal|even|every|exists|false|floating|function|greater|greaterOrEqual|if|in|inline|integer|is|key|label|leap|less|lessOrEqual|literal|lower|nand|negative|nor|not|notEqual|null|numeric|odd|or|path|pathLabel|positive|prefix|prime|set|some|standalone|string|subset|suffix|superset|symbol|true|try|type|unless|upper|when|whitespace|word|xnor|xor|zero)\?(?!:)/,
          relevance: 0
        },
        {
          className: 'built_in',
          begin: /(?<!')\b(abs|acos|acosh|acsec|acsech|actan|actanh|add|after|and|angle|append|arg|args|arity|array|as|asec|asech|asin|asinh|atan|atan2|atanh|attr|attrs|average|before|benchmark|blend|break|builtins1|builtins2|call|capitalize|case|ceil|chop|clear|close|color|combine|conj|continue|copy|cos|cosh|csec|csech|ctan|ctanh|cursor|darken|dec|decode|define|delete|desaturate|deviation|dictionary|difference|digest|div|do|download|drop|dup|else|empty|encode|ensure|env|epsilon|escape|execute|exit|exp|extend|extract|factors|false|fdiv|filter|first|flatten|floor|fold|from|function|gamma|gcd|get|goto|hash|help|hypot|if|inc|indent|index|info|input|insert|inspect|intersection|invert|join|keys|kurtosis|last|let|levenshtein|lighten|list|ln|log|loop|lower|mail|map|match|max|median|min|mod|module|mul|nand|neg|new|nor|normalize|not|now|null|open|or|outdent|pad|panic|path|pause|permissions|permutate|pi|pop|pow|powerset|powmod|prefix|print|prints|product|query|random|range|read|relative|remove|rename|render|repeat|replace|request|return|reverse|round|sample|saturate|script|sec|sech|select|serve|set|shl|shr|shuffle|sin|sinh|size|skewness|slice|sort|split|sqrt|squeeze|stack|strip|sub|suffix|sum|switch|symbols|symlink|sys|take|tan|tanh|terminal|to|true|truncate|try|type|union|unique|unless|until|unzip|upper|values|var|variance|webview|while|with|wordwrap|write|xnor|xor|zip)\b(?!:)/,
          relevance: 0
        },
        COMMENT,
        {
          className: 'strong',
          begin: /(->|=>|\||\:\:|[\-]{3,})/,
          relevance: 0
        },
        {
          className: 'deletion',
          begin: /<\:|\-\:|ø|@|#|\+|\||\*|\$|\-|\%|\/|\.\.|\^|~|=|<|>|\\|(?<!\w)\?/,
          relevance: 0
        },
        {
          className: 'addition',
          begin: /([\w]+\b\??:)/,
          relevance: 0
        },
        {
          className: 'keyword',
          begin: /('([\w]+\b\??:?))|(:([\w]+))/,
          relevance: 0
        },
        {
          className: 'string',
          begin: /[a-zA-Z]\w*"/,
          end: /"/,
          contains: [
            {
              begin: /""/
            }
          ]
        },
        hljs.QUOTE_STRING_MODE,
        hljs.SHEBANG()
      ]
    };
  }
  