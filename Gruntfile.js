module.exports = function(grunt) {

  'use strict';

  var path = require('path');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    
    bower: {
      install: {
        options: {
          targetDir: 'vendor',
          install: false,
          copy: true,
          verbose: true,
          cleanBowerDir: false,
          cleanTargetDir: true,
          layout: 'byComponent'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-bower-task');

};
