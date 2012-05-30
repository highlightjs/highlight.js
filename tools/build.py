# -*- coding:utf-8 -*-
'''
Function for building whole packed version of highlight.js out of
pre-packed modules.
'''

import os
import shutil
import sys
import re
import optparse
import subprocess
import json
from functools import partial

REPLACES = {
    'defaultMode': 'dM',
    'case_insensitive': 'cI',
    'lexems': 'l',
    'contains': 'c',
    'keywords': 'k',
    'subLanguage': 'sL',
    'className': 'cN',
    'begin': 'b',
    'beginWithKeyword': 'bWK',
    'end': 'e',
    'endsWithParent': 'eW',
    'illegal': 'i',
    'excludeBegin': 'eB',
    'excludeEnd': 'eE',
    'returnBegin': 'rB',
    'returnEnd': 'rE',
    'relevance': 'r',

    'IDENT_RE': 'IR',
    'UNDERSCORE_IDENT_RE': 'UIR',
    'NUMBER_RE': 'NR',
    'C_NUMBER_RE': 'CNR',
    'BINARY_NUMBER_RE': 'BNR',
    'RE_STARTERS_RE': 'RSR',
    'APOS_STRING_MODE': 'ASM',
    'QUOTE_STRING_MODE': 'QSM',
    'BACKSLASH_ESCAPE': 'BE',
    'C_LINE_COMMENT_MODE': 'CLCM',
    'C_BLOCK_COMMENT_MODE': 'CBLCLM',
    'HASH_COMMENT_MODE': 'HCM',
    'C_NUMBER_MODE': 'CNM',
    'BINARY_NUMBER_MODE': 'BNM',
    'NUMBER_MODE': 'NM',

    'beginRe': 'bR',
    'endRe': 'eR',
    'illegalRe': 'iR',
    'lexemsRe': 'lR',
    'terminators': 't',
}

CATEGORIES = {
    'common': ['bash', 'java', 'ini', 'sql', 'diff', 'php', 'cs', 'cpp', 'ruby', 'python', 'css', 'perl', 'xml', 'javascript', 'http', 'json'],
}

def mapnonstrings(source, func):
    result = []
    pos = 0
    quotes = re.compile('[\'"]')
    while pos < len(source):
        match = quotes.search(source, pos)
        end = match.start() if match else len(source)
        result.append(func(source[pos:end]))
        pos = end
        if match:
            terminator = re.compile(r'[%s\\]' % match.group(0))
            start = pos
            pos += 1
            while True:
                match = terminator.search(source, pos)
                if not match:
                    raise ValueError('Unmatched quote')
                if match.group(0) == '\\':
                    pos = match.start() + 2
                else:
                    pos = match.start() + 1
                    result.append(source[start:pos])
                    break
    return ''.join(result)

def compress_content(tools_path, content):
    for s, r in REPLACES.items():
        content = mapnonstrings(content, partial(re.sub, r'\b%s\b' % s, r))
    content = re.sub(r'(block|parentNode)\.cN', r'\1.className', content)

    args = ['java', '-jar', os.path.join(tools_path, 'yuicompressor.jar'), '--type', 'js']
    p = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    p.stdin.write(content)
    p.stdin.close()
    content = p.stdout.read()
    p.stdout.close()

    return content

def parse_header(content):
    '''
    Parses possible language description header from a file. If a header is found returns it
    as dict, otherwise returns None.
    '''
    match = re.search(r'^\s*/\*(.*?)\*/', content, re.S)
    if not match:
        return
    headers = match.group(1).split('\n')
    headers = dict(h.strip().split(': ') for h in headers if ': ' in h)
    return headers if 'Language' in headers else None

def language_filenames(src_path, languages):
    '''
    Resolves dependencies and returns the list of actual language filenames
    '''
    lang_path = os.path.join(src_path, 'languages')
    filenames = os.listdir(lang_path)
    infos = [
        (parse_header(open(os.path.join(lang_path, f)).read(1024)), f)
        for f in filenames
    ]
    infos = [(i, f) for i, f in infos if i]

    # Filtering infos based on list of languages and categories
    if languages:
        categories = set(l for l in languages if l.startswith(':'))
        languages = set(languages) - categories
        categories = set(c.strip(':') for c in categories)
        cat_languages = reduce(
            lambda a, b: set(a) | set(b),
            [l for c, l in CATEGORIES.items() if c in categories],
            set()
        )
        languages |= cat_languages
        infos = [
            (i, f) for i, f in infos
            if os.path.splitext(f)[0] in languages
        ]

    def append(filename):
        if filename not in filenames:
            filenames.append(filename)

    filenames = []
    for info, filename in infos:
        if 'Requires' in info:
            requires = [r.strip() for r in info['Requires'].split(',')]
            for r in requires:
                append(r)
        append(filename)
    return [os.path.join(lang_path, f) for f in filenames]

