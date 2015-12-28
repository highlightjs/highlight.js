/*
Language: Maxima
Author: Robert Dodier <robert.dodier@gmail.com>
Category: scientific
*/

function(hljs) {
  var KEYWORDS = 'if then else elseif for thru do while until step in and or not';
  var BUILTIN_SYMBOLS =
      ' absboxchar activecontexts adapt_depth adapt_depth additive adim aform algebraic algepsilon'
    + ' algexact aliases allbut all_dotsimp_denoms allocation allsym alphabetic animation antisymmetric'
    + ' arrays askexp assume_pos assume_pos_pred assumescalar asymbol atomgrad atrig1 axes'
    + ' axis_3d axis_bottom axis_left axis_right axis_top azimuth azimuth background background_color'
    + ' backsubst berlefact bernstein_explicit besselexpand beta_args_sum_to_integer beta_expand bftorat bftrunc bindtest'
    + ' border boundaries_array box boxchar breakup %c capping cauchysum cbrange'
    + ' cbtics center cflength cframe_flag cnonmet_flag color color color color_bar'
    + ' color_bar_tics colorbox columns commutative complex cone context contexts contour'
    + ' contour_levels cosnpiflag ctaypov ctaypt ctayswitch ctayvar ct_coords ctorsion_flag ctrgsimp'
    + ' cube current_let_rule_package cylinder data_file_name debugmode decreasing default_let_rule_package delay dependencies'
    + ' dependencies derivabbrev derivsubst detout diagmetric diff dim dimensions dispflag'
    + ' display2d display_format_internal distribute_over doallmxops domain domxexpt domxmxops domxnctimes dontfactor'
    + ' doscmxops doscmxplus dot0nscsimp dot0simp dot1simp dotassoc dotconstrules dotdistrib dotexptsimp'
    + ' dotident dotscrules draw_graph_program draw_realpart %e edge_color edge_coloring edge_partition edge_type'
    + ' edge_width %edispflag elevation elevation %emode endphi endtheta enhanced3d %enumer'
    + ' epsilon_lp erfflag erf_representation errormsg error_size error_syms error_type %e_to_numlog eval'
    + ' even evenfun evflag evfun ev_point expandwrt_denom expintexpand expintrep expon'
    + ' expop exptdispflag exptisolate exptsubst facexpand facsum_combine factlim factorflag factorial_expand'
    + ' factors_only false fb feature features file_name file_name file_output_append file_search_demo'
    + ' file_search_lisp file_search_maxima file_search_tests file_search_usage file_type_lisp file_type_maxima fill_color'
    + ' fill_density filled_func fixed_vertices flipflag float2bf font font_size fortindent fortspaces fpprec fpprintprec'
    + ' functions %gamma gamma_expand gammalim gdet genindex gensumnum GGFCFMAX GGFINFINITY'
    + ' globalsolve gnuplot_command gnuplot_curve_styles gnuplot_curve_titles gnuplot_default_term_command'
    + ' gnuplot_dumb_term_command gnuplot_file_args gnuplot_file_name gnuplot_out_file'
    + ' gnuplot_pdf_term_command gnuplot_pm3d gnuplot_png_term_command gnuplot_postamble gnuplot_preamble'
    + ' gnuplot_ps_term_command gnuplot_svg_term_command gnuplot_term gnuplot_view_args'
    + ' Gosper_in_Zeilberger gradefs grid grid grid2d grind halfangles head_angle head_angle'
    + ' head_both head_length head_length head_type height height hypergeometric_representation %i %iargs'
    + ' ibase icc1 icc2 icounter idummyx ieqnprint ifb ifc1 ifc2'
    + ' ifg ifgi ifr iframe_bracket_form ifri igeowedge_flag ikt1 ikt2 imaginary'
    + ' inchar increasing ind inf infeval infinity inflag infolists inm'
    + ' inmc1 inmc2 intanalysis integer integervalued integrate_use_rootsof integration_constant'
    + ' integration_constant_counter interpolate_color'
    + ' intfaclim ip_grid ip_grid_in irrational isolate_wrt_times iterations itr julia_parameter %k1'
    + ' %k2 keepfloat key key_pos kinvariant kt label label_alignment label_alignment'
    + ' label_orientation labels lassociative lbfgs_ncorrections lbfgs_nfeval_max leftjust legend letrat let_rule_packages'
    + ' lfg lg lhospitallim limsubst linear linear_solver linechar linel linenum'
    + ' line_type linewidth line_width linsolve_params linsolvewarn lispdisp listarith listconstvars listdummyvars'
    + ' lmxchar load_pathname loadprint logabs logarc logarc logcb logconcoeffp logexpand'
    + ' lognegint logsimp logx logx logx_secondary logy logy logy_secondary logz'
    + ' lriem m1pbranch macroexpansion macros mainvar manual_demo maperror mapprint matrix_element_add'
    + ' matrix_element_mult matrix_element_transpose maxapplydepth maxapplyheight maxima_tempdir maxima_userdir'
    + ' maxnegex MAX_ORD maxposex maxpsifracdenom maxpsifracnum maxpsinegint maxpsiposint maxtayorder'
    + ' mesh_lines_color method minf mod_big_prime mode_check_errorp mode_checkp mode_check_warnp mod_test'
    + ' mod_threshold modular_linear_solver modulus multiplicative multiplicities'
    + ' myoptions nary negdistrib negsumdispflag newline newtonepsilon newtonmaxiter nextlayerfactor niceindicespref'
    + ' nm nmc noeval nolabels nonegative_lp noninteger nonscalar noun noundisp'
    + ' nouns np npi nticks nticks ntrig numer numer_pbranch obase'
    + ' odd oddfun opacity opproperties opsubst optimprefix optionset orientation origin'
    + ' orthopoly_returns_intervals outative outchar packagefile palette palette partswitch pdf_file pfeformat'
    + ' %phi phiresolution %pi %piargs piece pivot_count_sx pivot_max_sx plot_format plot_options'
    + ' plot_realpart png_file pochhammer_max_index points pointsize point_size points_joined point_type point_type'
    + ' poislim poisson poly_coefficient_ring poly_elimination_order polyfactor poly_grobner_algorithm poly_grobner_debug'
    + ' poly_monomial_order poly_primary_elimination_order poly_return_term_list poly_secondary_elimination_order'
    + ' poly_top_reduction_only posfun position powerdisp pred prederror primep_number_of_tests'
    + ' product_use_gamma program programmode promote_float_to_bigfloat prompt proportional_axes props psexpand ps_file'
    + ' radexpand radius radsubstflag rassociative ratalgdenom ratchristof ratdenomdivide rateinstein ratepsilon'
    + ' ratfac rational ratmx ratprint ratriemann ratsimpexpons ratvarswitch ratweights ratweyl'
    + ' ratwtlvl real realonly redraw refcheck resolution restart resultant ric'
    + ' riem rmxchar %rnum_list rombergabs rombergit rombergmin rombergtol rootsconmode rootsepsilon'
    + ' run_viewer same_xy same_xyz savedef savefactors scalar scalarmatrixp scale scale_lp'
    + ' setcheck setcheckbreak setval show_edge_color show_edges show_edge_type show_edge_width show_id show_label'
    + ' showtime show_vertex_color show_vertex_size show_vertex_type show_vertices show_weight simp simplified_output simplify_products'
    + ' simpsum sinnpiflag solvedecomposes solveexplicit solvefactors solvenullwarn solveradcan solvetrigwarn space'
    + ' sparse sphere spring_embedding_depth sqrtdispflag stardisp startphi starttheta stats_numer stringdisp'
    + ' structures style sublis_apply_lambda subnumsimp sumexpand sumsplitfact surface surface_hide svg_file'
    + ' symmetric t tab taylordepth taylor_logexpand taylor_order_coefficients taylor_truncate_polynomials tensorkill terminal'
    + ' terminal testsuite_files thetaresolution timer_devalue title title tlimswitch tr track'
    + ' transcompile transform transform_xy translate_fast_arrays transparent transrun tr_array_as_ref'
    + ' tr_bound_function_applyp tr_file_tty_messagesp tr_float_can_branch_complex tr_function_call_default trigexpandplus'
    + ' trigexpandtimes triginverses trigsign trivial_solutions tr_numer tr_optimize_max_loop'
    + ' tr_semicompile tr_state_vars true tr_warn_bad_function_calls tr_warn_fexpr tr_warn_meval tr_warn_mode'
    + ' tr_warn_undeclared tr_warn_undefined_variable tstep ttyoff tube_extremes ufg ug und %unitexpand unit_vectors uric'
    + ' uriem use_fast_arrays user_preamble usersetunits values variablename vect_cross verbose vertex_color'
    + ' vertex_coloring vertex_partition vertex_size vertex_type view warnings weyl width windowname'
    + ' windowtitle wired_surface wireframe x xaxis xaxis_color xaxis_secondary xaxis_type xaxis_width'
    + ' xlabel xlabel xlabel_secondary xlength xrange xrange_secondary xtics xtics xtics_axis'
    + ' xtics_rotate xtics_rotate_secondary xtics_secondary xtics_secondary_axis xu_grid x_voxel xy_file xyplane xy_scale'
    + ' y yaxis yaxis_color yaxis_secondary yaxis_type yaxis_width ylabel ylabel ylabel_secondary'
    + ' ylength yrange yrange_secondary ytics ytics ytics_axis ytics_rotate ytics_rotate_secondary ytics_secondary'
    + ' ytics_secondary_axis yv_grid y_voxel yx_ratio z zaxis zaxis_color zaxis_type zaxis_width'
    + ' zeroa zerob zerobern zeta%pi zlabel zlabel zlength zmin zn_primroot_limit'
    + ' zn_primroot_pretest zn_primroot_verbose zrange ztics ztics_axis ztics_rotate z_voxel';

  return {
    keywords: {
      keyword: KEYWORDS,
      literal: 'true false unknown inf minf ind und',
      built_in: BUILTIN_SYMBOLS
    },
    contains: [ hljs.C_NUMBER_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.QUOTE_STRING_MODE ]
  }
}

