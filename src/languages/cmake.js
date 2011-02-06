/*
Language: CMake
Description: CMake is an open-source cross-platform system for build automation.
Author: Igor Kalnitsky <igor.kalnitsky@gmail.com>
Website: http://kalnitsky.org.ua/
*/

hljs.LANGUAGES.cmake = {
  case_insensitive: true,
  defaultMode: {
    lexems: hljs.IDENT_RE,

    keywords: {
    'add_custom_command': 2, 'add_custom_target': 2, 'add_definitions': 2, 'add_dependencies': 2, 'add_executable': 2, 'add_library': 2, 'add_subdirectory': 2, 'add_executable': 2, 'add_library': 2, 'add_subdirectory': 2, 'add_test': 2, 'aux_source_directory': 2, 'break': 1, 'build_command': 2, 'cmake_minimum_required': 3, 'cmake_policy': 3, 'configure_file': 1, 'create_test_sourcelist': 1, 'define_property': 1, 'else': 1, 'elseif': 1, 'enable_language': 2, 'enable_testing': 2, 'endforeach': 1, 'endfunction': 1, 'endif': 1, 'endmacro': 1, 'endwhile': 1, 'execute_process': 2, 'export': 1, 'find_file': 1, 'find_library': 2, 'find_package': 2, 'find_path': 1, 'find_program': 1, 'fltk_wrap_ui': 2, 'foreach': 1, 'function': 1, 'get_cmake_property': 3, 'get_directory_property': 1, 'get_filename_component': 1, 'get_property': 1, 'get_source_file_property': 1, 'get_target_property': 1, 'get_test_property': 1, 'if': 1, 'include': 1, 'include_directories': 2, 'include_external_msproject': 1, 'include_regular_expression': 2, 'install': 1, 'link_directories': 1, 'load_cache': 1, 'load_command': 1, 'macro': 1, 'mark_as_advanced': 1, 'message': 1, 'option': 1, 'output_required_files': 1, 'project': 1, 'qt_wrap_cpp': 2, 'qt_wrap_ui': 2, 'remove_definitions': 2, 'return': 1, 'separate_arguments': 1, 'set': 1, 'set_directory_properties': 1, 'set_property': 1, 'set_source_files_properties': 1, 'set_target_properties': 1, 'set_tests_properties': 1, 'site_name': 1, 'source_group': 1, 'string': 1, 'target_link_libraries': 2, 'try_compile': 2, 'try_run': 2, 'unset': 1, 'variable_watch': 2, 'while': 1, 'build_name': 1, 'exec_program': 1, 'export_library_dependencies': 1, 'install_files': 1, 'install_programs': 1, 'install_targets': 1, 'link_libraries': 1, 'make_directory': 1, 'remove': 1, 'subdir_depends': 1, 'subdirs': 1, 'use_mangled_mesa': 1, 'utility_source': 1, 'variable_requires': 1, 'write_file': 1 },

    contains: [
      {
        className: 'envvar',
        begin: '\\${', end: '}'
      },
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE
    ]
  }
};
