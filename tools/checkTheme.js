#!/usr/bin/env node

const fs = require("fs");
const css = require("css");
const { match } = require("assert");
require("colors");

const CODE = {
  name: "program code",
  selectors: [
    "comment",
    "keyword",
    "built_in",
    "type",
    "literal",
    "number",
    "operator",
    "punctuation",
    "property",
    "regexp",
    "string",
    "subst",
    "symbol",
    // "class",
    // "function",
    "variable",
    "title",
    "params",
    "comment",
    "doctag",
    "meta",
    "attr",
    "attribute"
  ]
};

const OTHER = {
  name: "nice to haves (many code grammars use)",
  selectors: [
    "meta-keyword",
    "meta-string"
  ]
}

const CONFIG = {
  required: true,
  name: "Config files",
  selectors: [
    "meta",
    "number",
    "string",
    "variable",
    "keyword",
    "section",
    "attribute"
  ]
};

const MARKUP = {
  required: true,
  name: "Markup (Markdown, etc)",
  selectors: [
    "section",
    "bullet",
    "code",
    "emphasis",
    "strong",
    "formula",
    "link",
    "quote"
  ]
};

const CSS = {
  name: "CSS/Less/etc",
  required: true,
  selectors: [
    "attribute",
    "string",
    "keyword",
    "built_in",
    "selector-tag",
    "selector-id",
    "selector-class",
    "selector-attr",
    "selector-pseudo"
  ]
};

const TEMPLATES = {
  name: "Templates/HTML/XML, etc.",
  required: true,
  selectors: [
    "tag",
    "name",
    "builtin-name",
    "attr",
    "attribute",
    "template-tag",
    "template-variable"
  ]
};

const DIFF = {
  name: "Diff",
  required: true,
  selectors: [
    "meta",
    "comment",
    "addition",
    "deletion"
  ]
};

function matching_rules(selector, rules) {
  const found = [];
  rules.forEach(rule => {
    if (!rule.selectors) return;
    if (rule.selectors.includes(selector)) {
      found.push(rule);
    }
  });
  return found;
}

function has_rule(selector, rules) {
  if (matching_rules(selector, rules).length > 0) return true;

  console.log(`Missing selector ${selector}`);
  return false;
}

function skips_rule(selector, rules) {
  return matching_rules(selector, rules)
    .some(rule => rule.declarations.length === 0);
}

function nameToSelector(name) {
  return `.hljs-${name}`;
}

function check_group(group, rules) {
  const has_rules = group.selectors.map(klass => {
    const selector = nameToSelector(klass);
    if (skips_rule(selector, rules)) {
      console.log(`${selector} will not be highlighted.`.cyan);
    }
    return has_rule(selector, rules);
  });


  if (has_rules.includes(false)) {
    console.log(`Theme does not fully support ${group.name}.\n`.yellow)
  }
}

function validate(data) {
  const rules = data.stylesheet.rules;

  check_group(DIFF, rules);
  check_group(TEMPLATES, rules);
  check_group(CONFIG, rules);
  check_group(CSS, rules);
  check_group(MARKUP, rules);
  check_group(OTHER, rules);
  check_group(CODE, rules);
}

process.argv.shift();
process.argv.shift();

const file = process.argv[0];
const content = fs.readFileSync(file).toString();
const parsed = css.parse(content, {});

validate(parsed);
