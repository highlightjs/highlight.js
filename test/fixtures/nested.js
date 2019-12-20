module.exports = function(hljs) {
  var BODY = {
    className: 'body', endsWithParent: true
  };
  var LIST = {
    className: 'list',
    variants: [
      {begin: /\(/, end: /\)/},
      {begin: /\[/, end: /\]/}
    ],
    contains: [BODY]
  };
  BODY.contains = [LIST];
  return {
    disableAutodetect: true,
    contains: [LIST]
  }
};
