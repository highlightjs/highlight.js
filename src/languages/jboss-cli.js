/*
 Language: jboss-cli
 Author: Raphaël Parrëe <rparree@edc4it.com>
 Description: language definition jboss cli
 Category: config
 */

function (hljs) {
  var PARAMS = [{
    className: "attribute",
    begin: /[\w-]+\s?/,
    end: "=",
    excludeEnd: true,
    starts: {
      end: /$/,
      className: "string"
    },
    relevance: -1
  }];

  var OPERATION = {
    className: 'function',
    begin: /:[\w\-.]+/,
    relevance: 0

  };
  var PATH = {
    className: 'symbol',
    begin: /\B(([\/.])[\w\-.\/=]+)+/,
    relevance: 1
  };
  var PARAMSBLOCK = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    contains: PARAMS,
    relevance: 0
  };
  var COMMAND_PARAMS = {
    className: 'params',
    begin: /--[\w\-=\/]+/,
  };
  return {
    aliases: ['wildfly-cli'],
    lexemes: '[a-z\-]+',
    keywords: {
      keyword: 'alias batch cd clear command connect connection-factory connection-info data-source deploy ' +
      'deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls ' +
      'patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias ' +
      'undeploy unset version xa-data-source', // module
      literal: 'true false'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      COMMAND_PARAMS,
      OPERATION,
      PATH,
      PARAMSBLOCK
    ]
  }
}
