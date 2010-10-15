# -*- coding:utf-8 -*-
'''
Creates packed .js files for all source files (highlight.js and languages) in a
separate directory.
'''
import os
import sys
import re
import subprocess

REPLACES = {
    'defaultMode': 'dM',
    'case_insensitive': 'cI',
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
    'noMarkup': 'nM',
    'relevance': 'r',
    'IMMEDIATE_RE': 'IMR',
    'IDENT_RE': 'IR',
    'UNDERSCORE_IDENT_RE': 'UIR',
    'NUMBER_RE': 'NR',
    'C_NUMBER_RE': 'CNR',
    'RE_STARTERS_RE': 'RSR',
    'APOS_STRING_MODE': 'ASM',
    'QUOTE_STRING_MODE': 'QSM',
    'BACKSLASH_ESCAPE': 'BE',
    'C_LINE_COMMENT_MODE': 'CLCM',
    'C_BLOCK_COMMENT_MODE': 'CBLCLM',
    'HASH_COMMENT_MODE': 'HCM',
    'C_NUMBER_MODE': 'CNM',
    'NUMBER_MODE': 'NM',
}

LIBRARY_REPLACES = {
    'beginRe': 'bR',
    'endRe': 'eR',
    'illegalRe': 'iR',
    'lexemsRe': 'lR',
    'sub_modes': 'sm',
    'terminators': 't',
}

def get_compressor(tools_path):
    cmd = 'java -jar %s --type js' % os.path.join(tools_path, 'yuicompressor.jar')
    def compress(content):
        p = subprocess.Popen(cmd, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
        p.stdin.write(content)
        p.stdin.close()
        content = p.stdout.read()
        p.stdout.close()
        return content
    return compress

def replace(content, s, r):
    return re.sub(r'(?<=[^\w"\'|])%s(?=[^\w"\'|])' % s, r, content)

def pack_language(content):
    for s, r in REPLACES.items():
        content = replace(content, s, r)
    return content

def pack_library(content):
    for s, r in REPLACES.items():
        content = replace(content, s, r)
    content = re.sub(r'(block|parentNode)\.cN', r'\1.className', content)
    for s, r in LIBRARY_REPLACES.items():
        content = replace(content, s, r)
    return content

def pack_file(filename, in_path, out_path, packer, compressor):
    print 'Packing %s' % filename
    content = open(os.path.join(in_path, filename)).read()
    content = packer(content)
    content = compressor(content)
    f = open(os.path.join(out_path, filename), 'w')
    f.write(content)
    f.close()

def pack(library_path, pack_path, tools_path, languages):
    lang_path = os.path.join(library_path, 'languages')
    if not os.path.exists(pack_path):
        os.makedirs(pack_path)

    files = os.listdir(lang_path)
    files = [f for f in files if f.endswith('.js')]
    if languages:
        files = [f for f in files if os.path.splitext(f)[0] in languages]

    compressor = get_compressor(tools_path)
    pack_file('highlight.js', library_path, pack_path, pack_library, compressor)
    for file in files:
        pack_file(file, lang_path, pack_path, pack_language, compressor)

if __name__ == '__main__':
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    library_path = os.path.join(path, 'src')
    pack_path = os.path.join(path, 'packed')
    tools_path = os.path.join(path, 'tools')
    if len(sys.argv) > 1:
        languages = set(sys.argv[1:])
    else:
        languages = set()
    pack(library_path, pack_path, tools_path, languages)
