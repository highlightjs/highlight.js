/*

Syntax highlighting with language autodetection.

URL:   http://softwaremaniacs.org/soft/highlight/
Author: Ivan Sagalaev <Maniac@SoftwareManiacs.Org>

Contributors:

- Peter Leonov <gojpeg@gmail.com> 
- Victor Karamzin <Victor.Karamzin@enterra-inc.com>
- Vsevolod Solovyov <vsevolod.solovyov@gmail.com>
- Anton Kovalyov <anton@kovalyov.net>

License (BSD):

* Copyright (c) 2006, Ivan Sagalaev
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the University of California, Berkeley nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

var IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';
var UNDERSCORE_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*';
var NUMBER_RE = '\\b\\d+(\\.\\d+)?';
var C_NUMBER_RE = '\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)';

var LANGUAGES = {}

LANGUAGES.python = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    illegal: '(</|->)',
    contains: ['comment', 'string', 'function', 'class', 'number', 'decorator'],
    keywords: {'and': 1, 'elif': 1, 'is': 1, 'global': 1, 'as': 1, 'in': 1, 'if': 1, 'from': 1, 'raise': 1, 'for': 1, 'except': 1, 'finally': 1, 'print': 1, 'import': 1, 'pass': 1, 'None': 1, 'return': 1, 'exec': 1, 'else': 1, 'break': 1, 'not': 1, 'with': 1, 'class': 1, 'assert': 1, 'yield': 1, 'try': 1, 'while': 1, 'continue': 1, 'del': 1, 'or': 1, 'def': 1, 'lambda': 1}
  },
  modes: [
    {
      className: 'function',
      lexems: [UNDERSCORE_IDENT_RE],
      begin: 'def ', end: ':',
      illegal: '$',
      keywords: {'def': 1},
      contains: ['title', 'params'],
      relevance: 10
    },
    {
      className: 'class',
      lexems: [UNDERSCORE_IDENT_RE],
      begin: 'class ', end: ':$',
      illegal: '[${]',
      keywords: {'class': 1},
      contains: ['title', 'params'],
      relevance: 10
    },
    {
      className: 'title',
      begin: UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string']
    },
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'\'\'', end: '\'\'\'',
      relevance: 10
    },
    {
      className: 'string',
      begin: '"""', end: '"""',
      relevance: 10
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'string',
      begin: 'r\'', end: '\''
    },
    {
      className: 'string',
      begin: 'r"', end: '"'
    },
    {
      className: 'string',
      begin: 'u\'', end: '(^|[^\\\\])\''
    },
    {
      className: 'string',
      begin: 'u"', end: '(^|[^\\\\])"'
    },
    {
      className: 'string',
      begin: 'ur\'', end: '\''
    },
    {
      className: 'string',
      begin: 'ur"', end: '"'
    },
    {
      className: 'decorator',
      begin: '@', end: '$'
    }
  ]
};//python

var HTML_TAGS = {'code': 1, 'kbd': 1, 'font': 1, 'noscript': 1, 'style': 1, 'img': 1, 'title': 1, 'menu': 1, 'tt': 1, 'tr': 1, 'param': 1, 'li': 1, 'tfoot': 1, 'th': 1, 'input': 1, 'td': 1, 'dl': 1, 'blockquote': 1, 'fieldset': 1, 'big': 1, 'dd': 1, 'abbr': 1, 'optgroup': 1, 'dt': 1, 'button': 1, 'isindex': 1, 'p': 1, 'small': 1, 'div': 1, 'dir': 1, 'em': 1, 'frame': 1, 'meta': 1, 'sub': 1, 'bdo': 1, 'label': 1, 'acronym': 1, 'sup': 1, 'body': 1, 'xml': 1, 'basefont': 1, 'base': 1, 'br': 1, 'address': 1, 'strong': 1, 'legend': 1, 'ol': 1, 'script': 1, 'caption': 1, 's': 1, 'col': 1, 'h2': 1, 'h3': 1, 'h1': 1, 'h6': 1, 'h4': 1, 'h5': 1, 'table': 1, 'select': 1, 'noframes': 1, 'span': 1, 'area': 1, 'dfn': 1, 'strike': 1, 'cite': 1, 'thead': 1, 'head': 1, 'option': 1, 'form': 1, 'hr': 1, 'var': 1, 'link': 1, 'b': 1, 'colgroup': 1, 'ul': 1, 'applet': 1, 'del': 1, 'iframe': 1, 'pre': 1, 'frameset': 1, 'ins': 1, 'tbody': 1, 'html': 1, 'samp': 1, 'map': 1, 'object': 1, 'a': 1, 'xmlns': 1, 'center': 1, 'textarea': 1, 'i': 1, 'q': 1, 'u': 1};

LANGUAGES.html = {
  defaultMode: {
    contains: ['tag', 'comment']
  },
  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '<!--', end: '-->'
    },
    {
      className: 'tag',
      lexems: [IDENT_RE],
      keywords: HTML_TAGS,
      begin: '<', end: '>',
      contains: ['attribute']
    },
    {
      className: 'attribute',
      begin: ' [a-zA-Z]+=', end: '^',
      contains: ['value']
    },
    {
      className: 'attribute',
      begin: ' [a-zA-Z]+', end: '^'
    },
    {
      className: 'value',
      begin: '"', end: '"'
    },
    {
      className: 'value',
      begin: '[a-zA-Z0-9]+', end: '^'
    }
  ]
};//html

LANGUAGES.css = {
  defaultMode: {
    contains: ['id', 'class', 'attr_selector', 'rules', 'comment'],
    keywords: HTML_TAGS,
    lexems: [IDENT_RE],
    illegal: '='
  },
  case_insensitive: true,
  modes: [
    {
      className: 'id',
      begin: '\\#[A-Za-z0-9_-]+', end: '^'
    },
    {
      className: 'class',
      begin: '\\.[A-Za-z0-9_-]+', end: '^',
      relevance: 0
    },
    {
      className: 'attr_selector',
      begin: '\\[', end: '\\]',
      illegal: '$'
    },
    {
      className: 'rules',
      begin: '{', end: '}',
      lexems: ['[A-Za-z-]+'],
      keywords: {'play-during': 1, 'counter-reset': 1, 'counter-increment': 1, 'min-height': 1, 'quotes': 1, 'border-top': 1, 'pitch': 1, 'font': 1, 'pause': 1, 'list-style-image': 1, 'border-width': 1, 'cue': 1, 'outline-width': 1, 'border-left': 1, 'elevation': 1, 'richness': 1, 'speech-rate': 1, 'border-bottom': 1, 'border-spacing': 1, 'background': 1, 'list-style-type': 1, 'text-align': 1, 'page-break-inside': 1, 'orphans': 1, 'page-break-before': 1, 'text-transform': 1, 'line-height': 1, 'padding-left': 1, 'font-size': 1, 'right': 1, 'word-spacing': 1, 'padding-top': 1, 'outline-style': 1, 'bottom': 1, 'content': 1, 'border-right-style': 1, 'padding-right': 1, 'border-left-style': 1, 'voice-family': 1, 'background-color': 1, 'border-bottom-color': 1, 'outline-color': 1, 'unicode-bidi': 1, 'max-width': 1, 'font-family': 1, 'caption-side': 1, 'border-right-width': 1, 'pause-before': 1, 'border-top-style': 1, 'color': 1, 'border-collapse': 1, 'border-bottom-width': 1, 'float': 1, 'height': 1, 'max-height': 1, 'margin-right': 1, 'border-top-width': 1, 'speak': 1, 'speak-header': 1, 'top': 1, 'cue-before': 1, 'min-width': 1, 'width': 1, 'font-variant': 1, 'border-top-color': 1, 'background-position': 1, 'empty-cells': 1, 'direction': 1, 'border-right': 1, 'visibility': 1, 'padding': 1, 'border-style': 1, 'background-attachment': 1, 'overflow': 1, 'border-bottom-style': 1, 'cursor': 1, 'margin': 1, 'display': 1, 'border-left-width': 1, 'letter-spacing': 1, 'vertical-align': 1, 'clip': 1, 'border-color': 1, 'list-style': 1, 'padding-bottom': 1, 'pause-after': 1, 'speak-numeral': 1, 'margin-left': 1, 'widows': 1, 'border': 1, 'font-style': 1, 'border-left-color': 1, 'pitch-range': 1, 'background-repeat': 1, 'table-layout': 1, 'margin-bottom': 1, 'speak-punctuation': 1, 'font-weight': 1, 'border-right-color': 1, 'page-break-after': 1, 'position': 1, 'white-space': 1, 'text-indent': 1, 'background-image': 1, 'volume': 1, 'stress': 1, 'outline': 1, 'clear': 1, 'z-index': 1, 'text-decoration': 1, 'margin-top': 1, 'azimuth': 1, 'cue-after': 1, 'left': 1, 'list-style-position': 1},
      contains: ['comment', 'value']
    },
    {
      className: 'comment',
      begin: '/\\*', end: '\\*/'
    },
    {
      className: 'value',
      begin: ':', end: ';', endsWithParent: true, 
      excludeBegin: true, excludeEnd: true
    }
  ]
};//css

