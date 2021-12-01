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

  const VAR_TYPES = [
    'array',
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

 // to get the functions list
 // clone the [stan-docs repo](https://github.com/stan-dev/docs) 
 // then cd into it run the python script with the major and minor version numbers:
 // ```bash
 // python3 extract_function_sigs.py 2 28
 // ```
 // then run a bash command to extract only the unique names
 // ```bash
 // cut -d ';' -f1 stan-functions-2_28.txt | uniq -u | sed "s/^/'/;s/$/',/" > stan_functions_quoted.txt
 // ```
  const FUNCTIONS = [
    'Phi',
    'Phi_approx',
    'append_array',
    'arg',
    'atan2',
    'bernoulli',
    'bernoulli_cdf',
    'bernoulli_lccdf',
    'bernoulli_lcdf',
    'bernoulli_logit',
    'bernoulli_logit_glm',
    'bernoulli_logit_lpmf',
    'bernoulli_logit_lupmf',
    'bernoulli_logit_rng',
    'bernoulli_lpmf',
    'bernoulli_lupmf',
    'bernoulli_rng',
    'beta_binomial',
    'beta_binomial_cdf',
    'beta_binomial_lccdf',
    'beta_binomial_lcdf',
    'beta_binomial_lpmf',
    'beta_binomial_lupmf',
    'beta_binomial_rng',
    'beta_cdf',
    'beta_lccdf',
    'beta_lcdf',
    'beta_lpdf',
    'beta_lupdf',
    'beta_proportion',
    'beta_proportion_lccdf',
    'beta_proportion_lcdf',
    'beta_proportion_lpdf',
    'beta_proportion_lupdf',
    'beta_proportion_rng',
    'beta_rng',
    'binomial',
    'binomial_cdf',
    'binomial_lccdf',
    'binomial_lcdf',
    'binomial_logit',
    'binomial_logit_lpmf',
    'binomial_logit_lupmf',
    'binomial_lpmf',
    'binomial_lupmf',
    'binomial_rng',
    'block',
    'categorical',
    'categorical_logit',
    'categorical_logit_glm',
    'categorical_logit_lpmf',
    'categorical_logit_lupmf',
    'categorical_logit_rng',
    'categorical_lpmf',
    'categorical_lupmf',
    'categorical_rng',
    'cauchy',
    'cauchy_cdf',
    'cauchy_lccdf',
    'cauchy_lcdf',
    'cauchy_lpdf',
    'cauchy_lupdf',
    'cauchy_rng',
    'cbrt',
    'ceil',
    'chi_square',
    'chi_square_cdf',
    'chi_square_lccdf',
    'chi_square_lcdf',
    'chi_square_lpdf',
    'chi_square_lupdf',
    'chi_square_rng',
    'chol2inv',
    'cholesky_decompose',
    'col',
    'conj',
    'crossprod',
    'csr_extract_u',
    'csr_extract_v',
    'csr_extract_w',
    'csr_matrix_times_vector',
    'csr_to_dense_matrix',
    'determinant',
    'diag_matrix',
    'diagonal',
    'digamma',
    'dims',
    'dirichlet',
    'dirichlet_lpdf',
    'dirichlet_lupdf',
    'dirichlet_rng',
    'discrete_range',
    'discrete_range_cdf',
    'discrete_range_lccdf',
    'discrete_range_lcdf',
    'discrete_range_lpmf',
    'discrete_range_lupmf',
    'discrete_range_rng',
    'double_exponential',
    'double_exponential_cdf',
    'double_exponential_lccdf',
    'double_exponential_lcdf',
    'double_exponential_lpdf',
    'double_exponential_lupdf',
    'double_exponential_rng',
    'e',
    'eigenvalues_sym',
    'eigenvectors_sym',
    'erf',
    'erfc',
    'exp2',
    'exp_mod_normal',
    'exp_mod_normal_cdf',
    'exp_mod_normal_lccdf',
    'exp_mod_normal_lcdf',
    'exp_mod_normal_lpdf',
    'exp_mod_normal_lupdf',
    'exp_mod_normal_rng',
    'expm1',
    'exponential',
    'exponential_cdf',
    'exponential_lccdf',
    'exponential_lcdf',
    'exponential_lpdf',
    'exponential_lupdf',
    'exponential_rng',
    'fabs',
    'floor',
    'fma',
    'frechet',
    'frechet_cdf',
    'frechet_lccdf',
    'frechet_lcdf',
    'frechet_lpdf',
    'frechet_lupdf',
    'frechet_rng',
    'gamma',
    'gamma_cdf',
    'gamma_lccdf',
    'gamma_lcdf',
    'gamma_lpdf',
    'gamma_lupdf',
    'gamma_rng',
    'gaussian_dlm_obs',
    'generalized_inverse',
    'get_imag',
    'get_lp',
    'get_real',
    'gumbel',
    'gumbel_cdf',
    'gumbel_lccdf',
    'gumbel_lcdf',
    'gumbel_lpdf',
    'gumbel_lupdf',
    'gumbel_rng',
    'hmm_hidden_state_prob',
    'hmm_latent_rng',
    'hmm_marginal',
    'hypergeometric',
    'hypergeometric_lpmf',
    'hypergeometric_lupmf',
    'hypergeometric_rng',
    'identity_matrix',
    'inc_beta',
    'integrate_ode',
    'inv',
    'inv_Phi',
    'inv_chi_square',
    'inv_chi_square_cdf',
    'inv_chi_square_lccdf',
    'inv_chi_square_lcdf',
    'inv_chi_square_lpdf',
    'inv_chi_square_lupdf',
    'inv_chi_square_rng',
    'inv_cloglog',
    'inv_gamma',
    'inv_gamma_cdf',
    'inv_gamma_lccdf',
    'inv_gamma_lcdf',
    'inv_gamma_lpdf',
    'inv_gamma_lupdf',
    'inv_gamma_rng',
    'inv_logit',
    'inv_sqrt',
    'inv_square',
    'inv_wishart',
    'inv_wishart_lpdf',
    'inv_wishart_lupdf',
    'inv_wishart_rng',
    'inverse',
    'inverse_spd',
    'is_inf',
    'is_nan',
    'lambert_w0',
    'lambert_wm1',
    'lgamma',
    'linspaced_array',
    'linspaced_int_array',
    'linspaced_row_vector',
    'linspaced_vector',
    'lkj_corr',
    'lkj_corr_cholesky',
    'lkj_corr_cholesky_lpdf',
    'lkj_corr_cholesky_lupdf',
    'lkj_corr_cholesky_rng',
    'lkj_corr_lpdf',
    'lkj_corr_lupdf',
    'lkj_corr_rng',
    'log1m',
    'log1m_exp',
    'log1m_inv_logit',
    'log1p',
    'log1p_exp',
    'log_determinant',
    'log_falling_factorial',
    'log_inv_logit',
    'log_inv_logit_diff',
    'log_mix',
    'log_softmax',
    'logistic',
    'logistic_cdf',
    'logistic_lccdf',
    'logistic_lcdf',
    'logistic_lpdf',
    'logistic_lupdf',
    'logistic_rng',
    'logit',
    'lognormal',
    'lognormal_cdf',
    'lognormal_lccdf',
    'lognormal_lcdf',
    'lognormal_lpdf',
    'lognormal_lupdf',
    'lognormal_rng',
    'machine_precision',
    'map_rect',
    'matrix_exp',
    'matrix_exp_multiply',
    'matrix_power',
    'multi_gp',
    'multi_gp_cholesky',
    'multi_gp_cholesky_lpdf',
    'multi_gp_cholesky_lupdf',
    'multi_gp_lpdf',
    'multi_gp_lupdf',
    'multi_normal',
    'multi_normal_cholesky',
    'multi_normal_prec',
    'multi_student_t',
    'multinomial',
    'multinomial_logit',
    'multinomial_logit_lpmf',
    'multinomial_logit_lupmf',
    'multinomial_logit_rng',
    'multinomial_lpmf',
    'multinomial_lupmf',
    'multinomial_rng',
    'multiply_lower_tri_self_transpose',
    'neg_binomial',
    'neg_binomial_2',
    'neg_binomial_2_cdf',
    'neg_binomial_2_lccdf',
    'neg_binomial_2_lcdf',
    'neg_binomial_2_log',
    'neg_binomial_2_log_glm',
    'neg_binomial_2_log_lpmf',
    'neg_binomial_2_log_lupmf',
    'neg_binomial_2_log_rng',
    'neg_binomial_2_lpmf',
    'neg_binomial_2_lupmf',
    'neg_binomial_2_rng',
    'neg_binomial_cdf',
    'neg_binomial_lccdf',
    'neg_binomial_lcdf',
    'neg_binomial_lpmf',
    'neg_binomial_lupmf',
    'neg_binomial_rng',
    'negative_infinity',
    'norm',
    'normal',
    'normal_cdf',
    'normal_id_glm',
    'normal_lccdf',
    'normal_lcdf',
    'normal_lpdf',
    'normal_lupdf',
    'normal_rng',
    'not_a_number',
    'ode_adams',
    'ode_adams_tol',
    'ode_adjoint_tol_ctl',
    'ode_bdf',
    'ode_bdf_tol',
    'ode_ckrk',
    'ode_ckrk_tol',
    'ode_rk45',
    'ode_rk45_tol',
    'one_hot_array',
    'one_hot_int_array',
    'one_hot_row_vector',
    'one_hot_vector',
    'ones_array',
    'ones_int_array',
    'ones_row_vector',
    'ones_vector',
    'operator%/%',
    'operator%',
    'operator=',
    'ordered_logistic',
    'ordered_logistic_lpmf',
    'ordered_logistic_lupmf',
    'ordered_logistic_rng',
    'ordered_probit',
    'ordered_probit_lpmf',
    'ordered_probit_lupmf',
    'ordered_probit_rng',
    'pareto',
    'pareto_cdf',
    'pareto_lccdf',
    'pareto_lcdf',
    'pareto_lpdf',
    'pareto_lupdf',
    'pareto_rng',
    'pareto_type_2',
    'pareto_type_2_cdf',
    'pareto_type_2_lccdf',
    'pareto_type_2_lcdf',
    'pareto_type_2_lpdf',
    'pareto_type_2_lupdf',
    'pareto_type_2_rng',
    'pi',
    'poisson',
    'poisson_cdf',
    'poisson_lccdf',
    'poisson_lcdf',
    'poisson_log',
    'poisson_log_glm',
    'poisson_log_lpmf',
    'poisson_log_lupmf',
    'poisson_log_rng',
    'poisson_lpmf',
    'poisson_lupmf',
    'poisson_rng',
    'polar',
    'positive_infinity',
    'print',
    'proj',
    'qr_Q',
    'qr_R',
    'qr_thin_Q',
    'qr_thin_R',
    'rayleigh',
    'rayleigh_cdf',
    'rayleigh_lccdf',
    'rayleigh_lcdf',
    'rayleigh_lpdf',
    'rayleigh_lupdf',
    'rayleigh_rng',
    'reduce_sum',
    'reject',
    'rep_row_vector',
    'rep_vector',
    'round',
    'row',
    'scale_matrix_exp_multiply',
    'scaled_inv_chi_square',
    'scaled_inv_chi_square_cdf',
    'scaled_inv_chi_square_lccdf',
    'scaled_inv_chi_square_lcdf',
    'scaled_inv_chi_square_lpdf',
    'scaled_inv_chi_square_lupdf',
    'scaled_inv_chi_square_rng',
    'singular_values',
    'skew_double_exponential',
    'skew_double_exponential_cdf',
    'skew_double_exponential_lccdf',
    'skew_double_exponential_lcdf',
    'skew_double_exponential_lpdf',
    'skew_double_exponential_lupdf',
    'skew_double_exponential_rng',
    'skew_normal',
    'skew_normal_cdf',
    'skew_normal_lccdf',
    'skew_normal_lcdf',
    'skew_normal_lpdf',
    'skew_normal_lupdf',
    'skew_normal_rng',
    'softmax',
    'sqrt2',
    'square',
    'std_normal',
    'std_normal_cdf',
    'std_normal_lccdf',
    'std_normal_lcdf',
    'std_normal_lpdf',
    'std_normal_lupdf',
    'std_normal_rng',
    'step',
    'student_t',
    'student_t_cdf',
    'student_t_lccdf',
    'student_t_lcdf',
    'student_t_lpdf',
    'student_t_lupdf',
    'student_t_rng',
    'sub_col',
    'sub_row',
    'svd_U',
    'svd_V',
    'symmetrize_from_lower_tri',
    'target',
    'tcrossprod',
    'tgamma',
    'to_array_2d',
    'trace',
    'trace_gen_quad_form',
    'trace_quad_form',
    'trigamma',
    'trunc',
    'uniform',
    'uniform_cdf',
    'uniform_lccdf',
    'uniform_lcdf',
    'uniform_lpdf',
    'uniform_lupdf',
    'uniform_rng',
    'uniform_simplex',
    'von_mises',
    'von_mises_lpdf',
    'von_mises_lupdf',
    'von_mises_rng',
    'weibull',
    'weibull_cdf',
    'weibull_lccdf',
    'weibull_lcdf',
    'weibull_lpdf',
    'weibull_lupdf',
    'weibull_rng',
    'wiener',
    'wiener_lpdf',
    'wiener_lupdf',
    'wishart',
    'wishart_lpdf',
    'wishart_lupdf',
    'wishart_rng',
    'zeros_array',
    'zeros_int_array'    
  ];
  
  // handle symbols separately or else
  // e and other symbols will be highlighted
  // when used as variables 
  const symbols = ['pi', 'e', 'sqrt2', 'log2', 'log10']
  var FUNCTIONS_NO_SYMBOLS = FUNCTIONS;

  FUNCTIONS_NO_SYMBOLS = FUNCTIONS_NO_SYMBOLS.filter(function(val){
    return (symbols.indexOf(val) == -1 ? true : false)
  })

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
    begin: /#include\b/,
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

  var numberRegex = new RegExp([
    // Comes from @RunDevelopment accessed 11/29/2021 at
    // https://github.com/PrismJS/prism/blob/c53ad2e65b7193ab4f03a1797506a54bbb33d5a2/components/prism-stan.js#L56
    
    // start of big noncapture group which 
    // 1. gets numbers that are by themselves
    // 2. numbers that are separated by _
    // 3. numbers that are separted by .
    /(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)/   
    // grabs scientific notation
    // grabs complex numbers with i
    ,/(?:[eE][+-]?\d+(?:_\d+)*)?i?(?!\w)/
  ].map(function(r) {return r.source}).join(''), 'i');

  return {
    name: 'Stan',
    aliases: [ 'stanfuncs' ],
    keywords: {
      $pattern: hljs.IDENT_RE,
      title: BLOCKS,
      keyword: STATEMENTS.concat(VAR_TYPES),
      built_in: FUNCTIONS_NO_SYMBOLS
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      INCLUDE,
      hljs.HASH_COMMENT_MODE,
      BLOCK_COMMENT,
    //  {
    //    Uses lookback! Uncomment once lookbacks are allowed
    //    handles distributions in a bit better way by looking
    //    back for either ~ or += instead of just relying on
    //    the user to have placed those

    //    handle user defined distributions 
    //    className: 'built_in',
    //    variants: [
    //     {
    //        works when using a '~' to declare the target adjustment 
    //        begin: /(?<=~)\s+(\w+)/
    //      },
    //      {
    //        works when using '+=' to declare the target adjustment
    //        begin: /(?<=\+=)\s+(\w+(_lpdf|_lupdf|_lpmf|_cdf|_lcdf|_lccdf|_qf))/
    //      }
    //     ],
    //     keywords: DISTRIBUTIONS.concat(DISTRIBUTIONS_EXPANDED)
    //  },
     {
      className: 'built_in',
      begin: '\\s*(' + hljs.IDENT_RE + ')(?=\\()'
    },
     {
      className: 'symbol',
      begin: /\s(pi|e|sqrt2|log2|log10)(?=\()/,
      relevance: 0
     },
    // Uses lookback! Uncomment once lookbacks are allowed
    // correct highlighting for truncation while
    // allowing an array named T to not be highlighted 
    // {
    //    begin: /(?<=\))\s*T(?=\s*\[)/
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
            begin: numberRegex
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
