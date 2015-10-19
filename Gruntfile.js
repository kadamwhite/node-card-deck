var merge = require( 'lodash.merge' );

module.exports = function( grunt ) {
  'use strict';

  // Reusable file globbing
  var files = {
    grunt: [ 'Gruntfile.js' ],
    js: [
      'deck.js',
      'lib/**/*.js',
      // No tests
      '!**/*.spec.js'
    ],
    tests: [
      'deck.spec.js',
      'lib/**/*.spec.js'
    ]
  };

  // Reusable JSHintRC options
  var jshintrc = grunt.file.readJSON( '.jshintrc' );

  // Load tasks.
  require( 'load-grunt-tasks' )( grunt );

  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    jscs: {
      options: {
        config: '.jscsrc',
        reporter: require( 'jscs-stylish' ).path
      },
      grunt: {
        src: files.grunt
      },
      js: {
        src: files.js
      },
      tests: {
        src: files.tests
      }
    },

    jshint: {
      options: {
        reporter: require( 'jshint-stylish' )
      },
      grunt: {
        options: jshintrc,
        src: files.grunt
      },
      js: {
        options: jshintrc,
        src: files.js
      },
      tests: {
        options: merge({
          mocha: true
        }, jshintrc ),
        src: files.tests
      }
    },

    watch: {
      js: {
        files: files.js,
        tasks: [ 'jshint:js', 'jscs:js' ]
      },
      tests: {
        files: files.tests,
        tasks: [ 'jshint:tests', 'jscs:tests' ]
      }
    }

  });

  grunt.registerTask( 'lint', [ 'jshint', 'jscs' ] );
  grunt.registerTask( 'default', [ 'lint' ] );
};
