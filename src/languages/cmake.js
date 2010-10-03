/*
Language: CMake
Description: CMake is an open-source cross-platform system for build automation.
Author: Igor Kalnitsky <igor.kalnitsky@gmail.com>
Website: http://kalnitsky.org.ua/
*/

hljs.LANGUAGES.cmake = {

  defaultMode: {
    lexems: [hljs.IDENT_RE],

    keywords: {
    'add_custom_command': 5, 'add_custom_target': 5, 'add_definitions': 5, 'add_dependencies': 5, 'add_executable': 5, 'add_library': 5, 'add_subdirectory': 5, 'add_executable': 5, 'add_library': 5, 'add_subdirectory': 5, 'add_test': 5, 'aux_source_directory': 5, 'break': 1, 'build_command': 5, 'cmake_minimum_required': 10, 'cmake_policy': 5, 'configure_file': 5, 'create_test_sourcelist': 5, 'define_property': 5, 'else': 1, 'elseif': 1, 'enable_language': 5, 'enable_testing': 5, 'endforeach': 5, 'endfunction': 5, 'endif': 1, 'endmacro': 1, 'endwhile': 1, 'execute_process': 5, 'export': 5, 'find_file': 5, 'find_library': 5, 'find_package': 5, 'find_path': 5, 'find_program': 5, 'fltk_wrap_ui': 5, 'foreach': 1, 'function': 5, 'get_cmake_property': 10, 'get_directory_property': 5, 'get_filename_component': 5, 'get_property': 5, 'get_source_file_property': 5, 'get_target_property': 5, 'get_test_property': 5, 'if': 1, 'include': 1, 'include_directories': 5, 'include_external_msproject': 5, 'include_regular_expression': 5, 'install': 1, 'link_directories': 5, 'load_cache': 5, 'load_command': 5, 'macro': 1, 'mark_as_advanced': 5, 'message': 5, 'option': 5, 'output_required_files': 5, 'project': 5, 'qt_wrap_cpp': 5, 'qt_wrap_ui': 5, 'remove_definitions': 5, 'return': 1, 'separate_arguments': 5, 'set': 2, 'set_directory_properties': 5, 'set_property': 5, 'set_source_files_properties': 5, 'set_target_properties': 5, 'set_tests_properties': 5, 'site_name': 5, 'source_group': 5, 'string': 1, 'target_link_libraries': 5, 'try_compile': 5, 'try_run': 5, 'unset': 2, 'variable_watch': 5, 'while': 1, 'build_name': 5, 'exec_program': 5, 'export_library_dependencies': 5, 'install_files': 5, 'install_programs': 5, 'install_targets': 5, 'link_libraries': 5, 'make_directory': 5, 'remove': 2, 'subdir_depends': 5, 'subdirs': 5, 'use_mangled_mesa': 5, 'utility_source': 5, 'variable_requires': 5, 'write_file': 5 },

    contains: ['keyword', 'pseudo', 'comment', 'string', 'number']
  },

  case_insensitive: true,
  modes: [
    hljs.HASH_COMMENT_MODE,
    {
      className: 'string',
      begin: '"', 
      end: '"',
      relevance: 0,
      contains: ['escape']
    },
    {
      className: 'pseudo',
      begin: '\\${', 
      end: '}',
      relevance: 10
    }
  ]
};
