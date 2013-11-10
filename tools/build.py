# -*- coding:utf-8 -*-
'''
Function for building whole packed version of highlight.js out of
pre-packed modules.
'''

import os
import shutil
import re
import argparse
import subprocess
import json
import codecs
from functools import partial

REPLACES = {
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
    'terminator_end': 'tE',
}

CATEGORIES = {
    'common': ['bash', 'java', 'ini', 'sql', 'diff', 'php', 'cs', 'cpp', 'ruby', 'python', 'css', 'perl', 'xml', 'javascript', 'http', 'json'],
}

def lang_name(filename):
    return os.path.splitext(os.path.basename(filename))[0]

# This is used instead of plain `open` everywhere as there are apparently
# "some systems" that don't use utf-8 as the default system encoding.
# We should probably drop it in the better, brighter future.
def utf8_open(filename, mode='r'):
    return codecs.open(filename, mode, 'utf-8')

def mapnonstrings(source, func):
    result = []
    pos = 0
    quotes = re.compile('[\'"/]')
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

def compress_content(tools_path, content, filetype='js'):
    if filetype == 'js':
        for s, r in REPLACES.items():
            content = mapnonstrings(content, partial(re.sub, r'\b%s\b' % s, r))
        content = re.sub(r'(block|parentNode)\.cN', r'\1.className', content)

    args = ['java', '-jar', os.path.join(tools_path, 'yuicompressor.jar'), '--type', filetype]
    p = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    p.stdin.write(content.encode('utf-8'))
    p.stdin.close()
    content = p.stdout.read().decode('utf-8')
    p.stdout.close()

    return content

