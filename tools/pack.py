# -*- coding:utf-8 -*-
import os
import re

REPLACES = {
    'defaultMode': 'dM',
    'lexems': 'l',
    'contains': 'c',
    'keywords': 'k',
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
    'IDENT_RE': 'IR',
    'UNDERSCORE_IDENT_RE': 'UIR',
    'NUMBER_RE': 'NR',
    'C_NUMBER_RE': 'CNR',
    'APOS_STRING_MODE': 'ASM',
    'QUOTE_STRING_MODE': 'QSM',
    'BACKSLASH_ESCAPE': 'BE',
    'C_LINE_COMMENT_MODE': 'CLCM',
    'C_BLOCK_COMMENT_MODE': 'CBLCLM',
    'HASH_COMMENT_MODE': 'HCM',
    'C_NUMBER_MODE': 'CNM',
}

LIBRARY_REPLACES = {
    'beginRe': 'bR',
    'endRe': 'eR',
    'illegalRe': 'iR',
    'lexemsRe': 'lR',
    'sub_modes': 'sm',
    'terminators': 't',
}

def pack_language(content):
    for r, v in REPLACES.items():
        content = re.sub(r'\b%s\b' % r, v, content)
    return content

def pack_library(content):
    for r, v in REPLACES.items():
        content = re.sub(r'\b%s\b' % r, v, content)
    content = re.sub(r'block\.cN', 'block.className', content)
    for r, v in LIBRARY_REPLACES.items():
        content = re.sub(r'\b%s\b' % r, v, content)
    return content

def pack(library_path, build_path):
    lang_path = os.path.join(library_path, 'languages')

    if not os.path.exists(build_path):
        os.makedirs(build_path)

    languages = os.listdir(lang_path)
    languages = [l for l in languages if l.endswith('.js')]

    f = open(os.path.join(build_path, 'highlight.js'), 'w')
    f.write(pack_library(open(os.path.join(library_path, 'highlight.js')).read()))
    f.close()
    for language in languages:
        
        f = open(os.path.join(build_path, language), 'w')
        f.write(pack_language(open(os.path.join(lang_path, language)).read()))
        f.close()

if __name__ == '__main__':
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    build_path = os.path.join(path, 'build')
    pack(path, build_path)