var DELPHI_KEYWORDS = {'and': 1, 'safecall': 1, 'cdecl': 1, 'then': 1, 'string': 1, 'exports': 1, 'library': 1, 'not': 1, 'pascal': 1, 'set': 1, 'virtual': 1, 'file': 1, 'in': 1, 'array': 1, 'label': 1, 'packed': 1, 'end.': 1, 'index': 1, 'while': 1, 'const': 1, 'raise': 1, 'for': 1, 'to': 1, 'implementation': 1, 'with': 1, 'except': 1, 'overload': 1, 'destructor': 1, 'downto': 1, 'finally': 1, 'program': 1, 'exit': 1, 'unit': 1, 'inherited': 1, 'override': 1, 'if': 1, 'type': 1, 'until': 1, 'function': 1, 'do': 1, 'begin': 1, 'repeat': 1, 'goto': 1, 'nil': 1, 'far': 1, 'initialization': 1, 'object': 1, 'else': 1, 'var': 1, 'uses': 1, 'external': 1, 'resourcestring': 1, 'interface': 1, 'end': 1, 'finalization': 1, 'class': 1, 'asm': 1, 'mod': 1, 'case': 1, 'on': 1, 'shr': 1, 'shl': 1, 'of': 1, 'register': 1, 'xorwrite': 1, 'threadvar': 1, 'try': 1, 'record': 1, 'near': 1, 'stored': 1, 'constructor': 1, 'stdcall': 1, 'inline': 1, 'div': 1, 'out': 1, 'or': 1, 'procedure': 1};
var DELPHI_CLASS_KEYWORDS = {'safecall': 1, 'stdcall': 1, 'pascal': 1, 'stored': 1, 'const': 1, 'implementation': 1, 'finalization': 1, 'except': 1, 'to': 1, 'finally': 1, 'program': 1, 'inherited': 1, 'override': 1, 'then': 1, 'exports': 1, 'string': 1, 'read': 1, 'not': 1, 'mod': 1, 'shr': 1, 'try': 1, 'div': 1, 'shl': 1, 'set': 1, 'library': 1, 'message': 1, 'packed': 1, 'index': 1, 'for': 1, 'near': 1, 'overload': 1, 'label': 1, 'downto': 1, 'exit': 1, 'public': 1, 'goto': 1, 'interface': 1, 'asm': 1, 'on': 1, 'of': 1, 'constructor': 1, 'or': 1, 'private': 1, 'array': 1, 'unit': 1, 'raise': 1, 'destructor': 1, 'var': 1, 'type': 1, 'until': 1, 'function': 1, 'else': 1, 'external': 1, 'with': 1, 'case': 1, 'default': 1, 'record': 1, 'while': 1, 'protected': 1, 'property': 1, 'procedure': 1, 'published': 1, 'and': 1, 'cdecl': 1, 'do': 1, 'threadvar': 1, 'file': 1, 'in': 1, 'if': 1, 'end': 1, 'virtual': 1, 'write': 1, 'far': 1, 'out': 1, 'begin': 1, 'repeat': 1, 'nil': 1, 'initialization': 1, 'object': 1, 'uses': 1, 'resourcestring': 1, 'class': 1, 'register': 1, 'xorwrite': 1, 'inline': 1};

