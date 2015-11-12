osascript
===

> Node.js module for doing Apple Open Scripting Architecture (OSA) in JavaScript or AppleScript.

## Install
```
npm install --save osascript
```

## Requirements

For using JavaScript as Automation language, Mac OS X Yosemite is required.
On versions before that, you can pass AppleScripts.

## Usage

By default, if no other type is defined and the passed file is not a AppleScript
file (with extensions `.scpt` or `.applescript`), JavaScript is used.

See the last example for overriding this behaviour and passing on AppleScript
instead. All API's are the same.

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
to try to encourage JS instead of AppleScript. When
a filename is passed, AppleScript will be used if the filename
has an AppleScript extension (`.scpt` or `.applescript`).


```javascript
var osascript = require('osascript');
var fs = require('fs');

// Run JavaScript file through OSA
fs.createReadStream('someAppleScript.applescript')
  // Need to override options to define AppleScript
  .pipe(osascript({ type: 'AppleScript' }))
  .pipe(process.stdout);
```

```javascript
// note the file method after require ¬
var osascript = require('osascript').file;

// No need to pass options, as it can be deduced from filename.
osascript('someFile.applescript', function (err, data) {
  console.log(err, data);
});
```

See [more examples](./examples).

### API

API from base function required in this way:

```javascript
var osascript = require('osascript');
```

All endpoints uses `options`:

```javascript
var defaultOptions = {
  type: 'JavaScript',
  args: [] // List of string arguments
};
```

Type is passed as language (option `-l`) to `osascript`.
Can be either `JavaScript` (in Yosemite) or `AppleScript`.

`flags` can be used to change the output style of return values from functions executed by osascript:

```js
// JSON parsable return
osascript('(function(){return ["foo",5, {foo: "barz"}]})()', {flags: ['-s', 's']}, function (data) {
  console.log(data); // ["foo", 5, {"foo":"barz"}]
});
```

`args` is a list of strings passed in as arguments to your scripts. In JavaScript
you can access them using:

```js
ObjC.import('Cocoa');
var args = ObjC.deepUnwrap($.NSProcessInfo.processInfo.arguments).slice(4);
```

`.slice(4)` is to cut away program name and language argument. In addition,
`node-osascript` has to put in a `-` to indicate that the following list of
strings should be passed as arguments.  This `-` is on index 3.

#### `osascript([options: Object])`

Creates a PassThrough stream that can get piped text manually
(text or files).

#### `osascript.file(file[, options: Object, callback:function (err, data)])`
See `options` as defined above.

If callback function is passed, the buffered output from
the OSA is passed as data (initiates the data immediately)

#### `osascript.eval(scriptText[, options: Object, callback:function (err, data)])`
`scriptText` is script in the language type as defined.

See `options` as defined above.

If callback function is passed, the buffered output from
the OSA is passed as data (initiates the data immediately)

## TODO

* [ ] Tests
* [x] Error handling

## License

[MIT License](LICENSE)
