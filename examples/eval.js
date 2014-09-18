var osascript = require('../').eval;

var script = 'display dialog "What should I do?" buttons {"Go home", "Work", "Nothing"}\n' +
  'set DlogResult to result\n' +
  'return result';

osascript(script, { appleScript: true }).pipe(process.stdout);

// With callback
osascript(script, { appleScript: true }, function (err, data) {
  console.log("Data:", data);
});