LANGUAGES.delphi = {
  defaultMode: {
    lexems: [IDENT_RE],
    illegal: '("|\\$[G-Zg-z]|\\/\\*|</)',
    contains: ['comment', 'string', 'number', 'function', 'class'],
    keywords: DELPHI_KEYWORDS
  },
  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '{', end: '}'
    },
    {
      className: 'comment',
      begin: '\\(\\*', end: '\\*\\)',
      relevance: 10
    },
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'number',
      begin: NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: ['quote'],
      relevance: 0
    },
    {
      className: 'quote',
      begin: '\'\'', end: '^'
    },
    {
      className: 'function',
      begin: 'function', end: '[:;]',
      lexems: [IDENT_RE],
      keywords: {'function': 1},
      contains: ['title', 'params', 'comment'],
      relevance: 0
    },
    {
      className: 'function',
      begin: '(procedure|constructor|destructor)', end: ';',
      lexems: [IDENT_RE],
      keywords: {'constructor': 1, 'destructor': 1, 'procedure': 1},
      contains: ['title', 'params', 'comment'],
      relevance: 10
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      lexems: [IDENT_RE],
      keywords: DELPHI_KEYWORDS,
      contains: ['string']
    },
    {
      className: 'class',
      begin: '=\\s*class', end: 'end;',
      lexems: [IDENT_RE],
      keywords: DELPHI_CLASS_KEYWORDS,
      contains: ['string', 'comment', 'function']
    }
  ]
};//delphi

/*

Perl definition (с) Peter Leonov <gojpeg@gmail.com>
Test you perl code here: http://wiki.cmsbuilder.ru/Highlite_test

*/

