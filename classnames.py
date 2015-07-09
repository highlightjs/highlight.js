import re
import glob
from functools import reduce


def parsejs(filename):
    s = open(filename).read()
    return set(
        re.findall(r'className\s*:\s*"(.*?)"', s) +
        re.findall(r"className\s*:\s*'(.*?)'", s)
    )

def parsecss(filename):
    s = open(filename).read()
    return set(re.findall(r'\.hljs-([\w-]+)', s))

def allnames(mask, parse):
    return reduce(lambda a, b: a.union(b), map(parse, glob.glob(mask)), set())

def jsnames():
    return allnames('src/languages/*.js', parsejs)

def cssnames():
    return allnames('src/styles/*.css', parsecss)

def defined():
    content = open('docs/css-classes-reference.rst').read()
    content = content[content.index('Stylable classes'):content.index('Language names')]
    return set(re.findall(r'^\| (\S+)', content, re.M))

