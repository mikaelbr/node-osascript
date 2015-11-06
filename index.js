var spawn = require('duplex-child-process').spawn;
var fs = require('fs');
var path = require('path');

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

  var stream = fs.createReadStream(file).pipe(getSpawn(opts, file));
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

function getSpawn (opts, file) {
  return spawn('osascript', argify(opts, file));
}

function argify (opts, file) {
  var args;
  opts = opts || {};
  if (opts.args) {
    args = ['-'].concat(opts.args);
  } else {
    args = [];
  }

  if ((file && isAppleScript(file) && !opts.type) ||
      (opts.type && opts.type.toLowerCase() === 'applescript')) {
    return [].concat(args, opts.flags || []);
  }

  if (opts.type) {
    return ['-l', opts.type].concat(args, opts.flags || []);
  }

  return ['-l', 'JavaScript'].concat(args, opts.flags || []);
}

function isAppleScript (file) {
  var ext = path.extname(file);
  return (ext === '.scpt' || ext.toLowerCase() === '.applescript');
}