var PERL_NUMBER_RE = '(\\b0[0-7]+)|(\\b0x[0-9a-fA-F]+)|(\\b[1-9]\\d*(\\.\\d+)?)';
var PERL_KYEWORDS = {'getpwent': 1, 'getservent': 1, 'quotemeta': 1, 'msgrcv': 1, 'scalar': 1, 'kill': 1, 'dbmclose': 1, 'undef': 1, 'lc': 1, 'ma': 1, 'syswrite': 1, 'tr': 1, 'send': 1, 'umask': 1, 'sysopen': 1, 'shmwrite': 1, 'vec': 1, 'qx': 1, 'utime': 1, 'local': 1, 'oct': 1, 'semctl': 1, 'localtime': 1, 'readpipe': 1, 'do': 1, 'return': 1, 'format': 1, 'read': 1, 'sprintf': 1, 'dbmopen': 1, 'pop': 1, 'getpgrp': 1, 'not': 1, 'getpwnam': 1, 'rewinddir': 1, 'qq': 1, 'fileno': 1, 'qw': 1, 'endprotoent': 1, 'wait': 1, 'sethostent': 1, 'bless': 1, 's': 1, 'opendir': 1, 'continue': 1, 'each': 1, 'sleep': 1, 'endgrent': 1, 'shutdown': 1, 'dump': 1, 'chomp': 1, 'connect': 1, 'getsockname': 1, 'die': 1, 'socketpair': 1, 'close': 1, 'flock': 1, 'exists': 1, 'index': 1, 'shmget': 1, 'sub': 1, 'for': 1, 'endpwent': 1, 'redo': 1, 'lstat': 1, 'msgctl': 1, 'setpgrp': 1, 'abs': 1, 'exit': 1, 'select': 1, 'print': 1, 'ref': 1, 'gethostbyaddr': 1, 'unshift': 1, 'fcntl': 1, 'syscall': 1, 'goto': 1, 'getnetbyaddr': 1, 'join': 1, 'gmtime': 1, 'symlink': 1, 'semget': 1, 'splice': 1, 'x': 1, 'getpeername': 1, 'recv': 1, 'log': 1, 'setsockopt': 1, 'cos': 1, 'last': 1, 'reverse': 1, 'gethostbyname': 1, 'getgrnam': 1, 'study': 1, 'formline': 1, 'endhostent': 1, 'times': 1, 'chop': 1, 'length': 1, 'gethostent': 1, 'getnetent': 1, 'pack': 1, 'getprotoent': 1, 'getservbyname': 1, 'rand': 1, 'mkdir': 1, 'pos': 1, 'chmod': 1, 'y': 1, 'substr': 1, 'endnetent': 1, 'printf': 1, 'next': 1, 'open': 1, 'msgsnd': 1, 'readdir': 1, 'use': 1, 'unlink': 1, 'getsockopt': 1, 'getpriority': 1, 'rindex': 1, 'wantarray': 1, 'hex': 1, 'system': 1, 'getservbyport': 1, 'endservent': 1, 'int': 1, 'chr': 1, 'untie': 1, 'rmdir': 1, 'prototype': 1, 'tell': 1, 'listen': 1, 'fork': 1, 'shmread': 1, 'ucfirst': 1, 'setprotoent': 1, 'else': 1, 'sysseek': 1, 'link': 1, 'getgrgid': 1, 'shmctl': 1, 'waitpid': 1, 'unpack': 1, 'getnetbyname': 1, 'reset': 1, 'chdir': 1, 'grep': 1, 'split': 1, 'require': 1, 'caller': 1, 'lcfirst': 1, 'until': 1, 'warn': 1, 'while': 1, 'values': 1, 'shift': 1, 'telldir': 1, 'getpwuid': 1, 'my': 1, 'getprotobynumber': 1, 'delete': 1, 'and': 1, 'sort': 1, 'uc': 1, 'defined': 1, 'srand': 1, 'accept': 1, 'package': 1, 'seekdir': 1, 'getprotobyname': 1, 'semop': 1, 'our': 1, 'rename': 1, 'seek': 1, 'if': 1, 'q': 1, 'chroot': 1, 'sysread': 1, 'setpwent': 1, 'no': 1, 'crypt': 1, 'getc': 1, 'chown': 1, 'sqrt': 1, 'write': 1, 'setnetent': 1, 'setpriority': 1, 'foreach': 1, 'tie': 1, 'sin': 1, 'msgget': 1, 'map': 1, 'stat': 1, 'getlogin': 1, 'unless': 1, 'elsif': 1, 'truncate': 1, 'exec': 1, 'keys': 1, 'glob': 1, 'tied': 1, 'closedir': 1, 'ioctl': 1, 'socket': 1, 'readlink': 1, 'eval': 1, 'xor': 1, 'readline': 1, 'binmode': 1, 'setservent': 1, 'eof': 1, 'ord': 1, 'bind': 1, 'alarm': 1, 'pipe': 1, 'atan2': 1, 'getgrent': 1, 'exp': 1, 'time': 1, 'push': 1, 'setgrent': 1, 'gt': 1, 'lt': 1, 'or': 1, 'ne': 1, 'm': 1};

