var expect = require('chai').expect;
var osascript = require('../');

describe('node-osascript', function () {

  describe('using a JavaScript string', function () {
    it('should return objects in human-readable form by default', function (done) {
      var script = '(function(){return ["foo", 5, {foo: "bar"}]})()';
      osascript.eval(script, function (error, response) {
        expect(response).to.be.a('string');
        expect(response.trim()).to.equal('foo, 5, foo:bar');
        done();
      });
    });

    it('should return objects in JSON parsable form using flags', function (done) {
      var script = '(function(){return ["foo", 5, {foo: "bar"}]})()';
      osascript.eval(script, {type: 'JavaScript', flags: ['-s', 's']}, function (error, response) {
        expect(response).to.be.a('string');
        expect(response.trim()).to.equal('["foo", 5, {"foo":"bar"}]');
        expect(JSON.parse(response.trim())).to.be.an('array');
        done();
      });
    });

    it('should return error from osascript', function (done) {
      var script = 'Foo;';
      osascript.eval(script, function (err, response) {
        expect(err).to.be.an.instanceof(Error);
        expect(err.toString()).to.match(/^Error: Command failed/);
        done();
      });
    });

    it('should return an error when passing an empty string', function (done) {
      var script = '';
      osascript.eval(script, function (err, response) {
        expect(err).to.be.an.instanceof(Error);
        expect(err.toString()).to.equal('Error: You need to pass text to evaluate');
        done();
      });
    });

  });

  describe('using a JavaScript file', function () {

    it('should return objects in human-readable form by default', function (done) {
      var file = 'test/fixtures/return.js';
      osascript.file(file, function (error, response) {
        expect(response.trim()).to.equal('foo, 5, foo:bar');
        done();
      });
    });

    it('should return objects in JSON parsable form using flags', function (done) {
      var file = 'test/fixtures/return.js';
      osascript.file(file, {type: 'JavaScript', flags: ['-s', 's']}, function (error, response) {
        expect(response).to.be.a('string');
        expect(response.trim()).to.equal('["foo", 5, {"foo":"bar"}]');
        expect(JSON.parse(response.trim())).to.be.an('array');
        done();
      });
    });

    it('should pass and return arguments', function (done) {
      var file = 'test/fixtures/handleArguments.js';
      osascript.file(file, {args: ['Some', 'Values']}, function (error, response) {
        expect(response.trim()).to.equal('Arguments: Some,Values');
        done();
      });
    });

    it('should return an error when passing no file', function (done) {
      var file = '';
      osascript.file(file, function (err, response) {
        expect(err).to.be.an.instanceof(Error);
        expect(err.toString()).to.equal('Error: You need to specify filename');
        done();
      });
    });
  });

});
