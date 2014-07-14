/*
 Language: Oracle SQL & PL/SQL & SQL*Plus
 */

function(hljs) {
  var COMMENT_MODE = {
    className: 'comment',
    begin: '--', end: '$'
    begin: '/*', end: '*/'
  };
  return {
    case_insensitive: true,
    illegal: /[<>]/,
    contains: [
      {
        className: 'operator',
        beginKeywords:
          'begin end start commit rollback savepoint lock alter create drop rename call '+
          'delete do handler insert load replace select truncate update set show pragma grant '+
          'merge describe use explain help declare prepare execute deallocate savepoint release '+
          'unlock purge reset change stop analyze cache flush optimize repair kill '+
          'install uninstall checksum restore check backup',
        end: /;/, endsWithParent: true,
        keywords: {
          keyword:
            'abort abs acc acce accep accept '+
    'access accessed accessible account activate add admin administer advanced advise after agent '+
    'aggregate ali alia alias all allocate allow always ancillary and any anydata anydataset anyschema '+
    'anytype apply archival archive archived archivelog are as asc assembly associate asynchronous at '+
    'attr attri attrib attribu attribut attribute attributes audit authenticated authentication '+
    'authid authorization auto autoallocate autodblink autoextend automatic availability avg badfile '+
    'basicfile become before beginning between bfile bfile_base big bigfile binary_double binary_float '+
    'binding bitmap blob_base block blocksize body both bound breadth buffer_cache buffer_pool build '+
    'bulk by byte byteordermark bytes c caching calling cancel canonical capacity cascade case cast '+
    'category char_base char_cs characters characterset charset charsetform charsetid checkpoint child '+
    'chr chunk class cleanup clear client clob clob_base clone close cluster cluster_id '+
    'cluster_probability cluster_set clustering coalesce col collect colu colum column column_value columns comment '+
    'compact compatibility compile compiled complete composite_limit compound compress compute '+
    'confirm conn conne connec connect connect_by_iscycle connect_by_isleaf connect_by_root '+
    'connect_time consider consistent constant constraint constraints constructor container content '+
    'contents context continue controlfile convert corr corr_k corr_s corruption cost count counted '+
    'covar_pop covar_samp cpu_per_call cpu_per_session creation credential critical cross cube '+
    'cume_dist current current_user currval cursor customdatum cycle d data database datafile datafiles '+
    'date_base date_cache date_format day day_to_second days db_role_change dbtimezone ddl debug '+
    'decompose decrement decrypt deduplicate def defa defau defaul default defaults deferrable deferred '+
    'defi defin define delegate delete_all delimited demand dense_rank dependent depth dequeue desc '+
    'descr descri describ determines deterministic dimension direct_load directory disable '+
    'disable_all disable_directory_link_check disallow disassociate discardfile disconnect diskgroup '+
    'distinct distribute distributed dml document dotnet double downgrade duplicate duration e each '+
    'edition editionable editioning editions element ellipsis else elsif empty enable enable_all '+
    'enclosed encoding encrypt encryption endian enforced enqueue enterprise entityescaping error '+
    'errors escape evalname evaluate except exception exceptions exchange exclude excluding exec execu '+
    'execut exempt exists exit expire export extent external external_0 external_1 external_2 '+
    'externally extract f failed failed_login_attempts failover failure far fast feature_id feature_set '+
    'feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first '+
    'first_value fixed flash_cache flashback following follows for forall force foreign form forma format '+
    'freelist freelists freepools fresh from ftp full function g general generated global global_name '+
    'global_topic_enabled globally goto group group_id grouping grouping_id groups guarantee guard hash hashkeys '+
    'having hea head headi headin heading heap hide hierarchy high hour http i id identified identifier '+
    'identity idle_time if ignore ilm immediate import in include including increment indent index indexes '+
    'indexing indextype indices infinite initial initialized initially initrans inmemory inner instance '+
    'instantiable instead interface interleaved intersect into invalidate invisible is iterate java join json '+
    'json_exists json_textcontains k keep keep_duplicates key keys l language large last last_value lax '+
    'ldrtrim leading left length less level levels library like like2 like4 likec limit linear link list '+
    'listagg little lob lobs local location locator locked log logfile logfiles logging logical '+
    'logical_reads_per_call logical_reads_per_session logoff logon long loop low lrtrim ltrim m main manage managed '+
    'management manual map mapping mask master matched materialized max maxdatafiles maxextents maximize '+
    'maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans maxvalue measures median '+
    'medium member memcompress memory migration min minextents minimize minimum mining minus minute '+
    'minvalue missing mod mode model modification modify monitoring month months mount move movement '+
    'multiset n name nan national native natural nav nchar nchar_cs nclob nested never new newline next '+
    'nextval no noarchivelog noaudit nobadfile nocache nocheck nocompress nocopy nocycle nodelay '+
    'nodiscardfile noentityescaping noguarantee nokeep nologfile nologging nomapping nomaxvalue nominimize '+
    'nominvalue nomonitoring none noneditionable nonschema noorder noparallel nopr nopro noprom nopromp '+
    'noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck nosort noswitch not '+
    'nothing notrim novalidate now nowait nth_value nulls num numb numbe number_base nvarchar2 object '+
    'ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociraw ociref '+
    'ocirefcursor ocirowid ocistring ocitype of off offline offset oid oidindex old on online only opaque open '+
    'operations operator optimal option optionally or oracle oracle_date oracle_number oradata ordaudio '+
    'orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary others out outer '+
    'outline over overflow overriding p package parallel parallel_enable parameter parameters parent '+
    'partial partition partitions pascal passing password password_grace_time password_life_time '+
    'password_lock_time password_reuse_max password_reuse_time password_verify_function patch path pctfree '+
    'pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc '+
    'performance period permanent physical pipe pipelined pivot pluggable point policy position '+
    'post_transaction prebuilt precedes preceding precision prediction prediction_bounds prediction_cost '+
    'prediction_details prediction_probability prediction_set present preserve primary prior priority private '+
    'private_sga privileges procedural procedure profile project prompt protection public query quiesce '+
    'quota raise range rank raw read reads readsize rebuild record records records_per_block recover '+
    'recovery recycle redo reduced ref reference referenced references referencing refresh regexp_like '+
    'register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy '+
    'regr_syy reject rekey relational relies_on relocate rely rem remainder repeat replication required '+
    'resetlogs resize resource respect restrict restricted result result_cache resumable resume '+
    'retention return returning reuse reverse revoke rewrite right role roles rolling rollup row '+
    'rowdependencies rowid rownum rows rtrim rules safe salt sample save sb1 sb2 sb4 scan schema schemacheck scn '+
    'scope sdo_geometry sdo_georaster sdo_topo_geometry search second securefile security seed '+
    'segment self sequence sequential serializable servererror session sessions_per_user sets '+
    'settings shared shared_pool short shrink shutdown si_averagecolor si_color si_colorhistogram '+
    'si_featurelist si_positionalcolor si_stillimage si_texture siblings sid single size size_t sizes skip '+
    'smallfile snapshot some sort source space sparse spfile split sql sqlcode sqldata sqlerror sqlname '+
    'sqlstate standalone standard standby startup statement static statistics stats_binomial_test '+
    'stats_crosstab stats_f_test stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ '+
    'stats_t_test_indep stats_t_test_indepu stats_t_test_one stats_t_test_paired stats_wsr_test stddev '+
    'stddev_pop stddev_samp storage store stored strict string struct style submultiset subpartition '+
    'subpartitions substitutable subtype success sum supplemental suspend switch switchover sync synchronous '+
    'synonym sys sys_xmlagg sysasm sysaux sysdba sysoper system t table tables tablespace tdo tempfile '+
    'template temporary terminated test than then thread through tier ties time time_zone timeout '+
    'timestamp timezone_abbr timezone_hour timezone_minute timezone_region to to_date trace tracking '+
    'trailing transaction transactional translate treat trigger triggers trim trusted type ub1 ub2 ub4 '+
    'unarchived unbounded under undo uniform union unique unlimited unpivot unquiesce unrecoverable unsafe '+
    'unsigned until untrusted unusable unused updated upgrade upsert uritype url urowid usable usage '+
    'use_stored_outlines user user_data users using validate validation valist value values var var_pop var_samp '+
    'varcharc vari varia variab variabl variable variance varraw varrawc varray varrays verify version '+
    'versions view virtual visible void wait wallet warning wellformed when whene whenev wheneve whenever '+
    'where while whitespace with within without work wrapped write xdb xml xmlagg xmlattributes xmlcast '+
    'xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlparse xmlpi xmlquery xmlroot '+
    'xmlschema xmlserialize xmltable xmltype year year_to_month years yes zone zoned zonemap',
          literal:
            'true false null',
          built_in:
            'array bigint binary bit blob boolean char character date dec decimal float int integer interval number ' +
            'numeric real serial smallint varchar varchar2 varying int8 serial8 text'
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