LANGUAGES.perl = {
  defaultMode: {
    lexems: [IDENT_RE],
    contains: ['comment', 'string', 'number', 'regexp', 'sub', 'variable', 'operator', 'pod'],
    keywords: PERL_KYEWORDS
  },
  modes: [

    // variables
    {
      className: 'variable',
      begin: '[\\$\\%\\@\\*]([^\\s\\w{#]|{\\w+}|#?\\w+)', end: '^'
    },

    // numbers and strings
    {
      className: 'number',
      begin: PERL_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: 'q[qwxr]?\\(', end: '[^\\\\]\\)',
      relevance: 10
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '`', end: '(^|[^\\\\])`',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    
    // operators
    {
      className: 'operator',
      begin: '\\s-\\w', end: '^'
    },
  
    // regexps
    {
      className: 'regexp',
      begin: '(s|tr|y)(\\/.*?[^\\\\]\\/|\\/\\/)(.*?[^\\\\]\\/|\\/)[a-z]*', end: '^',
      relevance: 10
    },
    {
      className: 'regexp',
      begin: '(m|qr)?\\/\\/[cgimosxe]*', end: '^',
      relevance: 0 // allows empty "//" which is a common comment delimiter in other languages
    },
    {
      className: 'regexp',
      begin: '(m|qr)?\\/.*?[^\\\\/]\\/[cgimosxe]*', end: '^'
    },

    // bareword context
    {
      className: 'string',
      begin: '{\\w+}', end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\-?\\w+\\s*\\=\\>', end: '^',
      relevance: 5
    },

    // subroutines
    {
      className: 'sub',
      begin: 'sub\\b', end: '\\w+',
      lexems: [IDENT_RE],
      keywords: {'sub':1},
      relevance: 10
    },

    // comments
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    // pod
    {
      className: 'pod',
      begin: '\\=\\w', end: '\\=cut'
    }
  ]
};//perl

/*

PHP5 definition (с) Victor Karamzin <Victor.Karamzin@enterra-inc.com>

*/
PHP5_KEYWORDS = {'and': 1, 'include_once': 1, 'list': 1, 'abstract': 1, 'global': 1, 'private': 1, 'echo': 1, 'interface': 1, 'as': 1, 'static': 1, 'endswitch': 1, 'array': 1, 'null': 1, 'if': 1, 'endwhile': 1, 'or': 1, 'const': 1, 'for': 1, 'endforeach': 1, 'self': 1, 'var': 1, 'while': 1, 'isset': 1, 'public': 1, 'protected': 1, 'exit': 1, 'foreach': 1, 'throw': 1, 'elseif': 1, 'extends': 1, 'include': 1, '__FILE__': 1, 'empty': 1, 'require_once': 1, 'function': 1, 'do': 1, 'xor': 1, 'return': 1, 'implements': 1, 'parent': 1, 'clone': 1, 'use': 1, '__CLASS__': 1, '__LINE__': 1, 'else': 1, 'break': 1, 'print': 1, 'eval': 1, 'new': 1, 'catch': 1, '__METHOD__': 1, 'class': 1, 'case': 1, 'exception': 1, 'php_user_filter': 1, 'default': 1, 'die': 1, 'require': 1, '__FUNCTION__': 1, 'enddeclare': 1, 'final': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'endfor': 1, 'endif': 1, 'declare': 1, 'unset': 1};

PHP_IDENTIFIER_RE = '[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*';

LANGUAGES.php = {
  defaultMode: {
    lexems: [IDENT_RE],
    contains: ['comment', 'number', 'string', 'variable'],
    keywords: PHP5_KEYWORDS
  },
  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    {
      className: 'comment',
      begin: '/\\*', end: '\\*/',
      contains: ['phpdoc']
    },
    {
      className: 'phpdoc',
      begin: '\\s@[A-Za-z]+', end: '^',
      relevance: 10
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\\\'', end: '(^|[^\\\\])\\\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'variable',
      begin: '\\$' + PHP_IDENTIFIER_RE, end: '^'
    },
    ]
};//php


/*

Java definition (с) Vsevolod Solovyov <vsevolod.solovyov@gmail.com>

*/
LANGUAGES.java  = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    contains: ['comment', 'string', 'class', 'number', 'javadoc', 'annotation'],
    keywords: {'false': 1, 'synchronized': 1, 'int': 1, 'abstract': 1, 'float': 1, 'private': 1, 'char': 1, 'interface': 1, 'boolean': 1, 'static': 1, 'null': 1, 'if': 1, 'const': 1, 'for': 1, 'true': 1, 'while': 1, 'long': 1, 'throw': 1, 'strictfp': 1, 'finally': 1, 'protected': 1, 'extends': 1, 'import': 1, 'native': 1, 'final': 1, 'implements': 1, 'return': 1, 'void': 1, 'enum': 1, 'else': 1, 'break': 1, 'transient': 1, 'new': 1, 'catch': 1, 'instanceof': 1, 'byte': 1, 'super': 1, 'class': 1, 'volatile': 1, 'case': 1, 'assert': 1, 'short': 1, 'package': 1, 'default': 1, 'double': 1, 'public': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'throws': 1}
  },
  modes: [
    {
      className: 'class',
      lexems: [UNDERSCORE_IDENT_RE],
      begin: '(class |interface )', end: '{', 
      illegal: ':',
      keywords: {'class': 1, 'interface': 1},
      contains: ['inheritance', 'title']
    },
    {
      className: 'inheritance',
      begin: '(implements|extends)', end: '^',
      lexems: [IDENT_RE],
      keywords: {'extends': 1, 'implements': 1},
      relevance: 10
    },
    {
      className: 'title',
      begin: UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string', 'annotation']
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'javadoc',
      begin: '/\\*\\*', end: '\\*/',
      relevance: 10
    },
    {
      className: 'comment',
      begin: '\\/\\*', end: '\\*/'
    },
    {
      className: 'annotation',
      begin: '@[A-Za-z]+', end: '^'
    }
  ]
};//java

