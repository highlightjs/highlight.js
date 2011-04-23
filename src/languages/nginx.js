/*
Language: nginx
Author: Peter Leonov <gojpeg@yandex.ru>
*/

hljs.LANGUAGES.nginx = function() {
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
    begin: '[\\$\\@]' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
  };

  return {
    defaultMode: {
      contains: [
        hljs.HASH_COMMENT_MODE,
        { // directive
          begin: hljs.UNDERSCORE_IDENT_RE, end: ';|{', returnEnd: true,
          lexems: hljs.UNDERSCORE_IDENT_RE,
          keywords: {
            accept_mutex: 1, accept_mutex_delay: 1, access_log: 1,
            add_after_body: 1, add_before_body: 1, add_header: 1,
            addition_types: 1, alias: 1, allow: 1, ancient_browser: 1,
            ancient_browser: 1, ancient_browser_value: 1, ancient_browser_value: 1,
            auth_basic: 1, auth_basic_user_file: 1, autoindex: 1,
            autoindex_exact_size: 1, autoindex_localtime: 1, 'break': 1,
            charset: 1, charset: 1, charset_map: 1, charset_map: 1,
            charset_types: 1, charset_types: 1, client_body_buffer_size: 1,
            client_body_in_file_only: 1, client_body_in_single_buffer: 1,
            client_body_temp_path: 1, client_body_timeout: 1,
            client_header_buffer_size: 1, client_header_timeout: 1,
            client_max_body_size: 1, connection_pool_size: 1, connections: 1,
            create_full_put_path: 1, daemon: 1, dav_access: 1, dav_methods: 1,
            debug_connection: 1, debug_points: 1, default_type: 1, deny: 1,
            directio: 1, directio_alignment: 1, echo: 1, echo_after_body: 1,
            echo_before_body: 1, echo_blocking_sleep: 1, echo_duplicate: 1,
            echo_end: 1, echo_exec: 1, echo_flush: 1, echo_foreach_split: 1,
            echo_location: 1, echo_location_async: 1, echo_read_request_body: 1,
            echo_request_body: 1, echo_reset_timer: 1, echo_sleep: 1,
            echo_subrequest: 1, echo_subrequest_async: 1, empty_gif: 1,
            empty_gif: 1, env: 1, error_log: 1, error_log: 1, error_page: 1,
            events: 1, expires: 1, fastcgi_bind: 1, fastcgi_buffer_size: 1,
            fastcgi_buffers: 1, fastcgi_busy_buffers_size: 1, fastcgi_cache: 1,
            fastcgi_cache_key: 1, fastcgi_cache_methods: 1,
            fastcgi_cache_min_uses: 1, fastcgi_cache_path: 1,
            fastcgi_cache_use_stale: 1, fastcgi_cache_valid: 1,
            fastcgi_catch_stderr: 1, fastcgi_connect_timeout: 1,
            fastcgi_hide_header: 1, fastcgi_ignore_client_abort: 1,
            fastcgi_ignore_headers: 1, fastcgi_index: 1,
            fastcgi_intercept_errors: 1, fastcgi_max_temp_file_size: 1,
            fastcgi_next_upstream: 1, fastcgi_param: 1, fastcgi_pass: 1,
            fastcgi_pass_header: 1, fastcgi_pass_request_body: 1,
            fastcgi_pass_request_headers: 1, fastcgi_read_timeout: 1,
            fastcgi_send_lowat: 1, fastcgi_send_timeout: 1,
            fastcgi_split_path_info: 1, fastcgi_store: 1, fastcgi_store_access: 1,
            fastcgi_temp_file_write_size: 1, fastcgi_temp_path: 1,
            fastcgi_upstream_fail_timeout: 1, fastcgi_upstream_max_fails: 1,
            flv: 1, geo: 1, geo: 1, geoip_city: 1, geoip_country: 1, gzip: 1,
            gzip_buffers: 1, gzip_comp_level: 1, gzip_disable: 1, gzip_hash: 1,
            gzip_http_version: 1, gzip_min_length: 1, gzip_no_buffer: 1,
            gzip_proxied: 1, gzip_static: 1, gzip_types: 1, gzip_vary: 1,
            gzip_window: 1, http: 1, 'if': 1, if_modified_since: 1,
            ignore_invalid_headers: 1, image_filter: 1, image_filter_buffer: 1,
            image_filter_jpeg_quality: 1, image_filter_transparency: 1, include: 1,
            index: 1, internal: 1, ip_hash: 1, js: 1, js_load: 1, js_require: 1,
            js_utf8: 1, keepalive_requests: 1, keepalive_timeout: 1,
            kqueue_changes: 1, kqueue_events: 1, large_client_header_buffers: 1,
            limit_conn: 1, limit_conn_log_level: 1, limit_except: 1, limit_rate: 1,
            limit_rate_after: 1, limit_req: 1, limit_req_log_level: 1,
            limit_req_zone: 1, limit_zone: 1, lingering_time: 1,
            lingering_timeout: 1, listen: 1, location: 1, lock_file: 1,
            log_format: 1, log_not_found: 1, log_subrequest: 1, map: 1,
            map_hash_bucket_size: 1, map_hash_max_size: 1, master_process: 1,
            memcached_bind: 1, memcached_buffer_size: 1,
            memcached_connect_timeout: 1, memcached_next_upstream: 1,
            memcached_pass: 1, memcached_read_timeout: 1,
            memcached_send_timeout: 1, memcached_upstream_fail_timeout: 1,
            memcached_upstream_max_fails: 1, merge_slashes: 1, min_delete_depth: 1,
            modern_browser: 1, modern_browser: 1, modern_browser_value: 1,
            modern_browser_value: 1, more_clear_headers: 1,
            more_clear_input_headers: 1, more_set_headers: 1,
            more_set_input_headers: 1, msie_padding: 1, msie_refresh: 1,
            multi_accept: 1, open_file_cache: 1, open_file_cache_errors: 1,
            open_file_cache_events: 1, open_file_cache_min_uses: 1,
            open_file_cache_retest: 1, open_file_cache_valid: 1,
            open_log_file_cache: 1, optimize_server_names: 1, output_buffers: 1,
            override_charset: 1, override_charset: 1, perl: 1, perl_modules: 1,
            perl_require: 1, perl_set: 1, pid: 1, port_in_redirect: 1,
            post_action: 1, postpone_gzipping: 1, postpone_output: 1,
            proxy_bind: 1, proxy_buffer_size: 1, proxy_buffering: 1,
            proxy_buffers: 1, proxy_busy_buffers_size: 1, proxy_cache: 1,
            proxy_cache_key: 1, proxy_cache_methods: 1, proxy_cache_min_uses: 1,
            proxy_cache_path: 1, proxy_cache_use_stale: 1, proxy_cache_valid: 1,
            proxy_connect_timeout: 1, proxy_headers_hash_bucket_size: 1,
            proxy_headers_hash_max_size: 1, proxy_hide_header: 1,
            proxy_ignore_client_abort: 1, proxy_ignore_headers: 1,
            proxy_intercept_errors: 1, proxy_max_temp_file_size: 1,
            proxy_method: 1, proxy_next_upstream: 1, proxy_pass: 1,
            proxy_pass_header: 1, proxy_pass_request_body: 1,
            proxy_pass_request_headers: 1, proxy_read_timeout: 1,
            proxy_redirect: 1, proxy_send_lowat: 1, proxy_send_timeout: 1,
            proxy_set_body: 1, proxy_set_header: 1, proxy_store: 1,
            proxy_store_access: 1, proxy_temp_file_write_size: 1,
            proxy_temp_path: 1, proxy_upstream_fail_timeout: 1,
            proxy_upstream_max_fails: 1, push_authorized_channels_only: 1,
            push_channel_group: 1, push_max_channel_id_length: 1,
            push_max_channel_subscribers: 1, push_max_message_buffer_length: 1,
            push_max_reserved_memory: 1, push_message_buffer_length: 1,
            push_message_timeout: 1, push_min_message_buffer_length: 1,
            push_min_message_recipients: 1, push_publisher: 1,
            push_store_messages: 1, push_subscriber: 1,
            push_subscriber_concurrency: 1, random_index: 1, read_ahead: 1,
            real_ip_header: 1, recursive_error_pages: 1, request_pool_size: 1,
            reset_timedout_connection: 1, resolver: 1, resolver_timeout: 1,
            'return': 1, rewrite: 1, rewrite_log: 1, root: 1, satisfy: 1,
            satisfy_any: 1, send_lowat: 1, send_timeout: 1, sendfile: 1,
            sendfile_max_chunk: 1, server: 1, server: 1, server_name: 1,
            server_name_in_redirect: 1, server_names_hash_bucket_size: 1,
            server_names_hash_max_size: 1, server_tokens: 1, 'set': 1,
            set_real_ip_from: 1, source_charset: 1, source_charset: 1, ssi: 1,
            ssi_ignore_recycled_buffers: 1, ssi_min_file_chunk: 1,
            ssi_silent_errors: 1, ssi_types: 1, ssi_value_length: 1, ssl: 1,
            ssl_certificate: 1, ssl_certificate_key: 1, ssl_ciphers: 1,
            ssl_client_certificate: 1, ssl_crl: 1, ssl_dhparam: 1,
            ssl_prefer_server_ciphers: 1, ssl_protocols: 1, ssl_session_cache: 1,
            ssl_session_timeout: 1, ssl_verify_client: 1, ssl_verify_depth: 1,
            sub_filter: 1, sub_filter_once: 1, sub_filter_types: 1, tcp_nodelay: 1,
            tcp_nopush: 1, timer_resolution: 1, try_files: 1, types: 1,
            types_hash_bucket_size: 1, types_hash_max_size: 1,
            underscores_in_headers: 1, uninitialized_variable_warn: 1, upstream: 1,
            use: 1, user: 1, userid: 1, userid: 1, userid_domain: 1,
            userid_domain: 1, userid_expires: 1, userid_expires: 1, userid_mark: 1,
            userid_name: 1, userid_name: 1, userid_p3p: 1, userid_p3p: 1,
            userid_path: 1, userid_path: 1, userid_service: 1, userid_service: 1,
            valid_referers: 1, variables_hash_bucket_size: 1,
            variables_hash_max_size: 1, worker_connections: 1,
            worker_cpu_affinity: 1, worker_priority: 1, worker_processes: 1,
            worker_rlimit_core: 1, worker_rlimit_nofile: 1,
            worker_rlimit_sigpending: 1, working_directory: 1, xml_entities: 1,
            xslt_stylesheet: 1, xslt_types: 1
          },
          relevance: 0,
          contains: [
            hljs.HASH_COMMENT_MODE,
            {
              begin: '\\s', end: '[;{]', returnBegin: true, returnEnd: true,
              lexems: '[a-z/]+',
              keywords: {
                'built_in': {
                  'on': 1, 'off': 1, 'yes': 1, 'no': 1, 'true': 1, 'false': 1,
                  'none': 1, 'blocked': 1, 'debug': 1, 'info': 1, 'notice': 1,
                  'warn': 1, 'error': 1, 'crit': 1, 'select': 1, 'permanent': 1,
                  'redirect': 1, 'kqueue': 1, 'rtsig': 1, 'epoll': 1, 'poll': 1,
                  '/dev/poll': 1
                }
              },
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
}();
