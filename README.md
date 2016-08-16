# grunt-azure-deploy

A grunt wrapper for the node package [azure-deploy](https://www.npmjs.com/package/azure-deploy), which deploys a directory to an Azure WebSite using git integration.

For the latest documentation, visit the official [Github repository](https://github.com/mncrff/grunt-azure-deploy).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-azure-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-azure-deploy');
```

## Usage

In your project's Gruntfile, add a section named `azureDeploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  azureDeploy: {
    options: {
      credential_file: process.env['HOME']+'/.azure/creds.json' // the location and name of your Azure credentials stored as JSON
    },
    directory: './build', // the directory of data you wish to deploy
    website_name: 'testWebsite' // your Azure Website name
  },
});
```

### Options
#### options.credential_file
Type: `String`
Default value: `'.azure_deploy.json'`

A string value that is used to specify the location of the Azure deployment credentials file. File should be formatted as JSON.

### Enable Deployment in the Azure Portal

1. Log in to the Azure Portal.
2. In your App Service app's blade, click Settings > Deployment source. Click Choose source, then click Local Git Repository, and then click OK.
3. If this is your first time setting up a repository in Azure, you need to create login credentials for it under Settings > Deployment credentials.

### Managing Azure Credentials

Add your Azure WebSite deployment credentials to a separate JSON file. For security reasons, make sure this file is outside of or ignored by source control!

```js
{
  "username": "testUser",
  "password": "testPassword123"
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
