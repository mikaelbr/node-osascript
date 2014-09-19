var osascript = require('../').eval;

var script = 'get volume settings';

osascript(script, { type: 'AppleScript' }).pipe(process.stdout);
// = output volume:44, input volume:75, alert volume:100, output muted:true


// With callback
osascript(script, { type: 'AppleScript' }, function (err, data) {
  console.log(data);
  // = output volume:44, input volume:75, alert volume:100, output muted:true
});
