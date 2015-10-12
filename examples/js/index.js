var osascript = require('../../').file;
var path = require('path');
var file = path.resolve(__dirname, 'osascript.js');

osascript(file, {
  args: ['Some', 'Values']
}).pipe(process.stdout);