LANGUAGES.cpp = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    illegal: '</',
    contains: ['comment', 'string', 'number', 'preprocessor'],
    keywords: {'false': 1, 'int': 1, 'float': 1, 'while': 1, 'private': 1, 'char': 1, 'catch': 1, 'export': 1, 'virtual': 1, 'operator': 1, 'sizeof': 1, 'dynamic_cast': 1, 'typedef': 1, 'const_cast': 1, 'const': 1, 'struct': 1, 'for': 1, 'static_cast': 1, 'union': 1, 'namespace': 1, 'unsigned': 1, 'long': 1, 'throw': 1, 'volatile': 1, 'static': 1, 'protected': 1, 'bool': 1, 'template': 1, 'mutable': 1, 'if': 1, 'public': 1, 'friend': 1, 'do': 1, 'return': 1, 'goto': 1, 'auto': 1, 'void': 1, 'enum': 1, 'else': 1, 'break': 1, 'new': 1, 'extern': 1, 'using': 1, 'true': 1, 'class': 1, 'asm': 1, 'case': 1, 'typeid': 1, 'short': 1, 'reinterpret_cast': 1, 'default': 1, 'double': 1, 'register': 1, 'explicit': 1, 'signed': 1, 'typename': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'wchar_t': 1, 'inline': 1, 'delete': 1}
  },
  modes: [
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'comment',
      begin: '/\\*', end: '\\*/'
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '[^\\\\]\'',
      illegal: '[^\\\\][^\']'
    },
    {
      className: 'preprocessor',
      begin: '#', end: '$'
    }
  ]
};//cpp

/*

Ruby definition (с) Anton Kovalyov <anton@kovalyov.net>

*/
LANGUAGES.ruby = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    contains: ['comment', 'string', 'class', 'function', 'symbol'],
    keywords: {'and': 1, 'false': 1, 'then': 1, 'defined': 1, 'module': 1, 'in': 1, 'return': 1, 'redo': 1, 'if': 1, 'BEGIN': 1, 'retry': 1, 'end': 1, 'for': 1, 'true': 1, 'self': 1, 'when': 1, 'next': 1, 'until': 1, 'do': 1, 'begin': 1, 'unless': 1, 'END': 1, 'rescue': 1, 'nil': 1, 'else': 1, 'break': 1, 'undef': 1, 'not': 1, 'super': 1, 'class': 1, 'case': 1, 'require': 1, 'yield': 1, 'alias': 1, 'while': 1, 'ensure': 1, 'elsif': 1, 'or': 1, 'def': 1}
  },
  modes: [
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    {
      className: 'comment',
      begin: '^\\=begin', end: '^\\=end',
      relevance: 10
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"'
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\''
    },
    {
      className: 'function',
      lexems: [IDENT_RE],
      begin: 'def ', end: '$',
      illegal: '{',
      keywords: {'def': 1},
      contains: ['title', 'comment'],
      relevance: 10
    },    
    { 
      className: 'class',
      lexems: [IDENT_RE],
      begin: 'class ', end: '$',
      illegal: '{',
      contains: ['title', 'comment'],      
      keywords: {'class': 1}
    },
    {
      className: 'symbol',
      begin: ':' + UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'title',
      begin: IDENT_RE + "\\s*<\\s*" + IDENT_RE, end: '^'
    },
    {
      className: 'title',
      begin: 'self.' + IDENT_RE, end: '^'
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    }
  ]
};//ruby

LANGUAGES.javascript = {
  defaultMode: {
    lexems: [UNDERSCORE_IDENT_RE],
    contains: ['string', 'comment', 'number', 'regexp', 'function', 'literal'],
    keywords: {'in': 1, 'if': 1, 'for': 1, 'while': 1, 'finally': 1, 'var': 1, 'new': 1, 'function': 1, 'do': 1, 'return': 1, 'void': 1, 'else': 1, 'break': 1, 'catch': 1, 'instanceof': 1, 'with': 1, 'throw': 1, 'case': 1, 'default': 1, 'try': 1, 'this': 1, 'switch': 1, 'continue': 1, 'typeof': 1, 'delete': 1}
  },
  modes: [
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'comment',
      begin: '/\\*', end: '\\*/'
    },
    {
      className: 'number',
      begin: C_NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'literal',
      begin: '\\b(true|false|null)', end: '^'
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'regexp',
      begin: '\\/[^\\/]', end: '(^|[^\\\\])\\/[gim]*'
    },
    {
      className: 'function',
      begin: 'function ', end: '{',
      lexems: [UNDERSCORE_IDENT_RE],
      keywords: {'function': 1},
      contains: ['title', 'params']
    },
    {
      className: 'title',
      begin: UNDERSCORE_IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string', 'comment']
    }
  ]
};//javascript

