var spawn = require('duplex-child-process').spawn;
var fs = require('fs');
var osascript = spawn('osascript')//, ['-l', 'JavaScript']);

var noFileMsg = 'You need to specify filename';
var noInputMsg = 'You pass text to evaluate';

module.exports = function (opts) {
  return getSpawn(opts);
};

module.exports.file = function (file, opts, cb) {
  if (!file && cb === void 0) {
    throw Error(noFileMsg);
  }

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (!file) {
    return cb(new Error(noFileMsg));
  }

  var stream = fs.createReadStream(file).pipe(getSpawn(opts));

  if (cb === void 0) {
    return stream;
  }

  var buffers = [];
  stream.on('data', function(buffer) {
    buffers.push(buffer);
  });

  stream.on('end', function() {
    var buffered = Buffer.concat(buffers);
    return cb(null, buffered.toString());
  });

  return stream;
};

module.exports.eval = function (text, opts, cb) {
  if (!text && cb === void 0) {
    throw Error(noFileMsg);
  }

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (!text) {
    return cb(new Error(noInputMsg));
  }

  var stream = getSpawn(opts);

  if (cb === void 0) {
    stream.write(text);
    stream.end();
    return stream;
  }

  var buffers = [];
  stream.on('data', function(buffer) {
    buffers.push(buffer);
  });

  stream.on('end', function() {
    var buffered = Buffer.concat(buffers);
    return cb(null, buffered.toString());
  });

  stream.write(text);
  stream.end();

  return stream;
};

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
