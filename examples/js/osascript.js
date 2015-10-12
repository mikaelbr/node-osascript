var app = Application.currentApplication();
app.includeStandardAdditions = true;

ObjC.import('Cocoa');
var args = ObjC.deepUnwrap($.NSProcessInfo.processInfo.arguments).slice(4);

app.displayDialog('Hello World:' + args.join(','));
