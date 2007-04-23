SQL_KEYWORDS = {'all': 1, 'partial': 1, 'global': 1, 'month': 1, 'current_timestamp': 1, 'using': 1, 'go': 1, 'revoke': 1, 'smallint': 1, 'indicator': 1, 'end-exec': 1, 'disconnect': 1, 'zone': 1, 'with': 1, 'character': 1, 'assertion': 1, 'to': 1, 'add': 1, 'current_user': 1, 'usage': 1, 'input': 1, 'local': 1, 'alter': 1, 'match': 1, 'collate': 1, 'real': 1, 'then': 1, 'rollback': 1, 'get': 1, 'read': 1, 'timestamp': 1, 'session_user': 1, 'not': 1, 'integer': 1, 'bit': 1, 'unique': 1, 'day': 1, 'minute': 1, 'desc': 1, 'insert': 1, 'execute': 1, 'like': 1, 'level': 1, 'decimal': 1, 'drop': 1, 'continue': 1, 'isolation': 1, 'found': 1, 'where': 1, 'constraints': 1, 'domain': 1, 'right': 1, 'national': 1, 'some': 1, 'module': 1, 'transaction': 1, 'relative': 1, 'second': 1, 'connect': 1, 'escape': 1, 'close': 1, 'system_user': 1, 'for': 1, 'deferred': 1, 'section': 1, 'cast': 1, 'current': 1, 'sqlstate': 1, 'allocate': 1, 'intersect': 1, 'deallocate': 1, 'numeric': 1, 'public': 1, 'preserve': 1, 'full': 1, 'goto': 1, 'initially': 1, 'asc': 1, 'no': 1, 'key': 1, 'output': 1, 'collation': 1, 'group': 1, 'by': 1, 'union': 1, 'session': 1, 'both': 1, 'last': 1, 'language': 1, 'constraint': 1, 'column': 1, 'of': 1, 'space': 1, 'foreign': 1, 'deferrable': 1, 'prior': 1, 'connection': 1, 'unknown': 1, 'action': 1, 'commit': 1, 'view': 1, 'or': 1, 'first': 1, 'into': 1, 'float': 1, 'year': 1, 'primary': 1, 'cascaded': 1, 'except': 1, 'restrict': 1, 'set': 1, 'references': 1, 'names': 1, 'table': 1, 'outer': 1, 'open': 1, 'select': 1, 'size': 1, 'are': 1, 'rows': 1, 'from': 1, 'prepare': 1, 'distinct': 1, 'leading': 1, 'create': 1, 'only': 1, 'next': 1, 'inner': 1, 'authorization': 1, 'schema': 1, 'corresponding': 1, 'option': 1, 'declare': 1, 'precision': 1, 'immediate': 1, 'else': 1, 'timezone_minute': 1, 'external': 1, 'varying': 1, 'translation': 1, 'true': 1, 'case': 1, 'exception': 1, 'join': 1, 'hour': 1, 'default': 1, 'double': 1, 'scroll': 1, 'value': 1, 'cursor': 1, 'descriptor': 1, 'values': 1, 'dec': 1, 'fetch': 1, 'procedure': 1, 'delete': 1, 'and': 1, 'false': 1, 'int': 1, 'is': 1, 'describe': 1, 'char': 1, 'as': 1, 'at': 1, 'in': 1, 'varchar': 1, 'null': 1, 'trailing': 1, 'any': 1, 'absolute': 1, 'current_time': 1, 'end': 1, 'grant': 1, 'privileges': 1, 'when': 1, 'cross': 1, 'check': 1, 'write': 1, 'current_date': 1, 'pad': 1, 'begin': 1, 'temporary': 1, 'exec': 1, 'time': 1, 'update': 1, 'catalog': 1, 'user': 1, 'sql': 1, 'date': 1, 'on': 1, 'identity': 1, 'timezone_hour': 1, 'natural': 1, 'whenever': 1, 'interval': 1, 'work': 1, 'order': 1, 'cascade': 1, 'diagnostics': 1, 'nchar': 1, 'having': 1, 'left': 1};

LANGUAGES.sql =
{
  case_insensitive: true,
  defaultMode:
  {
    lexems: [IDENT_RE],
    contains: ['string', 'number', 'comment'],
    keywords: {
      'keyword': SQL_KEYWORDS,
      'aggregate': {'count': 1, 'sum': 1, 'min': 1, 'max': 1, 'avg': 1}
    }
  },

  modes: [
    C_NUMBER_MODE,
    C_BLOCK_COMMENT_MODE,
    {
      className: 'comment',
      begin: '--', end: '$'
    },
    {
      className: 'string',
      begin: '\'', end: '\'',
      contains: ['escape', 'squote'],
      relevance: 0
    },
    {
      className: 'squote',
      begin: '\'\'', end: '^'
    },
    {
      className: 'string',
      begin: '"', end: '"',
      contains: [ 'escape', 'dquote'],
      relevance: 0
    },
    {
      className: 'dquote',
      begin: '""', end: '^'
    },
    {
      className: 'string',
      begin: '`', end: '`',
      contains: ['escape']
    },
    BACKSLASH_ESCAPE
  ]
};//sql
