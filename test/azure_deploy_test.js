'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.azureDeploy = {
  setUp: function(done) {
    // setup here if necessary
    var fs = require('fs');
    done();
  },
  missing_cred: function(test) {

    test.throws(grunt, Error, "No credential file found. Please check that it exists.");
    test.done();

  },
  no_password: function(test) {

    test.throws(grunt, Error, "Couldn't get password from credential file.");
    test.done();

  },
  no_username: function(test) {

    test.throws(grunt, Error, "Couldn't get username from credential file.");
    test.done();

  },
  no_dir: function(test) {

    test.throws(grunt, Error, "Directory for deployment isn't specified.");
    test.done();

  },
  no_valid_dir: function(test) {

    test.throws(grunt, Error, "Directory test/fixtures/gotcha can't be found or isn't readable.");
    test.done();

  },
  no_website: function(test) {

    test.throws(grunt, Error, "Azure website name is not specified.");
    test.done();

  },
};
