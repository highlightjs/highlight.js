/*
Language: Smali
Author: Dennis Titze <dennis.titze@gmail.com>
Description: Basic Smali highlighting
*/

function(hljs) {
  var instruction = ['add', 'aget', 'and', 'aput', 'array', 'check', 'cmp', 'cmpg', 'cmpl', 'const', 'div', 'double', 'execute', 'fill', 'filled', 'float', 'goto', 'goto/16', 'goto/32', 'if', 'iget', 'instance', 'int', 'invoke', 'iput', 'long', 'monitor', 'move', 'mul', 'neg', 'new', 'nop', 'not', 'or', 'packed', 'rem', 'return', 'sget', 'shl', 'shr', 'sparse', 'sput', 'sub', 'throw', 'ushr', 'xor'];
  var keywords = ['transient', 'constructor', 'abstract', 'final', 'synthetic', 'public', 'private', 'protected', 'static', 'bridge', 'system']
  return {
    aliases: ['smali'],
    contains: [
      {
        className: 'string',
        begin: '"', end: '"',
        relevance: 10
      },
      {
        className: 'comment',
        begin: '#', end: '$',
      },
      {
        className: 'keyword',
        begin: '\\s*\\.end\\s[a-zA-Z0-9]*',
      },
      {
        className: 'keyword',
        begin: '^[ ]*\\.[a-zA-Z]*',
      },
      {
        className: 'keyword',
        begin: '\\s:[a-zA-Z_0-9]*',
      },
      {
        className: 'keyword',
        begin: '\\s('+keywords.join('|')+')',
      },
      {
        className: 'keyword',
        begin: '\\[',
      },
      {
        className: 'instruction',
        begin: '\\s('+instruction.join('|')+')((\-|/)[a-zA-Z0-9]+)*\\s',
      },
      {
        className: 'class',
        begin: 'L[^\(;:\n]*;',
      },
      {
        className: 'function',
        begin: '( |->)[^(\n ;"]*\\(',
      },
      {
        className: 'function',
        begin: '\\)',
      },
      {
        className: 'variable',
        begin: '[vp][0-9]+'
      }
    ]
  };
}
