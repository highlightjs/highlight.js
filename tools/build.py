# -*- coding:utf-8 -*-
'''
Function for building whole packed version of highlight.js out of
pre-packed modules.
'''

import os
import sys
import re

def parse_header(src_path, filename):
    '''
    Parses possible language description header from a file. If a header is found returns it
    returned as dict, otherwise returns None.
    '''
    content = open(os.path.join(src_path, 'languages', filename)).read()
    match = re.search(r'^\s*/\*(.*?)\*/', content, re.S)
    if not match:
        return
    headers = match.group(1).split('\n')
    headers = [h.strip().split(': ') for h in headers if ': ' in h]
    result = dict(headers)
    return result if 'Language' in result else None

def language_infos(src_path):
    '''
    Returns pairs (header_info, filename) for all language files from src_path/languages.
    '''
    files = os.listdir(os.path.join(src_path, 'languages'))
    files = [f for f in files if f.endswith('.js')]
    result = [(parse_header(src_path, f), f) for f in files]
    return [(i, f) for i, f in result if i]

def build_content(src_path, packed_path, filenames):
    '''
    Builds content of highlight.pack.js and returns it as a  string.
    '''
    infos = language_infos(src_path)
    if filenames is not None:
        infos = [(i, f) for i, f in infos if f in filenames]

    def append(filename):
        if filename not in files:
            files.append(filename)

    files = []
    for info, filename in infos:
        if 'Requires' in info:
            requires = [r.strip() for r in info['Requires'].split(',')]
            for r in requires:
                append(r)
        append(filename)
    contents = [open(os.path.join(packed_path, f)).read() for f in files]
    contents.insert(0, open(os.path.join(packed_path, 'highlight.js')).read())
    return ''.join(contents)

def build(src_path, packed_path, target_path, filenames):
    '''
    Builds highlight.pack.js and puts it under target_path.

    src_path -- path to the root of highlight.js source files
    packed_path -- path to pre-packed .js files including language files and highligh.js itself
    languages -- list of language files to include in the final package.
    '''
    f = open(os.path.join(target_path, 'highlight.pack.js'), 'w')
    f.write(build_content(src_path, packed_path, filenames))
    f.close()

if __name__ == '__main__':
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    packed_path = os.path.join(path, 'packed')
    src_path = os.path.join(path, 'src')
    target_path = src_path
    if len(sys.argv) > 1:
        languages = sys.argv[1:]
    else:
        languages = None
    build(src_path, packed_path, target_path, languages)
