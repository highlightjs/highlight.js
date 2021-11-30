/*
Language: Stan
Description: The Stan probabilistic programming language
Author: Sean Pinkney <sean.pinkney@gmail.com>
Website: http://mc-stan.org/
Category: scientific
*/

export default function(hljs) {
  // variable names cannot conflict with block identifiers
  const BLOCKS = [
    'functions',
    'model',
    'data',
    'parameters',
    'quantities',
    'transformed',
    'generated'
  ];

  const STATEMENTS = [
    'for',
    'in',
    'if',
    'else',
    'while',
    'break',
    'continue',
    'return'
  ];

  const SPECIAL_FUNCTIONS = [
    'print',
    'reject',
    'hmm_marginal',
    'hmm_latent_rng',
    'hmm_hidden_state_prob',
    'algebra_solver',
    'algebra_solver_newton',
    'map_rect',
    'reduce_sum',
    'reduce_sum_static',
    'ode_rk45', 
    'ode_rk45_tol', 
    'ode_ckrk', 
    'ode_ckrk_tol', 
    'ode_adams',
    'ode_adams_tol', 
    'ode_bdf', 
    'ode_bdf_tol', 
    'ode_adjoint_tol_ctl',
    'integrate_1d',
    'integrate_ode_rk45|10', 
    'integrate_ode|10', 
    'integrate_ode_adams|10',
    'integrate_ode_bdf|10'
  ];
  const VAR_TYPES = [
    `array`,
    'complex',
    'int',
    'real',
    'vector',
    'ordered',
    'positive_ordered',
    'simplex',
    'unit_vector',
    'row_vector',
    'matrix',
    'cholesky_factor_corr|10',
    'cholesky_factor_cov|10',
    'corr_matrix|10',
    'cov_matrix|10',
    'void'
  ];
  const FUNCTIONS = [
    // Integer-Valued Basic Functions

    // Absolute functions
    'abs', 'int_step',

    // Bound functions
    'min', 'max',

    // Size functions
    'size',

    // Real-Valued Basic Functions

    // Log probability function
    'target', 'get_lp',

    // Logical functions
    'step', 'is_inf', 'is_nan',

    // Step-like functions
    'fabs', 'fdim', 'fmin', 'fmax', 'fmod', 'floor', 'ceil', 'round',
    'trunc',

    // Power and logarithm functions
    'sqrt', 'cbrt', 'square', 'exp', 'exp2', 'log', 'log2', 'log10',
    'pow', 'inv', 'inv_sqrt', 'inv_square',

    // Trigonometric functions
    'hypot', 'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'atan2',

    // Hyperbolic trigonometric functions
    'cosh', 'sinh', 'tanh', 'acosh', 'asinh', 'atanh',

    // Link functions
    'logit', 'inv_logit', 'inv_cloglog',

    // Probability-related functions
    'erf', 'erfc', 'Phi', 'inv_Phi', 'Phi_approx', 'binary_log_loss',
    'owens_t',

    // Combinatorial functions
    'beta', 'inc_beta', 'lbeta', 'tgamma', 'lgamma', 'digamma',
    'trigamma', 'lmgamma', 'gamma_p', 'gamma_q',
    'binomial_coefficient_log', 'choose', 'bessel_first_kind',
    'bessel_second_kind', 'modified_bessel_first_kind',
    'log_modified_bessel_first_kind', 'modified_bessel_second_kind',
    'falling_factorial', 'lchoose', 'log_falling_factorial',
    'rising_factorial', 'log_rising_factorial',

    // Composed functions
    'expm1', 'fma', 'multiply_log', 'ldexp', 'lmultiply', 'log1p',
    'log1m', 'log1p_exp', 'log1m_exp', 'log_diff_exp', 'log_mix',
    'log_sum_exp', 'log_inv_logit', 'log_inv_logit_diff',
    'log1m_inv_logit',

    // Special functions
    'lambert_w0', 'lambert_wm1',

    // Complex Conversion Functions
    'get_real', 'get_imag',

    // Complex-Valued Basic Functions

    // Complex Construction Functions
    'to_complex',

    // Array Operations

    // Reductions
    'sum', 'prod', 'log_sum_exp', 'mean', 'variance', 'sd', 'distance',
    'squared_distance', 'quantile',

    // Array size and dimension function
    'dims', 'num_elements',

    // Array broadcasting
    'rep_array',

    // Array concatenation
    'append_array',

    // Sorting functions
    'sort_asc', 'sort_desc', 'sort_indices_asc', 'sort_indices_desc',
    'rank',

    // Reversing functions
    'reverse',

    // Matrix Operations

    // Integer-valued matrix size functions
    'num_elements', 'rows', 'cols',

    // Dot products and specialized products
    'dot_product', 'columns_dot_product', 'rows_dot_product', 'dot_self',
    'columns_dot_self', 'rows_dot_self', 'tcrossprod', 'crossprod',
    'quad_form', 'quad_form_diag', 'quad_form_sym', 'trace_quad_form',
    'trace_gen_quad_form', 'multiply_lower_tri_self_transpose',
    'diag_pre_multiply', 'diag_post_multiply',

    // Broadcast functions
    'rep_vector', 'rep_row_vector', 'rep_matrix',
    'symmetrize_from_lower_tri',

    // Diagonal matrix functions
    'add_diag', 'diagonal', 'diag_matrix', 'identity_matrix',

    // Container construction functions
    'linspaced_array', 'linspaced_int_array', 'linspaced_vector',
    'linspaced_row_vector', 'one_hot_int_array', 'one_hot_array',
    'one_hot_vector', 'one_hot_row_vector', 'ones_int_array',
    'ones_array', 'ones_vector', 'ones_row_vector', 'zeros_int_array',
    'zeros_array', 'zeros_vector', 'zeros_row_vector', 'uniform_simplex',

    // Slicing and blocking functions
    'col', 'row', 'block', 'sub_col', 'sub_row', 'head', 'tail',
    'segment',

    // Matrix concatenation
    'append_col', 'append_row',

    // Special matrix functions
    'softmax', 'log_softmax', 'cumulative_sum',

    // Covariance functions
    'cov_exp_quad',

    // Linear algebra functions and solvers
    'mdivide_left_tri_low', 'mdivide_right_tri_low', 'mdivide_left_spd',
    'mdivide_right_spd', 'matrix_exp', 'matrix_exp_multiply',
    'scale_matrix_exp_multiply', 'matrix_power','trace', 'determinant',
    'log_determinant', 'inverse', 'inverse_spd', 'chol2inv',
    'generalized_inverse', 'eigenvalues_sym', 'eigenvectors_sym',
    'qr_thin_Q', 'qr_thin_R', 'qr_Q', 'qr_R', 'cholseky_decompose',
    'singular_values', 'svd_U', 'svd_V',

    // Sparse Matrix Operations

    // Conversion functions
    'csr_extract_w', 'csr_extract_v', 'csr_extract_u',
    'csr_to_dense_matrix',

    // Sparse matrix arithmetic
    'csr_matrix_times_vector',

    // Mixed Operations
    'to_matrix', 'to_vector', 'to_row_vector', 'to_array_2d',
    'to_array_1d',

    // Special values
    'not_a_number', 'positive_infinity', 'negative_infinity',
    'machine_precision'

  ];
  const DISTRIBUTIONS = [
    // Discrete Distributions

    // Binary Distributions
    'bernoulli', 'bernoulli_logit', 'bernoulli_logit_glm',

    // Bounded Discrete Distributions
    'binomial', 'binomial_logit', 'beta_binomial', 'hypergeometric',
    'categorical', 'categorical_logit_glm', 'discrete_range',
    'ordered_logistic', 'ordered_logistic_glm', 'ordered_probit',

    // Unbounded Discrete Distributions
    'neg_binomial', 'neg_binomial_2', 'neg_binomial_2_log',
    'neg_binomial_2_log_glm', 'poisson', 'poisson_log',
    'poisson_log_glm',

    // Multivariate Discrete Distributions
    'multinomial', 'multinomial_logit',

    // Continuous Distributions

    // Unbounded Continuous Distributions
    'normal', 'std_normal', 'normal_id_glm', 'exp_mod_normal',
    'skew_normal', 'student_t', 'cauchy', 'double_exponential',
    'logistic', 'gumbel', 'skew_double_exponential',

    // Positive Continuous Distributions
    'lognormal', 'chi_square', 'inv_chi_square',
    'scaled_inv_chi_square', 'exponential', 'gamma', 'inv_gamma',
    'weibull', 'frechet', 'rayleigh',

    // Positive Lower-Bounded Distributions
    'pareto', 'pareto_type_2', 'wiener',

    // Continuous Distributions on [0, 1]
    'beta', 'beta_proportion',

    // Circular Distributions
    'von_mises',

    // Bounded Continuous Distributions
    'uniform',

    // Distributions over Unbounded Vectors
    'multi_normal', 'multi_normal_prec', 'multi_normal_cholesky',
    'multi_gp', 'multi_gp_cholesky', 'multi_student_t',
    'gaussian_dlm_obs',

    // Simplex Distributions
    'dirichlet',

    // Correlation Matrix Distributions
    'lkj_corr', 'lkj_corr_cholesky',

    // Covariance Matrix Distributions
    'wishart', 'inv_wishart'
  ];

  const DISTRIBUTIONS_EXPANDED = DISTRIBUTIONS.flatMap(name => [
    `${name}_lpdf`,
    `${name}_lpmf`,
    `${name}_lccdf`,
    `${name}_lupdf`,
    `${name}_lcdf`,
    `${name}_cdf`,
    `${name}_lupdf`,
    `${name}_qf`
  ]
  ) 
  // const DELIMIT = [
  //   '{',
  //   '}',
  //   '(',
  //   ')',
  //   '[',
  //   ']',
  //   ',',
  //   ':',
  //   '|'
  // ]

  const BLOCK_COMMENT = hljs.COMMENT(
    /\/\*/,
    /\*\//,
    {
      relevance: 0,
      contains: [
        {
          className: 'doctag',
          match: /@(return|param)/
        }
      ]
    }
  );

  const INCLUDE = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    relevance: 0, // relevance comes from keywords
    contains: [
      {
        match: /[a-z][a-z-.]+/,
        className: 'string'
      },
      hljs.C_LINE_COMMENT_MODE
    ]
  };

  return {
    name: 'Stan',
    aliases: [ 'stanfuncs' ],
    keywords: {
      $pattern: hljs.IDENT_RE,
      title: BLOCKS,
      keyword: STATEMENTS.concat(VAR_TYPES).concat(SPECIAL_FUNCTIONS),
      built_in: FUNCTIONS,
     // punctuation: DELIMIT
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      INCLUDE,
      hljs.HASH_COMMENT_MODE,
      BLOCK_COMMENT,
     {
       // handle user defined distributions 
       className: 'built_in',
       variants: [
         {
          begin: /(?<=~)\s+(\w+(?=\())/
         },
         {
          begin: /(?<=\+=)\s+(\w+(_lpdf|_lupdf|_lpmf|_cdf|_lcdf|_lccdf|_qf))/
         }
        ] 
     },
     {
      begin: '~\s*(' + hljs.IDENT_RE + ')\\s*\\(',
      keywords: DISTRIBUTIONS.concat(DISTRIBUTIONS_EXPANDED)
    },
     {
      className: 'symbol',
      begin: /(pi|e|sqrt2|log2|log10)(?=\()/,
      relevance: 0
     },
    // cannot use regex look-behind yet because of Safari
    // once that is enabled can uncomment this to get
    // correct highlighting for truncation while
    // allowing an array named T to not be highlighted 
    // {
    //    begin: /\bT(?=\s*\[)/,
    //    keywords: 'T'
    //  },
      {
        // hack: in range constraints, lower must follow either , or <
        // <upper = ..., lower = ...> or <lower = ...>
        begin: /[<,]\s*lower\s*=/,
        keywords: 'lower'
      },
      {
        // hack: in range constraints, upper must follow either , or <
        // <lower = ..., upper = ...> or <upper = ...>
        begin: /[<,]\s*upper\s*=/,
        keywords: 'upper'
      },
      {
        // hack: in range constraints, upper must follow either , or <
        // <multiplier = ..., offest = ...> or <offset = ...>
        begin: /[<,]\s*offset\s*=/,
        keywords: 'offset'
      },
      {
        // hack: in range constraints, upper must follow either , or <
        // <offset = ..., multiplier = ...> or <multiplier = ...>
        begin: /[<,]\s*multiplier\s*=/,
        keywords: 'multiplier'
      },
      {
        className: 'keyword',
        begin: /\btarget\s*/,
      },
      {
        className: 'number',
        variants: [
          {
            // Comes from @RunDevelopment accessed 11/29/2021 at
            // https://github.com/PrismJS/prism/blob/c53ad2e65b7193ab4f03a1797506a54bbb33d5a2/components/prism-stan.js#L56
            begin: /(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:[eE][+-]?\d+(?:_\d+)*)?i?(?!\w)/i
          },
          {
            begin: /\.\d+(?:[eE][+-]?\d+)?\b/
          }
        ],
        relevance: 0
      },
      {
        className: 'string',
        begin: '"',
        end: '"',
        relevance: 0
      }
    ]
  };
}
