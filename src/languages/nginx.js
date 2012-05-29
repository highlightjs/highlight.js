/*
Language: Nginx
Author: Peter Leonov <gojpeg@yandex.ru>
*/

function(hljs) {
  var VAR1 = {
    className: 'variable',
    begin: '\\$\\d+'
  };
  var VAR2 = {
    className: 'variable',
    begin: '\\${', end: '}'
  };
  var VAR3 = {
    className: 'variable',
    begin: '[\\$\\@]' + hljs.UNDERSCORE_IDENT_RE
  };

  return {
    defaultMode: {
      contains: [
        hljs.HASH_COMMENT_MODE,
        { // directive
          begin: hljs.UNDERSCORE_IDENT_RE, end: ';|{', returnEnd: true,
          keywords:
            'accept_mutex accept_mutex_delay access_log add_after_body add_before_body ' +
            'add_header addition_types alias allow ancient_browser ancient_browser_value ' +
            'auth_basic auth_basic_user_file autoindex autoindex_exact_size ' +
            'autoindex_localtime charset charset_map charset_types ' +
            'client_body_buffer_size client_body_in_file_only client_body_in_single_buffer ' +
            'client_body_temp_path client_body_timeout client_header_buffer_size ' +
            'client_header_timeout client_max_body_size connection_pool_size connections ' +
            'create_full_put_path daemon dav_access dav_methods debug_connection ' +
            'debug_points default_type deny directio directio_alignment echo echo_after_body ' +
            'echo_before_body echo_blocking_sleep echo_duplicate echo_end echo_exec ' +
            'echo_flush echo_foreach_split echo_location echo_location_async ' +
            'echo_read_request_body echo_request_body echo_reset_timer echo_sleep ' +
            'echo_subrequest echo_subrequest_async empty_gif env error_log error_page events ' +
            'expires ' +

            'fastcgi_bind fastcgi_buffer_size fastcgi_buffers ' +
            'fastcgi_busy_buffers_size fastcgi_cache fastcgi_cache_key fastcgi_cache_methods ' +
            'fastcgi_cache_min_uses fastcgi_cache_path fastcgi_cache_use_stale ' +
            'fastcgi_cache_valid fastcgi_catch_stderr fastcgi_connect_timeout ' +
            'fastcgi_hide_header fastcgi_ignore_client_abort fastcgi_ignore_headers ' +
            'fastcgi_index fastcgi_intercept_errors fastcgi_max_temp_file_size ' +
            'fastcgi_next_upstream fastcgi_param fastcgi_pass fastcgi_pass_header ' +
            'fastcgi_pass_request_body fastcgi_pass_request_headers fastcgi_read_timeout ' +
            'fastcgi_send_lowat fastcgi_send_timeout fastcgi_split_path_info fastcgi_store ' +
            'fastcgi_store_access fastcgi_temp_file_write_size fastcgi_temp_path ' +
            'fastcgi_upstream_fail_timeout fastcgi_upstream_max_fails ' +

            'uwsgi_bind uwsgi_buffer_size uwsgi_buffering uwsgi_buffers ' +
            'uwsgi_busy_buffers_size uwsgi_cache uwsgi_cache_bypass uwsgi_cache_key ' +
            'uwsgi_cache_methods uwsgi_cache_min_uses uwsgi_cache_path uwsgi_cache_use_stale ' +
            'uwsgi_cache_valid uwsgi_connect_timeout uwsgi_hide_header ' +
            'uwsgi_ignore_client_abort uwsgi_ignore_headers uwsgi_intercept_errors ' +
            'uwsgi_max_temp_file_size uwsgi_modifier1 uwsgi_modifier2 uwsgi_next_upstream ' +
            'uwsgi_no_cache uwsgi_param uwsgi_pass uwsgi_pass_header uwsgi_pass_request_body ' +
            'uwsgi_pass_request_headers uwsgi_read_timeout uwsgi_send_timeout ' +
            'uwsgi_store uwsgi_store_access uwsgi_string uwsgi_temp_file_write_size ' +
            'uwsgi_temp_path ' +

            'flv geo geoip_city ' +
            'geoip_country gzip gzip_buffers gzip_comp_level gzip_disable gzip_hash ' +
            'gzip_http_version gzip_min_length gzip_no_buffer gzip_proxied gzip_static ' +
            'gzip_types gzip_vary gzip_window http if if_modified_since ' +
            'ignore_invalid_headers image_filter image_filter_buffer ' +
            'image_filter_jpeg_quality image_filter_transparency include index internal ' +
            'ip_hash js js_load js_require js_utf8 keepalive_requests keepalive_timeout ' +
            'kqueue_changes kqueue_events large_client_header_buffers limit_conn ' +
            'limit_conn_log_level limit_except limit_rate limit_rate_after limit_req ' +
            'limit_req_log_level limit_req_zone limit_zone lingering_time lingering_timeout ' +
            'listen location lock_file log_format log_not_found log_subrequest map ' +
            'map_hash_bucket_size map_hash_max_size master_process memcached_bind ' +
            'memcached_buffer_size memcached_connect_timeout memcached_next_upstream ' +
            'memcached_pass memcached_read_timeout memcached_send_timeout ' +
            'memcached_upstream_fail_timeout memcached_upstream_max_fails merge_slashes ' +
            'min_delete_depth modern_browser modern_browser_value more_clear_headers ' +
            'more_clear_input_headers more_set_headers more_set_input_headers msie_padding ' +
            'msie_refresh multi_accept open_file_cache open_file_cache_errors ' +
            'open_file_cache_events open_file_cache_min_uses open_file_cache_retest ' +
            'open_file_cache_valid open_log_file_cache optimize_server_names output_buffers ' +
            'override_charset perl perl_modules perl_require perl_set pid port_in_redirect ' +
            'post_action postpone_gzipping postpone_output proxy_bind proxy_buffer_size ' +
            'proxy_buffering proxy_buffers proxy_busy_buffers_size proxy_cache ' +
            'proxy_cache_key proxy_cache_methods proxy_cache_min_uses proxy_cache_path ' +
            'proxy_cache_use_stale proxy_cache_valid proxy_connect_timeout ' +
            'proxy_headers_hash_bucket_size proxy_headers_hash_max_size proxy_hide_header ' +
            'proxy_ignore_client_abort proxy_ignore_headers proxy_intercept_errors ' +
            'proxy_max_temp_file_size proxy_method proxy_next_upstream proxy_pass ' +
            'proxy_pass_header proxy_pass_request_body proxy_pass_request_headers ' +
            'proxy_read_timeout proxy_redirect proxy_send_lowat proxy_send_timeout ' +
            'proxy_set_body proxy_set_header proxy_store proxy_store_access ' +
            'proxy_temp_file_write_size proxy_temp_path proxy_upstream_fail_timeout ' +
            'proxy_upstream_max_fails push_authorized_channels_only push_channel_group ' +
            'push_max_channel_id_length push_max_channel_subscribers ' +
            'push_max_message_buffer_length push_max_reserved_memory ' +
            'push_message_buffer_length push_message_timeout push_min_message_buffer_length ' +
            'push_min_message_recipients push_publisher push_store_messages push_subscriber ' +
            'push_subscriber_concurrency random_index read_ahead real_ip_header ' +
            'recursive_error_pages request_pool_size reset_timedout_connection resolver ' +
            'resolver_timeout return rewrite rewrite_log root satisfy satisfy_any ' +
            'send_lowat send_timeout sendfile sendfile_max_chunk server server_name ' +
            'server_name_in_redirect server_names_hash_bucket_size server_names_hash_max_size ' +
            'server_tokens set set_real_ip_from source_charset ssi ' +
            'ssi_ignore_recycled_buffers ssi_min_file_chunk ssi_silent_errors ssi_types ' +
            'ssi_value_length ssl ssl_certificate ssl_certificate_key ssl_ciphers ' +
            'ssl_client_certificate ssl_crl ssl_dhparam ssl_prefer_server_ciphers ' +
            'ssl_protocols ssl_session_cache ssl_session_timeout ssl_verify_client ' +
            'ssl_verify_depth sub_filter sub_filter_once sub_filter_types tcp_nodelay ' +
            'tcp_nopush timer_resolution try_files types types_hash_bucket_size ' +
            'types_hash_max_size underscores_in_headers uninitialized_variable_warn upstream ' +
            'use user userid userid_domain userid_expires userid_mark userid_name userid_p3p ' +
            'userid_path userid_service valid_referers variables_hash_bucket_size ' +
            'variables_hash_max_size worker_connections worker_cpu_affinity worker_priority ' +
            'worker_processes worker_rlimit_core worker_rlimit_nofile ' +
            'worker_rlimit_sigpending working_directory xml_entities xslt_stylesheet xslt_types',
          relevance: 0,
          contains: [
            hljs.HASH_COMMENT_MODE,
            {
              begin: '\\s', end: '[;{]', returnBegin: true, returnEnd: true,
              lexems: '[a-z/]+',
              keywords: {
                built_in:
                  'on off yes no true false none blocked debug info notice warn error crit ' +
                  'select break last permanent redirect kqueue rtsig epoll poll /dev/poll'
              },
              relevance: 0,
              contains: [
                hljs.HASH_COMMENT_MODE,
                {
                  className: 'string',
                  begin: '"', end: '"',
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3],
                  relevance: 0
                },
                {
                  className: 'string',
                  begin: "'", end: "'",
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3],
                  relevance: 0
                },
                {
                  className: 'string',
                  begin: '([a-z]+):/', end: '[;\\s]', returnEnd: true
                },
                {
                  className: 'regexp',
                  begin: "\\s\\^", end: "\\s|{|;", returnEnd: true,
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3]
                },
                // regexp locations (~, ~*)
                {
                  className: 'regexp',
                  begin: "~\\*?\\s+", end: "\\s|{|;", returnEnd: true,
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3]
                },
                // *.example.com
                {
                  className: 'regexp',
                  begin: "\\*(\\.[a-z\\-]+)+",
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3]
                },
                // sub.example.*
                {
                  className: 'regexp',
                  begin: "([a-z\\-]+\\.)+\\*",
                  contains: [hljs.BACKSLASH_ESCAPE, VAR1, VAR2, VAR3]
                },
                // IP
                {
                  className: 'number',
                  begin: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'
                },
                // units
                {
                  className: 'number',
                  begin: '\\s\\d+[kKmMgGdshdwy]*\\b',
                  relevance: 0
                },
                VAR1, VAR2, VAR3
              ]
            }
          ]
        }
      ]
    }
  }
}
