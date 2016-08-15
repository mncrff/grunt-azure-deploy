/*
 * grunt-azure-deploy
 * https://github.com/mncrff/grunt-azure-deploy
 *
 * Copyright (c) 2016 Alycia Moncrieff
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('azureDeploy', "Deploys a directory to an Azure website.", function () {

    var fs = require('fs');
    var azureDeploy = require('azure-deploy');

    var pathExists = function(path) {
      try {
        fs.accessSync(path, fs.F_OK);
        return true;
      } catch(e) {
        return false;
      }
    };

    var options = this.options({
      credential_file: '.azure_deploy.json'
    });

    var targetDirectory = null,
        azureUsername = null,
        azurePassword = null,
        azureWebsiteName = null;

    grunt.log.writeln("Validating target data.");

    // 1. Validate target deployment directory
    // Check if a directory has been provided
    if (typeof this.data.directory === 'undefined') {
      grunt.log.error("Directory for deployment isn't specified.");
      return;
    }
    // Check that the provided directory is valid/exists
    if (!pathExists(this.data.directory)) {
      grunt.log.error("Directory " + this.data.directory + " can't be found or isn't readable.");
      return;
    }
    targetDirectory = this.data.directory;

    // 2. Check if required deployment credentials have been supplied
    var credFileExists = pathExists(options.credential_file);

    if (credFileExists) {
      var creds = grunt.file.readJSON(options.credential_file);

      // Check that both username and password are provided
      if (typeof creds.username === 'undefined') {
        grunt.log.error("Couldn't get username from credential file.");
        return;
      } else if (typeof creds.password === 'undefined') {
        grunt.log.error("Couldn't get password from credential file.");
        return;
      } else {
        azureUsername = creds.username;
        azurePassword = creds.password;
      }

    } else {
      grunt.log.error("No credential file found. Please check that it exists.");
      return;
    }

    // 3. Check that Azure website name has been supplied
    if (typeof this.data.website_name === 'undefined') {
      grunt.log.error("Azure website name is not specified.");
      return;
    } else {
      azureWebsiteName = this.data.website_name;
    }

    var deploymentManager = new azureDeploy.AzureWebSiteDeploymentManager(azureWebsiteName, azureUsername, azurePassword);

    grunt.log.writeln("Starting Azure deployment...");

    var done = this.async();
    deploymentManager.deploy(targetDirectory)
    .then(function() {
      grunt.log.ok("Deployment finished without errors.");
      done();
    })
    .catch(function(e) {
      grunt.log.error('Deployment failed with errors.');
      grunt.log.writeln(e);
      done(false);
    });
  });

};
