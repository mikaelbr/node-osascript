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

	});

	describe('using a JavaScript file', function () {

		it('should return objects in human-readable form by default', function (done) {
			var script = 'test/fixtures/return.js';

			osascript.file(script, function (error, response) {
				expect(response.trim()).to.equal('foo, 5, foo:bar');
				done();
			});
		});

		it('should return objects in JSON parsable form using flags', function (done) {
			var script = 'test/fixtures/return.js';
			osascript.file(script, {type: 'JavaScript', flags: ['-s', 's']}, function (error, response) {
				expect(response).to.be.a('string');
				expect(response.trim()).to.equal('["foo", 5, {"foo":"bar"}]');
				expect(JSON.parse(response.trim())).to.be.an('array');
				done();
			});
		});

	});

});
