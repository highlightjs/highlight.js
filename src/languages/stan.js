/*
Language: Stan
Author: Brendan Rocks <rocks.brendan@gmail.com>
 Category: scientific
Description: The Stan probabilistic programming language (http://mc-stan.org/).
*/

function(hljs) {
  // variable names cannot conflict with block identifiers
  const BLOCKS = ['functions', 'model', 'data', 'parameters', 'quantities',
                  'transformed', 'generated'];
  const STATEMENTS = ['for', 'in', 'if', 'else', 'while', 'break', 'continue', 'return'];
  const SPEC_FUNCS = ['print', 'reject',
                      'increment_log_prob|10',
                      'integrate_ode|10', 'integrate_ode_rk45|10', 'integrate_ode_bdf|10', 'algebra_solver'];
  const VAR_TYPES = ['int', 'real',
                    'vector', 'ordered', 'positive_ordered', 'simplex', 'unit_vector', 'row_vector',
                    'matrix', 'cholesky_factor_corr|10', 'cholesky_factor_cov|10', 'corr_matrix|10', 'cov_matrix|10',
                    'void'];
  const OTHER_KEYWORDS = ['lower', 'upper'];

  return {
    aliases: ['stanfuncs'],
    keywords: {
      'title': BLOCKS.join(' '),
      'keyword': STATEMENTS.concat(VAR_TYPES).concat(OTHER_KEYWORDS).join(' '),
      'built_in': SPEC_FUNCS.join(' '),
    },
    // could use hljs.IDENT_RE, but be explicit
    lexemes: '[A-Za-z][A-Za-z0-9_]*',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT(
        /#/,
        /$/,
        {
          relevance: 0,
          keywords: {'meta-keyword': 'include'},
        },
      ),
      hljs.COMMENT(
        /\/\*/,
        /\*\//,
        {
          relevance: 0,
          // highlight doc strings mentioned in Stan reference
          contains: [
            {
              className: 'doctag',
              begin: /@(return|param)/,
            },
          ],
        },
      ),
      {
        className: 'keyword',
        begin: /\btarget\s*\+=/,
        relevance: 10
      },
      {
        className: 'number',
        variants: [
          {
            begin: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/,
          },
          {
            begin: /\.\d+(?:[eE][+-]?\d+)?\b/,
          },
        ],
        relevance: 0,
      },
      {
        className: 'string',
        begin: '"',
        end: '"',
        relevance: 0,
      },
    ],
  };
}
