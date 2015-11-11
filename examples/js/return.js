var osascript = require('../../').eval;
var script = '(function(){return ["foo",5, {foo: "barz"}]})()';

/**
 * Quote from https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/osascript.1.html
 * > osascript normally prints its results in human-readable form: strings do not have quotes
 * > around them, characters are not escaped, braces for lists and records are omitted, etc.  This
 * > is generally more useful, but can introduce ambiguities.  For example, the lists `{"foo",
 * > "bar"}' and `{{"foo", {"bar"}}}' would both be displayed as `foo, bar'.  To see the results in
 * > an unambiguous form that could be recompiled into the same value, use the s modifier.
 */

// Default return
osascript(script, function (err, data) {
  if (err == null) {
    console.log('typeof data ->', typeof data);
    console.log('data ->', data);
  } else {
    console.log(err);
  }
});

// JSON parsable return
osascript(script, {type: 'JavaScript', flags: ['-s', 's']}, function (err, data) {
  if (err == null) {
    console.log('typeof data ->', typeof data);
    console.log('data ->', data);
  } else {
    console.log(err);
  }
});
