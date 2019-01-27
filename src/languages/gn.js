/*
Language: GN
Author: Petr Hosek <petrhosek@gmail.com>
Description: GN is a meta-build system that generates build files for Ninja.
Category: common
*/

function(hljs) {
  var SUBST = {
    className: 'subst', relevance: 2,
    variants: [
      {
        begin: '\\$[A-Za-z0-9_]+'
      },
      {
        begin: '\\${', end: '}',
        contains: [{
          className: 'variable',
          begin: hljs.UNDERSCORE_IDENT_RE,
          relevance: 0
        }]
      }
    ],
  };

  var LINK = {
    className: 'link', relevance: 5,
    begin: ':\\w+',
  }

  var NUMBER = {
    className: 'number', relevance: 0,
    begin: hljs.NUMBER_RE
  };

  var STRING = {
    className: 'string', relevance: 0,
    begin: '"',
    end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST, LINK],
  };

  var KEYWORDS = {
    keyword:
      'if else',
    literal:
      'true false ' +
      'current_cpu current_os current_toolchain ' +
      'default_toolchain host_cpu host_os ' +
      'root_build_dir root_gen_dir root_out_dir ' +
      'target_cpu target_gen_dir target_out_dir ' +
      'target_os target_name invoker',
    type:
      'action action_foreach copy executable group ' +
      'shared_library source_set static_library ' +
      'loadable_module generated_file',
    built_in:
      'assert config declare_args defined exec_script ' +
      'foreach get_label_info get_path_info ' +
      'get_target_outputs getenv import print ' +
      'process_file_template read_file rebase_path ' +
      'set_default_toolchain set_defaults ' +
      'set_sources_assignment_filter template tool ' +
      'toolchain toolchain_args propagates_configs ' +
      'write_file forward_variables_from target ' +
      'get_name_info not_needed',
    symbol:
      'all_dependent_configs allow_circular_includes_from ' +
      'args asmflags cflags cflags_c cflags_cc cflags_objc ' +
      'cflags_objcc check_includes complete_static_lib ' +
      'configs data data_deps defines depfile deps ' +
      'include_dirs inputs ldflags lib_dirs libs ' +
      'output_extension output_name outputs public ' +
      'public_configs public_deps script sources testonly ' +
      'visibility contents output_conversion rebase ' +
      'data_keys walk_keys',
  };

  return {
    aliases: ['gn', 'gni'],
    keywords: KEYWORDS,
    contains: [
      NUMBER,
      STRING,
      hljs.HASH_COMMENT_MODE,
    ]
  };
}