function langRe(language, value, global) {
  var mode =  'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : '');
  return new RegExp(value, mode);
}//re

for (var i in LANGUAGES) {
  var language = LANGUAGES[i];
  for (var key in language.modes) {
    if (language.modes[key].begin)
      language.modes[key].beginRe = langRe(language, language.modes[key].begin);
    if (language.modes[key].end)
      language.modes[key].endRe = langRe(language, language.modes[key].end);
    if (language.modes[key].illegal)
      language.modes[key].illegalRe = langRe(language, '^(?:' + language.modes[key].illegal + ')');
    language.defaultMode.illegalRe = langRe(language, '^(?:' + language.defaultMode.illegal + ')');
  }//for
}//for

var selected_languages = {};

function Highlighter(language_name, value) {
  currentMode = function(){
    return modes[modes.length - 1];
  }//currentMode
  
  function subMode(lexem) {
    if (!currentMode().contains)
      return null;
    for (var key in language.modes)
      if (contains(currentMode().contains, language.modes[key].className) && language.modes[key].beginRe.test(lexem))
        return language.modes[key];
    return null;
  }//subMode

  function endOfMode(mode_index, lexem) {
    if (modes[mode_index].end && modes[mode_index].endRe.test(lexem))
      return 1;
    if (modes[mode_index].endsWithParent) {
      var level = endOfMode(mode_index - 1, lexem);
      return level ? level + 1 : 0;
    }//if
    return 0;
  }//endOfMode
  
  function isIllegal(lexem) {
    if (!currentMode().illegalRe)
      return false;
    return currentMode().illegalRe.test(lexem);
  }//isIllegal

  function eatModeChunk(value, index) {
    if (!currentMode().terminators) {
      var terminators = [];
      
      if (currentMode().contains)
        for (var key in language.modes) {
          if (contains(currentMode().contains, language.modes[key].className) &&
              !contains(terminators, language.modes[key].begin))
            terminators[terminators.length] = language.modes[key].begin;
        }//for
      
      var mode_index = modes.length - 1;
      do {
        if (modes[mode_index].end && !contains(terminators, modes[mode_index].end))
          terminators[terminators.length] = modes[mode_index].end;
        mode_index--;
      } while (modes[mode_index + 1].endsWithParent);
      
      if (currentMode().illegal)
        if (!contains(terminators, currentMode().illegal))
          terminators[terminators.length] = currentMode().illegal;
      
      var terminator_re = '(' + terminators[0];
      for (var i = 0; i < terminators.length; i++)
        terminator_re += '|' + terminators[i];
      terminator_re += ')';
      currentMode().terminators = langRe(language, terminator_re);
    }//if
    value = value.substr(index);
    var match = currentMode().terminators.exec(value);
    if (!match) 
      return [value, '', true];
    if (match.index == 0)
      return ['', match[0], false];
    else
      return [value.substr(0, match.index), match[0], false];
  }//eatModeChunk
  
  function escape(value) {
    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
  }//escape
  
  function processKeywords(buffer) {
    var mode = currentMode();
    if (!mode.keywords || !mode.lexems)
      return escape(buffer);
    if (!mode.lexemsRe) {
      var lexems = [];
      for (var key in mode.lexems)
        if (!contains(lexems, mode.lexems[key]))
          lexems[lexems.length] = mode.lexems[key];
      var lexems_re = '(' + lexems[0];
      for (var i = 1; i < lexems.length; i++)
        lexems_re += '|' + lexems[i];
      lexems_re += ')';
      mode.lexemsRe = langRe(language, lexems_re, true);
    }//if
    var result = '';
    var last_index = 0;
    mode.lexemsRe.lastIndex = 0;
    var match = mode.lexemsRe.exec(buffer);
    while (match) {
      result += escape(buffer.substr(last_index, match.index - last_index));
      if (mode.keywords[language.case_insensitive ? match[0].toLowerCase() : match[0]]) {
        keyword_count++;
        result += '<span class="keyword">' + escape(match[0]) + '</span>';
      } else {
        result += escape(match[0]);
      }//if
      last_index = mode.lexemsRe.lastIndex;
      match = mode.lexemsRe.exec(buffer);
    }//while
    result += escape(buffer.substr(last_index, buffer.length - last_index));
    return result;
  }//processKeywords
  
  function processModeInfo(buffer, lexem, end) {
    if (end) {
      result += processKeywords(currentMode().buffer + buffer);
      return;
    }//if
    if (isIllegal(lexem))
      throw 'Illegal';
    var new_mode = subMode(lexem);
    if (new_mode) {
      currentMode().buffer += buffer;
      result += processKeywords(currentMode().buffer);
      if (new_mode.excludeBegin) {
        result += lexem + '<span class="' + new_mode.className + '">';
        new_mode.buffer = '';
      } else {
        result += '<span class="' + new_mode.className + '">';
        new_mode.buffer = lexem;
      }//if
      modes[modes.length] = new_mode;
      relevance += currentMode().relevance != undefined ? currentMode().relevance : 1;
      return;
    }//if
    var end_level = endOfMode(modes.length - 1, lexem);
    if (end_level) {
      currentMode().buffer += buffer;
      if (currentMode().excludeEnd) {
        result += processKeywords(currentMode().buffer) + '</span>' + lexem;
      } else {
        result += processKeywords(currentMode().buffer + lexem) + '</span>';
      }
      while (end_level > 1) {
        result += '</span>';
        end_level--;
        modes.length--;
      }//while
      modes.length--;
      currentMode().buffer = '';
      return;
    }//if
  }//processModeInfo

  function highlight(value) {
    var index = 0;
    language.defaultMode.buffer = '';
    for (var mode_info = eatModeChunk(value, index); index < value.length; mode_info = eatModeChunk(value, index)) {
      processModeInfo(mode_info[0], mode_info[1], mode_info[2]);
      index += mode_info[0].length + mode_info[1].length;
    }//for
    if(modes.length > 1)
      throw 'Illegal';
  }//highlight
  
  this.language_name = language_name;
  var language = LANGUAGES[language_name];
  var modes = [language.defaultMode];
  var relevance = 0;
  var keyword_count = 0;
  var result = '';
  try {
    highlight(value);
    this.relevance = relevance;
    this.keyword_count = keyword_count;
    this.result = result;
  } catch (e) {
    if (e == 'Illegal') {
      this.relevance = 0;
      this.keyword_count = 0;
      this.result = value;
    } else {
      throw e;
    }//if
  }//try
}//Highlighter