def parse_header(filename):
    '''
    Parses possible language description header from a file. If a header is found returns it
    as dict, otherwise returns None.
    '''
    content = utf8_open(filename).read(1024)
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
    filenames = [f for f in os.listdir(lang_path) if f.endswith('.js')]
    headers = [parse_header(os.path.join(lang_path, f)) for f in filenames]
    infos = [(h, f) for h, f in zip(headers, filenames) if h]

    # Filtering infos based on list of languages and categories
    if languages:
        categories = {l for l in languages if l.startswith(':')}
        languages = set(languages) - categories
        categories = {c.strip(':') for c in categories}
        cat_languages = {l for c, ls in CATEGORIES.items() if c in categories for l in ls}
        languages |= cat_languages
        infos = [
            (i, f) for i, f in infos
            if lang_name(f) in languages
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
    s = utf8_open(filename).read()
    pattern = re.compile(r'^\s*(/\*(.*?)\*/)?\s*', re.DOTALL)
    s = pattern.sub('', s)
    return s.strip()

def wrap_language(filename, content, compressed):
    '''
    Wraps a language file content for the browser build. The "compressed" parameter
    selects which wrapping code to use:

    - If compressed is False the function expects source files to be uncompressed and
      wraps them maintaining readability of the source.
    - If compressed is True the function expects source files to be already compressed
      individually and wraps them with the minimal code, effectively emulating
      what yuicompressor does.
    '''
    name = lang_name(filename)
    if compressed:
        name = ('["%s"]' if '-' in name or name[0].isdigit() else '.%s') % name
        content = content.rstrip(';')
        wrap = 'hljs.LANGUAGES%s=%s(hljs);'
    else:
        wrap = 'hljs.LANGUAGES[\'%s\'] = %s(hljs);\n'
    return wrap % (name, content)

def glue_files(hljs_filename, language_filenames, compressed):
    '''
    Glues files together for the browser build.
    '''
    if compressed:
        hljs = 'var hljs=new %s();' % strip_read(hljs_filename).rstrip(';')
        file_func = lambda f: utf8_open(f).read()
    else:
        hljs = 'var hljs = new %s();\n' % strip_read(hljs_filename)
        file_func = strip_read
    return ''.join([hljs] + [wrap_language(f, file_func(f), compressed) for f in language_filenames])

def build_browser(root, build_path, filenames, options, isAMD=False):
    src_path = os.path.join(root, 'src')
    tools_path = os.path.join(root, 'tools')
    print('Building %d files:\n%s' % (len(filenames), '\n'.join(filenames)))
    content = glue_files(os.path.join(src_path, 'highlight.js'), filenames, False)
    if isAMD:
        content = 'define(function() {\n%s\nreturn hljs;\n});' % content # AMD wrap
    print('Uncompressed size:', len(content.encode('utf-8')))
    if options.compress:
        print('Compressing...')
        content = compress_content(tools_path, content)
        print('Compressed size:', len(content.encode('utf-8')))
    utf8_open(os.path.join(build_path, 'highlight.pack.js'), 'w').write(content)

def build_amd(root, build_path, filenames, options):
    build_browser(root, build_path, filenames, options, True)

def build_node(root, build_path, filenames, options):
    src_path = os.path.join(root, 'src')
    print('Building %d files:' % len(filenames))
    for filename in filenames:
        print(filename)
        content = 'module.exports = %s;' % strip_read(filename)
        utf8_open(os.path.join(build_path, os.path.basename(filename)), 'w').write(content)
    filename = os.path.join(src_path, 'highlight.js')
    print(filename)

    print('Registering languages with the library...')
    hljs = 'var hljs = new %s();' % strip_read(filename)
    filenames = map(os.path.basename, filenames)
    for filename in filenames:
        hljs += '\nhljs.LANGUAGES[\'%s\'] = require(\'./%s\')(hljs);' % (lang_name(filename), filename)
    hljs += '\nmodule.exports = hljs;'
    utf8_open(os.path.join(build_path, 'highlight.js'), 'w').write(hljs)
    if options.compress:
        print('Notice: not compressing files for "node" target.')

    print('Adding package.json...')
    package = json.load(utf8_open(os.path.join(src_path, 'package.json')))
    authors = utf8_open(os.path.join(root, 'AUTHORS.en.txt'))
    matches = (re.match('^- (?P<name>.*) <(?P<email>.*)>$', a) for a in authors)
    package['contributors'] = [m.groupdict() for m in matches if m]
    content = json.dumps(package, indent=2, ensure_ascii=False)
    utf8_open(os.path.join(build_path, 'package.json'), 'w').write(content)

def build_cdn(root, build_path, filenames, options):
    src_path = os.path.join(root, 'src')
    tools_path = os.path.join(root, 'tools')
    if not options.compress:
        print('Notice: forcing compression for "cdn" target')
        options.compress = True
    build_browser(root, build_path, filenames, options)
    os.rename(os.path.join(build_path, 'highlight.pack.js'), os.path.join(build_path, 'highlight.min.js'))
    print('Compressing all languages...')
    lang_path = os.path.join(build_path, 'languages')
    os.mkdir(lang_path)
    all_filenames = language_filenames(src_path, [])
    for filename in all_filenames:
        print(filename)
        content = compress_content(tools_path, strip_read(filename))
        content = wrap_language(filename, content, True)
        utf8_open(os.path.join(lang_path, '%s.min.js' % lang_name(filename)), 'w').write(content)
    print('Compressing styles...')
    build_style_path = os.path.join(build_path, 'styles')
    src_style_path = os.path.join(src_path, 'styles')
    os.mkdir(build_style_path)
    styles = [lang_name(f) for f in os.listdir(src_style_path) if f.endswith('.css')]
    for style in styles:
        filename = os.path.join(src_style_path, '%s.css' % style)
        print(filename)
        content = compress_content(tools_path, utf8_open(filename).read(), 'css')
        utf8_open(os.path.join(build_style_path, '%s.min.css' % style), 'w').write(content)

def build(buildfunc, root, args):
    build_path = os.path.join(root, 'build')
    if os.path.exists(build_path):
        shutil.rmtree(build_path)
    os.mkdir(build_path)
    filenames = language_filenames(os.path.join(root, 'src'), args.languages)
    buildfunc(root, build_path, filenames, args)
    print('Done.')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Build highlight.js for various targets')
    parser.add_argument(
        'languages', nargs='*',
        help = 'language (the name of a language file without the .js extension) or :category (currently the only available category is ":common")',
    )
    parser.add_argument(
        '-n', '--no-compress',
        dest = 'compress', action = 'store_false', default = True,
        help = 'Don\'t compress source files. Compression only works for the "browser" target.',
    )
    parser.add_argument(
        '-t', '--target', dest = 'target',
        choices = ['browser', 'node', 'cdn', 'amd'], default = 'browser',
        help = 'Target format, default is "browser"',
    )
    args = parser.parse_args()
    buildfunc = locals()['build_%s' % args.target]
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    build(buildfunc, root, args)
