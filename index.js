var spawn = require('duplex-child-process').spawn;
var fs = require('fs');
var osascript = spawn('osascript');

var noFileMsg = 'You need to specify filename';
var noInputMsg = 'You need to pass text to evaluate';

module.exports = function (opts) {
  return getSpawn(opts);
};

module.exports.file = function (file, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  if(!validateInput(file, cb, noFileMsg)) return;

  var stream = fs.createReadStream(file).pipe(getSpawn(opts));
  if (cb) bufferStream(stream, cb);

  return stream;
};

module.exports.eval = function (text, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  if (!validateInput(text, cb, noInputMsg)) return;

  var stream = getSpawn(opts);
  if (cb) bufferStream(stream, cb);

  stream.write(text);
  stream.end();
  return stream;
};

function validateInput (input, cb, msg) {
  if (!input && cb === void 0) {
    throw Error(msg);
  }

  if(!input) {
    return cb(new Error(msg));
  }

  return true;
}

function bufferStream (stream, cb) {
  var buffers = [], inError;

  stream.on('data', function(buffer) {
    buffers.push(buffer);
  });

  stream.on('end', function() {
    var buffered = Buffer.concat(buffers);
    if (inError) return;

    return cb(null, buffered.toString());
  });

  stream.on('error', function(err) {
    inError = true;
    return cb(err);
  });
  return stream;
}

function getSpawn (opts) {
  return spawn('osascript', argify(opts));
}

function argify (opts) {
  opts = opts || {};
  if (opts.appleScript) {
    return [];
  }

  return ['-l', 'JavaScript'];
}