function contains(array, item) {
  if (!array)
    return false;
  for (var key in array)
    if (array[key] == item)
      return true;
  return false;
}//contains

function blockText(block) {
  var result = '';
  for (var i = 0; i < block.childNodes.length; i++)
    if (block.childNodes[i].nodeType == 3)
      result += block.childNodes[i].nodeValue;
    else if (block.childNodes[i].nodeName == 'BR')
      result += '\n';
    else
      throw 'Complex markup';
  return result;
}//blockText

function initHighlight(block) {
  if (block.className.search(/\bno\-highlight\b/) != -1)
    return;
  try {
    blockText(block);
  } catch (e) {
    if (e == 'Complex markup')
      return;
  }//try
  var classes = block.className.split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    if (LANGUAGES[classes[i]]) {
      highlightLanguage(block, classes[i]);
      return;
    }//if
  }//for
  highlightAuto(block);
}//initHighlight

function highlightLanguage(block, language) {
  var highlight = new Highlighter(language, blockText(block));
  // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
  var container = document.createElement('div');
  container.innerHTML = '<pre><code class="' + block.className + '">' + highlight.result + '</code></pre>';
  var environment = block.parentNode.parentNode;
  environment.replaceChild(container.firstChild, block.parentNode);
}//highlightLanguage
    
function highlightAuto(block) {
  var result = null;
  var language = '';
  var max_relevance = 2;
  var relevance = 0;
  var block_text = blockText(block);
  for (var key in selected_languages) {
    var highlight = new Highlighter(key, block_text);
    relevance = highlight.keyword_count + highlight.relevance;
    if (highlight.keyword_count && relevance > max_relevance) {
      max_relevance = relevance;
      result = highlight;
    }//if
  }//for
  
  if(result) {
    // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
    var container = document.createElement('div');
    container.innerHTML = '<pre><code class="' + result.language_name + '">' + result.result + '</code></pre>';
    var environment = block.parentNode.parentNode;
    environment.replaceChild(container.firstChild, block.parentNode);
  }//if
}//highlightAuto

function initHighlighting() {
  if (initHighlighting.called)
    return;
  initHighlighting.called = true;
  if (arguments.length) {
    for (var i = 0; i < arguments.length; i++) {
      if (LANGUAGES[arguments[i]]) {
        selected_languages[arguments[i]] = LANGUAGES[arguments[i]];
      }//if
    }//for
  } else
    selected_languages = LANGUAGES;
  var pres = document.getElementsByTagName('pre');
  for (var i = 0; i < pres.length; i++) {
    if (pres[i].firstChild && pres[i].firstChild.nodeName == 'CODE')
      initHighlight(pres[i].firstChild);
  }//for
}//initHighlighting

function initHighlightingOnLoad() {
  var original_arguments = arguments;
  var handler = function(){initHighlighting.apply(null, original_arguments)};
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', handler, false);
    window.addEventListener('load', handler, false);
  } else if (window.attachEvent)
    window.attachEvent('onload', handler);
  else
    window.onload = handler;
}//initHighlightingOnLoad