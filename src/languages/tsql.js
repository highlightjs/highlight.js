/*
 Language: Transact-SQL (T-SQL)
 Authors: David Simner <david.simner@red-gate.com>, Grzegorz Smulko <greg.smulko@red-gate.com>
 Category: common
 */

function(hljs) {
  return {
    case_insensitive: true,
    contains: [
    {
      beginKeywords:
            'ABSOLUTE ' +
            'ACTION ' +
            'ACTIVATION ' +
            'ADD ' +
            'ADMIN ' +
            'AES_128 ' +
            'AES_192 ' +
            'AES_256 ' +
            'AFFINITY ' +
            'AFTER ' +
            'AGGREGATE ' +
            'ALGORITHM ' +
            'ALLOW_CONNECTIONS ' +
            'ALLOW_PAGE_LOCKS ' +
            'ALLOW_ROW_LOCKS ' +
            'ALTER ' +
            'ANONYMOUS ' +
            'ANSI_DEFAULTS ' +
            'ANSI_NULL_DFLT_OFF ' +
            'ANSI_NULL_DFLT_ON ' +
            'ANSI_NULLS ' +
            'ANSI_PADDING ' +
            'ANSI_WARNINGS ' +
            'APPLICATION ' +
            'ARITHABORT ' +
            'ARITHIGNORE ' +
            'AS ' +
            'ASC ' +
            'ASSEMBLY ' +
            'ASYMMETRIC ' +
            'ASYNCHRONOUS_COMMIT ' +
            'AUTHORIZATION ' +
            'AUTO ' +
            'AUTOMATED_BACKUP_PREFERENCE ' +
            'AUTOMATIC ' +
            'AVAILABILITY ' +
            'AVAILABILITY_MODE ' +
            'BACKUP ' +
            'BACKUP_PRIORITY ' +
            'BASE64 ' +
            'BEGIN ' +
            'BIGINT ' +
            'BINARY ' +
            'BINDING ' +
            'BIT ' +
            'BREAK ' +
            'BROWSE ' +
            'BULK ' +
            'BY ' +
            'CALL ' +
            'CALLER ' +
            'CASCADE ' +
            'CASE ' +
            'CATALOG ' +
            'CATCH ' +
            'CERTIFICATE ' +
            'CHANGE_TRACKING ' +
            'CHANGE_TRACKING_CONTEXT ' +
            'CHANGES ' +
            'CHAR ' +
            'CHARACTER ' +
            'CHECK ' +
            'CHECKPOINT ' +
            'CLOSE ' +
            'CLUSTERED ' +
            'COLLECTION ' +
            'COLUMN ' +
            'COLUMNSTORE ' +
            'COMMIT ' +
            'COMMITTED ' +
            'COMPUTE ' +
            'CONCAT_NULL_YIELDS_NULL ' +
            'CONNECT ' +
            'CONSTRAINT ' +
            'CONTAINSTABLE ' +
            'CONTINUE ' +
            'CONTRACT ' +
            'CONTROL ' +
            'CONVERSATION ' +
            'COUNTER ' +
            'CREATE ' +
            'CREDENTIAL ' +
            'CUBE ' +
            'CURRENT ' +
            'CURRENT_DATE ' +
            'CURSOR ' +
            'CURSOR_CLOSE_ON_COMMIT ' +
            'DATA_COMPRESSION ' +
            'DATABASE ' +
            'DATE ' +
            'DATEFIRST ' +
            'DATEFORMAT ' +
            'DATETIME ' +
            'DATETIME2 ' +
            'DATETIMEOFFSET ' +
            'DBCC ' +
            'DEADLOCK_PRIORITY ' +
            'DEALLOCATE ' +
            'DEC ' +
            'DECIMAL ' +
            'DECLARE ' +
            'DECRYPTION ' +
            'DEFAULT ' +
            'DEFAULT_SCHEMA ' +
            'DEFINITION ' +
            'DELETE ' +
            'DENY ' +
            'DES ' +
            'DESC ' +
            'DESCRIPTION ' +
            'DISABLE ' +
            'DISABLED ' +
            'DISK ' +
            'DISTINCT ' +
            'DISTRIBUTED ' +
            'DOUBLE ' +
            'DROP ' +
            'DROP_EXISTING ' +
            'DUMP ' +
            'DYNAMIC ' +
            'ELEMENTS ' +
            'ELSE ' +
            'EMPTY ' +
            'ENABLE ' +
            'ENCRYPTION ' +
            'END ' +
            'ENDPOINT ' +
            'ENDPOINT_URL ' +
            'ERRLVL ' +
            'ESCAPE ' +
            'EVENT ' +
            'EXCEPT ' +
            'EXEC ' +
            'EXECUTABLE ' +
            'EXECUTE ' +
            'EXIT ' +
            'EXPAND ' +
            'EXPLICIT ' +
            'EXTERNAL ' +
            'EXTERNAL_ACCESS ' +
            'FAILOVER ' +
            'FAILOVER_MODE ' +
            'FAILURE_CONDITION_LEVEL ' +
            'FAST ' +
            'FAST_FORWARD ' +
            'FASTFIRSTROW ' +
            'FETCH ' +
            'FILE ' +
            'FILEGROUP ' +
            'FILENAME ' +
            'FILESTREAM ' +
            'FILESTREAM_ON ' +
            'FILETABLE ' +
            'FILLFACTOR ' +
            'FIPS_FLAGGER ' +
            'FIRST ' +
            'FLOAT ' +
            'FMTONLY ' +
            'FOLLOWING ' +
            'FOR ' +
            'FORCE ' +
            'FORCED ' +
            'FORCEPLAN ' +
            'FOREIGN ' +
            'FORWARD_ONLY ' +
            'FREETEXT ' +
            'FREETEXTTABLE ' +
            'FROM ' +
            'FULL ' +
            'FULLSCAN ' +
            'FULLTEXT ' +
            'FUNCTION ' +
            'GEOGRAPHY ' +
            'GET ' +
            'GLOBAL ' +
            'GO ' +
            'GOTO ' +
            'GOVERNOR ' +
            'GRANT ' +
            'GROUP ' +
            'HASH ' +
            'HAVING ' +
            'HEALTH_CHECK_TIMEOUT ' +
            'HIERARCHYID ' +
            'HOLDLOCK ' +
            'HTTP ' +
            'IDENTITY ' +
            'IDENTITY_INSERT ' +
            'IDENTITYCOL ' +
            'IF ' +
            'IGNORE_CONSTRAINTS ' +
            'IGNORE_DUP_KEY ' +
            'IGNORE_TRIGGERS ' +
            'IMAGE ' +
            'IMMEDIATE ' +
            'IMPLICIT_TRANSACTIONS ' +
            'INCLUDE ' +
            'INDEX ' +
            'INIT ' +
            'INITIATOR ' +
            'INSENSITIVE ' +
            'INSERT ' +
            'INSTEAD ' +
            'INT ' +
            'INTEGER ' +
            'INTERSECT ' +
            'INTO ' +
            'IO ' +
            'ISOLATION ' +
            'KEEP ' +
            'KEEPDEFAULTS ' +
            'KEEPFIXED ' +
            'KEEPIDENTITY ' +
            'KEY ' +
            'KEYSET ' +
            'KILL ' +
            'LANGUAGE ' +
            'LAST ' +
            'LEVEL ' +
            'LIFETIME ' +
            'LINENO ' +
            'LOAD ' +
            'LOCAL ' +
            'LOCK_TIMEOUT ' +
            'LOGIN ' +
            'LOOP ' +
            'MANUAL ' +
            'MASTER ' +
            'MAX_QUEUE_READERS ' +
            'MAXDOP ' +
            'MAXLENGTH ' +
            'MERGE ' +
            'MESSAGE ' +
            'MINUTES ' +
            'MODIFY ' +
            'MONEY ' +
            'NATIONAL ' +
            'NCHAR ' +
            'NEXT ' +
            'NO ' +
            'NOCHECK ' +
            'NOCOUNT ' +
            'NOEXEC ' +
            'NOEXPAND ' +
            'NOLOCK ' +
            'NONCLUSTERED ' +
            'NONE ' +
            'NORECOMPUTE ' +
            'NOTIFICATION ' +
            'NOWAIT ' +
            'NTEXT ' +
            'NUMERIC ' +
            'NUMERIC_ROUNDABORT ' +
            'NVARCHAR ' +
            'OBJECT ' +
            'OF ' +
            'OFF ' +
            'OFFLINE ' +
            'OFFSETS ' +
            'ON ' +
            'ONLINE ' +
            'OPEN ' +
            'OPENDATASOURCE ' +
            'OPENJSON ' +
            'OPENQUERY ' +
            'OPENROWSET ' +
            'OPENXML ' +
            'OPTIMISTIC ' +
            'OPTION ' +
            'ORDER ' +
            'OUT ' +
            'OUTPUT ' +
            'OVER ' +
            'OWNER ' +
            'OWNERSHIP ' +
            'PAD_INDEX ' +
            'PAGE ' +
            'PAGLOCK ' +
            'PARSEONLY ' +
            'PARTIAL ' +
            'PARTITION ' +
            'PASSWORD ' +
            'PATH ' +
            'PAUSE ' +
            'PERCENT ' +
            'PERIOD ' +
            'PERSISTED ' +
            'PLAN ' +
            'POLICY ' +
            'POOL ' +
            'POPULATION ' +
            'PRECEDING ' +
            'PRECISION ' +
            'PREDICATE ' +
            'PRIMARY ' +
            'PRIMARY_ROLE ' +
            'PRINT ' +
            'PRIOR ' +
            'PRIVATE ' +
            'PROC ' +
            'PROCEDURE ' +
            'PROCEDURE_NAME ' +
            'PROFILE ' +
            'PROVIDER ' +
            'PUBLIC ' +
            'QUERY_GOVERNOR_COST_LIMIT ' +
            'QUEUE ' +
            'QUOTED_IDENTIFIER ' +
            'RAISERROR ' +
            'RANGE ' +
            'RAW ' +
            'READ ' +
            'READ_ONLY ' +
            'READ_WRITE ' +
            'READCOMMITTED ' +
            'READCOMMITTEDLOCK ' +
            'READONLY ' +
            'READPAST ' +
            'READTEXT ' +
            'READUNCOMMITTED ' +
            'REAL ' +
            'REBUILD ' +
            'RECEIVE ' +
            'RECOMPILE ' +
            'RECONFIGURE ' +
            'RECURSIVE ' +
            'REFERENCES ' +
            'RELATIVE ' +
            'REMOTE ' +
            'REMOTE_DATA_ARCHIVE ' +
            'REMOTE_PROC_TRANSACTIONS ' +
            'REMOVE ' +
            'REORGANIZE ' +
            'REPEATABLE ' +
            'REPEATABLEREAD ' +
            'REPLICA ' +
            'REPLICATION ' +
            'RESAMPLE ' +
            'RESOURCE ' +
            'RESTART ' +
            'RESTORE ' +
            'RESTRICT ' +
            'RESUME ' +
            'RETENTION ' +
            'RETURN ' +
            'RETURNS ' +
            'REVERT ' +
            'REVOKE ' +
            'ROBUST ' +
            'ROLE ' +
            'ROLLBACK ' +
            'ROLLUP ' +
            'ROUTE ' +
            'ROW ' +
            'ROWCOUNT ' +
            'ROWGUIDCOL ' +
            'ROWLOCK ' +
            'ROWS ' +
            'RSA_1024 ' +
            'RSA_512 ' +
            'RULE ' +
            'SAFE ' +
            'SAMPLE ' +
            'SAVE ' +
            'SCHEMA ' +
            'SCHEMABINDING ' +
            'SCOPED ' +
            'SCROLL ' +
            'SCROLL_LOCKS ' +
            'SECONDARY ' +
            'SECONDARY_ONLY ' +
            'SECONDARY_ROLE ' +
            'SECRET ' +
            'SECURITY ' +
            'SECURITYAUDIT ' +
            'SELECT ' +
            'SELECTIVE ' +
            'SELF ' +
            'SEMANTICKEYPHRASETABLE ' +
            'SEMANTICSIMILARITYDETAILSTABLE ' +
            'SEMANTICSIMILARITYTABLE ' +
            'SEND ' +
            'SENT ' +
            'SEQUENCE ' +
            'SERIALIZABLE ' +
            'SERVER ' +
            'SERVICE ' +
            'SERVICE_BROKER ' +
            'SESSION ' +
            'SESSION_TIMEOUT ' +
            'SET ' +
            'SETS ' +
            'SETUSER ' +
            'SHOWPLAN_ALL ' +
            'SHOWPLAN_TEXT ' +
            'SHOWPLAN_XML ' +
            'SHUTDOWN ' +
            'SIGNATURE ' +
            'SINGLETON ' +
            'SMALLDATETIME ' +
            'SMALLINT ' +
            'SMALLMONEY ' +
            'SNAPSHOT ' +
            'SOAP ' +
            'SORT_IN_TEMPDB ' +
            'SPATIAL ' +
            'SQL ' +
            'SQL_VARIANT ' +
            'START ' +
            'STATE ' +
            'STATEMENT ' +
            'STATIC ' +
            'STATISTICS ' +
            'STATISTICS_NORECOMPUTE ' +
            'STATS_STREAM ' +
            'STATUS ' +
            'STOP ' +
            'STOPLIST ' +
            'SYMMETRIC ' +
            'SYNCHRONOUS_COMMIT ' +
            'SYNONYM ' +
            'SYSTEM ' +
            'SYSTEM_TIME ' +
            'SYSTEM_VERSIONING ' +
            'TABLE ' +
            'TABLESAMPLE ' +
            'TABLOCK ' +
            'TABLOCKX ' +
            'TAKE ' +
            'TARGET ' +
            'TCP ' +
            'TEXT ' +
            'TEXTIMAGE_ON ' +
            'TEXTSIZE ' +
            'THEN ' +
            'THROW ' +
            'TIME ' +
            'TIMEOUT ' +
            'TIMESTAMP ' +
            'TINYINT ' +
            'TO ' +
            'TOP ' +
            'TRAN ' +
            'TRANSACTION ' +
            'TRIGGER ' +
            'TRIPLE_DES_3KEY ' +
            'TRUNCATE ' +
            'TRY ' +
            'TSQL ' +
            'TYPE ' +
            'TYPE_WARNING ' +
            'UNBOUNDED ' +
            'UNCOMMITTED ' +
            'UNION ' +
            'UNIQUE ' +
            'UNIQUEIDENTIFIER ' +
            'UNSAFE ' +
            'UPDATETEXT ' +
            'UPDLOCK ' +
            'USE ' +
            'USEPLAN ' +
            'USER ' +
            'USING ' +
            'VALID_XML ' +
            'VALIDATION ' +
            'VALUE ' +
            'VALUES ' +
            'VARBINARY ' +
            'VARCHAR ' +
            'VARYING ' +
            'VERSION ' +
            'VIEW ' +
            'VIEW_METADATA ' +
            'WAITFOR ' +
            'WEBMETHOD ' +
            'WELL_FORMED_XML ' +
            'WHEN ' +
            'WHERE ' +
            'WHILE ' +
            'WINDOWS ' +
            'WITH ' +
            'WITHIN ' +
            'WITHOUT ' +
            'WORKLOAD ' +
            'WRITETEXT ' +
            'XACT_ABORT ' +
            'XLOCK ' +
            'XML ' +
            'XMLSCHEMA ' +
            'XQUERY',
      relevance: 0
    },
    {
      className: 'built_in',
      begin: '(' +
            '\\$PARTITION|' +
            '@@CONNECTIONS|' +
            '@@CPU_BUSY|' +
            '@@CURSOR_ROWS|' +
            '@@DATEFIRST|' +
            '@@DBTS|' +
            '@@ERROR|' +
            '@@FETCH_STATUS|' +
            '@@IDENTITY|' +
            '@@IDLE|' +
            '@@IO_BUSY|' +
            '@@LANGID|' +
            '@@LANGUAGE|' +
            '@@LOCK_TIMEOUT|' +
            '@@MAX_CONNECTIONS|' +
            '@@MAX_PRECISION|' +
            '@@NESTLEVEL|' +
            '@@OPTIONS|' +
            '@@PACK_RECEIVED|' +
            '@@PACK_SENT|' +
            '@@PACKET_ERRORS|' +
            '@@PROCID|' +
            '@@REMSERVER|' +
            '@@ROWCOUNT|' +
            '@@SERVERNAME|' +
            '@@SERVICENAME|' +
            '@@SPID|' +
            '@@TEXTSIZE|' +
            '@@TIMETICKS|' +
            '@@TOTAL_ERRORS|' +
            '@@TOTAL_READ|' +
            '@@TOTAL_WRITE|' +
            '@@TRANCOUNT|' +
            '@@VERSION|' +
            'ABS|' +
            'ACOS|' +
            'APP_NAME|' +
            'APPLOCK_MODE|' +
            'APPLOCK_TEST|' +
            'ASCII|' +
            'ASIN|' +
            'ASSEMBLYPROPERTY|' +
            'ASYMKEY_ID|' +
            'ASYMKEYPROPERTY|' +
            'ATAN|' +
            'ATN2|' +
            'AVG|' +
            'BINARY_CHECKSUM|' +
            'BIT_LENGTH|' +
            'CAST|' +
            'CEILING|' +
            'CERT_ID|' +
            'CERTENCODED|' +
            'CERTPRIVATEKEY|' +
            'CERTPROPERTY|' +
            'CHANGE_TRACKING_CLEANUP_VERSION|' +
            'CHANGE_TRACKING_CURRENT_VERSION|' +
            'CHANGE_TRACKING_IS_COLUMN_IN_MASK|' +
            'CHANGE_TRACKING_MIN_VALID_VERSION|' +
            'CHANGETABLE|' +
            'CHARINDEX|' +
            'CHECKSUM|' +
            'CHECKSUM_AGG|' +
            'CHOOSE|' +
            'COALESCE|' +
            'COL_LENGTH|' +
            'COL_NAME|' +
            'COLLATE|' +
            'COLLATIONPROPERTY|' +
            'COLUMNPROPERTY|' +
            'COLUMNS_UPDATED|' +
            'CONCAT|' +
            'CONNECTIONPROPERTY|' +
            'CONTAINS|' +
            'CONTEXT_INFO|' +
            'CONVERT|' +
            'COS|' +
            'COT|' +
            'COUNT|' +
            'COUNT_BIG|' +
            'CRYPT_GEN_RANDOM|' +
            'CURRENT_REQUEST_ID|' +
            'CURRENT_TIME|' +
            'CURRENT_TIMESTAMP|' +
            'CURRENT_USER|' +
            'CURSOR_STATUS|' +
            'DATABASE_PRINCIPAL_ID|' +
            'DATABASEPROPERTY|' +
            'DATABASEPROPERTYEX|' +
            'DATALENGTH|' +
            'DATEADD|' +
            'DATEDIFF|' +
            'DATEFROMPARTS|' +
            'DATENAME|' +
            'DATEPART|' +
            'DATETIME2FROMPARTS|' +
            'DATETIMEFROMPARTS|' +
            'DATETIMEOFFSETFROMPARTS|' +
            'DAY|' +
            'DB_ID|' +
            'DB_NAME|' +
            'DECRYPTBYASMKEY|' +
            'DECRYPTBYASYMKEY|' +
            'DECRYPTBYCERT|' +
            'DECRYPTBYKEY|' +
            'DECRYPTBYKEYAUTOASYMKEY|' +
            'DecryptByKeyAutoCert|' +
            'DECRYPTBYPASSPHRASE|' +
            'DEGREES|' +
            'DENSE_RANK|' +
            'DIFFERENCE|' +
            'ENCRYPTBYASMKEY|' +
            'ENCRYPTBYASYMKEY|' +
            'ENCRYPTBYCert|' +
            'ENCRYPTBYKEY|' +
            'ENCRYPTBYPASSPHRASE|' +
            'EOMONTH|' +
            'ERROR_LINE|' +
            'ERROR_MESSAGE|' +
            'ERROR_NUMBER|' +
            'ERROR_PROCEDURE|' +
            'ERROR_SEVERITY|' +
            'ERROR_STATE|' +
            'EVENTDATA|' +
            'EXP|' +
            'EXTRACT|' +
            'FILE_ID|' +
            'FILE_IDEX|' +
            'FILE_NAME|' +
            'FILEGROUP_ID|' +
            'FILEGROUP_NAME|' +
            'FILEGROUPPROPERTY|' +
            'FILEPROPERTY|' +
            'FILETABLEROOTPATH|' +
            'FLOOR|' +
            'FORMAT|' +
            'FORMATMESSAGE|' +
            'FULLTEXTCATALOGPROPERTY|' +
            'FULLTEXTSERVICEPROPERTY|' +
            'GET_FILESTREAM_TRANSACTION_CONTEXT|' +
            'GETANSINULL|' +
            'GETDATE|' +
            'GETFILENAMESPACEPATH|' +
            'GETPATHLOCATOR|' +
            'GETUTCDATE|' +
            'GROUPING|' +
            'GROUPING_ID|' +
            'HAS_DBACCESS|' +
            'HAS_PERMS_BY_NAME|' +
            'HASHBYTES|' +
            'HOST_ID|' +
            'HOST_NAME|' +
            'HOUR|' +
            'IDENT_CURRENT|' +
            'IDENT_INCR|' +
            'IDENT_SEED|' +
            'IIF|' +
            'INDEX_COL|' +
            'INDEXKEY_PROPERTY|' +
            'INDEXPROPERTY|' +
            'IS_MEMBER|' +
            'IS_OBJECTSIGNED|' +
            'IS_ROLEMEMBER|' +
            'IS_SRVROLEMEMBER|' +
            'ISDATE|' +
            'ISNULL|' +
            'ISNUMERIC|' +
            'KEY_GUID|' +
            'KEY_ID|' +
            'KEY_NAME|' +
            'LEN|' +
            'LOG|' +
            'LOG10|' +
            'LOGINPROPERTY|' +
            'LOWER|' +
            'LTRIM|' +
            'MAX|' +
            'MIN|' +
            'MIN_ACTIVE_ROWVERSION|' +
            'MINUTE|' +
            'MOD|' +
            'MONTH|' +
            'NEWID|' +
            'NEWSEQUENTIALID|' +
            'NORMALIZE|' +
            'NTILE|' +
            'NULLIF|' +
            'OBJECT_DEFINITION|' +
            'OBJECT_ID|' +
            'OBJECT_NAME|' +
            'OBJECT_SCHEMA_NAME|' +
            'OBJECTPROPERTY|' +
            'OBJECTPROPERTYEX|' +
            'OCTET_LENGTH|' +
            'ORIGINAL_DB_NAME|' +
            'ORIGINAL_LOGIN|' +
            'PARSE|' +
            'PARSENAME|' +
            'PATHNAME|' +
            'PATINDEX|' +
            'PERMISSIONS|' +
            'PI|' +
            'POWER|' +
            'PUBLISHINGSERVERNAME|' +
            'PWDCOMPARE|' +
            'PWDENCRYPT|' +
            'QUARTER|' +
            'QUOTENAME|' +
            'RADIANS|' +
            'RAND|' +
            'RANK|' +
            'REPLACE|' +
            'REPLICATE|' +
            'REVERSE|' +
            'ROUND|' +
            'ROW_NUMBER|' +
            'ROWCOUNT_BIG|' +
            'RTRIM|' +
            'SCHEMA_ID|' +
            'SCHEMA_NAME|' +
            'SCOPE_IDENTITY|' +
            'SECOND|' +
            'SERVERPROPERTY|' +
            'SESSION_USER|' +
            'SESSIONPROPERTY|' +
            'SIGN|' +
            'SIGNBYASYMKEY|' +
            'SIGNBYCERT|' +
            'SIN|' +
            'SMALLDATETIMEFROMPARTS|' +
            'SOUNDEX|' +
            'SPACE|' +
            'SQL_VARIANT_PROPERTY|' +
            'SQRT|' +
            'SQUARE|' +
            'STATS_DATE|' +
            'STDEV|' +
            'STDEVP|' +
            'STR|' +
            'STUFF|' +
            'SUBSTRING|' +
            'SUM|' +
            'SUSER_ID|' +
            'SUSER_NAME|' +
            'SUSER_SID|' +
            'SUSER_SNAME|' +
            'SWITCHOFFSET|' +
            'SYMKEYPROPERTY|' +
            'SYSDATETIME|' +
            'SYSDATETIMEOFFSET|' +
            'SYSTEM_USER|' +
            'SYSUTCDATETIME|' +
            'TAN|' +
            'TERTIARY_WEIGHTS|' +
            'TEXTPTR|' +
            'TEXTVALID|' +
            'TIMEFROMPARTS|' +
            'TODATETIMEOFFSET|' +
            'TRIGGER_NESTLEVEL|' +
            'TRY_CONVERT|' +
            'TRY_PARSE|' +
            'TSEQUAL|' +
            'TYPE_ID|' +
            'TYPE_NAME|' +
            'TYPEPROPERTY|' +
            'UNICODE|' +
            'UPDATE|' +
            'UPPER|' +
            'USER_ID|' +
            'USER_NAME|' +
            'VAR|' +
            'VARP|' +
            'VERIFYSIGNEDBYASMKEY|' +
            'VERIFYSIGNEDBYCERT|' +
            'XACT_STATE|' +
            'YEAR' +
            ')\\b'
    },
    {
      className: 'type',
      begin: '(' +
            'ALL_COLUMNS|' +
            'ALL_OBJECTS|' +
            'ALL_PARAMETERS|' +
            'ALL_SQL_MODULES|' +
            'ALL_VIEWS|' +
            'ALLOCATION_UNITS|' +
            'ASSEMBLIES|' +
            'ASSEMBLY_FILES|' +
            'ASSEMBLY_MODULES|' +
            'ASSEMBLY_REFERENCES|' +
            'ASSEMBLY_TYPES|' +
            'ASYMMETRIC_KEYS|' +
            'AVAILABILITY_DATABASES_CLUSTER|' +
            'AVAILABILITY_GROUP_LISTENER_IP_ADDRESSES|' +
            'AVAILABILITY_GROUP_LISTENERS|' +
            'AVAILABILITY_GROUPS|' +
            'AVAILABILITY_GROUPS_CLUSTER|' +
            'AVAILABILITY_READ_ONLY_ROUTING_LISTS|' +
            'AVAILABILITY_REPLICAS|' +
            'BACKUP_DEVICES|' +
            'CERTIFICATES|' +
            'CHANGE_TRACKING_DATABASES|' +
            'CHANGE_TRACKING_TABLES|' +
            'CHECK_CONSTRAINTS|' +
            'COLUMN_DOMAIN_USAGE|' +
            'COLUMN_PRIVILEGES|' +
            'COLUMN_STORE_DICTIONARIES|' +
            'COLUMN_STORE_SEGMENTS|' +
            'COLUMN_TYPE_USAGES|' +
            'COLUMN_XML_SCHEMA_COLLECTION_USAGES|' +
            'COLUMNS|' +
            'COMPUTED_COLUMNS|' +
            'CONFIGURATIONS|' +
            'CONSTRAINT_COLUMN_USAGE|' +
            'CONSTRAINT_TABLE_USAGE|' +
            'CONVERSATION_ENDPOINTS|' +
            'CONVERSATION_GROUPS|' +
            'CONVERSATION_PRIORITIES|' +
            'CREDENTIALS|' +
            'CRYPT_PROPERTIES|' +
            'CRYPTOGRAPHIC_PROVIDERS|' +
            'DATA_SPACES|' +
            'DATABASE_AUDIT_SPECIFICATION_DETAILS|' +
            'DATABASE_AUDIT_SPECIFICATIONS|' +
            'DATABASE_FILES|' +
            'DATABASE_FILESTREAM_OPTIONS|' +
            'DATABASE_MIRRORING|' +
            'DATABASE_MIRRORING_ENDPOINTS|' +
            'DATABASE_MIRRORING_WITNESSES|' +
            'DATABASE_PERMISSIONS|' +
            'DATABASE_PRINCIPALS|' +
            'DATABASE_RECOVERY_STATUS|' +
            'DATABASE_ROLE_MEMBERS|' +
            'DATABASES|' +
            'DEFAULT_CONSTRAINTS|' +
            'DESTINATION_DATA_SPACES|' +
            'DM_AUDIT_ACTIONS|' +
            'DM_AUDIT_CLASS_TYPE_MAP|' +
            'DM_BROKER_ACTIVATED_TASKS|' +
            'DM_BROKER_CONNECTIONS|' +
            'DM_BROKER_FORWARDED_MESSAGES|' +
            'DM_BROKER_QUEUE_MONITORS|' +
            'DM_CDC_ERRORS|' +
            'DM_CDC_LOG_SCAN_SESSIONS|' +
            'DM_CLR_APPDOMAINS|' +
            'DM_CLR_LOADED_ASSEMBLIES|' +
            'DM_CLR_PROPERTIES|' +
            'DM_CLR_TASKS|' +
            'DM_CRYPTOGRAPHIC_PROVIDER_PROPERTIES|' +
            'DM_DATABASE_ENCRYPTION_KEYS|' +
            'DM_DB_FILE_SPACE_USAGE|' +
            'DM_DB_FTS_INDEX_PHYSICAL_STATS|' +
            'DM_DB_INDEX_PHYSICAL_STATS|' +
            'DM_DB_INDEX_USAGE_STATS|' +
            'DM_DB_LOG_SPACE_USAGE|' +
            'DM_DB_MIRRORING_AUTO_PAGE_REPAIR|' +
            'DM_DB_MIRRORING_CONNECTIONS|' +
            'DM_DB_MIRRORING_PAST_ACTIONS|' +
            'DM_DB_MISSING_INDEX_DETAILS|' +
            'DM_DB_MISSING_INDEX_GROUP_STATS|' +
            'DM_DB_MISSING_INDEX_GROUPS|' +
            'DM_DB_PARTITION_STATS|' +
            'DM_DB_PERSISTED_SKU_FEATURES|' +
            'DM_DB_SCRIPT_LEVEL|' +
            'DM_DB_SESSION_SPACE_USAGE|' +
            'DM_DB_TASK_SPACE_USAGE|' +
            'DM_DB_UNCONTAINED_ENTITIES|' +
            'DM_EXEC_BACKGROUND_JOB_QUEUE|' +
            'DM_EXEC_BACKGROUND_JOB_QUEUE_STATS|' +
            'DM_EXEC_CACHED_PLANS|' +
            'DM_EXEC_CONNECTIONS|' +
            'DM_EXEC_PROCEDURE_STATS|' +
            'DM_EXEC_QUERY_MEMORY_GRANTS|' +
            'DM_EXEC_QUERY_OPTIMIZER_INFO|' +
            'DM_EXEC_QUERY_RESOURCE_SEMAPHORES|' +
            'DM_EXEC_QUERY_STATS|' +
            'DM_EXEC_QUERY_TRANSFORMATION_STATS|' +
            'DM_EXEC_REQUESTS|' +
            'DM_EXEC_SESSIONS|' +
            'DM_EXEC_TRIGGER_STATS|' +
            'DM_FILESTREAM_FILE_IO_HANDLES|' +
            'DM_FILESTREAM_FILE_IO_REQUESTS|' +
            'DM_FILESTREAM_NON_TRANSACTED_HANDLES|' +
            'DM_FTS_ACTIVE_CATALOGS|' +
            'DM_FTS_FDHOSTS|' +
            'DM_FTS_INDEX_POPULATION|' +
            'DM_FTS_MEMORY_BUFFERS|' +
            'DM_FTS_MEMORY_POOLS|' +
            'DM_FTS_OUTSTANDING_BATCHES|' +
            'DM_FTS_POPULATION_RANGES|' +
            'DM_FTS_SEMANTIC_SIMILARITY_POPULATION|' +
            'DM_HADR_AUTO_PAGE_REPAIR|' +
            'DM_HADR_AVAILABILITY_GROUP_STATES|' +
            'DM_HADR_AVAILABILITY_REPLICA_CLUSTER_NODES|' +
            'DM_HADR_AVAILABILITY_REPLICA_CLUSTER_STATES|' +
            'DM_HADR_AVAILABILITY_REPLICA_STATES|' +
            'DM_HADR_CLUSTER|' +
            'DM_HADR_CLUSTER_MEMBERS|' +
            'DM_HADR_CLUSTER_NETWORKS|' +
            'DM_HADR_DATABASE_REPLICA_CLUSTER_STATES|' +
            'DM_HADR_DATABASE_REPLICA_STATES|' +
            'DM_HADR_INSTANCE_NODE_MAP|' +
            'DM_HADR_NAME_ID_MAP|' +
            'DM_IO_BACKUP_TAPES|' +
            'DM_IO_CLUSTER_SHARED_DRIVES|' +
            'DM_IO_PENDING_IO_REQUESTS|' +
            'DM_LOGPOOL_HASHENTRIES|' +
            'DM_LOGPOOL_STATS|' +
            'DM_OS_BUFFER_DESCRIPTORS|' +
            'DM_OS_CHILD_INSTANCES|' +
            'DM_OS_CLUSTER_NODES|' +
            'DM_OS_CLUSTER_PROPERTIES|' +
            'DM_OS_DISPATCHER_POOLS|' +
            'DM_OS_DISPATCHERS|' +
            'DM_OS_HOSTS|' +
            'DM_OS_LATCH_STATS|' +
            'DM_OS_LOADED_MODULES|' +
            'DM_OS_MEMORY_ALLOCATIONS|' +
            'DM_OS_MEMORY_BROKER_CLERKS|' +
            'DM_OS_MEMORY_BROKERS|' +
            'DM_OS_MEMORY_CACHE_CLOCK_HANDS|' +
            'DM_OS_MEMORY_CACHE_COUNTERS|' +
            'DM_OS_MEMORY_CACHE_ENTRIES|' +
            'DM_OS_MEMORY_CACHE_HASH_TABLES|' +
            'DM_OS_MEMORY_CLERKS|' +
            'DM_OS_MEMORY_NODE_ACCESS_STATS|' +
            'DM_OS_MEMORY_NODES|' +
            'DM_OS_MEMORY_OBJECTS|' +
            'DM_OS_MEMORY_POOLS|' +
            'DM_OS_NODES|' +
            'DM_OS_PERFORMANCE_COUNTERS|' +
            'DM_OS_PROCESS_MEMORY|' +
            'DM_OS_RING_BUFFERS|' +
            'DM_OS_SCHEDULERS|' +
            'DM_OS_SERVER_DIAGNOSTICS_LOG_CONFIGURATIONS|' +
            'DM_OS_SPINLOCK_STATS|' +
            'DM_OS_STACKS|' +
            'DM_OS_SUBLATCHES|' +
            'DM_OS_SYS_INFO|' +
            'DM_OS_SYS_MEMORY|' +
            'DM_OS_TASKS|' +
            'DM_OS_THREADS|' +
            'DM_OS_VIRTUAL_ADDRESS_DUMP|' +
            'DM_OS_WAIT_STATS|' +
            'DM_OS_WAITING_TASKS|' +
            'DM_OS_WINDOWS_INFO|' +
            'DM_OS_WORKER_LOCAL_STORAGE|' +
            'DM_OS_WORKERS|' +
            'DM_QN_SUBSCRIPTIONS|' +
            'DM_REPL_ARTICLES|' +
            'DM_REPL_SCHEMAS|' +
            'DM_REPL_TRANHASH|' +
            'DM_REPL_TRANINFO|' +
            'DM_RESOURCE_GOVERNOR_CONFIGURATION|' +
            'DM_RESOURCE_GOVERNOR_RESOURCE_POOL_AFFINITY|' +
            'DM_RESOURCE_GOVERNOR_RESOURCE_POOLS|' +
            'DM_RESOURCE_GOVERNOR_WORKLOAD_GROUPS|' +
            'DM_SERVER_AUDIT_STATUS|' +
            'DM_SERVER_MEMORY_DUMPS|' +
            'DM_SERVER_REGISTRY|' +
            'DM_SERVER_SERVICES|' +
            'DM_TCP_LISTENER_STATES|' +
            'DM_TRAN_ACTIVE_SNAPSHOT_DATABASE_TRANSACTIONS|' +
            'DM_TRAN_ACTIVE_TRANSACTIONS|' +
            'DM_TRAN_COMMIT_TABLE|' +
            'DM_TRAN_CURRENT_SNAPSHOT|' +
            'DM_TRAN_CURRENT_TRANSACTION|' +
            'DM_TRAN_DATABASE_TRANSACTIONS|' +
            'DM_TRAN_LOCKS|' +
            'DM_TRAN_SESSION_TRANSACTIONS|' +
            'DM_TRAN_TOP_VERSION_GENERATORS|' +
            'DM_TRAN_TRANSACTIONS_SNAPSHOT|' +
            'DM_TRAN_VERSION_STORE|' +
            'DM_XE_MAP_VALUES|' +
            'DM_XE_OBJECT_COLUMNS|' +
            'DM_XE_OBJECTS|' +
            'DM_XE_PACKAGES|' +
            'DM_XE_SESSION_EVENT_ACTIONS|' +
            'DM_XE_SESSION_EVENTS|' +
            'DM_XE_SESSION_OBJECT_COLUMNS|' +
            'DM_XE_SESSION_TARGETS|' +
            'DM_XE_SESSIONS|' +
            'DOMAIN_CONSTRAINTS|' +
            'DOMAINS|' +
            'ENDPOINT_WEBMETHODS|' +
            'ENDPOINTS|' +
            'EVENT_NOTIFICATION_EVENT_TYPES|' +
            'EVENT_NOTIFICATIONS|' +
            'EVENTS|' +
            'EXTENDED_PROCEDURES|' +
            'EXTENDED_PROPERTIES|' +
            'FILEGROUPS|' +
            'FILETABLE_SYSTEM_DEFINED_OBJECTS|' +
            'FILETABLES|' +
            'FN_ALL_CHANGES_<CAPTURE_INSTANCE|' +
            'FN_BUILTIN_PERMISSIONS|' +
            'FN_CDC_DECREMENT_LSN|' +
            'FN_CDC_GET_ALL_CHANGES_<CAPTURE_INSTANCE|' +
            'FN_CDC_GET_COLUMN_ORDINAL|' +
            'FN_CDC_GET_MAX_LSN|' +
            'FN_CDC_GET_MIN_LSN|' +
            'FN_CDC_GET_NET_CHANGES_<CAPTURE_INSTANCE|' +
            'FN_CDC_HAS_COLUMN_CHANGED|' +
            'FN_CDC_INCREMENT_LSN|' +
            'FN_CDC_IS_BIT_SET|' +
            'FN_CDC_MAP_LSN_TO_TIME|' +
            'FN_CDC_MAP_TIME_TO_LSN|' +
            'FN_CHECK_OBJECT_SIGNATURES|' +
            'FN_DB_BACKUP_FILE_SNAPSHOTS|' +
            'FN_GET_AUDIT_FILE|' +
            'FN_GET_SQL|' +
            'FN_HADR_BACKUP_IS_PREFERRED_REPLICA|' +
            'FN_HADR_DISTRIBUTED_AG_DATABASE_REPLICA|' +
            'FN_HADR_DISTRIBUTED_AG_REPLICA|' +
            'FN_HADR_IS_PRIMARY_REPLICA|' +
            'FN_HELPCOLLATIONS|' +
            'FN_LISTEXTENDEDPROPERTY|' +
            'FN_MSXE_READ_EVENT_STREAM|' +
            'FN_MY_PERMISSIONS|' +
            'FN_NET_CHANGES_<CAPTURE_INSTANCE|' +
            'FN_SERVERSHAREDDRIVES|' +
            'FN_STMT_SQL_HANDLE_FROM_SQL_STMT|' +
            'FN_SYSCOLLECTOR_GET_EXECUTION_DETAILS|' +
            'FN_SYSCOLLECTOR_GET_EXECUTION_STATS|' +
            'FN_TRACE_GETDATA|' +
            'FN_TRACE_GETEVENTINFO|' +
            'FN_TRACE_GETFILTERINFO|' +
            'FN_TRACE_GETINFO|' +
            'FN_TRACE_GETTABLE|' +
            'FN_TRANSLATE_PERMISSIONS|' +
            'FN_VALIDATE_PLAN_GUIDE|' +
            'FN_VIRTUALFILESTATS|' +
            'FN_VIRTUALSERVERNODES|' +
            'FN_XE_FILE_TARGET_READ_FILE|' +
            'FOREIGN_KEY_COLUMNS|' +
            'FOREIGN_KEYS|' +
            'FULLTEXT_CATALOGS|' +
            'FULLTEXT_DOCUMENT_TYPES|' +
            'FULLTEXT_INDEX_CATALOG_USAGES|' +
            'FULLTEXT_INDEX_COLUMNS|' +
            'FULLTEXT_INDEX_FRAGMENTS|' +
            'FULLTEXT_INDEXES|' +
            'FULLTEXT_LANGUAGES|' +
            'FULLTEXT_SEMANTIC_LANGUAGE_STATISTICS_DATABASE|' +
            'FULLTEXT_SEMANTIC_LANGUAGES|' +
            'FULLTEXT_STOPLISTS|' +
            'FULLTEXT_STOPWORDS|' +
            'FULLTEXT_SYSTEM_STOPWORDS|' +
            'FUNCTION_ORDER_COLUMNS|' +
            'HTTP_ENDPOINTS|' +
            'IDENTITY_COLUMNS|' +
            'INDEX_COLUMNS|' +
            'INDEXES|' +
            'INTERNAL_TABLES|' +
            'KEY_COLUMN_USAGE|' +
            'KEY_CONSTRAINTS|' +
            'KEY_ENCRYPTIONS|' +
            'LINKED_LOGINS|' +
            'LOGIN_TOKEN|' +
            'MASTER_FILES|' +
            'MASTER_KEY_PASSWORDS|' +
            'MESSAGE_TYPE_XML_SCHEMA_COLLECTION_USAGES|' +
            'MESSAGES|' +
            'MODULE_ASSEMBLY_USAGES|' +
            'NUMBERED_PROCEDURE_PARAMETERS|' +
            'NUMBERED_PROCEDURES|' +
            'OBJECTS|' +
            'OPENKEYS|' +
            'PARAMETER_TYPE_USAGES|' +
            'PARAMETER_XML_SCHEMA_COLLECTION_USAGES|' +
            'PARAMETERS|' +
            'PARTITION_FUNCTIONS|' +
            'PARTITION_PARAMETERS|' +
            'PARTITION_RANGE_VALUES|' +
            'PARTITION_SCHEMES|' +
            'PARTITIONS|' +
            'PLAN_GUIDES|' +
            'PROCEDURES|' +
            'REFERENTIAL_CONSTRAINTS|' +
            'REGISTERED_SEARCH_PROPERTIES|' +
            'REGISTERED_SEARCH_PROPERTY_LISTS|' +
            'REMOTE_LOGINS|' +
            'REMOTE_SERVICE_BINDINGS|' +
            'RESOURCE_GOVERNOR_CONFIGURATION|' +
            'RESOURCE_GOVERNOR_RESOURCE_POOL_AFFINITY|' +
            'RESOURCE_GOVERNOR_RESOURCE_POOLS|' +
            'RESOURCE_GOVERNOR_WORKLOAD_GROUPS|' +
            'ROUTES|' +
            'ROUTINE_COLUMNS|' +
            'ROUTINES|' +
            'SCHEMAS|' +
            'SCHEMATA|' +
            'SECURABLE_CLASSES|' +
            'SEQUENCES|' +
            'SERVER_ASSEMBLY_MODULES|' +
            'SERVER_AUDIT_SPECIFICATION_DETAILS|' +
            'SERVER_AUDIT_SPECIFICATIONS|' +
            'SERVER_AUDITS|' +
            'SERVER_EVENT_NOTIFICATIONS|' +
            'SERVER_EVENT_SESSION_ACTIONS|' +
            'SERVER_EVENT_SESSION_EVENTS|' +
            'SERVER_EVENT_SESSION_FIELDS|' +
            'SERVER_EVENT_SESSION_TARGETS|' +
            'SERVER_EVENT_SESSIONS|' +
            'SERVER_EVENTS|' +
            'SERVER_FILE_AUDITS|' +
            'SERVER_PERMISSIONS|' +
            'SERVER_PRINCIPAL_CREDENTIALS|' +
            'SERVER_PRINCIPALS|' +
            'SERVER_ROLE_MEMBERS|' +
            'SERVER_SQL_MODULES|' +
            'SERVER_TRIGGER_EVENTS|' +
            'SERVER_TRIGGERS|' +
            'SERVERS|' +
            'SERVICE_BROKER_ENDPOINTS|' +
            'SERVICE_CONTRACT_MESSAGE_USAGES|' +
            'SERVICE_CONTRACT_USAGES|' +
            'SERVICE_CONTRACTS|' +
            'SERVICE_MESSAGE_TYPES|' +
            'SERVICE_QUEUE_USAGES|' +
            'SERVICE_QUEUES|' +
            'SERVICES|' +
            'SOAP_ENDPOINTS|' +
            'SPATIAL_INDEX_TESSELLATIONS|' +
            'SPATIAL_INDEXES|' +
            'SPATIAL_REFERENCE_SYSTEMS|' +
            'SQL_DEPENDENCIES|' +
            'SQL_EXPRESSION_DEPENDENCIES|' +
            'SQL_LOGINS|' +
            'SQL_MODULES|' +
            'STATS|' +
            'STATS_COLUMNS|' +
            'SYMMETRIC_KEYS|' +
            'SYNONYMS|' +
            'SYS|' +
            'SYSALTFILES|' +
            'SYSCACHEOBJECTS|' +
            'SYSCHARSETS|' +
            'SYSCOLUMNS|' +
            'SYSCOMMENTS|' +
            'SYSCONFIGURES|' +
            'SYSCONSTRAINTS|' +
            'SYSCURCONFIGS|' +
            'SYSCURSORCOLUMNS|' +
            'SYSCURSORREFS|' +
            'SYSCURSORS|' +
            'SYSCURSORTABLES|' +
            'SYSDATABASES|' +
            'SYSDEPENDS|' +
            'SYSDEVICES|' +
            'SYSFILEGROUPS|' +
            'SYSFILES|' +
            'SYSFOREIGNKEYS|' +
            'SYSFULLTEXTCATALOGS|' +
            'SYSINDEXES|' +
            'SYSINDEXKEYS|' +
            'SYSLANGUAGES|' +
            'SYSLOCKINFO|' +
            'SYSLOGINS|' +
            'SYSMEMBERS|' +
            'SYSMESSAGES|' +
            'SYSOBJECTS|' +
            'SYSOLEDBUSERS|' +
            'SYSOPENTAPES|' +
            'SYSPERFINFO|' +
            'SYSPERMISSIONS|' +
            'SYSPROCESSES|' +
            'SYSPROTECTS|' +
            'SYSREFERENCES|' +
            'SYSREMOTELOGINS|' +
            'SYSSERVERS|' +
            'SYSTEM_COLUMNS|' +
            'SYSTEM_COMPONENTS_SURFACE_AREA_CONFIGURATION|' +
            'SYSTEM_INTERNALS_ALLOCATION_UNITS|' +
            'SYSTEM_INTERNALS_PARTITION_COLUMNS|' +
            'SYSTEM_INTERNALS_PARTITIONS|' +
            'SYSTEM_OBJECTS|' +
            'SYSTEM_PARAMETERS|' +
            'SYSTEM_SQL_MODULES|' +
            'SYSTEM_VIEWS|' +
            'SYSTYPES|' +
            'SYSUSERS|' +
            'TABLE_CONSTRAINTS|' +
            'TABLE_PRIVILEGES|' +
            'TABLE_TYPES|' +
            'TABLES|' +
            'TCP_ENDPOINTS|' +
            'TRACE_CATEGORIES|' +
            'TRACE_COLUMNS|' +
            'TRACE_EVENT_BINDINGS|' +
            'TRACE_EVENTS|' +
            'TRACE_SUBCLASS_VALUES|' +
            'TRACES|' +
            'TRANSMISSION_QUEUE|' +
            'TRIGGER_EVENT_TYPES|' +
            'TRIGGER_EVENTS|' +
            'TRIGGERS|' +
            'TYPE_ASSEMBLY_USAGES|' +
            'TYPES|' +
            'USER_TOKEN|' +
            'VIA_ENDPOINTS|' +
            'VIEW_COLUMN_USAGE|' +
            'VIEW_TABLE_USAGE|' +
            'VIEWS|' +
            'XML_INDEXES|' +
            'XML_SCHEMA_ATTRIBUTES|' +
            'XML_SCHEMA_COLLECTIONS|' +
            'XML_SCHEMA_COMPONENT_PLACEMENTS|' +
            'XML_SCHEMA_COMPONENTS|' +
            'XML_SCHEMA_ELEMENTS|' +
            'XML_SCHEMA_FACETS|' +
            'XML_SCHEMA_MODEL_GROUPS|' +
            'XML_SCHEMA_NAMESPACES|' +
            'XML_SCHEMA_TYPES|' +
            'XML_SCHEMA_WILDCARD_NAMESPACES|' +
            'XML_SCHEMA_WILDCARDS' +
            ')\\b'
    },
    {
      className: 'literal',
      begin: '(' +
            'ALL|' +
            'AND|' +
            'ANY|' +
            'APPLY|' +
            'BETWEEN|' +
            'CROSS|' +
            'EXISTS|' +
            'IN|' +
            'INNER|' +
            'IS|' +
            'JOIN|' +
            'LEFT|' +
            'LIKE|' +
            'MATCHED|' +
            'NOT|' +
            'NULL|' +
            'OR|' +
            'OUTER|' +
            'PIVOT|' +
            'RIGHT|' +
            'SOME|' +
            'SOURCE|' +
            'UNPIVOT' +
            ')\\b'
    },
    {
      className: 'function',
      begin: '(' +
            'SP_ADD_AGENT_PARAMETER|' +
            'SP_ADD_AGENT_PROFILE|' +
            'SP_ADD_DATA_FILE_RECOVER_SUSPECT_DB|' +
            'SP_ADD_LOG_FILE_RECOVER_SUSPECT_DB|' +
            'SP_ADD_LOG_SHIPPING_ALERT_JOB|' +
            'SP_ADD_LOG_SHIPPING_PRIMARY_DATABASE|' +
            'SP_ADD_LOG_SHIPPING_PRIMARY_SECONDARY|' +
            'SP_ADD_LOG_SHIPPING_SECONDARY_DATABASE|' +
            'SP_ADD_LOG_SHIPPING_SECONDARY_PRIMARY|' +
            'SP_ADDAPPROLE|' +
            'SP_ADDARTICLE|' +
            'SP_ADDDATATYPE|' +
            'SP_ADDDATATYPEMAPPING|' +
            'SP_ADDDISTPUBLISHER|' +
            'SP_ADDDISTRIBUTIONDB|' +
            'SP_ADDDISTRIBUTOR|' +
            'SP_ADDDYNAMICSNAPSHOT_JOB|' +
            'SP_ADDEXTENDEDPROC|' +
            'SP_ADDEXTENDEDPROPERTY|' +
            'SP_ADDLINKEDSERVER|' +
            'SP_ADDLINKEDSRVLOGIN|' +
            'SP_ADDLOGIN|' +
            'SP_ADDLOGREADER_AGENT|' +
            'SP_ADDMERGEALTERNATEPUBLISHER|' +
            'SP_ADDMERGEARTICLE|' +
            'SP_ADDMERGEFILTER|' +
            'SP_ADDMERGELOGSETTINGS|' +
            'SP_ADDMERGEPARTITION|' +
            'SP_ADDMERGEPUBLICATION|' +
            'SP_ADDMERGEPULLSUBSCRIPTION|' +
            'SP_ADDMERGEPULLSUBSCRIPTION_AGENT|' +
            'SP_ADDMERGEPUSHSUBSCRIPTION_AGENT|' +
            'SP_ADDMERGESUBSCRIPTION|' +
            'SP_ADDMESSAGE|' +
            'SP_ADDPUBLICATION|' +
            'SP_ADDPUBLICATION_SNAPSHOT|' +
            'SP_ADDPULLSUBSCRIPTION|' +
            'SP_ADDPULLSUBSCRIPTION_AGENT|' +
            'SP_ADDPUSHSUBSCRIPTION_AGENT|' +
            'SP_ADDQREADER_AGENT|' +
            'SP_ADDQUEUED_ARTINFO|' +
            'SP_ADDREMOTELOGIN|' +
            'SP_ADDROLE|' +
            'SP_ADDROLEMEMBER|' +
            'SP_ADDSCRIPTEXEC|' +
            'SP_ADDSERVER|' +
            'SP_ADDSRVROLEMEMBER|' +
            'SP_ADDSUBSCRIBER|' +
            'SP_ADDSUBSCRIBER_SCHEDULE|' +
            'SP_ADDSUBSCRIPTION|' +
            'SP_ADDSYNCTRIGGERS|' +
            'SP_ADDSYNCTRIGGERSCORE|' +
            'SP_ADDTABLETOCONTENTS|' +
            'SP_ADDTYPE|' +
            'SP_ADDUMPDEVICE|' +
            'SP_ADDUSER|' +
            'SP_ADJUSTPUBLISHERIDENTITYRANGE|' +
            'SP_ALTERMESSAGE|' +
            'SP_APPROLEPASSWORD|' +
            'SP_ARTICLE_VALIDATION|' +
            'SP_ARTICLECOLUMN|' +
            'SP_ARTICLEFILTER|' +
            'SP_ARTICLEVIEW|' +
            'SP_ASSEMBLIES_ROWSET|' +
            'SP_ASSEMBLIES_ROWSET_RMT|' +
            'SP_ASSEMBLIES_ROWSET2|' +
            'SP_ASSEMBLY_DEPENDENCIES_ROWSET|' +
            'SP_ASSEMBLY_DEPENDENCIES_ROWSET_RMT|' +
            'SP_ASSEMBLY_DEPENDENCIES_ROWSET2|' +
            'SP_ATTACH_DB|' +
            'SP_ATTACH_SINGLE_FILE_DB|' +
            'SP_ATTACHSUBSCRIPTION|' +
            'SP_AUTOSTATS|' +
            'SP_BATCH_PARAMS|' +
            'SP_BCP_DBCMPTLEVEL|' +
            'SP_BINDEFAULT|' +
            'SP_BINDRULE|' +
            'SP_BINDSESSION|' +
            'SP_BROWSEMERGESNAPSHOTFOLDER|' +
            'SP_BROWSEREPLCMDS|' +
            'SP_BROWSESNAPSHOTFOLDER|' +
            'SP_CAN_TLOG_BE_APPLIED|' +
            'SP_CATALOGS|' +
            'SP_CATALOGS_ROWSET|' +
            'SP_CATALOGS_ROWSET_RMT|' +
            'SP_CATALOGS_ROWSET2|' +
            'SP_CDC_ADD_JOB|' +
            'SP_CDC_CHANGE_JOB|' +
            'SP_CDC_CLEANUP_CHANGE_TABLE|' +
            'SP_CDC_DBSNAPSHOTLSN|' +
            'SP_CDC_DISABLE_DB|' +
            'SP_CDC_DISABLE_TABLE|' +
            'SP_CDC_DROP_JOB|' +
            'SP_CDC_ENABLE_DB|' +
            'SP_CDC_ENABLE_TABLE|' +
            'SP_CDC_GENERATE_WRAPPER_FUNCTION|' +
            'SP_CDC_GET_CAPTURED_COLUMNS|' +
            'SP_CDC_GET_DDL_HISTORY|' +
            'SP_CDC_HELP_CHANGE_DATA_CAPTURE|' +
            'SP_CDC_HELP_JOBS|' +
            'SP_CDC_RESTOREDB|' +
            'SP_CDC_SCAN|' +
            'SP_CDC_START_JOB|' +
            'SP_CDC_STOP_JOB|' +
            'SP_CDC_VUPGRADE|' +
            'SP_CDC_VUPGRADE_DATABASES|' +
            'SP_CERTIFY_REMOVABLE|' +
            'SP_CHANGE_AGENT_PARAMETER|' +
            'SP_CHANGE_AGENT_PROFILE|' +
            'SP_CHANGE_LOG_SHIPPING_PRIMARY_DATABASE|' +
            'SP_CHANGE_LOG_SHIPPING_SECONDARY_DATABASE|' +
            'SP_CHANGE_LOG_SHIPPING_SECONDARY_PRIMARY|' +
            'SP_CHANGE_SUBSCRIPTION_PROPERTIES|' +
            'SP_CHANGE_USERS_LOGIN|' +
            'SP_CHANGEARTICLE|' +
            'SP_CHANGEARTICLECOLUMNDATATYPE|' +
            'SP_CHANGEDBOWNER|' +
            'SP_CHANGEDISTPUBLISHER|' +
            'SP_CHANGEDISTRIBUTIONDB|' +
            'SP_CHANGEDISTRIBUTOR_PASSWORD|' +
            'SP_CHANGEDISTRIBUTOR_PROPERTY|' +
            'SP_CHANGEDYNAMICSNAPSHOT_JOB|' +
            'SP_CHANGELOGREADER_AGENT|' +
            'SP_CHANGEMERGEARTICLE|' +
            'SP_CHANGEMERGEFILTER|' +
            'SP_CHANGEMERGELOGSETTINGS|' +
            'SP_CHANGEMERGEPUBLICATION|' +
            'SP_CHANGEMERGEPULLSUBSCRIPTION|' +
            'SP_CHANGEMERGESUBSCRIPTION|' +
            'SP_CHANGEOBJECTOWNER|' +
            'SP_CHANGEPUBLICATION|' +
            'SP_CHANGEPUBLICATION_SNAPSHOT|' +
            'SP_CHANGEQREADER_AGENT|' +
            'SP_CHANGEREPLICATIONSERVERPASSWORDS|' +
            'SP_CHANGESUBSCRIBER|' +
            'SP_CHANGESUBSCRIBER_SCHEDULE|' +
            'SP_CHANGESUBSCRIPTION|' +
            'SP_CHANGESUBSCRIPTIONDTSINFO|' +
            'SP_CHANGESUBSTATUS|' +
            'SP_CHECK_CONSTBYTABLE_ROWSET|' +
            'SP_CHECK_CONSTBYTABLE_ROWSET2|' +
            'SP_CHECK_CONSTRAINTS_ROWSET|' +
            'SP_CHECK_CONSTRAINTS_ROWSET2|' +
            'SP_CHECK_DYNAMIC_FILTERS|' +
            'SP_CHECK_FOR_SYNC_TRIGGER|' +
            'SP_CHECK_JOIN_FILTER|' +
            'SP_CHECK_LOG_SHIPPING_MONITOR_ALERT|' +
            'SP_CHECK_PUBLICATION_ACCESS|' +
            'SP_CHECK_REMOVABLE|' +
            'SP_CHECK_SUBSET_FILTER|' +
            'SP_CHECK_SYNC_TRIGGER|' +
            'SP_CHECKINVALIDIVARTICLE|' +
            'SP_CHECKORACLEPACKAGEVERSION|' +
            'SP_CLEAN_DB_FILE_FREE_SPACE|' +
            'SP_CLEAN_DB_FREE_SPACE|' +
            'SP_CLEANMERGELOGFILES|' +
            'SP_CLEANUP_LOG_SHIPPING_HISTORY|' +
            'SP_CLEANUPDBREPLICATION|' +
            'SP_COLUMN_PRIVILEGES|' +
            'SP_COLUMN_PRIVILEGES_EX|' +
            'SP_COLUMN_PRIVILEGES_ROWSET|' +
            'SP_COLUMN_PRIVILEGES_ROWSET_RMT|' +
            'SP_COLUMN_PRIVILEGES_ROWSET2|' +
            'SP_COLUMNS|' +
            'SP_COLUMNS_100|' +
            'SP_COLUMNS_100_ROWSET|' +
            'SP_COLUMNS_100_ROWSET2|' +
            'SP_COLUMNS_90|' +
            'SP_COLUMNS_90_ROWSET|' +
            'SP_COLUMNS_90_ROWSET_RMT|' +
            'SP_COLUMNS_90_ROWSET2|' +
            'SP_COLUMNS_EX|' +
            'SP_COLUMNS_EX_100|' +
            'SP_COLUMNS_EX_90|' +
            'SP_COLUMNS_MANAGED|' +
            'SP_COLUMNS_ROWSET|' +
            'SP_COLUMNS_ROWSET_RMT|' +
            'SP_COLUMNS_ROWSET2|' +
            'SP_CONFIGURE|' +
            'SP_CONFIGURE_PEERCONFLICTDETECTION|' +
            'SP_CONSTR_COL_USAGE_ROWSET|' +
            'SP_CONSTR_COL_USAGE_ROWSET2|' +
            'SP_CONTROL_PLAN_GUIDE|' +
            'SP_COPYMERGESNAPSHOT|' +
            'SP_COPYSNAPSHOT|' +
            'SP_COPYSUBSCRIPTION|' +
            'SP_CREATE_PLAN_GUIDE|' +
            'SP_CREATE_PLAN_GUIDE_FROM_HANDLE|' +
            'SP_CREATE_REMOVABLE|' +
            'SP_CREATEMERGEPALROLE|' +
            'SP_CREATESTATS|' +
            'SP_CREATETRANPALROLE|' +
            'SP_CURSOR_LIST|' +
            'SP_CYCLE_ERRORLOG|' +
            'SP_DATABASES|' +
            'SP_DATATYPE_INFO|' +
            'SP_DATATYPE_INFO_100|' +
            'SP_DATATYPE_INFO_90|' +
            'SP_DB_INCREASED_PARTITIONS|' +
            'SP_DB_VARDECIMAL_STORAGE_FORMAT|' +
            'SP_DBCMPTLEVEL|' +
            'SP_DBFIXEDROLEPERMISSION|' +
            'SP_DBMMONITORADDMONITORING|' +
            'SP_DBMMONITORCHANGEALERT|' +
            'SP_DBMMONITORCHANGEMONITORING|' +
            'SP_DBMMONITORDROPALERT|' +
            'SP_DBMMONITORDROPMONITORING|' +
            'SP_DBMMONITORHELPALERT|' +
            'SP_DBMMONITORHELPMONITORING|' +
            'SP_DBMMONITORRESULTS|' +
            'SP_DBMMONITORUPDATE|' +
            'SP_DBREMOVE|' +
            'SP_DDOPEN|' +
            'SP_DEFAULTDB|' +
            'SP_DEFAULTLANGUAGE|' +
            'SP_DELETE_BACKUPHISTORY|' +
            'SP_DELETE_DATABASE_BACKUPHISTORY|' +
            'SP_DELETE_LOG_SHIPPING_ALERT_JOB|' +
            'SP_DELETE_LOG_SHIPPING_PRIMARY_DATABASE|' +
            'SP_DELETE_LOG_SHIPPING_PRIMARY_SECONDARY|' +
            'SP_DELETE_LOG_SHIPPING_SECONDARY_DATABASE|' +
            'SP_DELETE_LOG_SHIPPING_SECONDARY_PRIMARY|' +
            'SP_DELETEMERGECONFLICTROW|' +
            'SP_DELETEPEERREQUESTHISTORY|' +
            'SP_DELETETRACERTOKENHISTORY|' +
            'SP_DENYLOGIN|' +
            'SP_DEPENDS|' +
            'SP_DESCRIBE_CURSOR|' +
            'SP_DESCRIBE_CURSOR_COLUMNS|' +
            'SP_DESCRIBE_CURSOR_TABLES|' +
            'SP_DESCRIBE_FIRST_RESULT_SET|' +
            'SP_DESCRIBE_UNDECLARED_PARAMETERS|' +
            'SP_DETACH_DB|' +
            'SP_DISABLEAGENTOFFLOAD|' +
            'SP_DISTCOUNTERS|' +
            'SP_DROP_AGENT_PARAMETER|' +
            'SP_DROP_AGENT_PROFILE|' +
            'SP_DROPANONYMOUSAGENT|' +
            'SP_DROPANONYMOUSSUBSCRIPTION|' +
            'SP_DROPAPPROLE|' +
            'SP_DROPARTICLE|' +
            'SP_DROPDATATYPEMAPPING|' +
            'SP_DROPDEVICE|' +
            'SP_DROPDISTPUBLISHER|' +
            'SP_DROPDISTRIBUTIONDB|' +
            'SP_DROPDISTRIBUTOR|' +
            'SP_DROPDYNAMICSNAPSHOT_JOB|' +
            'SP_DROPEXTENDEDPROC|' +
            'SP_DROPEXTENDEDPROPERTY|' +
            'SP_DROPLINKEDSRVLOGIN|' +
            'SP_DROPLOGIN|' +
            'SP_DROPMERGEALTERNATEPUBLISHER|' +
            'SP_DROPMERGEARTICLE|' +
            'SP_DROPMERGEFILTER|' +
            'SP_DROPMERGELOGSETTINGS|' +
            'SP_DROPMERGEPARTITION|' +
            'SP_DROPMERGEPUBLICATION|' +
            'SP_DROPMERGEPULLSUBSCRIPTION|' +
            'SP_DROPMERGESUBSCRIPTION|' +
            'SP_DROPMESSAGE|' +
            'SP_DROPPUBLICATION|' +
            'SP_DROPPUBLISHER|' +
            'SP_DROPPULLSUBSCRIPTION|' +
            'SP_DROPREMOTELOGIN|' +
            'SP_DROPREPLSYMMETRICKEY|' +
            'SP_DROPROLE|' +
            'SP_DROPROLEMEMBER|' +
            'SP_DROPSERVER|' +
            'SP_DROPSRVROLEMEMBER|' +
            'SP_DROPSUBSCRIBER|' +
            'SP_DROPSUBSCRIPTION|' +
            'SP_DROPTYPE|' +
            'SP_DROPUSER|' +
            'SP_DSNINFO|' +
            'SP_ENABLE_HETEROGENEOUS_SUBSCRIPTION|' +
            'SP_ENABLEAGENTOFFLOAD|' +
            'SP_ENUM_OLEDB_PROVIDERS|' +
            'SP_ENUMCUSTOMRESOLVERS|' +
            'SP_ENUMDSN|' +
            'SP_ENUMERATEPENDINGSCHEMACHANGES|' +
            'SP_ENUMERRORLOGS|' +
            'SP_ENUMFULLSUBSCRIBERS|' +
            'SP_ENUMOLEDBDATASOURCES|' +
            'SP_ESTIMATE_DATA_COMPRESSION_SAVINGS|' +
            'SP_ESTIMATED_ROWSIZE_REDUCTION_FOR_VARDECIMAL|' +
            'SP_EXECUTE_EXTERNAL_SCRIPT|' +
            'SP_EXECUTE_REMOTE|' +
            'SP_EXECUTESQL|' +
            'SP_EXPIRED_SUBSCRIPTION_CLEANUP|' +
            'SP_FILESTREAM_FORCE_GARBAGE_COLLECTION|' +
            'SP_FILESTREAM_RECALCULATE_CONTAINER_SIZE|' +
            'SP_FIRSTONLY_BITMAP|' +
            'SP_FKEYS|' +
            'SP_FLUSH_COMMIT_TABLE|' +
            'SP_FLUSH_COMMIT_TABLE_ON_DEMAND|' +
            'SP_FLUSH_LOG|' +
            'SP_FOREIGN_KEYS_ROWSET|' +
            'SP_FOREIGN_KEYS_ROWSET_RMT|' +
            'SP_FOREIGN_KEYS_ROWSET2|' +
            'SP_FOREIGN_KEYS_ROWSET3|' +
            'SP_FOREIGNKEYS|' +
            'SP_FULLTEXT_CATALOG|' +
            'SP_FULLTEXT_COLUMN|' +
            'SP_FULLTEXT_DATABASE|' +
            'SP_FULLTEXT_LOAD_THESAURUS_FILE|' +
            'SP_FULLTEXT_RECYCLE_CRAWL_LOG|' +
            'SP_FULLTEXT_SEMANTIC_REGISTER_LANGUAGE_STATISTICS_DB|' +
            'SP_FULLTEXT_SEMANTIC_UNREGISTER_LANGUAGE_STATISTICS_DB|' +
            'SP_FULLTEXT_SERVICE|' +
            'SP_FULLTEXT_TABLE|' +
            'SP_GENERATE_AGENT_PARAMETER|' +
            'SP_GENERATEFILTERS|' +
            'SP_GET_DISTRIBUTOR|' +
            'SP_GET_JOB_STATUS_MERGESUBSCRIPTION_AGENT|' +
            'SP_GET_MERGEPUBLISHEDARTICLEPROPERTIES|' +
            'SP_GET_ORACLE_PUBLISHER_METADATA|' +
            'SP_GET_QUERY_TEMPLATE|' +
            'SP_GET_REDIRECTED_PUBLISHER|' +
            'SP_GETAGENTPARAMETERLIST|' +
            'SP_GETAPPLOCK|' +
            'SP_GETBINDTOKEN|' +
            'SP_GETDEFAULTDATATYPEMAPPING|' +
            'SP_GETMERGEDELETETYPE|' +
            'SP_GETPROCESSORUSAGE|' +
            'SP_GETPUBLISHERLINK|' +
            'SP_GETQUEUEDARTICLESYNCTRANINFO|' +
            'SP_GETQUEUEDROWS|' +
            'SP_GETSQLQUEUEVERSION|' +
            'SP_GETSUBSCRIPTION_STATUS_HSNAPSHOT|' +
            'SP_GETSUBSCRIPTIONDTSPACKAGENAME|' +
            'SP_GETTOPOLOGYINFO|' +
            'SP_GETVOLUMEFREESPACE|' +
            'SP_GRANT_PUBLICATION_ACCESS|' +
            'SP_GRANTDBACCESS|' +
            'SP_GRANTLOGIN|' +
            'SP_HELP|' +
            'SP_HELP_AGENT_DEFAULT|' +
            'SP_HELP_AGENT_PARAMETER|' +
            'SP_HELP_AGENT_PROFILE|' +
            'SP_HELP_DATATYPE_MAPPING|' +
            'SP_HELP_FULLTEXT_CATALOG_COMPONENTS|' +
            'SP_HELP_FULLTEXT_CATALOGS|' +
            'SP_HELP_FULLTEXT_CATALOGS_CURSOR|' +
            'SP_HELP_FULLTEXT_COLUMNS|' +
            'SP_HELP_FULLTEXT_COLUMNS_CURSOR|' +
            'SP_HELP_FULLTEXT_SYSTEM_COMPONENTS|' +
            'SP_HELP_FULLTEXT_TABLES|' +
            'SP_HELP_FULLTEXT_TABLES_CURSOR|' +
            'SP_HELP_LOG_SHIPPING_ALERT_JOB|' +
            'SP_HELP_LOG_SHIPPING_MONITOR|' +
            'SP_HELP_LOG_SHIPPING_MONITOR_PRIMARY|' +
            'SP_HELP_LOG_SHIPPING_MONITOR_SECONDARY|' +
            'SP_HELP_LOG_SHIPPING_PRIMARY_DATABASE|' +
            'SP_HELP_LOG_SHIPPING_PRIMARY_SECONDARY|' +
            'SP_HELP_LOG_SHIPPING_SECONDARY_DATABASE|' +
            'SP_HELP_LOG_SHIPPING_SECONDARY_PRIMARY|' +
            'SP_HELP_PEERCONFLICTDETECTION|' +
            'SP_HELP_PUBLICATION_ACCESS|' +
            'SP_HELP_SPATIAL_GEOGRAPHY_HISTOGRAM|' +
            'SP_HELP_SPATIAL_GEOGRAPHY_INDEX|' +
            'SP_HELP_SPATIAL_GEOGRAPHY_INDEX_XML|' +
            'SP_HELP_SPATIAL_GEOMETRY_HISTOGRAM|' +
            'SP_HELP_SPATIAL_GEOMETRY_INDEX|' +
            'SP_HELP_SPATIAL_GEOMETRY_INDEX_XML|' +
            'SP_HELPALLOWMERGE_PUBLICATION|' +
            'SP_HELPARTICLE|' +
            'SP_HELPARTICLECOLUMNS|' +
            'SP_HELPARTICLEDTS|' +
            'SP_HELPCONSTRAINT|' +
            'SP_HELPDATATYPEMAP|' +
            'SP_HELPDB|' +
            'SP_HELPDBFIXEDROLE|' +
            'SP_HELPDEVICE|' +
            'SP_HELPDISTPUBLISHER|' +
            'SP_HELPDISTRIBUTIONDB|' +
            'SP_HELPDISTRIBUTOR|' +
            'SP_HELPDISTRIBUTOR_PROPERTIES|' +
            'SP_HELPDYNAMICSNAPSHOT_JOB|' +
            'SP_HELPEXTENDEDPROC|' +
            'SP_HELPFILE|' +
            'SP_HELPFILEGROUP|' +
            'SP_HELPINDEX|' +
            'SP_HELPLANGUAGE|' +
            'SP_HELPLINKEDSRVLOGIN|' +
            'SP_HELPLOGINS|' +
            'SP_HELPLOGREADER_AGENT|' +
            'SP_HELPMERGEALTERNATEPUBLISHER|' +
            'SP_HELPMERGEARTICLE|' +
            'SP_HELPMERGEARTICLECOLUMN|' +
            'SP_HELPMERGEARTICLECONFLICTS|' +
            'SP_HELPMERGECONFLICTROWS|' +
            'SP_HELPMERGEDELETECONFLICTROWS|' +
            'SP_HELPMERGEFILTER|' +
            'SP_HELPMERGELOGFILES|' +
            'SP_HELPMERGELOGFILESWITHDATA|' +
            'SP_HELPMERGELOGSETTINGS|' +
            'SP_HELPMERGEPARTITION|' +
            'SP_HELPMERGEPUBLICATION|' +
            'SP_HELPMERGEPULLSUBSCRIPTION|' +
            'SP_HELPMERGESUBSCRIPTION|' +
            'SP_HELPNTGROUP|' +
            'SP_HELPPEERREQUESTS|' +
            'SP_HELPPEERRESPONSES|' +
            'SP_HELPPUBLICATION|' +
            'SP_HELPPUBLICATION_SNAPSHOT|' +
            'SP_HELPPUBLICATIONSYNC|' +
            'SP_HELPPULLSUBSCRIPTION|' +
            'SP_HELPQREADER_AGENT|' +
            'SP_HELPREMOTELOGIN|' +
            'SP_HELPREPLFAILOVERMODE|' +
            'SP_HELPREPLICATIONDB|' +
            'SP_HELPREPLICATIONDBOPTION|' +
            'SP_HELPREPLICATIONOPTION|' +
            'SP_HELPROLE|' +
            'SP_HELPROLEMEMBER|' +
            'SP_HELPROTECT|' +
            'SP_HELPSERVER|' +
            'SP_HELPSORT|' +
            'SP_HELPSRVROLE|' +
            'SP_HELPSRVROLEMEMBER|' +
            'SP_HELPSTATS|' +
            'SP_HELPSUBSCRIBERINFO|' +
            'SP_HELPSUBSCRIPTION|' +
            'SP_HELPSUBSCRIPTION_PROPERTIES|' +
            'SP_HELPSUBSCRIPTIONERRORS|' +
            'SP_HELPTEXT|' +
            'SP_HELPTRACERTOKENHISTORY|' +
            'SP_HELPTRACERTOKENS|' +
            'SP_HELPTRIGGER|' +
            'SP_HELPUSER|' +
            'SP_HELPXACTSETJOB|' +
            'SP_HTTP_GENERATE_WSDL_DEFAULTCOMPLEXORSIMPLE|' +
            'SP_HTTP_GENERATE_WSDL_DEFAULTSIMPLEORCOMPLEX|' +
            'SP_IDENTITYCOLUMNFORREPLICATION|' +
            'SP_IH_LR_GETCACHEDATA|' +
            'SP_IHADD_SYNC_COMMAND|' +
            'SP_IHARTICLECOLUMN|' +
            'SP_IHGET_LOOPBACK_DETECTION|' +
            'SP_IHSCRIPTIDXFILE|' +
            'SP_IHSCRIPTSCHFILE|' +
            'SP_IHVALIDATEROWFILTER|' +
            'SP_IHXACTSETJOB|' +
            'SP_INDEXCOLUMNS_MANAGED|' +
            'SP_INDEXES|' +
            'SP_INDEXES_100_ROWSET|' +
            'SP_INDEXES_100_ROWSET2|' +
            'SP_INDEXES_90_ROWSET|' +
            'SP_INDEXES_90_ROWSET_RMT|' +
            'SP_INDEXES_90_ROWSET2|' +
            'SP_INDEXES_MANAGED|' +
            'SP_INDEXES_ROWSET|' +
            'SP_INDEXES_ROWSET_RMT|' +
            'SP_INDEXES_ROWSET2|' +
            'SP_INDEXOPTION|' +
            'SP_INVALIDATE_TEXTPTR|' +
            'SP_IS_MAKEGENERATION_NEEDED|' +
            'SP_IVINDEXHASNULLCOLS|' +
            'SP_KILL_FILESTREAM_NON_TRANSACTED_HANDLES|' +
            'SP_LIGHTWEIGHTMERGEMETADATARETENTIONCLEANUP|' +
            'SP_LINK_PUBLICATION|' +
            'SP_LINKEDSERVERS|' +
            'SP_LINKEDSERVERS_ROWSET|' +
            'SP_LINKEDSERVERS_ROWSET2|' +
            'SP_LOCK|' +
            'SP_LOGSHIPPINGINSTALLMETADATA|' +
            'SP_LOOKUPCUSTOMRESOLVER|' +
            'SP_MAPDOWN_BITMAP|' +
            'SP_MARKPENDINGSCHEMACHANGE|' +
            'SP_MARKSUBSCRIPTIONVALIDATION|' +
            'SP_MERGEARTICLECOLUMN|' +
            'SP_MERGECLEANUPMETADATA|' +
            'SP_MERGEDUMMYUPDATE|' +
            'SP_MERGEMETADATARETENTIONCLEANUP|' +
            'SP_MERGESUBSCRIPTION_CLEANUP|' +
            'SP_MERGESUBSCRIPTIONSUMMARY|' +
            'SP_MONITOR|' +
            'SP_MS_MARKSYSTEMOBJECT|' +
            'SP_MS_REPLICATION_INSTALLED|' +
            'SP_MSACQUIREHEADOFQUEUELOCK|' +
            'SP_MSACQUIRESERVERRESOURCEFORDYNAMICSNAPSHOT|' +
            'SP_MSACQUIRESLOTLOCK|' +
            'SP_MSACQUIRESNAPSHOTDELIVERYSESSIONLOCK|' +
            'SP_MSACTIVATE_AUTO_SUB|' +
            'SP_MSACTIVATELOGBASEDARTICLEOBJECT|' +
            'SP_MSACTIVATEPROCEDUREEXECUTIONARTICLEOBJECT|' +
            'SP_MSADD_ANONYMOUS_AGENT|' +
            'SP_MSADD_ARTICLE|' +
            'SP_MSADD_COMPENSATING_CMD|' +
            'SP_MSADD_DISTRIBUTION_AGENT|' +
            'SP_MSADD_DISTRIBUTION_HISTORY|' +
            'SP_MSADD_DYNAMIC_SNAPSHOT_LOCATION|' +
            'SP_MSADD_FILTERINGCOLUMN|' +
            'SP_MSADD_LOG_SHIPPING_ERROR_DETAIL|' +
            'SP_MSADD_LOG_SHIPPING_HISTORY_DETAIL|' +
            'SP_MSADD_LOGREADER_AGENT|' +
            'SP_MSADD_LOGREADER_HISTORY|' +
            'SP_MSADD_MERGE_AGENT|' +
            'SP_MSADD_MERGE_ANONYMOUS_AGENT|' +
            'SP_MSADD_MERGE_HISTORY|' +
            'SP_MSADD_MERGE_HISTORY90|' +
            'SP_MSADD_MERGE_SUBSCRIPTION|' +
            'SP_MSADD_MERGEREPLCOMMAND|' +
            'SP_MSADD_MERGESUBENTRY_INDISTDB|' +
            'SP_MSADD_PUBLICATION|' +
            'SP_MSADD_QREADER_AGENT|' +
            'SP_MSADD_QREADER_HISTORY|' +
            'SP_MSADD_REPL_ALERT|' +
            'SP_MSADD_REPL_COMMAND|' +
            'SP_MSADD_REPL_COMMANDS27HP|' +
            'SP_MSADD_REPL_ERROR|' +
            'SP_MSADD_REPLCMDS_MCIT|' +
            'SP_MSADD_REPLMERGEALERT|' +
            'SP_MSADD_SNAPSHOT_AGENT|' +
            'SP_MSADD_SNAPSHOT_HISTORY|' +
            'SP_MSADD_SUBSCRIBER_INFO|' +
            'SP_MSADD_SUBSCRIBER_SCHEDULE|' +
            'SP_MSADD_SUBSCRIPTION|' +
            'SP_MSADD_SUBSCRIPTION_3RD|' +
            'SP_MSADD_TRACER_HISTORY|' +
            'SP_MSADD_TRACER_TOKEN|' +
            'SP_MSADDANONYMOUSREPLICA|' +
            'SP_MSADDDYNAMICSNAPSHOTJOBATDISTRIBUTOR|' +
            'SP_MSADDGUIDCOLUMN|' +
            'SP_MSADDGUIDINDEX|' +
            'SP_MSADDINITIALARTICLE|' +
            'SP_MSADDINITIALPUBLICATION|' +
            'SP_MSADDINITIALSCHEMAARTICLE|' +
            'SP_MSADDINITIALSUBSCRIPTION|' +
            'SP_MSADDLIGHTWEIGHTMERGEARTICLE|' +
            'SP_MSADDMERGEDYNAMICSNAPSHOTJOB|' +
            'SP_MSADDMERGETRIGGERS|' +
            'SP_MSADDMERGETRIGGERS_FROM_TEMPLATE|' +
            'SP_MSADDMERGETRIGGERS_INTERNAL|' +
            'SP_MSADDPEERLSN|' +
            'SP_MSADDSUBSCRIPTIONARTICLES|' +
            'SP_MSADJUST_PUB_IDENTITY|' +
            'SP_MSAGENT_RETRY_STETHOSCOPE|' +
            'SP_MSAGENT_STETHOSCOPE|' +
            'SP_MSALLOCATE_NEW_IDENTITY_RANGE|' +
            'SP_MSALREADYHAVEGENERATION|' +
            'SP_MSANONYMOUS_STATUS|' +
            'SP_MSARTICLECLEANUP|' +
            'SP_MSBROWSESNAPSHOTFOLDER|' +
            'SP_MSCACHE_AGENT_PARAMETER|' +
            'SP_MSCDC_CAPTURE_JOB|' +
            'SP_MSCDC_CLEANUP_JOB|' +
            'SP_MSCDC_DB_DDL_EVENT|' +
            'SP_MSCDC_DDL_EVENT|' +
            'SP_MSCDC_LOGDDL|' +
            'SP_MSCHANGE_ARTICLE|' +
            'SP_MSCHANGE_DISTRIBUTION_AGENT_PROPERTIES|' +
            'SP_MSCHANGE_LOGREADER_AGENT_PROPERTIES|' +
            'SP_MSCHANGE_MERGE_AGENT_PROPERTIES|' +
            'SP_MSCHANGE_MERGEARTICLE|' +
            'SP_MSCHANGE_MERGEPUBLICATION|' +
            'SP_MSCHANGE_ORIGINATORID|' +
            'SP_MSCHANGE_PRIORITY|' +
            'SP_MSCHANGE_PUBLICATION|' +
            'SP_MSCHANGE_RETENTION|' +
            'SP_MSCHANGE_RETENTION_PERIOD_UNIT|' +
            'SP_MSCHANGE_SNAPSHOT_AGENT_PROPERTIES|' +
            'SP_MSCHANGE_SUBSCRIPTION_DTS_INFO|' +
            'SP_MSCHANGEARTICLERESOLVER|' +
            'SP_MSCHANGEDYNAMICSNAPSHOTJOBATDISTRIBUTOR|' +
            'SP_MSCHANGEDYNSNAPLOCATIONATDISTRIBUTOR|' +
            'SP_MSCHANGEOBJECTOWNER|' +
            'SP_MSCHECK_AGENT_INSTANCE|' +
            'SP_MSCHECK_JET_SUBSCRIBER|' +
            'SP_MSCHECK_LOGICALRECORD_METADATAMATCH|' +
            'SP_MSCHECK_MERGE_SUBSCRIPTION_COUNT|' +
            'SP_MSCHECK_PUB_IDENTITY|' +
            'SP_MSCHECK_PULL_ACCESS|' +
            'SP_MSCHECK_SNAPSHOT_AGENT|' +
            'SP_MSCHECK_SUBSCRIPTION|' +
            'SP_MSCHECK_SUBSCRIPTION_EXPIRY|' +
            'SP_MSCHECK_SUBSCRIPTION_PARTITION|' +
            'SP_MSCHECK_TRAN_RETENTION|' +
            'SP_MSCHECKEXISTSGENERATION|' +
            'SP_MSCHECKEXISTSRECGUID|' +
            'SP_MSCHECKFAILEDPREVIOUSSYNC|' +
            'SP_MSCHECKIDENTITYRANGE|' +
            'SP_MSCHECKISPUBOFSUB|' +
            'SP_MSCHECKSHAREDAGENTFORPUBLICATION|' +
            'SP_MSCHECKSNAPSHOTSTATUS|' +
            'SP_MSCLEANUP_AGENT_ENTRY|' +
            'SP_MSCLEANUP_CONFLICT|' +
            'SP_MSCLEANUP_PUBLICATION_ADINFO|' +
            'SP_MSCLEANUP_SUBSCRIPTION_DISTSIDE_ENTRY|' +
            'SP_MSCLEANUPDYNAMICSNAPSHOTFOLDER|' +
            'SP_MSCLEANUPDYNSNAPSHOTVWS|' +
            'SP_MSCLEANUPFORPULLREINIT|' +
            'SP_MSCLEANUPMERGEPUBLISHER_INTERNAL|' +
            'SP_MSCLEAR_DYNAMIC_SNAPSHOT_LOCATION|' +
            'SP_MSCLEARRESETPARTIALSNAPSHOTPROGRESSBIT|' +
            'SP_MSCOMPUTELASTSENTGEN|' +
            'SP_MSCOMPUTEMERGEARTICLESCREATIONORDER|' +
            'SP_MSCOMPUTEMERGEUNRESOLVEDREFS|' +
            'SP_MSCONFLICTTABLEEXISTS|' +
            'SP_MSCREATE_ALL_ARTICLE_REPL_VIEWS|' +
            'SP_MSCREATE_ARTICLE_REPL_VIEWS|' +
            'SP_MSCREATE_DIST_TABLES|' +
            'SP_MSCREATE_LOGICAL_RECORD_VIEWS|' +
            'SP_MSCREATE_SUB_TABLES|' +
            'SP_MSCREATE_TEMPGENHISTORYTABLE|' +
            'SP_MSCREATEDISABLEDMLTRIGGER|' +
            'SP_MSCREATEDUMMYGENERATION|' +
            'SP_MSCREATEGLOBALREPLICA|' +
            'SP_MSCREATELIGHTWEIGHTINSERTPROC|' +
            'SP_MSCREATELIGHTWEIGHTMULTIPURPOSEPROC|' +
            'SP_MSCREATELIGHTWEIGHTPROCSTRIGGERSCONSTRAINTS|' +
            'SP_MSCREATELIGHTWEIGHTUPDATEPROC|' +
            'SP_MSCREATEMERGEDYNAMICSNAPSHOT|' +
            'SP_MSCREATERETRY|' +
            'SP_MSDBUSERACCESS|' +
            'SP_MSDBUSERPRIV|' +
            'SP_MSDEFER_CHECK|' +
            'SP_MSDELETE_TRACER_HISTORY|' +
            'SP_MSDELETEFOLDERCONTENTS|' +
            'SP_MSDELETEMETADATAACTIONREQUEST|' +
            'SP_MSDELETEPEERCONFLICTROW|' +
            'SP_MSDELETERETRY|' +
            'SP_MSDELETETRANCONFLICTROW|' +
            'SP_MSDELGENZERO|' +
            'SP_MSDELROW|' +
            'SP_MSDELROWSBATCH|' +
            'SP_MSDELROWSBATCH_DOWNLOADONLY|' +
            'SP_MSDELSUBROWS|' +
            'SP_MSDELSUBROWSBATCH|' +
            'SP_MSDEPENDENCIES|' +
            'SP_MSDETECT_NONLOGGED_SHUTDOWN|' +
            'SP_MSDETECTINVALIDPEERCONFIGURATION|' +
            'SP_MSDETECTINVALIDPEERSUBSCRIPTION|' +
            'SP_MSDIST_ACTIVATE_AUTO_SUB|' +
            'SP_MSDIST_ADJUST_IDENTITY|' +
            'SP_MSDISTPUBLISHER_CLEANUP|' +
            'SP_MSDISTRIBUTION_COUNTERS|' +
            'SP_MSDISTRIBUTORAVAILABLE|' +
            'SP_MSDODATABASESNAPSHOTINITIATION|' +
            'SP_MSDOPARTIALDATABASESNAPSHOTINITIATION|' +
            'SP_MSDROP_6X_PUBLICATION|' +
            'SP_MSDROP_6X_REPLICATION_AGENT|' +
            'SP_MSDROP_ANONYMOUS_ENTRY|' +
            'SP_MSDROP_ARTICLE|' +
            'SP_MSDROP_DISTRIBUTION_AGENT|' +
            'SP_MSDROP_DISTRIBUTION_AGENTID_DBOWNER_PROXY|' +
            'SP_MSDROP_DYNAMIC_SNAPSHOT_AGENT|' +
            'SP_MSDROP_LOGREADER_AGENT|' +
            'SP_MSDROP_MERGE_AGENT|' +
            'SP_MSDROP_MERGE_SUBSCRIPTION|' +
            'SP_MSDROP_PUBLICATION|' +
            'SP_MSDROP_QREADER_HISTORY|' +
            'SP_MSDROP_SNAPSHOT_AGENT|' +
            'SP_MSDROP_SNAPSHOT_DIRS|' +
            'SP_MSDROP_SUBSCRIBER_INFO|' +
            'SP_MSDROP_SUBSCRIPTION|' +
            'SP_MSDROP_SUBSCRIPTION_3RD|' +
            'SP_MSDROP_TEMPGENHISTORYTABLE|' +
            'SP_MSDROPARTICLECONSTRAINTS|' +
            'SP_MSDROPARTICLETOMBSTONES|' +
            'SP_MSDROPCONSTRAINTS|' +
            'SP_MSDROPDYNSNAPSHOTVWS|' +
            'SP_MSDROPFKREFERENCINGARTICLE|' +
            'SP_MSDROPMERGEARTICLE|' +
            'SP_MSDROPMERGEDYNAMICSNAPSHOTJOB|' +
            'SP_MSDROPRETRY|' +
            'SP_MSDROPTEMPTABLE|' +
            'SP_MSDUMMYUPDATE|' +
            'SP_MSDUMMYUPDATE_LOGICALRECORD|' +
            'SP_MSDUMMYUPDATE90|' +
            'SP_MSDUMMYUPDATELIGHTWEIGHT|' +
            'SP_MSDYNAMICSNAPSHOTJOBEXISTSATDISTRIBUTOR|' +
            'SP_MSENABLE_PUBLICATION_FOR_HET_SUB|' +
            'SP_MSENSURE_SINGLE_INSTANCE|' +
            'SP_MSENUM_DISTRIBUTION|' +
            'SP_MSENUM_DISTRIBUTION_S|' +
            'SP_MSENUM_DISTRIBUTION_SD|' +
            'SP_MSENUM_LOGICALRECORD_CHANGES|' +
            'SP_MSENUM_LOGREADER|' +
            'SP_MSENUM_LOGREADER_S|' +
            'SP_MSENUM_LOGREADER_SD|' +
            'SP_MSENUM_MERGE|' +
            'SP_MSENUM_MERGE_AGENT_PROPERTIES|' +
            'SP_MSENUM_MERGE_S|' +
            'SP_MSENUM_MERGE_SD|' +
            'SP_MSENUM_MERGE_SUBSCRIPTIONS|' +
            'SP_MSENUM_MERGE_SUBSCRIPTIONS_90_PUBLICATION|' +
            'SP_MSENUM_MERGE_SUBSCRIPTIONS_90_PUBLISHER|' +
            'SP_MSENUM_METADATAACTION_REQUESTS|' +
            'SP_MSENUM_QREADER|' +
            'SP_MSENUM_QREADER_S|' +
            'SP_MSENUM_QREADER_SD|' +
            'SP_MSENUM_REPLICATION_AGENTS|' +
            'SP_MSENUM_REPLICATION_JOB|' +
            'SP_MSENUM_REPLQUEUES|' +
            'SP_MSENUM_REPLSQLQUEUES|' +
            'SP_MSENUM_SNAPSHOT|' +
            'SP_MSENUM_SNAPSHOT_S|' +
            'SP_MSENUM_SNAPSHOT_SD|' +
            'SP_MSENUM_SUBSCRIPTIONS|' +
            'SP_MSENUMALLPUBLICATIONS|' +
            'SP_MSENUMALLSUBSCRIPTIONS|' +
            'SP_MSENUMARTICLESLIGHTWEIGHT|' +
            'SP_MSENUMCHANGES|' +
            'SP_MSENUMCHANGES_BELONGTOPARTITION|' +
            'SP_MSENUMCHANGES_NOTBELONGTOPARTITION|' +
            'SP_MSENUMCHANGESDIRECT|' +
            'SP_MSENUMCHANGESLIGHTWEIGHT|' +
            'SP_MSENUMCOLUMNS|' +
            'SP_MSENUMCOLUMNSLIGHTWEIGHT|' +
            'SP_MSENUMDELETES_FORPARTITION|' +
            'SP_MSENUMDELETESLIGHTWEIGHT|' +
            'SP_MSENUMDELETESMETADATA|' +
            'SP_MSENUMDISTRIBUTIONAGENTPROPERTIES|' +
            'SP_MSENUMERATE_PAL|' +
            'SP_MSENUMGENERATIONS|' +
            'SP_MSENUMGENERATIONS90|' +
            'SP_MSENUMPARTIALCHANGES|' +
            'SP_MSENUMPARTIALCHANGESDIRECT|' +
            'SP_MSENUMPARTIALDELETES|' +
            'SP_MSENUMPUBREFERENCES|' +
            'SP_MSENUMREPLICAS|' +
            'SP_MSENUMREPLICAS90|' +
            'SP_MSENUMRETRIES|' +
            'SP_MSENUMSCHEMACHANGE|' +
            'SP_MSENUMSUBSCRIPTIONS|' +
            'SP_MSENUMTHIRDPARTYPUBLICATIONVENDORNAMES|' +
            'SP_MSESTIMATEMERGESNAPSHOTWORKLOAD|' +
            'SP_MSESTIMATESNAPSHOTWORKLOAD|' +
            'SP_MSEVALSUBSCRIBERINFO|' +
            'SP_MSEVALUATE_CHANGE_MEMBERSHIP_FOR_ALL_ARTICLES_IN_PUBID|' +
            'SP_MSEVALUATE_CHANGE_MEMBERSHIP_FOR_PUBID|' +
            'SP_MSEVALUATE_CHANGE_MEMBERSHIP_FOR_ROW|' +
            'SP_MSEXECWITHLSNOUTPUT|' +
            'SP_MSFAST_DELETE_TRANS|' +
            'SP_MSFETCHADJUSTIDENTITYRANGE|' +
            'SP_MSFETCHIDENTITYRANGE|' +
            'SP_MSFILLUPMISSINGCOLS|' +
            'SP_MSFILTERCLAUSE|' +
            'SP_MSFIX_6X_TASKS|' +
            'SP_MSFIXLINEAGEVERSIONS|' +
            'SP_MSFIXSUBCOLUMNBITMAPS|' +
            'SP_MSFIXUPBEFOREIMAGETABLES|' +
            'SP_MSFLUSH_ACCESS_CACHE|' +
            'SP_MSFORCE_DROP_DISTRIBUTION_JOBS|' +
            'SP_MSFORCEREENUMERATION|' +
            'SP_MSFOREACH_WORKER|' +
            'SP_MSFOREACHDB|' +
            'SP_MSFOREACHTABLE|' +
            'SP_MSGENERATEEXPANDPROC|' +
            'SP_MSGET_AGENT_NAMES|' +
            'SP_MSGET_ATTACH_STATE|' +
            'SP_MSGET_DDL_AFTER_REGULAR_SNAPSHOT|' +
            'SP_MSGET_DYNAMIC_SNAPSHOT_LOCATION|' +
            'SP_MSGET_IDENTITY_RANGE_INFO|' +
            'SP_MSGET_JOBSTATE|' +
            'SP_MSGET_LAST_TRANSACTION|' +
            'SP_MSGET_LATEST_PEERLSN|' +
            'SP_MSGET_LOAD_HINT|' +
            'SP_MSGET_LOG_SHIPPING_NEW_SESSIONID|' +
            'SP_MSGET_LOGICALRECORD_LINEAGE|' +
            'SP_MSGET_MAX_USED_IDENTITY|' +
            'SP_MSGET_MIN_SEQNO|' +
            'SP_MSGET_MSMERGE_ROWTRACK_COLINFO|' +
            'SP_MSGET_NEW_XACT_SEQNO|' +
            'SP_MSGET_OLEDBINFO|' +
            'SP_MSGET_PARTITIONID_EVAL_PROC|' +
            'SP_MSGET_PUBLICATION_FROM_TASKNAME|' +
            'SP_MSGET_PUBLISHER_RPC|' +
            'SP_MSGET_REPL_CMDS_ANONYMOUS|' +
            'SP_MSGET_REPL_COMMANDS|' +
            'SP_MSGET_REPL_ERROR|' +
            'SP_MSGET_SESSION_STATISTICS|' +
            'SP_MSGET_SHARED_AGENT|' +
            'SP_MSGET_SNAPSHOT_HISTORY|' +
            'SP_MSGET_SUBSCRIBER_PARTITION_ID|' +
            'SP_MSGET_SUBSCRIPTION_DTS_INFO|' +
            'SP_MSGET_SUBSCRIPTION_GUID|' +
            'SP_MSGET_SYNCTRAN_COMMANDS|' +
            'SP_MSGET_TYPE_WRAPPER|' +
            'SP_MSGETAGENTOFFLOADINFO|' +
            'SP_MSGETALERTINFO|' +
            'SP_MSGETALTERNATERECGENS|' +
            'SP_MSGETARTICLEREINITVALUE|' +
            'SP_MSGETCHANGECOUNT|' +
            'SP_MSGETCONFLICTINSERTPROC|' +
            'SP_MSGETCONFLICTTABLENAME|' +
            'SP_MSGETCURRENTPRINCIPAL|' +
            'SP_MSGETDATAMETADATABATCH|' +
            'SP_MSGETDBVERSION|' +
            'SP_MSGETDYNAMICSNAPSHOTAPPLOCK|' +
            'SP_MSGETDYNSNAPVALIDATIONTOKEN|' +
            'SP_MSGETISVALIDWINDOWSLOGINFROMDISTRIBUTOR|' +
            'SP_MSGETLASTRECGEN|' +
            'SP_MSGETLASTSENTGEN|' +
            'SP_MSGETLASTSENTRECGENS|' +
            'SP_MSGETLASTUPDATEDTIME|' +
            'SP_MSGETLIGHTWEIGHTMETADATABATCH|' +
            'SP_MSGETMAKEGENERATIONAPPLOCK|' +
            'SP_MSGETMAKEGENERATIONAPPLOCK_90|' +
            'SP_MSGETMAXBCPGEN|' +
            'SP_MSGETMAXSNAPSHOTTIMESTAMP|' +
            'SP_MSGETMERGEADMINAPPLOCK|' +
            'SP_MSGETMETADATA_CHANGEDLOGICALRECORDMEMBERS|' +
            'SP_MSGETMETADATABATCH|' +
            'SP_MSGETMETADATABATCH90|' +
            'SP_MSGETMETADATABATCH90NEW|' +
            'SP_MSGETONEROW|' +
            'SP_MSGETONEROWLIGHTWEIGHT|' +
            'SP_MSGETPEERCONFLICTROW|' +
            'SP_MSGETPEERLSNS|' +
            'SP_MSGETPEERTOPEERCOMMANDS|' +
            'SP_MSGETPEERWINNERROW|' +
            'SP_MSGETPUBINFO|' +
            'SP_MSGETREPLICAINFO|' +
            'SP_MSGETREPLICASTATE|' +
            'SP_MSGETROWMETADATA|' +
            'SP_MSGETROWMETADATALIGHTWEIGHT|' +
            'SP_MSGETSERVERPROPERTIES|' +
            'SP_MSGETSETUPBELONG_COST|' +
            'SP_MSGETSUBSCRIBERINFO|' +
            'SP_MSGETSUPPORTABILITYSETTINGS|' +
            'SP_MSGETTRANCFTSRCROW|' +
            'SP_MSGETTRANCONFLICTROW|' +
            'SP_MSGETVERSION|' +
            'SP_MSGRANTCONNECTREPLICATION|' +
            'SP_MSHASCHANGESLIGHTWEIGHT|' +
            'SP_MSHASDBACCESS|' +
            'SP_MSHELP_ARTICLE|' +
            'SP_MSHELP_DISTDB|' +
            'SP_MSHELP_DISTRIBUTION_AGENTID|' +
            'SP_MSHELP_IDENTITY_PROPERTY|' +
            'SP_MSHELP_LOGREADER_AGENTID|' +
            'SP_MSHELP_MERGE_AGENTID|' +
            'SP_MSHELP_PROFILE|' +
            'SP_MSHELP_PROFILECACHE|' +
            'SP_MSHELP_PUBLICATION|' +
            'SP_MSHELP_REPL_AGENT|' +
            'SP_MSHELP_REPLICATION_STATUS|' +
            'SP_MSHELP_REPLICATION_TABLE|' +
            'SP_MSHELP_SNAPSHOT_AGENT|' +
            'SP_MSHELP_SNAPSHOT_AGENTID|' +
            'SP_MSHELP_SUBSCRIBER_INFO|' +
            'SP_MSHELP_SUBSCRIPTION|' +
            'SP_MSHELP_SUBSCRIPTION_STATUS|' +
            'SP_MSHELPCOLUMNS|' +
            'SP_MSHELPCONFLICTPUBLICATIONS|' +
            'SP_MSHELPCREATEBEFORETABLE|' +
            'SP_MSHELPDESTOWNER|' +
            'SP_MSHELPDYNAMICSNAPSHOTJOBATDISTRIBUTOR|' +
            'SP_MSHELPFULLTEXTINDEX|' +
            'SP_MSHELPFULLTEXTSCRIPT|' +
            'SP_MSHELPINDEX|' +
            'SP_MSHELPLOGREADER_AGENT|' +
            'SP_MSHELPMERGEARTICLES|' +
            'SP_MSHELPMERGECONFLICTCOUNTS|' +
            'SP_MSHELPMERGEDYNAMICSNAPSHOTJOB|' +
            'SP_MSHELPMERGEIDENTITY|' +
            'SP_MSHELPMERGESCHEMAARTICLES|' +
            'SP_MSHELPOBJECTPUBLICATIONS|' +
            'SP_MSHELPREPLICATIONTRIGGERS|' +
            'SP_MSHELPSNAPSHOT_AGENT|' +
            'SP_MSHELPSUMMARYPUBLICATION|' +
            'SP_MSHELPTRACERTOKENHISTORY|' +
            'SP_MSHELPTRACERTOKENS|' +
            'SP_MSHELPTRANCONFLICTCOUNTS|' +
            'SP_MSHELPTYPE|' +
            'SP_MSHELPVALIDATIONDATE|' +
            'SP_MSIFEXISTSSUBSCRIPTION|' +
            'SP_MSINDEXSPACE|' +
            'SP_MSINIT_PUBLICATION_ACCESS|' +
            'SP_MSINIT_SUBSCRIPTION_AGENT|' +
            'SP_MSINITDYNAMICSUBSCRIBER|' +
            'SP_MSINSERT_IDENTITY|' +
            'SP_MSINSERTDELETECONFLICT|' +
            'SP_MSINSERTERRORLINEAGE|' +
            'SP_MSINSERTGENERATIONSCHEMACHANGES|' +
            'SP_MSINSERTGENHISTORY|' +
            'SP_MSINSERTLIGHTWEIGHTSCHEMACHANGE|' +
            'SP_MSINSERTSCHEMACHANGE|' +
            'SP_MSINVALIDATE_SNAPSHOT|' +
            'SP_MSISNONPKUKUPDATEINCONFLICT|' +
            'SP_MSISPEERTOPEERAGENT|' +
            'SP_MSISPKUPDATEINCONFLICT|' +
            'SP_MSISPUBLICATIONQUEUED|' +
            'SP_MSISREPLMERGEAGENT|' +
            'SP_MSISSNAPSHOTITEMAPPLIED|' +
            'SP_MSKILLDB|' +
            'SP_MSLOCK_AUTO_SUB|' +
            'SP_MSLOCK_DISTRIBUTION_AGENT|' +
            'SP_MSLOCKTABLE|' +
            'SP_MSLOGINMAPPINGS|' +
            'SP_MSMAKEARTICLEPROCS|' +
            'SP_MSMAKEBATCHINSERTPROC|' +
            'SP_MSMAKEBATCHUPDATEPROC|' +
            'SP_MSMAKECONFLICTINSERTPROC|' +
            'SP_MSMAKECTSVIEW|' +
            'SP_MSMAKEDELETEPROC|' +
            'SP_MSMAKEDYNSNAPSHOTVWS|' +
            'SP_MSMAKEEXPANDPROC|' +
            'SP_MSMAKEGENERATION|' +
            'SP_MSMAKEINSERTPROC|' +
            'SP_MSMAKEMETADATASELECTPROC|' +
            'SP_MSMAKESELECTPROC|' +
            'SP_MSMAKESYSTABLEVIEWS|' +
            'SP_MSMAKEUPDATEPROC|' +
            'SP_MSMAP_PARTITIONID_TO_GENERATIONS|' +
            'SP_MSMARKREINIT|' +
            'SP_MSMATCHKEY|' +
            'SP_MSMERGE_ALTERSCHEMAONLY|' +
            'SP_MSMERGE_ALTERTRIGGER|' +
            'SP_MSMERGE_ALTERVIEW|' +
            'SP_MSMERGE_DDLDISPATCHER|' +
            'SP_MSMERGE_GETGENCOUNT|' +
            'SP_MSMERGE_GETGENCUR_PUBLIC|' +
            'SP_MSMERGE_IS_SNAPSHOT_REQUIRED|' +
            'SP_MSMERGE_LOG_IDENTITY_RANGE_ALLOCATIONS|' +
            'SP_MSMERGE_PARSEGENLIST|' +
            'SP_MSMERGE_UPGRADE_SUBSCRIBER|' +
            'SP_MSMERGESUBSCRIBEDB|' +
            'SP_MSMERGEUPDATELASTSYNCINFO|' +
            'SP_MSNEEDMERGEMETADATARETENTIONCLEANUP|' +
            'SP_MSNONSQLDDL|' +
            'SP_MSNONSQLDDLFORSCHEMADDL|' +
            'SP_MSOBJECTPRIVS|' +
            'SP_MSPEERAPPLYRESPONSE|' +
            'SP_MSPEERAPPLYTOPOLOGYINFO|' +
            'SP_MSPEERCONFLICTDETECTION_STATUSCOLLECTION_APPLYRESPONSE|' +
            'SP_MSPEERCONFLICTDETECTION_STATUSCOLLECTION_SENDRESPONSE|' +
            'SP_MSPEERCONFLICTDETECTION_TOPOLOGY_APPLYRESPONSE|' +
            'SP_MSPEERDBINFO|' +
            'SP_MSPEERSENDRESPONSE|' +
            'SP_MSPEERSENDTOPOLOGYINFO|' +
            'SP_MSPEERTOPEERFWDINGEXEC|' +
            'SP_MSPOST_AUTO_PROC|' +
            'SP_MSPOSTAPPLYSCRIPT_FORSUBSCRIBERPROCS|' +
            'SP_MSPREP_EXCLUSIVE|' +
            'SP_MSPREPARE_MERGEARTICLE|' +
            'SP_MSPROFILE_IN_USE|' +
            'SP_MSPROXIEDMETADATA|' +
            'SP_MSPROXIEDMETADATABATCH|' +
            'SP_MSPROXIEDMETADATALIGHTWEIGHT|' +
            'SP_MSPUB_ADJUST_IDENTITY|' +
            'SP_MSPUBLICATION_ACCESS|' +
            'SP_MSPUBLICATIONCLEANUP|' +
            'SP_MSPUBLICATIONVIEW|' +
            'SP_MSQUERY_SYNCSTATES|' +
            'SP_MSQUERYSUBTYPE|' +
            'SP_MSRECORDSNAPSHOTDELIVERYPROGRESS|' +
            'SP_MSREENABLE_CHECK|' +
            'SP_MSREFRESH_ANONYMOUS|' +
            'SP_MSREFRESH_PUBLISHER_IDRANGE|' +
            'SP_MSREGENERATE_MERGETRIGGERSPROCS|' +
            'SP_MSREGISTERDYNSNAPSEQNO|' +
            'SP_MSREGISTERMERGESNAPPUBID|' +
            'SP_MSREGISTERSUBSCRIPTION|' +
            'SP_MSREINIT_FAILED_SUBSCRIPTIONS|' +
            'SP_MSREINIT_HUB|' +
            'SP_MSREINIT_SUBSCRIPTION|' +
            'SP_MSREINITOVERLAPPINGMERGEPUBLICATIONS|' +
            'SP_MSRELEASEDYNAMICSNAPSHOTAPPLOCK|' +
            'SP_MSRELEASEMAKEGENERATIONAPPLOCK|' +
            'SP_MSRELEASEMERGEADMINAPPLOCK|' +
            'SP_MSRELEASESLOTLOCK|' +
            'SP_MSRELEASESNAPSHOTDELIVERYSESSIONLOCK|' +
            'SP_MSREMOVE_MERGEREPLCOMMAND|' +
            'SP_MSREMOVEOFFLOADPARAMETER|' +
            'SP_MSREPL_AGENTSTATUSSUMMARY|' +
            'SP_MSREPL_BACKUP_COMPLETE|' +
            'SP_MSREPL_BACKUP_START|' +
            'SP_MSREPL_CHECK_PUBLISHER|' +
            'SP_MSREPL_CREATEDATATYPEMAPPINGS|' +
            'SP_MSREPL_DISTRIBUTIONAGENTSTATUSSUMMARY|' +
            'SP_MSREPL_DROPDATATYPEMAPPINGS|' +
            'SP_MSREPL_ENUMARTICLECOLUMNINFO|' +
            'SP_MSREPL_ENUMPUBLICATIONS|' +
            'SP_MSREPL_ENUMPUBLISHERTABLES|' +
            'SP_MSREPL_ENUMSUBSCRIPTIONS|' +
            'SP_MSREPL_ENUMTABLECOLUMNINFO|' +
            'SP_MSREPL_FIXPALROLE|' +
            'SP_MSREPL_GETDISTRIBUTORINFO|' +
            'SP_MSREPL_GETPKFKRELATION|' +
            'SP_MSREPL_GETTYPE_MAPPINGS|' +
            'SP_MSREPL_HELPARTICLERMO|' +
            'SP_MSREPL_INIT_BACKUP_LSNS|' +
            'SP_MSREPL_ISDBOWNER|' +
            'SP_MSREPL_ISLASTPUBINSHAREDSUBSCRIPTION|' +
            'SP_MSREPL_ISUSERINANYPAL|' +
            'SP_MSREPL_LINKEDSERVERS_ROWSET|' +
            'SP_MSREPL_MERGEAGENTSTATUSSUMMARY|' +
            'SP_MSREPL_PAL_ROLECHECK|' +
            'SP_MSREPL_RAISERROR|' +
            'SP_MSREPL_SCHEMA|' +
            'SP_MSREPL_SETNFR|' +
            'SP_MSREPL_SNAPSHOT_HELPARTICLECOLUMNS|' +
            'SP_MSREPL_SNAPSHOT_HELPPUBLICATION|' +
            'SP_MSREPL_STARTUP_INTERNAL|' +
            'SP_MSREPL_SUBSCRIPTION_ROWSET|' +
            'SP_MSREPL_TESTADMINCONNECTION|' +
            'SP_MSREPL_TESTCONNECTION|' +
            'SP_MSREPLAGENTJOBEXISTS|' +
            'SP_MSREPLCHECK_PERMISSION|' +
            'SP_MSREPLCHECK_PULL|' +
            'SP_MSREPLCHECK_SUBSCRIBE|' +
            'SP_MSREPLCHECK_SUBSCRIBE_WITHDDLADMIN|' +
            'SP_MSREPLCHECKOFFLOADSERVER|' +
            'SP_MSREPLCOPYSCRIPTFILE|' +
            'SP_MSREPLRAISERROR|' +
            'SP_MSREPLREMOVEUNCDIR|' +
            'SP_MSREPLUPDATESCHEMA|' +
            'SP_MSREQUESTREENUMERATION|' +
            'SP_MSREQUESTREENUMERATION_LIGHTWEIGHT|' +
            'SP_MSRESET_ATTACH_STATE|' +
            'SP_MSRESET_QUEUED_REINIT|' +
            'SP_MSRESET_SUBSCRIPTION|' +
            'SP_MSRESET_SUBSCRIPTION_SEQNO|' +
            'SP_MSRESET_SYNCTRAN_BIT|' +
            'SP_MSRESET_TRANSACTION|' +
            'SP_MSRESETSNAPSHOTDELIVERYPROGRESS|' +
            'SP_MSRESTORESAVEDFOREIGNKEYS|' +
            'SP_MSRETRIEVE_PUBLICATION_ATTRIBUTES|' +
            'SP_MSSCRIPT_ARTICLE_VIEW|' +
            'SP_MSSCRIPT_DRI|' +
            'SP_MSSCRIPT_PUB_UPD_TRIG|' +
            'SP_MSSCRIPT_SYNC_DEL_PROC|' +
            'SP_MSSCRIPT_SYNC_DEL_TRIG|' +
            'SP_MSSCRIPT_SYNC_INS_PROC|' +
            'SP_MSSCRIPT_SYNC_INS_TRIG|' +
            'SP_MSSCRIPT_SYNC_UPD_PROC|' +
            'SP_MSSCRIPT_SYNC_UPD_TRIG|' +
            'SP_MSSCRIPTCUSTOMDELPROC|' +
            'SP_MSSCRIPTCUSTOMINSPROC|' +
            'SP_MSSCRIPTCUSTOMUPDPROC|' +
            'SP_MSSCRIPTDATABASE|' +
            'SP_MSSCRIPTDB_WORKER|' +
            'SP_MSSCRIPTFOREIGNKEYRESTORE|' +
            'SP_MSSCRIPTSUBSCRIBERPROCS|' +
            'SP_MSSCRIPTVIEWPROC|' +
            'SP_MSSENDTOSQLQUEUE|' +
            'SP_MSSET_DYNAMIC_FILTER_OPTIONS|' +
            'SP_MSSET_LOGICALRECORD_METADATA|' +
            'SP_MSSET_NEW_IDENTITY_RANGE|' +
            'SP_MSSET_OLEDB_PROP|' +
            'SP_MSSET_SNAPSHOT_XACT_SEQNO|' +
            'SP_MSSET_SUB_GUID|' +
            'SP_MSSET_SUBSCRIPTION_PROPERTIES|' +
            'SP_MSSETACCESSLIST|' +
            'SP_MSSETALERTINFO|' +
            'SP_MSSETARTPROCS|' +
            'SP_MSSETBIT|' +
            'SP_MSSETCONFLICTSCRIPT|' +
            'SP_MSSETCONFLICTTABLE|' +
            'SP_MSSETCONTEXT_BYPASSWHOLEDDLEVENTBIT|' +
            'SP_MSSETCONTEXT_REPLAGENT|' +
            'SP_MSSETGENTOZERO|' +
            'SP_MSSETLASTRECGEN|' +
            'SP_MSSETLASTSENTGEN|' +
            'SP_MSSETREPLICAINFO|' +
            'SP_MSSETREPLICASCHEMAVERSION|' +
            'SP_MSSETREPLICASTATUS|' +
            'SP_MSSETROWMETADATA|' +
            'SP_MSSETSERVERPROPERTIES|' +
            'SP_MSSETSUBSCRIBERINFO|' +
            'SP_MSSETTOPOLOGY|' +
            'SP_MSSETUP_IDENTITY_RANGE|' +
            'SP_MSSETUP_PARTITION_GROUPS|' +
            'SP_MSSETUP_USE_PARTITION_GROUPS|' +
            'SP_MSSETUPBELONGS|' +
            'SP_MSSETUPNOSYNCSUBWITHLSNATDIST|' +
            'SP_MSSETUPNOSYNCSUBWITHLSNATDIST_CLEANUP|' +
            'SP_MSSETUPNOSYNCSUBWITHLSNATDIST_HELPER|' +
            'SP_MSSHAREDFIXEDDISK|' +
            'SP_MSSQLDMO70_VERSION|' +
            'SP_MSSQLDMO80_VERSION|' +
            'SP_MSSQLDMO90_VERSION|' +
            'SP_MSSQLOLE_VERSION|' +
            'SP_MSSQLOLE65_VERSION|' +
            'SP_MSSTARTDISTRIBUTION_AGENT|' +
            'SP_MSSTARTMERGE_AGENT|' +
            'SP_MSSTARTSNAPSHOT_AGENT|' +
            'SP_MSSTOPDISTRIBUTION_AGENT|' +
            'SP_MSSTOPMERGE_AGENT|' +
            'SP_MSSTOPSNAPSHOT_AGENT|' +
            'SP_MSSUB_CHECK_IDENTITY|' +
            'SP_MSSUB_SET_IDENTITY|' +
            'SP_MSSUBSCRIPTION_STATUS|' +
            'SP_MSSUBSCRIPTIONVALIDATED|' +
            'SP_MSTABLECHECKS|' +
            'SP_MSTABLEKEYS|' +
            'SP_MSTABLEREFS|' +
            'SP_MSTABLESPACE|' +
            'SP_MSTESTBIT|' +
            'SP_MSTRAN_DDLREPL|' +
            'SP_MSTRAN_IS_SNAPSHOT_REQUIRED|' +
            'SP_MSTRYPURGINGOLDSNAPSHOTDELIVERYPROGRESS|' +
            'SP_MSUNIQUENAME|' +
            'SP_MSUNMARKIFNEEDED|' +
            'SP_MSUNMARKREPLINFO|' +
            'SP_MSUNMARKSCHEMAOBJECT|' +
            'SP_MSUNREGISTERSUBSCRIPTION|' +
            'SP_MSUPDATE_AGENTTYPE_DEFAULT|' +
            'SP_MSUPDATE_SINGLELOGICALRECORDMETADATA|' +
            'SP_MSUPDATE_SUBSCRIBER_INFO|' +
            'SP_MSUPDATE_SUBSCRIBER_SCHEDULE|' +
            'SP_MSUPDATE_SUBSCRIBER_TRACER_HISTORY|' +
            'SP_MSUPDATE_SUBSCRIPTION|' +
            'SP_MSUPDATE_TRACER_HISTORY|' +
            'SP_MSUPDATECACHEDPEERLSN|' +
            'SP_MSUPDATEGENERATIONS_AFTERBCP|' +
            'SP_MSUPDATEGENHISTORY|' +
            'SP_MSUPDATEINITIALLIGHTWEIGHTSUBSCRIPTION|' +
            'SP_MSUPDATELASTSYNCINFO|' +
            'SP_MSUPDATEPEERLSN|' +
            'SP_MSUPDATERECGEN|' +
            'SP_MSUPDATEREPLICASTATE|' +
            'SP_MSUPDATESYSMERGEARTICLES|' +
            'SP_MSUPLINEAGEVERSION|' +
            'SP_MSUPLOADSUPPORTABILITYDATA|' +
            'SP_MSUSELIGHTWEIGHTREPLICATION|' +
            'SP_MSVALIDATE_DEST_RECGEN|' +
            'SP_MSVALIDATE_SUBSCRIPTION|' +
            'SP_MSVALIDATE_WELLPARTITIONED_ARTICLES|' +
            'SP_MSVALIDATEARTICLE|' +
            'SP_MSWRITEMERGEPERFCOUNTER|' +
            'SP_OBJECTFILEGROUP|' +
            'SP_OLEDB_DATABASE|' +
            'SP_OLEDB_DEFDB|' +
            'SP_OLEDB_DEFLANG|' +
            'SP_OLEDB_LANGUAGE|' +
            'SP_OLEDB_RO_USRNAME|' +
            'SP_OLEDBINFO|' +
            'SP_ORBITMAP|' +
            'SP_PASSWORD|' +
            'SP_PEERCONFLICTDETECTION_TABLEAUG|' +
            'SP_PKEYS|' +
            'SP_POSTTRACERTOKEN|' +
            'SP_PRIMARY_KEYS_ROWSET|' +
            'SP_PRIMARY_KEYS_ROWSET_RMT|' +
            'SP_PRIMARY_KEYS_ROWSET2|' +
            'SP_PRIMARYKEYS|' +
            'SP_PROCEDURE_PARAMS_100_MANAGED|' +
            'SP_PROCEDURE_PARAMS_100_ROWSET|' +
            'SP_PROCEDURE_PARAMS_100_ROWSET2|' +
            'SP_PROCEDURE_PARAMS_90_ROWSET|' +
            'SP_PROCEDURE_PARAMS_90_ROWSET2|' +
            'SP_PROCEDURE_PARAMS_MANAGED|' +
            'SP_PROCEDURE_PARAMS_ROWSET|' +
            'SP_PROCEDURE_PARAMS_ROWSET2|' +
            'SP_PROCEDURES_ROWSET|' +
            'SP_PROCEDURES_ROWSET2|' +
            'SP_PROCESSLOGSHIPPINGMONITORHISTORY|' +
            'SP_PROCESSLOGSHIPPINGMONITORPRIMARY|' +
            'SP_PROCESSLOGSHIPPINGMONITORSECONDARY|' +
            'SP_PROCESSLOGSHIPPINGRETENTIONCLEANUP|' +
            'SP_PROCOPTION|' +
            'SP_PROP_OLEDB_PROVIDER|' +
            'SP_PROVIDER_TYPES_100_ROWSET|' +
            'SP_PROVIDER_TYPES_90_ROWSET|' +
            'SP_PROVIDER_TYPES_ROWSET|' +
            'SP_PUBLICATION_VALIDATION|' +
            'SP_PUBLICATIONSUMMARY|' +
            'SP_PUBLISHDB|' +
            'SP_PUBLISHERPROPERTY|' +
            'SP_READERRORLOG|' +
            'SP_RECOMPILE|' +
            'SP_REDIRECT_PUBLISHER|' +
            'SP_REFRESH_HETEROGENEOUS_PUBLISHER|' +
            'SP_REFRESH_LOG_SHIPPING_MONITOR|' +
            'SP_REFRESHSQLMODULE|' +
            'SP_REFRESHSUBSCRIPTIONS|' +
            'SP_REFRESHVIEW|' +
            'SP_REGISTER_CUSTOM_SCRIPTING|' +
            'SP_REGISTERCUSTOMRESOLVER|' +
            'SP_REINITMERGEPULLSUBSCRIPTION|' +
            'SP_REINITMERGESUBSCRIPTION|' +
            'SP_REINITPULLSUBSCRIPTION|' +
            'SP_REINITSUBSCRIPTION|' +
            'SP_RELEASEAPPLOCK|' +
            'SP_REMOTEOPTION|' +
            'SP_REMOVEDBREPLICATION|' +
            'SP_REMOVEDISTPUBLISHERDBREPLICATION|' +
            'SP_REMOVESRVREPLICATION|' +
            'SP_RENAME|' +
            'SP_RENAMEDB|' +
            'SP_REPLADDCOLUMN|' +
            'SP_REPLCLEANUPCCSPROCS|' +
            'SP_REPLDELETEQUEUEDTRAN|' +
            'SP_REPLDROPCOLUMN|' +
            'SP_REPLGETPARSEDDDLCMD|' +
            'SP_REPLICA|' +
            'SP_REPLICATION_AGENT_CHECKUP|' +
            'SP_REPLICATIONDBOPTION|' +
            'SP_REPLINCREMENTLSN|' +
            'SP_REPLMONITORCHANGEPUBLICATIONTHRESHOLD|' +
            'SP_REPLMONITORHELPMERGESESSION|' +
            'SP_REPLMONITORHELPMERGESESSIONDETAIL|' +
            'SP_REPLMONITORHELPMERGESUBSCRIPTIONMOREINFO|' +
            'SP_REPLMONITORHELPPUBLICATION|' +
            'SP_REPLMONITORHELPPUBLICATIONTHRESHOLDS|' +
            'SP_REPLMONITORHELPPUBLISHER|' +
            'SP_REPLMONITORHELPSUBSCRIPTION|' +
            'SP_REPLMONITORREFRESHJOB|' +
            'SP_REPLMONITORSUBSCRIPTIONPENDINGCMDS|' +
            'SP_REPLPOSTSYNCSTATUS|' +
            'SP_REPLQUEUEMONITOR|' +
            'SP_REPLRESTART|' +
            'SP_REPLRETHROW|' +
            'SP_REPLSETORIGINATOR|' +
            'SP_REPLSHOWCMDS|' +
            'SP_REPLSQLQGETROWS|' +
            'SP_REPLSYNC|' +
            'SP_REQUESTPEERRESPONSE|' +
            'SP_REQUESTPEERTOPOLOGYINFO|' +
            'SP_RESETSNAPSHOTDELIVERYPROGRESS|' +
            'SP_RESETSTATUS|' +
            'SP_RESIGN_DATABASE|' +
            'SP_RESOLVE_LOGINS|' +
            'SP_RESTOREDBREPLICATION|' +
            'SP_RESTOREMERGEIDENTITYRANGE|' +
            'SP_RESYNCMERGESUBSCRIPTION|' +
            'SP_REVOKE_PUBLICATION_ACCESS|' +
            'SP_REVOKEDBACCESS|' +
            'SP_REVOKELOGIN|' +
            'SP_SCHEMAFILTER|' +
            'SP_SCHEMATA_ROWSET|' +
            'SP_SCRIPT_RECONCILIATION_DELPROC|' +
            'SP_SCRIPT_RECONCILIATION_INSPROC|' +
            'SP_SCRIPT_RECONCILIATION_SINSPROC|' +
            'SP_SCRIPT_RECONCILIATION_VDELPROC|' +
            'SP_SCRIPT_RECONCILIATION_XDELPROC|' +
            'SP_SCRIPT_SYNCTRAN_COMMANDS|' +
            'SP_SCRIPTDELPROC|' +
            'SP_SCRIPTDYNAMICUPDPROC|' +
            'SP_SCRIPTINSPROC|' +
            'SP_SCRIPTMAPPEDUPDPROC|' +
            'SP_SCRIPTPUBLICATIONCUSTOMPROCS|' +
            'SP_SCRIPTSINSPROC|' +
            'SP_SCRIPTSUBCONFLICTTABLE|' +
            'SP_SCRIPTSUPDPROC|' +
            'SP_SCRIPTUPDPROC|' +
            'SP_SCRIPTVDELPROC|' +
            'SP_SCRIPTVUPDPROC|' +
            'SP_SCRIPTXDELPROC|' +
            'SP_SCRIPTXUPDPROC|' +
            'SP_SEQUENCE_GET_RANGE|' +
            'SP_SERVER_DIAGNOSTICS|' +
            'SP_SERVER_INFO|' +
            'SP_SERVEROPTION|' +
            'SP_SET_SESSION_CONTEXT|' +
            'SP_SETAPPROLE|' +
            'SP_SETAUTOSAPASSWORDANDDISABLE|' +
            'SP_SETDEFAULTDATATYPEMAPPING|' +
            'SP_SETNETNAME|' +
            'SP_SETORACLEPACKAGEVERSION|' +
            'SP_SETREPLFAILOVERMODE|' +
            'SP_SETSUBSCRIPTIONXACTSEQNO|' +
            'SP_SETTRIGGERORDER|' +
            'SP_SHOWCOLV|' +
            'SP_SHOWLINEAGE|' +
            'SP_SHOWPENDINGCHANGES|' +
            'SP_SHOWROWREPLICAINFO|' +
            'SP_SPACEUSED|' +
            'SP_SPARSE_COLUMNS_100_ROWSET|' +
            'SP_SPECIAL_COLUMNS|' +
            'SP_SPECIAL_COLUMNS_100|' +
            'SP_SPECIAL_COLUMNS_90|' +
            'SP_SPROC_COLUMNS|' +
            'SP_SPROC_COLUMNS_100|' +
            'SP_SPROC_COLUMNS_90|' +
            'SP_SQLEXEC|' +
            'SP_SRVROLEPERMISSION|' +
            'SP_STARTMERGEPULLSUBSCRIPTION_AGENT|' +
            'SP_STARTMERGEPUSHSUBSCRIPTION_AGENT|' +
            'SP_STARTPUBLICATION_SNAPSHOT|' +
            'SP_STARTPULLSUBSCRIPTION_AGENT|' +
            'SP_STARTPUSHSUBSCRIPTION_AGENT|' +
            'SP_STATISTICS|' +
            'SP_STATISTICS_100|' +
            'SP_STATISTICS_ROWSET|' +
            'SP_STATISTICS_ROWSET2|' +
            'SP_STOPMERGEPULLSUBSCRIPTION_AGENT|' +
            'SP_STOPMERGEPUSHSUBSCRIPTION_AGENT|' +
            'SP_STOPPUBLICATION_SNAPSHOT|' +
            'SP_STOPPULLSUBSCRIPTION_AGENT|' +
            'SP_STOPPUSHSUBSCRIPTION_AGENT|' +
            'SP_STORED_PROCEDURES|' +
            'SP_SUBSCRIBE|' +
            'SP_SUBSCRIPTION_CLEANUP|' +
            'SP_SUBSCRIPTIONSUMMARY|' +
            'SP_SYSPOLICY_EXECUTE_POLICY|' +
            'SP_SYSPOLICY_SUBSCRIBE_TO_POLICY_CATEGORY|' +
            'SP_SYSPOLICY_UNSUBSCRIBE_FROM_POLICY_CATEGORY|' +
            'SP_SYSPOLICY_UPDATE_DDL_TRIGGER|' +
            'SP_SYSPOLICY_UPDATE_EVENT_NOTIFICATION|' +
            'SP_TABLE_CONSTRAINTS_ROWSET|' +
            'SP_TABLE_CONSTRAINTS_ROWSET2|' +
            'SP_TABLE_PRIVILEGES|' +
            'SP_TABLE_PRIVILEGES_EX|' +
            'SP_TABLE_PRIVILEGES_ROWSET|' +
            'SP_TABLE_PRIVILEGES_ROWSET_RMT|' +
            'SP_TABLE_PRIVILEGES_ROWSET2|' +
            'SP_TABLE_STATISTICS_ROWSET|' +
            'SP_TABLE_STATISTICS2_ROWSET|' +
            'SP_TABLE_TYPE_COLUMNS_100|' +
            'SP_TABLE_TYPE_COLUMNS_100_ROWSET|' +
            'SP_TABLE_TYPE_PKEYS|' +
            'SP_TABLE_TYPE_PRIMARY_KEYS_ROWSET|' +
            'SP_TABLE_TYPES|' +
            'SP_TABLE_TYPES_ROWSET|' +
            'SP_TABLE_VALIDATION|' +
            'SP_TABLECOLLATIONS|' +
            'SP_TABLECOLLATIONS_100|' +
            'SP_TABLECOLLATIONS_90|' +
            'SP_TABLEOPTION|' +
            'SP_TABLES|' +
            'SP_TABLES_EX|' +
            'SP_TABLES_INFO_90_ROWSET|' +
            'SP_TABLES_INFO_90_ROWSET_64|' +
            'SP_TABLES_INFO_90_ROWSET2|' +
            'SP_TABLES_INFO_90_ROWSET2_64|' +
            'SP_TABLES_INFO_ROWSET|' +
            'SP_TABLES_INFO_ROWSET_64|' +
            'SP_TABLES_INFO_ROWSET2|' +
            'SP_TABLES_INFO_ROWSET2_64|' +
            'SP_TABLES_ROWSET|' +
            'SP_TABLES_ROWSET_RMT|' +
            'SP_TABLES_ROWSET2|' +
            'SP_TABLESWC|' +
            'SP_TRACE_GETDATA|' +
            'SP_UNBINDEFAULT|' +
            'SP_UNBINDRULE|' +
            'SP_UNREGISTER_CUSTOM_SCRIPTING|' +
            'SP_UNREGISTERCUSTOMRESOLVER|' +
            'SP_UNSETAPPROLE|' +
            'SP_UNSUBSCRIBE|' +
            'SP_UPDATE_AGENT_PROFILE|' +
            'SP_UPDATEEXTENDEDPROPERTY|' +
            'SP_UPDATESTATS|' +
            'SP_UPGRADE_LOG_SHIPPING|' +
            'SP_USER_COUNTER1|' +
            'SP_USER_COUNTER10|' +
            'SP_USER_COUNTER2|' +
            'SP_USER_COUNTER3|' +
            'SP_USER_COUNTER4|' +
            'SP_USER_COUNTER5|' +
            'SP_USER_COUNTER6|' +
            'SP_USER_COUNTER7|' +
            'SP_USER_COUNTER8|' +
            'SP_USER_COUNTER9|' +
            'SP_USERTYPES_ROWSET|' +
            'SP_USERTYPES_ROWSET_RMT|' +
            'SP_USERTYPES_ROWSET2|' +
            'SP_VALIDATE_REDIRECTED_PUBLISHER|' +
            'SP_VALIDATE_REPLICA_HOSTS_AS_PUBLISHERS|' +
            'SP_VALIDATECACHE|' +
            'SP_VALIDATELOGINS|' +
            'SP_VALIDATEMERGEPUBLICATION|' +
            'SP_VALIDATEMERGEPULLSUBSCRIPTION|' +
            'SP_VALIDATEMERGESUBSCRIPTION|' +
            'SP_VALIDLANG|' +
            'SP_VALIDNAME|' +
            'SP_VERIFYPUBLISHER|' +
            'SP_VIEWS_ROWSET|' +
            'SP_VIEWS_ROWSET2|' +
            'SP_VUPGRADE_MERGEOBJECTS|' +
            'SP_VUPGRADE_MERGETABLES|' +
            'SP_VUPGRADE_REPLICATION|' +
            'SP_VUPGRADE_REPLSECURITY_METADATA|' +
            'SP_WHO|' +
            'SP_WHO2|' +
            'SP_XML_SCHEMA_ROWSET|' +
            'SP_XML_SCHEMA_ROWSET2|' +
            'SP_XTP_BIND_DB_RESOURCE_POOL|' +
            'SP_XTP_CHECKPOINT_FORCE_GARBAGE_COLLECTION|' +
            'SP_XTP_CONTROL_PROC_EXEC_STATS|' +
            'SP_XTP_CONTROL_QUERY_EXEC_STATS|' +
            'SP_XTP_MERGE_CHECKPOINT_FILES|' +
            'SP_XTP_UNBIND_DB_RESOURCE_POOL|' +
            'XP_GRANTLOGIN|' +
            'XP_LOGININFO|' +
            'XP_REPL_CONVERT_ENCRYPT_SYSADMIN_WRAPPER|' +
            'XP_REVOKELOGIN' +
            ')\\b',
      relevance: 10
    },
    hljs.C_NUMBER_MODE,
    {
      className: 'string',
      begin: '\'',
      end: '\'',
      contains: [ {begin: '\'\''} ],
      relevance: 0
    },
    {
      className: 'string',
      begin: 'N\'',
      end: '\'',
      contains: [ {begin: '\'\''} ],
      relevance: 10
    },
    {
      className: 'symbol',
      variants: [
      {begin: '[a-z_@#][a-z0-9@$#_]*'},
      {begin: '\\[', end: ']', contains: [ {begin: ']]'} ]},
      {begin:   '"', end: '"', contains: [ {begin: '""'} ]}
      ],
      relevance: 0
    },
    hljs.COMMENT('--', '$'),
    {
      className: 'comment',
      begin: '/\\*',
      end: '\\*/',
      contains: [ 'self' ]
    },
    {
      className: 'meta',
      begin: '^\\s*:(' +
        '!!|' +
            'connect|' +
            'error|' +
            'exit|' +
            'on\\s+error|' +
            'out|' +
            'quit|' +
            'r|' +
            'reset|' +
            'setvar' +
            ')',
      end: '$'
    }
    ]
  };
}
