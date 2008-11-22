# -*- coding:utf-8 -*-
import os
import re
import subprocess

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

def get_compressor(tools_path):
    cmd = 'java -jar %s --type js' % os.path.join(tools_path, 'yuicompressor.jar')
    def compress(content):
        p = subprocess.Popen(cmd, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, close_fds=True)
        p.stdin.write(content)
        p.stdin.close()
        content = p.stdout.read()
        p.stdout.close()
        return content
    return compress

def replace(content, s, r):
    return re.sub(r'(?<=[^\w"\'])%s(?=[^\w"\'])' % s, r, content)
    
def pack_language(content):
    for s, r in REPLACES.items():
        content = replace(content, s, r)
    return content

def pack_library(content):
    for s, r in REPLACES.items():
        content = replace(content, s, r)
    content = re.sub(r'block\.cN', 'block.className', content)
    for s, r in LIBRARY_REPLACES.items():
        content = replace(content, s, r)
    return content

def build_file(filename, in_path, out_path, packer, compressor):
    print 'Building %s' % filename
    content = open(os.path.join(in_path, filename)).read()
    content = packer(content)
    content = compressor(content)
    f = open(os.path.join(out_path, filename), 'w')
    f.write(content)
    f.close()
    
def build(library_path, build_path, tools_path):
    lang_path = os.path.join(library_path, 'languages')
    if not os.path.exists(build_path):
        os.makedirs(build_path)

    languages = os.listdir(lang_path)
    languages = [l for l in languages if l.endswith('.js')]

    compressor = get_compressor(tools_path)
    build_file('highlight.js', library_path, build_path, pack_library, compressor)
    for language in languages:
        build_file(language, lang_path, build_path, pack_language, compressor)

if __name__ == '__main__':
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    build_path = os.path.join(path, 'build')
    tools_path = os.path.join(path, 'tools')
    build(path, build_path, tools_path)