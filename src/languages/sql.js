/*
 Language: SQL
 Contributors: Nikolay Lisienko <info@neor.ru>, Heiko August <post@auge8472.de>, Travis Odom <travis.a.odom@gmail.com>, Vadimtro <vadimtro@yahoo.com>
 Category: common
 */

function(hljs) {
  var COMMENT_MODE = hljs.COMMENT('--', '$');
  return {
    case_insensitive: true,
    illegal: /[<>]/,
    contains: [
      {
        className: 'operator',
        beginKeywords:
          'begin end start commit rollback savepoint lock alter create drop rename call ' +
          'delete do handler insert load replace select truncate update set show pragma grant ' +
          'merge describe use explain help declare prepare execute deallocate savepoint release ' +
          'unlock purge reset change stop analyze cache flush optimize repair kill ' +
          'install uninstall checksum restore check backup revoke',
        end: /;/, endsWithParent: true,
        keywords: {
          keyword:
            'abort abs absolute acc acce accep accept access accessed accessible account acos action activate add ' +
            'adddate addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia ' +
            'alias all allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype ' +
            'apply archival archive archived archivelog are as asc ascii asin assembly assertion associate ' +
            'asynchronous at atan atan2 atn2 attr attri attrib attribu attribut attribute attributes audit ' +
            'authenticated authentication authid authorization authors auto autoallocate autodblink autoextend ' +
            'automatic availability avg backup badfile basicfile become before begin beginning benchmark between ' +
            'bfile bfile_base big bigfile bin binary_double binary_float binding binlog bit_and bit_count bit_length ' +
            'bit_or bit_xor bitmap blob_base block blocksize body both bound breadth buffer_cache buffer_pool build ' +
            'bulk by byte byteordermark bytes c cache caching call calling cancel canonical capacity cascade ' +
            'cascaded case cast catalog category ceil ceiling chain change changed char_base char_cs char_length ' +
            'character_length characters characterset charindex charset charsetform charsetid check checkpoint ' +
            'checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close ' +
            'cluster cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate ' +
            'collation collationproperty collect colu colum column column_value columns columns_updated comment ' +
            'commit compact compatibility compile compiled complete composite_limit compound compress compute ' +
            'concat concat_ws concurrent confirm conn conne connec connect connect_by_iscycle connect_by_isleaf ' +
            'connect_by_root connect_time connection connection_id consider consistent constant constraint ' +
            'constraints constructor container content contents context continue contributors controlfile conv ' +
            'convert convert_tz corr corr_k corr_s corresponding corruption cos cost cot count count_big counted ' +
            'covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation credential critical cross cube ' +
            'cume_dist curdate current current_date current_time current_timestamp current_user currval cursor ' +
            'curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_base ' +
            'date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts ' +
            'datetimeoffsetfromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change ' +
            'dbtimezone ddl deallocate debug declare decode decompose decrement decrypt deduplicate def defa defau ' +
            'defaul default defaults deferrable deferred defi defin define degrees delayed delegate delete ' +
            'delete_all delimited demand dense_rank dependent depth dequeue des_decrypt des_encrypt des_key_file ' +
            'desc descr descri describ describe descriptor determines deterministic diagnostics difference dimension ' +
            'direct_load directory disable disable_all disable_directory_link_check disallow disassociate ' +
            'discardfile disconnect diskgroup distinct distinctrow distribute distributed div dml do document ' +
            'domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editioning ' +
            'editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt ' +
            'encryption end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error ' +
            'errors escape escaped evalname evaluate event eventdata events except exception exceptions exchange ' +
            'exclude excluding exec execu execut execute exempt exists exit exp expire explain export export_set ' +
            'extended extent external external_0 external_1 external_2 externally extract f failed ' +
            'failed_login_attempts failover failure far fast feature_id feature_set feature_value fetch field fields ' +
            'file file_name_convert filesystem_like_logging final find_in_set finish first first_value fixed ' +
            'flash_cache flashback floor flush following follows for forall force foreign form forma format found ' +
            'found_rows freelist freelists freepools fresh from from_base64 from_days from_unixtime ftp full ' +
            'function g general generated get get_format get_lock getdate getutcdate global global_name ' +
            'global_topic_enabled globally go goto grant grants greatest group group_concat group_id grouping ' +
            'grouping_id groups gtid_subset gtid_subtract guarantee guard handler hash hashkeys having hea head ' +
            'headi headin heading heap help hex hide hierarchy high high_priority hosts hour http i id ' +
            'ident_current ident_incr ident_seed identified identifier identity idle_time if ifnull ignore iif ' +
            'ilike ilm immediate import in include including increment indent index indexes indexing indextype ' +
            'indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile infinite initial initialized ' +
            'initially initrans inmemory inner innodb input insert install instance instantiable instead instr ' +
            'interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat ' +
            'is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation iterate java join json ' +
            'json_exists json_textcontains k keep keep_duplicates key keys kill l language large last last_day ' +
            'last_insert_id last_value lax lcase ldrtrim lead leading least leaves left len lenght length less ' +
            'level levels library like like2 like4 likec limit linear lines link list listagg little ln load ' +
            'load_file lob lobs local localtime localtimestamp locate location locator lock locked log log10 log2 ' +
            'logfile logfiles logging logical logical_reads_per_call logical_reads_per_session logoff logon logs ' +
            'long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime manage managed ' +
            'management manual map mapping mask master master_pos_wait match matched materialized max maxdatafiles ' +
            'maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans ' +
            'maxvalue md5 measures median medium member memcompress memory merge microsecond mid migration min ' +
            'minextents minimize minimum mining minus minute minvalue missing mod mode model modification modify ' +
            'module monitoring month monthname months mount move movement multiset mutex n name name_const names nan ' +
            'national native natural nav nchar nchar_cs nclob nested never new newline next nextval no ' +
            'no_write_to_binlog noarchivelog noaudit nobadfile nocache nocheck nocompress nocopy nocycle nodelay ' +
            'nodiscardfile noentityescaping noguarantee nokeep nologfile nologging nomapping nomaxvalue nominimize ' +
            'nominvalue nomonitoring none noneditionable nonschema noorder noparallel nopr nopro noprom nopromp ' +
            'noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck nosort noswitch not ' +
            'nothing notrim novalidate now nowait nth_value nullif nulls num numb numbe number_base nvarchar ' +
            'nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociraw ' +
            'ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old ' +
            'old_password on online only opaque open operations operator optimal optimize option optionally or ' +
            'oracle oracle_date oracle_number oradata ord ordaudio orddicom orddoc order ordimage ordinality ' +
            'ordvideo organization orlany orlvary others out outer outfile outline output over overflow overriding p ' +
            'package pad parallel parallel_enable parameter parameters parent parse partial partition partitions ' +
            'pascal passing password password_grace_time password_life_time password_lock_time password_reuse_max ' +
            'password_reuse_time password_verify_function patch path patindex pctfree pctincrease pctthreshold ' +
            'pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add ' +
            'period_diff permanent physical pi pipe pipelined pivot pluggable plugin point policy position ' +
            'post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_bounds ' +
            'prediction_cost prediction_details prediction_probability prediction_set prepare present preserve ' +
            'primary prior priority private private_sga privileges procedural procedure procedure_analyze ' +
            'processlist profile profiles project prompt protection public publishingservername purge quarter query ' +
            'quick quiesce quota quote quotename radians raise rand range rank raw read reads readsize rebuild ' +
            'record records records_per_block recover recovery recycle redo reduced ref reference referenced ' +
            'references referencing refresh regexp regexp_like register regr_avgx regr_avgy regr_count ' +
            'regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reject rekey relational relative relaylog ' +
            'release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate ' +
            'replication required reset resetlogs resize resource respect restore restrict restricted result ' +
            'result_cache resumable resume retention return returning returns reuse reverse revoke rewrite right ' +
            'rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rpad ' +
            'rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll ' +
            'sdo_geometry sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security ' +
            'seed segment select self sequence sequential serializable server servererror session session_user ' +
            'sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink ' +
            'shutdown si_averagecolor si_color si_colorhistogram si_featurelist si_positionalcolor si_stillimage ' +
            'si_texture siblings sid sign sin single size size_t sizes skip slave sleep smalldatetimefromparts ' +
            'smallfile snapshot some soname sort soundex sounds_like source space sparse spfile split sql ' +
            'sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result ' +
            'sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standard standby' +
            ' start starting startup statement static statistics stats_binomial_test stats_crosstab stats_f_test ' +
            'stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep ' +
            'stats_t_test_indepu stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop ' +
            'stddev_samp stdev stdevp stop storage store stored str str_to_date straight_join strcmp strict string ' +
            'struct stuff style subdate submultiset subpartition subpartitions substitutable substr substring ' +
            'subtime subtring_index subtype success sum supplemental suspend switch switchoffset switchover sync ' +
            'synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetime sysdatetimeoffset sysdba sysoper ' +
            'system system_user sysutcdatetime t table tables tablespace tan tdo tempfile template temporary ' +
            'terminated tertiary_weights test than then thread through tier ties time time_format time_to_sec ' +
            'time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr ' +
            'timezone_hour timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset ' +
            'trace tracking trailing transaction transactional translate translation treat trigger ' +
            'trigger_nestlevel triggers trim truncate trusted try_cast try_convert try_parse type ub1 ub2 ub4 ucase ' +
            'unarchived unbounded uncompress uncompressed_length under undo unhex unicode uniform uninstall union ' +
            'unique unix_timestamp unknown unlimited unlock unpivot unquiesce unrecoverable unsafe unsigned until ' +
            'untrusted unusable unused update updated upgrade upped upper upsert uritype url urowid usable usage ' +
            'use use_stored_outlines user user_data user_resources users using utc_date utc_time utc_timestamp uuid ' +
            'uuid_short validate validate_password_strength validation valist value values var var_pop var_samp ' +
            'varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray varrays ' +
            'verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear ' +
            'weight_string wellformed when whene whenev wheneve whenever where while whitespace with within without ' +
            'work wrapped write xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest ' +
            'xmlindex xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor ' +
            'year year_to_month years yearweek yes zon zone zoned zonemap',
          literal:
            'true false null',
          built_in:
            'array bigint binary bit blob boolean char character date dec decimal float int integer interval number ' +
            'numeric real serial smallint varchar varying int8 serial8 text'
        },
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
          hljs.C_NUMBER_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          COMMENT_MODE
        ]
      },
      hljs.C_BLOCK_COMMENT_MODE,
      COMMENT_MODE
    ]
  };
}
