osascript – Node module for doing Apple Automation in JavaScript or AppleScript
===

## Install
```
npm install --save osascript
```

## Requirements

For using JavaScript as Automation language, Mac OS X Yosemite is required.
On versions before that, you can activate the AppleScript mode.

## Usage

By default (without options), all scripts passed are assumed to be
JavaScript. See the last example for overriding this behaviour and
passing on AppleScript instead. All API are the same.

### Default stream

```javascript
var osascript = require('osascript');
var fs = require('fs');

// Run JavaScript file through OSA
fs.createReadStream('someFile.js')
  .pipe(osascript())
  .pipe(process.stdout);
```

This will pipe the data from `someFile.js` to the Apple Open Scripting Architecture (OSA)
and print the result to the standard output.

You can also do this in a short-hand:

```javascript
// note the file method after require ¬
var osascript = require('osascript').file;

// Run JavaScript file through OSA
osascript('someFile.js').pipe(process.stdout);
```

Or if you only have a string, you can do that as well
```javascript
// note the eval method after require ¬
var osascript = require('osascript').eval;

// Run JavaScript text through OSA
osascript('console.log("Hello, world!");').pipe(process.stdout);
```

### Using a callback

If you don't want to use a stream (just get the buffered output)
you can do this on the `file` and `eval` methods by passing a
function as the last argument:

```javascript
// note the file method after require ¬
var osascript = require('osascript').file;

// Run JavaScript file through OSA
osascript('someFile.js', function (err, data) {
  console.log(err, data);
});
```

```javascript
// note the eval method after require ¬
var osascript = require('osascript').eval;

// Run JavaScript text through OSA
osascript('console.log("Hello, world!");', function (err, data) {
  console.log(err, data);
});
```

### Using AppleScript

As JavaScript as OSA isn't working on versions before Yosemite,
we can use AppleScript as well. JavaScript is the default
to try to encourage JS instead of AppleScript.


All previous examples apply, but passing an `option` with
property `appleScript: true`.


```javascript
var osascript = require('osascript');
var fs = require('fs');

// Run JavaScript file through OSA
fs.createReadStream('someAppleScript.applescript')
  .pipe(osascript({ appleScript: true }))
  .pipe(process.stdout);
```

```javascript
// note the file method after require ¬
var osascript = require('osascript').file;

// Run JavaScript file through OSA
osascript('someFile.js', { appleScript: true }, function (err, data) {
  console.log(err, data);
});
```

... and so on.


See [more examples](./examples).


## TODO
This is an early alpha written in a hurry before dinner.
I have some remaining tasks:

* [ ] Tests
* [ ] Error handling
* [ ] More?
* [ ] Dinner