def strip_read(filename):
    s = open(filename).read()
    pattern = re.compile(r'^\s*(/\*(.*?)\*/)?\s*', re.DOTALL)
    s = pattern.sub('', s)
    return s.strip()

def build_browser(root, build_path, languages, options):
    src_path = os.path.join(root, 'src')
    tools_path = os.path.join(root, 'tools')
    filenames = language_filenames(src_path, languages)
    print 'Building %d files:\n%s' % (len(filenames), '\n'.join(filenames))
    hljs = 'var hljs = new %s();' % strip_read(os.path.join(src_path, 'highlight.js'))
    files = (strip_read(f) for f in filenames)
    languages = [os.path.splitext(os.path.basename(f))[0] for f in filenames]
    files = ['\nhljs.LANGUAGES[\'%s\'] = %s(hljs);' % (l, f) for l, f in zip(languages, files)]
    content = ''.join([hljs] + files)
    print 'Uncompressed size:', len(content)
    if options.compress:
        print 'Compressing...'
        content = compress_content(tools_path, content)
        print 'Compressed size:', len(content)
    open(os.path.join(build_path, 'highlight.pack.js'), 'w').write(content)
    print 'Done.'

def build_node(root, build_path, languages, options):
    src_path = os.path.join(root, 'src')
    filenames = language_filenames(src_path, languages)
    print 'Building %d files:' % len(filenames)
    for filename in filenames:
        print filename
        content = 'module.exports = %s' % strip_read(filename)
        open(os.path.join(build_path, os.path.basename(filename)), 'w').write(content)
    filename = os.path.join(src_path, 'highlight.js')
    print filename
    hljs = 'var hljs = new %s();' % strip_read(filename)
    print 'Registering languages with the library...'
    filenames = map(os.path.basename, filenames)
    for filename in filenames:
        hljs += '\nhljs.LANGUAGES[\'%s\'] = require(\'./%s\')(hljs);' % (os.path.splitext(filename)[0], filename)
    hljs += '\nmodule.exports = hljs;'
    open(os.path.join(build_path, 'highlight.js'), 'w').write(hljs)
    if options.compress:
        print 'Notice: not compressing files for "node" target.'
    filename = os.path.join(src_path, 'package.json')
    print filename
    package_json = json.loads(strip_read(filename))
    authors = strip_read(os.path.join(root, 'AUTHORS.en.txt'))
    authors = re.findall('^- (.*) <(.*)>$', authors, re.MULTILINE)
    for author in authors:
        package_json['contributors'].append({'name': author[0], 'email': author[1]})
    content = json.dumps(package_json, indent=2)
    open(os.path.join(build_path, 'package.json'), 'w').write(content)
    print 'Done.'

def build(buildfunc, root, *args):
    build_path = os.path.join(root, 'build')
    if os.path.exists(build_path):
        shutil.rmtree(build_path)
    os.mkdir(build_path)
    buildfunc(root, build_path, *args)

if __name__ == '__main__':
    parser = optparse.OptionParser()
    parser.add_option(
        '-n', '--no-compress',
        dest = 'compress', action = 'store_false', default = True,
        help = 'Don\'t compress source files. Compression only works for the "browser" target.',
    )
    parser.add_option(
        '-t', '--target',
        dest = 'target', default = 'browser',
        help = 'Target format: "browser" (the default) or "node".',
    )
    parser.set_usage('''%%prog [options] [<language>|:<category> ...]

- <language> is the name of a language file without the .js extension
- <category> is a pre-defined set of language names: %s''' % ', '.join(CATEGORIES.keys()))
    options, args = parser.parse_args()
    try:
        buildfunc = locals()['build_%s' % options.target]
    except KeyError:
        print 'Unknown target:', options.target
        sys.exit(1)
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    build(buildfunc, root, args, options)
