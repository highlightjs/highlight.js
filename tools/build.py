# -*- coding:utf-8 -*-
'''
Function for building whole packed version of highlight.js out of
pre-packed modules.
'''

import os
import sys

def build(packed_path, target_path, languages):
    '''
    packed_path -- path to pre-packed .js files including language files and highligh.js itself
    target_path -- path where to put the final 'highlight.pack.js'
    languages -- list of language names to include in the final package
    '''
    ALIASES = {
        'html': ['html-xml'],
        'xml': ['html-xml'],
        'css': ['html-xml', 'css'],
        'django': ['html-xml', 'django'],
    }
    all_files = os.listdir(packed_path)
    all_files = [l for l in all_files if l.endswith('.js') and not l.startswith('highlight.')]
    if languages is not None:
        selected_languages = []
        for l in languages:
            selected_languages += ALIASES.get(l, [l])
        all_languages = set(os.path.splitext(l)[0] for l in all_files)
        languages = all_languages & set(selected_languages)
        files = ['%s.js' % l for l in languages]
    else:
        files = all_files
    f = open(os.path.join(target_path, 'highlight.pack.js'), 'w')
    f.write(open(os.path.join(packed_path, 'highlight.js')).read())
    for file in files:
        f.write(open(os.path.join(packed_path, file)).read())
    f.close()

if __name__ == '__main__':
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    packed_path = os.path.join(path, 'packed')
    target_path = os.path.join(path, 'src')
    if len(sys.argv) > 1:
        languages = sys.argv[1:]
    else:
        languages = None
    build(packed_path, target_path, languages)
