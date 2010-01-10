/*
Language: nginx
Author: Peter Leonov <gojpeg@yandex.ru>
*/

hljs.LANGUAGES.nginx = {
  defaultMode: {
    lexems: [hljs.UNDERSCORE_IDENT_RE],
    contains: ['comment', 'string', 'regexp', 'number', 'variable', 'built_in', 'http'],
    keywords: {access_log: 1, add_after_body: 1, add_before_body: 1, add_header: 1, addition_types: 1, aio: 1, alias: 1, allow: 1, ancient_browser: 1, ancient_browser_value: 1, auth_basic: 1, auth_basic_user_file: 1, autoindex: 1, autoindex_exact_size: 1, autoindex_localtime: 1, 'break': 1, charset: 1, charset_map: 1, charset_types: 1, client_body_buffer_size: 1, client_body_in_file_only: 1, client_body_in_single_buffer: 1, client_body_temp_path: 1, client_body_timeout: 1, client_header_buffer_size: 1, client_header_timeout: 1, client_max_body_size: 1, create_full_put_path: 1, crit: 1, daemon: 1, dav_access: 1, dav_methods: 1, debug: 1, default_type: 1, deny: 1, directio: 1, directio_alignment: 1, empty_gif: 1, env: 1, error: 1, error_page: 1, expires: 1, fastcgi_buffer_size: 1, fastcgi_buffers: 1, fastcgi_cache: 1, fastcgi_cache_key: 1, fastcgi_cache_min_uses: 1, fastcgi_cache_path: 1, fastcgi_cache_valid: 1, fastcgi_connect_timeout: 1, fastcgi_hide_header: 1, fastcgi_ignore_client_abort: 1, fastcgi_ignore_headers: 1, fastcgi_index: 1, fastcgi_intercept_errors: 1, fastcgi_next_upstream: 1, fastcgi_param: 1, fastcgi_pass: 1, fastcgi_pass_header: 1, fastcgi_read_timeout: 1, fastcgi_redirect_errors: 1, fastcgi_send_timeout: 1, fastcgi_split_path_info: 1, fastcgi_store: 1, fastcgi_store_access: 1, fastcgi_temp_path: 1, flv: 1, geo: 1, geoip_city: 1, geoip_country: 1, gzip: 1, gzip_buffers: 1, gzip_comp_level: 1, gzip_disable: 1, gzip_http_version: 1, gzip_min_length: 1, gzip_proxied: 1, gzip_static: 1, gzip_types: 1, gzip_vary: 1, 'if': 1, if_modified_since: 1, image_filter: 1, image_filter_buffer: 1, image_filter_jpeg_quality: 1, image_filter_transparency: 1, include: 1, index: 1, info: 1, internal: 1, ip_hash: 1, keepalive_requests: 1, keepalive_timeout: 1, large_client_header_buffers: 1, limit_conn: 1, limit_conn_log_level: 1, limit_except: 1, limit_rate: 1, limit_rate_after: 1, limit_req: 1, limit_req_log_level: 1, limit_req_zone: 1, limit_zone: 1, listen: 1, location: 1, log_format: 1, log_not_found: 1, log_subrequest: 1, map: 1, map_hash_bucket_size: 1, map_hash_max_size: 1, master_process: 1, memcached_buffer_size: 1, memcached_connect_timeout: 1, memcached_next_upstream: 1, memcached_pass: 1, memcached_read_timeout: 1, memcached_send_timeout: 1, merge_slashes: 1, min_delete_depth: 1, modern_browser: 1, modern_browser_value: 1, msie_padding: 1, msie_refresh: 1, notice: 1, open_file_cache: 1, open_file_cache_errors: 1, open_file_cache_min_uses: 1, open_file_cache_valid: 1, open_log_file_cache: 1, optimize_server_names: 1, override_charset: 1, perl: 1, perl_modules: 1, perl_require: 1, perl_set: 1, pid: 1, port_in_redirect: 1, proxy_buffer_size: 1, proxy_buffering: 1, proxy_buffers: 1, proxy_cache: 1, proxy_cache_key: 1, proxy_cache_min_uses: 1, proxy_cache_path: 1, proxy_cache_use_stale: 1, proxy_cache_valid: 1, proxy_connect_timeout: 1, proxy_hide_header: 1, proxy_ignore_client_abort: 1, proxy_ignore_headers: 1, proxy_intercept_errors: 1, proxy_next_upstream: 1, proxy_pass: 1, proxy_pass_header: 1, proxy_read_timeout: 1, proxy_redirect: 1, proxy_redirect_errors: 1, proxy_send_timeout: 1, proxy_set_header: 1, proxy_ssl_session_reuse: 1, proxy_store: 1, proxy_store_access: 1, proxy_temp_path: 1, random_index: 1, read_ahead: 1, real_ip_header: 1, recursive_error_pages: 1, reset_timedout_connection: 1, resolver: 1, resolver_timeout: 1, 'return': 1, rewrite: 1, root: 1, satisfy: 1, satisfy_any: 1, secure_link_secret: 1, send_timeout: 1, sendfile: 1, server: 1, server: 1, server_name: 1, server_name_in_redirect: 1, server_names_hash_bucket_size: 1, server_names_hash_max_size: 1, server_tokens: 1, set: 1, set_real_ip_from: 1, source_charset: 1, ssl: 1, ssl_certificate: 1, ssl_certificate_key: 1, ssl_ciphers: 1, ssl_client_certificate: 1, ssl_crl: 1, ssl_dhparam: 1, ssl_engine: 1, ssl_prefer_server_ciphers: 1, ssl_protocols: 1, ssl_session_cache: 1, ssl_session_timeout: 1, ssl_verify_client: 1, ssl_verify_depth: 1, sub_filter: 1, sub_filter_once: 1, sub_filter_types: 1, tcp_nodelay: 1, tcp_nopush: 1, timer_resolution: 1, try_files: 1, types: 1, underscores_in_headers: 1, uninitialized_variable_warn: 1, upstream: 1, user: 1, userid: 1, userid_domain: 1, userid_expires: 1, userid_name: 1, userid_p3p: 1, userid_path: 1, userid_service: 1, valid_referers: 1, warn: 1, worker_priority: 1, worker_processes: 1, worker_rlimit_core: 1, worker_rlimit_nofile: 1, working_directory: 1, xml_entities: 1, xslt_stylesheet: 1, xslt_types: 1, server: 1, location: 1, http: 1, proxy_send_lowat: 1, proxy_busy_buffers_size: 1, proxy_temp_file_write_size: 1, output_buffers: 1, postpone_output: 1, send_lowat: 1, lingering_time: 1, lingering_timeout: 1, error_log: 1, events: 1, connections: 1, use: 1}
  },
  modes: [
    hljs.HASH_COMMENT_MODE,
    {
        className: 'location',
        begin: '\\blocation\\b', end: '$|{'
    },
    // variables (like in perl)
    {
        className: 'variable',
        begin: '\\$\\d', end: '^'
    },
    // ${...} is not yet implemented
    // {
    //     className: 'variable',
    //     begin: '\\${', end: '}'
    // },
    {
        className: 'variable',
        begin: '[\\$\\@][_a-zA-Z][_a-zA-Z0-9]*', end: '^'
    },
    {
      className: 'built_in',
      begin: '\\b(on|off|yes|no|none|true|false|debug|info|notice|warn|error|crit|kqueue|rtsig|epoll|select|poll|permanent|redirect)\\b', end: '^',
    },
    {
      className: 'number',
      begin: '\\b\\d+[kKmMgGdshdwy]*\\b', end: '^',
      relevance: 0
    },
    {
      className: 'http',
      begin: 'http[s]?://', end: '[;\\s]', noMarkup: true,
      relevance: 0
    },
    {
        className: 'string',
        begin: '"', end: '"',
        contains: ['escape', 'variable'],
        relevance: 0
    },
    {
        className: 'string',
        begin: "'", end: "'",
        contains: ['escape', 'variable'],
        relevance: 0
    },
    {
        className: 'string',
        begin: "\\s/", end: "\\s|;",
        contains: ['escape', 'variable']
    },
    {
        className: 'regexp',
        begin: "\\s\\^", end: "\\s|{|;",
        contains: ['escape', 'variable']
    },
    {
        className: 'regexp',
        begin: "~\\*?\\s+", end: "\\s|{|;",
        contains: ['escape', 'variable']
    },
    {
        className: 'regexp',
        begin: "\\*(\\.[a-z\\-]+)+", end: "^",
        contains: ['escape', 'variable']
    },
    {
        className: 'regexp',
        begin: "([a-z\\-]+\\.)+\\*", end: "^",
        contains: ['escape', 'variable']
    },
    hljs.BACKSLASH_ESCAPE
  ]
};
