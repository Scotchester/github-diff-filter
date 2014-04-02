module.exports = function(grunt) {

  require('jit-grunt')(grunt, {
    includereplace: 'grunt-include-replace',
    replace: 'grunt-text-replace'
  });

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    less: {
      main: {
        options: {
          compress: true
        },
        files: {
          'src/style.min.css': ['src/style.less']
        }
      }
    },

    replace: {
      singleLineHTML: {
        src: ['src/*.html'],          // source files array (supports minimatch)
        dest: 'temp/html/',           // destination directory or file
        replacements: [{
          from: '\n',                 // string replacement
          to: ' '
        }, {
          from: '    ',               // string replacement
          to: ''
        }]
      }
    },

    includereplace: {
      mashup: {
        options: {
          // Task-specific options go here.
        },
        // Files to perform replacements and includes with
        src: 'src/app.js',
        // Destination directory to copy files to
        dest: 'temp/js/'
      }
    },
    
    uglify: {
      dist: {
        options: {
          banner: 'javascript:'
        },
        files: {
          'dist/<%= pkg.name %>.min.js': ['temp/js/src/app.js']
        }
      }
    },
    
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        // Supress warning about using 'javascript:' as the "banner" in the
        // uglify task.
        scripturl: true
      }
    },
    
    qunit: {
      files: ['test/**/*.html']
    },
    
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    }

  });

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['less', 'replace', 'includereplace', 'uglify']);

};
