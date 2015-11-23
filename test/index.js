var expect = require('chai').expect;
var osascript = require('../');

describe('node-osascript', function () {

	describe('using JavaScript', function () {

		it('should return objects in human-readable form by default', function (done) {
			var script = '(function(){return ["foo",5, {foo: "bar"}]})()';
			osascript.eval(script, function (error, response) {
				expect(response.trim()).to.equal('foo, 5, foo:bar');
				done();
			});

		});

	});

});
