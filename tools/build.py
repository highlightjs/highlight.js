# -*- coding:utf-8 -*-
'''
Function for building whole packed version of highlight.js out of
pre-packed modules.
'''

import os
import sys
import re
import optparse
import subprocess

REPLACES = {
    'defaultMode': 'dM',
    'case_insensitive': 'cI',
    'lexems': 'l',
    'contains': 'c',
    'keywords': 'k',
    'subLanguage': 'sL',
    'modes': 'm',
    'className': 'cN',
    'begin': 'b',
    'end': 'e',
    'endsWithParent': 'eW',
    'illegal': 'i',
    'excludeBegin': 'eB',
    'excludeEnd': 'eE',
    'returnBegin': 'rB',
    'returnEnd': 'rE',
    'noMarkup': 'nM',
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
}

LIBRARY_REPLACES = {
    'beginRe': 'bR',
    'endRe': 'eR',
    'illegalRe': 'iR',
    'lexemsRe': 'lR',
    'sub_modes': 'sm',
    'terminators': 't',
    'keywordGroups': 'kG',
}

CATEGORIES = {
    'common': ['bash', 'java', 'ini', 'sql', 'diff', 'php', 'cs', 'cpp', 'ruby', 'python', 'css', 'perl', 'xml', 'javascript'],
}

def compress_content(tools_path, content):
    cmd = 'java -jar %s --type js' % os.path.join(tools_path, 'yuicompressor.jar')

    def replace(content, s, r):
        return re.sub(r'(?<=[^\w"\'|])%s(?=[^\w"\'|])' % s, r, content)

    for s, r in REPLACES.items():
        content = replace(content, s, r)
    if not parse_header(content): # this is the highlight.js file, not a language file
        content = re.sub(r'(block|parentNode)\.cN', r'\1.className', content)
        for s, r in LIBRARY_REPLACES.items():
            content = replace(content, s, r)
    p = subprocess.Popen(cmd, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
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

def build(root, compress, languages):
    src_path = os.path.join(root, 'src')
    tools_path = os.path.join(root, 'tools')
    files = [os.path.join(src_path, 'highlight.js')] + \
            language_filenames(src_path, languages)
    f = open(os.path.join(src_path, 'highlight.pack.js'), 'w')
    for file in files:
        print file
        content = open(file).read()
        if compress:
            content = compress_content(tools_path, content)
        f.write(content)
    f.close()

if __name__ == '__main__':
    parser = optparse.OptionParser()
    parser.add_option(
        '-n', '--no-compress',
        dest = 'compress', action = 'store_false', default = True,
        help = 'don\'t compress source files',
    )
    parser.set_usage('%prog [options] [<language>|:<category> ...]')
    options, args = parser.parse_args()
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    build(root, options.compress, args)
