# -*- coding:utf-8 -*-
'''
Function for building whole packed version of highlight.js out of
pre-packed modules.
'''

import os
import sys

ALIASES = {
    'html': ['html-xml'],
    'xml': ['html-xml'],
    'css': ['html-xml', 'css'],
    'django': ['html-xml', 'django'],
}

FILES_ORDER = {
    'html-xml.js': 0,
    'css.js': 1,
    'django.js': 1,
}

def language_files(packed_path):
    '''
    Returns a list of all language .js files from packed_path.
    '''
    files = os.listdir(packed_path)
    files = [l for l in files if l.endswith('.js') and not l.startswith('highlight.')]
    return files

def language_names(packed_path):
    '''
    Returns a list of all available language names converting necessary filenames with ALIASES
    '''
    aliased_filenames = set()
    for l in ALIASES.values():
        aliased_filenames |= set(l)
    aliased_languages = set(ALIASES.keys())
    names = [os.path.splitext(f)[0] for f in language_files(packed_path)]
    names = set(names) | set(ALIASES.keys())
    return [n for n in names if n not in aliased_filenames or n in aliased_languages]

def build_content(packed_path, languages):
    '''
    Builds content of highlight.pack.js and returns it as a  string.
    '''
    all_files = language_files(packed_path)
    if languages is not None:
        selected_languages = []
        for l in languages:
            selected_languages += ALIASES.get(l, [l])
        all_languages = set(os.path.splitext(l)[0] for l in all_files)
        languages = all_languages & set(selected_languages)
        files = ['%s.js' % l for l in languages]
    else:
        files = all_files
    ordered_files = [(FILES_ORDER.get(f, 0), f) for f in files]
    ordered_files.sort()
    files = [f for o, f in ordered_files]
    contents = [open(os.path.join(packed_path, f)).read() for f in files]
    contents.insert(0, open(os.path.join(packed_path, 'highlight.js')).read())
    return ''.join(contents)
    
def build(packed_path, target_path, languages):
    '''
    Builds highlight.pack.js and puts it under target_path.
    
    packed_path -- path to pre-packed .js files including language files and highligh.js itself
    languages -- list of language names to include in the final package.
    '''
    f = open(os.path.join(target_path, 'highlight.pack.js'), 'w')
    f.write(build_content(packed_path, languages))
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
