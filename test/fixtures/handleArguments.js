ObjC.import('Cocoa');
var args = ObjC.deepUnwrap($.NSProcessInfo.processInfo.arguments).slice(4);

(function() {
  return 'Arguments: ' + args.join(',');
})()
