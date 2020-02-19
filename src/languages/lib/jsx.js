import { inherit } from "../../lib/utils";

const FRAGMENT = {
  begin: '<>',
  end: '</>'
};
const XML_TAG = {
  begin: /<[A-Za-z0-9\\._:-]+/,
  end: /\/[A-Za-z0-9\\._:-]+>|\/>/
};

export const JSX_MODE = { // JSX
  variants: [
    { begin: FRAGMENT.begin, end: FRAGMENT.end },
    { begin: XML_TAG.begin, end: XML_TAG.end }
  ],
  subLanguage: '_jsx',
  contains: [
    {
      begin: XML_TAG.begin, end: XML_TAG.end, skip: true,
      contains: ['self']
    }
  ]
};

// note: this is not a language grammar itself but when called
// it returns a function that is the language grammar
// This could be improved if our registerLanguage API was enhanced
// to support passing options to grammars.
export const JSX_LANGUAGE = function({containers}) {

  // containers are any blocks which could prevent an inline JS mode
  // from ending... inline javascript is denoted with `{ code }`
  // so an example would be a string: ` { "}" }`  Become the } is
  // inside the container it should be ignored and not counted as
  // ending the inline JS snippet
  //
  // these are passed in because it makes sense that these would
  // already be defined by the parent language
  containers = containers.map((x) =>
    // we need these to be quiet, and not output
    inherit(x, {skip: true, className: null})
  )

  return function (hljs) {

    const XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
    const XML_ENTITIES = {
      className: 'symbol',
      begin: '&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;'
    };
    const INLINE_JS = {
      begin: /{/,
      end: /}/,
      // needs to eat strings, regex, comments, etc.
      contains: [].concat(containers),
      subLanguage: "javascript"
    };
    const TAG_INTERNALS = {
      endsWithParent: true,
      illegal: /</,
      relevance: 0,
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        {
          className: 'attr',
          begin: XML_IDENT_RE,
          relevance: 0
        },
        {
          begin: /=\s*/,
          relevance: 0,
          contains: [
            {
              className: 'string',
              endsParent: true,
              variants: [
                {begin: /"/, end: /"/, contains: [XML_ENTITIES]},
                {begin: /'/, end: /'/, contains: [XML_ENTITIES]},
                {begin: /[^\s"'=<>`]+/}
              ]
            }
          ]
        }
      ]
    };
    const SIMPLE_TAG = {
      className: 'tag',
      begin: '</?', end: '/?>',
      contains: [
        {
          className: 'name', begin: /[^\/><\s]+/, relevance: 0
        },
        TAG_INTERNALS
      ]
    }

    return {
      className:"xml",
      case_insensitive: true,
      disableAutodetect: true,
      contains: [
        SIMPLE_TAG,
        INLINE_JS
      ]
    };

  }
}

