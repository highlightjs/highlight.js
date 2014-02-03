/*
Language: SQL
Contributors: neor-ru <info@neor.ru>, Heiko August <post@auge8472.de>
 */

function(hljs) {
  return {
    case_insensitive: true,
    illegal: /[<>]/,
    contains: [
      {
        className: 'operator',
        beginKeywords: 'begin end start commit rollback savepoint lock alter create drop rename call '+
          'delete do handler insert load replace select truncate update set show pragma grant '+
          'merge describe use explain help declare prepare execute deallocate savepoint release '+
          'unlock purge reset change stop analyze cache flush optimize repair kill '+
          'install uninstall checksum restore check backup',
        end: /;/, endsWithParent: true,
        keywords: 'all partial global month current_timestamp using go revoke smallint ' +
          'indicator end-exec disconnect zone with character assertion to add current_user ' +
          'usage input local alter match collate real then rollback get read timestamp ' +
          'session_user not integer bit unique day minute desc insert execute like ilike ' +
          'level decimal drop continue isolation found where constraints domain right ' +
          'national some module transaction relative second connect escape close system_user ' +
          'for deferred section cast current sqlstate allocate intersect deallocate numeric ' +
          'public preserve full goto initially asc no key output collation group by union ' +
          'session both last language constraint column of space foreign deferrable prior ' +
          'connection unknown action commit view or first into float year primary cascaded ' +
          'except restrict set references names table outer open select size are rows from ' +
          'prepare distinct leading create only next inner authorization schema ' +
          'corresponding option declare precision immediate else timezone_minute external ' +
          'varying translation true case exception join hour default double scroll value ' +
          'cursor descriptor values dec fetch procedure delete and false int is describe ' +
          'char as at in varchar null trailing any absolute current_time end grant ' +
          'privileges when cross check write current_date pad begin temporary exec time ' +
          'update catalog user sql date on identity timezone_hour natural whenever interval ' +
          'work order cascade diagnostics nchar having left call do handler load replace ' +
          'truncate start lock show pragma exists number trigger if before after each row ' +
          'merge matched database limit nvarchar use explain help processlist function return returns ' +
          'concat status declare rename event index logfile server tablespace xml infile lines ' +
          'fields columns tables table ignore partition terminated enclosed escaped identified ' +
          'data concurrent low_priority high_priority starting delayed distinctrow rollup ' +
          'dumpfile share mode straight_join sql_small_result sql_big_result sql_buffer_result ' +
          'sql_cache sql_no_cache sql_calc_found_rows outfile optionally force repeat ' +
          'consistent snapshot chain release savepoint unlock serializable binary purge reset ' +
          'change stop binary logs master slave relaylog binlog events hosts password old_password ' +
          'analyze cache flush optimize repair kill install uninstall plugin query ' +
          'errors warnings checksum authors contributors des_key_file user_resources leaves ' +
          'restore check backup no_write_to_binlog upgrade quick fast medium extended changed ' +
          'databases engine engines grants innodb mutex profile profiles triggers variables ' +
          'string aggregate soname between regexp ' +
          'abs acos adddate addtime aes_decrypt aes_encrypt ascii asin atan atan2 atn2 ' +
          'avg benchmark bin binary bit_and bit_count bit_length bit_or bit_xor case ceil ceiling ' +
          'char char_length character_length charindex charset checksum_agg choose coalesce coercibility ' +
          'collation collationproperty columns_updated compress concat concat_ws connection_id conv convert convert_tz ' +
          'cos cot count count_big crc32 cume_dist curdate current_date current_time current_timestamp current_user ' +
          'curtime database datalength date date_add date_format date_sub dateadd datediff datefromparts datename ' +
          'datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear ' +
          'decode default degrees des_decrypt des_encrypt difference div elt encode encrypt eomonth eventdata ' +
          'exp export_set extract field find_in_set first_value floor format format found_rows from_base64 from_days ' +
          'from_unixtime get_format get_lock getdate getutcdate greatest group_concat grouping grouping_id gtid_subset ' +
          'gtid_subtract hex hour ident_current ident_incr ident_seed if ifnull iif in inet6_aton inet6_ntoa inet_aton ' +
          'inet_ntoa insert instr interval is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not ' +
          'is_not_null is_used_lock isdate isnull last_day last_insert_id last_value lcase lead least left len lenght ' +
          'like ln load_file localtime localtimestamp locate log log10 log2 lower lpad ltrim ' +
          'make_set makedate maketime master_pos_wait match max md5 microsecond mid min minute mod month monthname ' +
          'name_const now nullif oct octet_length old_password ord parse password patindex percent_rank percentile_cont ' +
          'percentile_disc period_add period_diff pi position pow power procedure_analyze publishingservername ' +
          'quarter quote quotename radians radians rand release_lock repeat replace replicate reverse right ' +
          'rlike round row_count rpad rtrim schema sec_to_time second session_user sha sha1 sha2 sign ' +
          'sin sleep smalldatetimefromparts soundex sounds_like space sql_variant_property sqrt ' +
          'square std stddev stddev_pop stddev_samp stdev stdevp str str_to_date strcmp stuff subdate substr ' +
          'substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset ' +
          'system_user sysutcdatetime tan tan tertiary_weights time time_format time_to_sec timediff ' +
          'timefromparts timestamp timestampadd timestampdiff to_base64 to_days to_seconds todatetimeoffset ' +
          'trigger_nestlevel trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length ' +
          'unhex unicode unix_timestamp upped upper user utc_date utc_time utc_timestamp uuid uuid_short ' +
          'validate_password_strength values var var_pop var_samp variance varp version week weekday ' +
          'weekofyear weight_string xor year yearweek',
        contains: [
          {
            className: 'string',
            begin: '\'', end: '\'',
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
          },
          {
            className: 'string',
            begin: '"', end: '"',
            contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}]
          },
          {
            className: 'string',
            begin: '`', end: '`',
            contains: [hljs.BACKSLASH_ESCAPE]
          },
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.C_NUMBER_MODE
        ]
      },
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'comment',
        begin: '--', end: '$'
      }
    ]
  };
}
