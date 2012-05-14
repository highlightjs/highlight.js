/*
Language: Objective C
Author: Valerii Hiora <valerii.hiora@gmail.com>
*/

hljs.LANGUAGES.objectivec = function(){
  var OBJC_KEYWORDS = {
    'keyword': {
      'int': 1, 'float': 1, 'while': 1, 'private': 1, 'char': 1,
      'catch': 1, 'export': 1, 'sizeof': 2, 'typedef': 2, 'const': 1,
      'struct': 1, 'for': 1, 'union': 1, 'unsigned': 1, 'long': 1,
      'volatile': 2, 'static': 1, 'protected': 1, 'bool': 1, 'mutable': 1,
      'if': 1, 'public': 1, 'do': 1, 'return': 1, 'goto': 1, 'void': 2,
      'enum': 1, 'else': 1, 'break': 1, 'extern': 1, 'class': 1,
      'asm': 1, 'case': 1, 'short': 1, 'default': 1, 'double': 1, 'throw': 1,
      'register': 1, 'explicit': 1, 'signed': 1, 'typename': 1, 'try': 1,
      'this': 1, 'switch': 1, 'continue': 1, 'wchar_t': 1, 'inline': 1,
      'readonly': 1, 'assign': 1, 'property': 1, 'protocol': 10, 'self': 1,
      'synchronized': 1, 'end': 1, 'synthesize': 50, 'id': 1, 'optional': 1,
      'required': 1, 'implementation': 10, 'nonatomic': 1,'interface': 1,
      'super': 1, 'unichar': 1, 'finally': 2, 'dynamic': 2,
      'IBOutlet': 50, 'IBAction': 50, 'selector': 1, 'strong': 1, 'weak': 1,
      'readonly': 1,       
    },
    'literal': {
    	'false': 1, 'true': 1, 'FALSE': 2, 'TRUE': 2, 'nil': 1, 'YES': 5, 'NO': 5, 
    	'NULL': 1
    },
    'built_in': {      
      'NSString': 50, 'NSDictionary': 50, 'CGRect': 50, 'CGPoint': 50,
      'UIButton': 50, 'UILabel': 50, 'UITextView': 50, 'UIWebView': 50,
      'MKMapView': 50, 'UISegmentedControl': 50, 'NSObject': 50,
      'UITableViewDelegate': 50, 'UITableViewDataSource': 50, 'NSThread': 50,
      'UIActivityIndicator': 50, 'UITabbar': 50, 'UIToolBar': 50,
      'UIBarButtonItem': 50, 'UIImageView': 50, 'NSAutoreleasePool': 50,
      'UITableView': 50, 'BOOL': 1, 'NSInteger': 20, 'CGFloat': 20,
      'NSException': 50, 'NSLog': 50, 'NSMutableString': 50,
      'NSMutableArray': 50, 'NSMutableDictionary': 50, 'NSURL': 50,
      'NSIndexPath': 50, 'CGSize': 50, 'UITableViewCell': 50, 'UIView': 50,			
      'UIViewController': 50, 'UINavigationBar': 50, 'UINavigationController': 50,
      'UITabBarController': 50, 'UIPopoverController': 50, 'UIPopoverControllerDelegate': 50,
      'UIImage': 50, 'NSNumber': 50, 'UISearchBar': 50, 'NSFetchedResultsController': 50,
      'NSFetchedResultsChangeType': 50, 'UIScrollView': 50, 'UIScrollViewDelegate': 50,
      'UIEdgeInsets': 50, 'UIColor': 50, 'UIFont': 50, 'UIApplication': 50,
      'NSNotFound': 5, 'NSNotificationCenter': 50, 'NSNotification': 50, 'UILocalNotification': 50,
      'NSBundle': 50, 'NSFileManager': 50, 'NSTimeInterval': 50, 'NSDate': 50,
      'NSCalendar': 50, 'NSUserDefaults': 50, 'UIWindow': 50, 'NSRange': 50,
      'NSArray': 50, 'NSError': 50, 'NSURLRequest': 50, 'NSURLConnection': 50,
      'class': 1, 'UIInterfaceOrientation': 50, 'MPMoviePlayerController': 50,
      'dispatch_once_t': 1, 'dispatch_queue_t': 1, 'dispatch_sync': 1, 'dispatch_async': 1,
      'dispatch_once': 1,
      
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
            'protocol': 5,
            'implementation': 5
          },
          contains: [{
            className: 'id',
            begin: hljs.UNDERSCORE_IDENT_RE
          }
          ]
        },             
        {
          className: 'variable',
          begin: '\\.'+hljs.UNDERSCORE_IDENT_RE,
        },        
      ]
    }
  };
}();
