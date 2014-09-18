var osascript = require('../');
var fs = require('fs');
var path = require('path');

fs.createReadStream(path.resolve(__dirname, '../test/applescript_fixture.scpt'))
  .pipe(osascript({ appleScript: true }))
  .on('close', function () {
    process.exit(0);
  })
  .pipe(process.stdout);