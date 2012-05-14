/*
Language: Objective C
Author: Valerii Hiora <valerii.hiora@gmail.com>
Contributors: Angel G. Olloqui <angelgarcia.mail@gmail.com>
*/

hljs.LANGUAGES.objectivec = function(){
  var OBJC_KEYWORDS = {
    'keyword': {
      'int': 1, 'float': 1, 'while': 1, 'private': 1, 'char': 1,
      'catch': 1, 'export': 1, 'sizeof': 1, 'typedef': 1, 'const': 1,
      'struct': 1, 'for': 1, 'union': 1, 'unsigned': 1, 'long': 1,
      'volatile': 1, 'static': 1, 'protected': 1, 'bool': 1, 'mutable': 1,
      'if': 1, 'public': 1, 'do': 1, 'return': 1, 'goto': 1, 'void': 1,
      'enum': 1, 'else': 1, 'break': 1, 'extern': 1, 'class': 1,
      'asm': 1, 'case': 1, 'short': 1, 'default': 1, 'double': 1, 'throw': 1,
      'register': 1, 'explicit': 1, 'signed': 1, 'typename': 1, 'try': 1,
      'this': 1, 'switch': 1, 'continue': 1, 'wchar_t': 1, 'inline': 1,
      'readonly': 1, 'assign': 1, 'property': 1, 'protocol': 1, 'self': 1,
      'synchronized': 1, 'end': 1, 'synthesize': 1, 'id': 1, 'optional': 1,
      'required': 1, 'implementation': 1, 'nonatomic': 1,'interface': 1,
      'super': 1, 'unichar': 1, 'finally': 1, 'dynamic': 1,
      'IBOutlet': 1, 'IBAction': 1, 'selector': 1, 'strong': 1, 'weak': 1,
      'readonly': 1
    },
    'literal': {
    	'false': 1, 'true': 1, 'FALSE': 1, 'TRUE': 1, 'nil': 1, 'YES': 1, 'NO': 1,
    	'NULL': 1
    },
    'built_in': {
      'NSString': 1, 'NSDictionary': 1, 'CGRect': 1, 'CGPoint': 1,
      'UIButton': 1, 'UILabel': 1, 'UITextView': 1, 'UIWebView': 1,
      'MKMapView': 1, 'UISegmentedControl': 1, 'NSObject': 1,
      'UITableViewDelegate': 1, 'UITableViewDataSource': 1, 'NSThread': 1,
      'UIActivityIndicator': 1, 'UITabbar': 1, 'UIToolBar': 1,
      'UIBarButtonItem': 1, 'UIImageView': 1, 'NSAutoreleasePool': 1,
      'UITableView': 1, 'BOOL': 1, 'NSInteger': 1, 'CGFloat': 1,
      'NSException': 1, 'NSLog': 1, 'NSMutableString': 1,
      'NSMutableArray': 1, 'NSMutableDictionary': 1, 'NSURL': 1,
      'NSIndexPath': 1, 'CGSize': 1, 'UITableViewCell': 1, 'UIView': 1,
      'UIViewController': 1, 'UINavigationBar': 1, 'UINavigationController': 1,
      'UITabBarController': 1, 'UIPopoverController': 1, 'UIPopoverControllerDelegate': 1,
      'UIImage': 1, 'NSNumber': 1, 'UISearchBar': 1, 'NSFetchedResultsController': 1,
      'NSFetchedResultsChangeType': 1, 'UIScrollView': 1, 'UIScrollViewDelegate': 1,
      'UIEdgeInsets': 1, 'UIColor': 1, 'UIFont': 1, 'UIApplication': 1,
      'NSNotFound': 5, 'NSNotificationCenter': 1, 'NSNotification': 1, 'UILocalNotification': 1,
      'NSBundle': 1, 'NSFileManager': 1, 'NSTimeInterval': 1, 'NSDate': 1,
      'NSCalendar': 1, 'NSUserDefaults': 1, 'UIWindow': 1, 'NSRange': 1,
      'NSArray': 1, 'NSError': 1, 'NSURLRequest': 1, 'NSURLConnection': 1,
      'class': 1, 'UIInterfaceOrientation': 1, 'MPMoviePlayerController': 1,
      'dispatch_once_t': 1, 'dispatch_queue_t': 1, 'dispatch_sync': 1, 'dispatch_async': 1,
      'dispatch_once': 1
    }
  };
  return {
    defaultMode: {
      keywords: OBJC_KEYWORDS,
      illegal: '</',
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_NUMBER_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: 'string',
          begin: '\'',
          end: '[^\\\\]\'',
          illegal: '[^\\\\][^\']'
        },

        {
          className: 'preprocessor',
          begin: '#import',
          end: '$',
          contains: [
          {
            className: 'title',
            begin: '\"',
            end: '\"'
          },
          {
            className: 'title',
            begin: '<',
            end: '>'
          }
          ]
        },
        {
          className: 'preprocessor',
          begin: '#',
          end: '$'
        },
        {
          className: 'class',
          beginWithKeyword: true,
          end: '({|$)',
          keywords: {
            'interface': 1,
            'class': 1,
            'protocol': 1,
            'implementation': 1
          },
          contains: [{
            className: 'id',
            begin: hljs.UNDERSCORE_IDENT_RE
          }
          ]
        },
        {
          className: 'variable',
          begin: '\\.'+hljs.UNDERSCORE_IDENT_RE
        }
      ]
    }
  };
}();
