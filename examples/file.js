var osascript = require('../').file;
var path = require('path');
var file = path.resolve(__dirname, '../test/applescript_fixture.scpt');

osascript(file, { appleScript: true }).pipe(process.stdout);

// With callback
osascript(file, { appleScript: true }, function (err, data) {
  console.log("Data:", data);
});
