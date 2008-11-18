# -*- coding:utf-8 -*-
import os
import sys

def main():
    path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    build_path = os.path.join(path, 'build')
    
    languages = os.listdir(build_path)
    languages = [l for l in languages if l.endswith('.js') and not l.startswith('highlight.')]
    if len(sys.argv) > 1:
        languages = set(os.path.splitext(l)[0] for l in languages)
        languages = set(languages) & set(sys.argv[1:])
        languages = ['%s.js' % l for l in languages]

    f = open(os.path.join(build_path, 'highlight.pack.js'), 'w')
    f.write(open(os.path.join(build_path, 'highlight.js')).read())
    for language in languages:
        f.write(open(os.path.join(build_path, language)).read())
    f.close()

if __name__ == '__main__':
    main()