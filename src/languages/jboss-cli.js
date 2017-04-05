/*
 Language: jboss-cli
 Author: Raphaël Parrëe <rparree@edc4it.com>
 Description: language definition jboss cli
 Category: config
 */

function(hljs) {
  var PARAMS = [{
    className: "attribute",
    begin: /[\w-]+\s?=/,
    starts: {

      ends: /$/,
      className: "string"
    }
  }];

  return {
    aliases: ['wildfly-cli'],
    case_insensitive: false,
    keywords: {
      keyword: 'alias batch cd clear command connect connection-factory connection-info data-source deploy ' +
      'deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue jms-topic ls ' +
      ' patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias ' +
      'undeploy unset version xa-data-source', // module
      literal: 'true false'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'params',
        begin: "--",
        end: "$"

      },
      {
        className: 'function',
        begin: /:\w+/

      },
      {
        className: 'symbol',
        begin: /\B(\/[\w-/=]+)+/

      },
      {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        contains: PARAMS
      }

    ]
  }
}
