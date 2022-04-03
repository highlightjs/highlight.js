#!/usr/bin/env node

const fs = require("fs");
const css = require("css");
const wcagContrast = require("wcag-contrast");
const Table = require('cli-table');
const csscolors = require('css-color-names');
require("@colors/colors");

const CODE = {
  name: "program code",
  scopes: [
    "comment",
    "keyword",
    "built_in",
    "type",
    "literal",
    "number",
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
  name: "nice to haves (optional, but many grammars use)",
  scopes: [
    "meta keyword",
    "meta string"
  ]
};

const HIGH_FIDELITY = {
  name: "high fidelity highlighting (this is optional)",
  scopes: [
    "title.class",
    "title.class.inherited",
    "punctuation",
    "operator",
    "title.function",
    "char.escape",
    "variable.language"
  ]
};

const CONFIG = {
  required: true,
  name: "Config files",
  scopes: [
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
  scopes: [
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
  scopes: [
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
  scopes: [
    "tag",
    "name",
    "attr",
    "attribute",
    "template-tag",
    "template-variable"
  ]
};

const DIFF = {
  name: "Diff",
  required: true,
  scopes: [
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

  return false;
}

function skips_rule(selector, rules) {
  return matching_rules(selector, rules)
    .some(rule => rule.declarations.length === 0);
}

const expandScopeName = (name, { prefix }) => {
  if (name.includes(".")) {
    const pieces = name.split(".");
    return [
      `${prefix}${pieces.shift()}`,
      ...(pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`))
    ].join(".");
  }
  return `${prefix}${name}`;
};

function scopeToSelector(name) {
  return name.split(" ").map(n => expandScopeName(n, { prefix: ".hljs-" })).join(" ");
}

function check_group(group, rules) {
  const has_rules = group.scopes.map(scope => {
    const selector = scopeToSelector(scope);
    return [scope, has_rule(selector, rules), skips_rule(selector, rules)];
  });


  const doesNotSupport = has_rules.map(x => x[1]).includes(false);
  const skipped = has_rules.find(x => x[2]);
  if (doesNotSupport || skipped) {
    console.log(group.name.yellow);
    if (doesNotSupport) {
      console.log(`- Theme does not fully support.`.brightMagenta);
    }

    has_rules.filter(x => !x[1]).forEach(([scope, _]) => {
      const selector = scopeToSelector(scope);
      console.log(`- scope ${scope.cyan} is not highlighted\n  (css: ${selector.green})`);
    });
    has_rules.filter(x => x[2]).forEach(([scope, _]) => {
      console.log(` - scope ${scope.cyan} [purposely] un-highlighted.`.cyan);
    });
    console.log();
  }
}

const round2 = (x) => Math.round(x*100)/100;

class CSSRule {
  constructor(rule, body) {
    this.rule = rule;
    if (rule.declarations) {
      this.bg = rule.declarations.find(x => x.property == "background-color")?.value;
      if (!this.bg) {
        this.bg = rule.declarations.find(x => x.property == "background")?.value;
      }
      this.fg = rule.declarations.find(x => x.property =="color")?.value;

      if (this.bg) {
        this.bg = csscolors[this.bg] || this.bg;
      }
      if (this.fg) {
        this.fg = csscolors[this.fg] || this.fg;
      }

      // inherit from body if we're missing fg or bg
      if (this.hasColor) {
        if (!this.bg) this.bg = body.background;
        if (!this.fg) this.fg = body.foreground;
      }
    }
  }
  get background() {
    return this.bg
  }

  get foreground() {
    return this.fg
  }
  get hasColor() {
    if (!this.rule.declarations) return false;
    return this.fg || this.bg;
  }
  toString() {
    return ` ${this.foreground} on ${this.background}`
  }

  contrastRatio() {
    if (!this.foreground) return "unknown (no fg)"
    if (!this.background) return "unknown (no bg)"
    return round2(wcagContrast.hex(this.foreground, this.background));
  }
}

function contrast_report(rules) {
  console.log("Accessibility Report".yellow);

  var hljs = rules.find (x => x.selectors && x.selectors.includes(".hljs"));
  var body = new CSSRule(hljs);
  const table = new Table({
    chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
    head: ['ratio', 'selector', 'fg', 'bg'],
    colWidths: [7, 40, 10, 10],
    style: {
      head: ['grey']
    }
  });

  rules.forEach(rule => {
    var color = new CSSRule(rule, body);
    if (!color.hasColor) return;
    table.push([
      color.contrastRatio(),
      rule.selectors,
      color.foreground,
      color.background
    ])
    // console.log(r.selectors[0], color.contrastRatio(), color.toString());
  })
  console.log(table.toString())
}

function validate(data) {
  const rules = data.stylesheet.rules;

  check_group(DIFF, rules);
  check_group(TEMPLATES, rules);
  check_group(CONFIG, rules);
  check_group(CSS, rules);
  check_group(MARKUP, rules);
  check_group(CODE, rules);
  check_group(OTHER, rules);
  check_group(HIGH_FIDELITY, rules);

  contrast_report(rules);
}

process.argv.shift();
process.argv.shift();

const file = process.argv[0];
const content = fs.readFileSync(file).toString();
const parsed = css.parse(content, {});

validate(parsed);
