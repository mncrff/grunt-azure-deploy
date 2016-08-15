/*
 * grunt-azure-deploy
 * https://github.com/mncrff/grunt-azure-deploy
 *
 * Copyright (c) 2016 Alycia Moncrieff
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    azureDeploy: {
      missing_cred: {
        options: {
          //use default value, for which file should not exist for the purposes of this test
          //credential_file: '.azure_deploy.json'
        },
        directory: 'test/fixtures/test_dir',
        website_name: 'testSite'
      },
      no_password: {
        options: {
          credential_file: 'test/fixtures/.deploy_no_pass.json'
        },
        directory: 'test/fixtures/test_dir',
        website_name: 'testSite'
      },
      no_username: {
        options: {
          credential_file: 'test/fixtures/.deploy_no_username.json'
        },
        directory: 'test/fixtures/test_dir',
        website_name: 'testSite'
      },
      no_dir: {
        options: {
          credential_file: 'test/fixtures/.deploy.json'
        },
        website_name: 'testSite'
      },
      no_valid_dir: {
        options: {
          credential_file: 'test/fixtures/.deploy.json'
        },
        directory: 'test/fixtures/gotcha',
        website_name: 'testSite'
      },
      no_website: {
        options: {
          credential_file: 'test/fixtures/.deploy.json'
        },
        directory: 'test/fixtures/test_dir'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.

  grunt.registerTask('test', ['clean', 'azureDeploy', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
