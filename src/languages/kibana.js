/*
Language: Kibana
Author: Thiago Souza <tcostasouza@gmail.com>
Requires: json.js
Description: Kibana Dev Tools syntax used to interact with Elasticsearch 
Category: common, protocols
*/

function(hljs) {
    return {
        aliases: ['es', 'elasticsearch', 'elastic'],
        case_insensitive: false,
        contains: [
            {
                beginKeywords: 'GET HEAD PUT POST DELETE PATCH', end: '$',
                contains: [
                    {
                        className: 'string', 
                        begin: '/?.+'
                    }
                ]
            },
            {
                begin: '^{$', end: '^}$', 
                subLanguage: 'json'
            }
        ]
    };
}