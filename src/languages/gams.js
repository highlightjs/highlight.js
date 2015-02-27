module.exports = function (hljs){

    var keywords = 'abort acronym acronyms alias all and assign binary card diag display else1 eps eq equation equations file ' +
        'files for1 free ge gt if inf integer le loop lt maximizing minimizing model models na ne negative no not option   options or ord ' +
        'parameter parameters positive prod putpage puttl repeat sameas scalar scalars semicont semiint set1 sets smax smin solve sos1 sos2 ' +
        'sum system table then until using variable variables while1 xor yes';

    keywords += keywords.toUpperCase();


    return {
        keywords: keywords,
        case_insensitive: false,
        contains: [
            {
                className: 'string',
                begin: '\\*{3}', end: '\\*{3}'
            },
            {
                className:'comment',
                begin: 'PARAMETER|SET|SCALAR|FILE|DISPLAY|SOLVE'
            },
            {
                className:'number',
                begin: '\\$[a-zA-Z0-9]+'
            }
        ]
    }
}

