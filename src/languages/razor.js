/*
 * Language: razor
 * Requires: xml.js, csharp.js
 * Author: Nicolas LLOBERA <nicolas@bananeatomic.fr>
*/

export default function(hljs) {

    const razor_comment = hljs.COMMENT(
        /@\*/,
        /\*@/,
        { relevance: 10 }
    );

    const xml_comment = hljs.COMMENT(
        /<!--/,
        /-->/
    );

    const razor_line = {
        begin: '@[a-zA-Z]+', returnBegin: true, end: '(</?[a-zA-Z])|$', returnEnd: true,
        scope: 'razor-line',
        subLanguage: 'csharp',
        contains: [
            {
                begin: '@',
                scope: 'symbol'
            }
        ]
    };

    const simple_xml_bloc = {
        begin: '</?[a-zA-Z]', end: '>',
        scope: 'simple-xml-block',
        subLanguage: 'xml',
        contains: [
            {
                begin: '"@\\(', excludeBegin: true, end: '\\)"', excludeEnd: true,
                scope: 'razor-code-surrounded-by-parenthesis-in-xml-attr-value',
                subLanguage: 'csharp'
            },
            {
                begin: '"@', excludeBegin: true, end: '"', excludeEnd: true,
                scope: 'razor-code-in-xml-attr-value',
                subLanguage: 'csharp'
            }
        ]
    };

    const razor_bloc = {
        begin: '((@[a-z]+)|(else))\\s?(\\(.+\\))?\\r?\\n?\\s*{', returnBegin: true, end: '^}',
        scope: 'razor-block',
        subLanguage: 'csharp',
        contains: [
            {
                begin: '@(code|functions)?',
                scope: 'symbol'
            },
            simple_xml_bloc
        ]
    };

    const xml_bloc = hljs.inherit(simple_xml_bloc, {
        scope: 'xml-block',
        contains: simple_xml_bloc.contains.concat([
            {
                begin: '@',
                scope: 'symbol'
            },
            {
                begin: '@[a-z]+ (\\(.+\\))?\\r?\\n?\\s*{', returnBegin: true, end: '}',
                subLanguage: 'csharp',
                contains: [
                    {
                        begin: '@[a-z]+',
                        scope: 'name'
                    },
                    {
                        begin: '<[a-z]', end: '}', excludeEnd: true,
                        subLanguage: 'xml'
                    }
                ]
            }
        ])
    });

    // @page, @inject, @inherits
    const razor_directives = {
        begin: '@[a-z]+\\s', returnBegin: true, end: '$',
        scope: 'razor-directives',
        subLanguage: 'csharp',
        contains: [
            {
                begin: '@[a-z]+',
                scope: 'name'
            }
        ]
    };

    return {
        name: 'razor',
        aliases: ['cshtml'],
        keywords: '@',
        contains: [
            razor_comment,
            xml_comment,
            xml_bloc,
            razor_bloc,
            razor_directives,
            razor_line
        ]
    };
}