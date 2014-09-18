var osascript = require('../').eval;

var script = 'display dialog "What should I do?" buttons {"Go home", "Work", "Nothing"}\n' +
  'set DlogResult to result\n' +
  'return result';

osascript(script, { type: 'AppleScript' }).pipe(process.stdout);

// With callback
osascript(script, { type: 'AppleScript' }, function (err, data) {
  console.log("Data:", data);
});
