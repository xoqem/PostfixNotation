module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>',
      banner_text: 'Postfix Notation v<%= meta.version %> - ' +
        'https://github.com/xoqem/PostfixNotation - <%= grunt.template.today("isoDateTime") %>',
      banner: '/* <%= meta.banner_text %> */\n',
      html_banner: '<!-- <%= meta.banner_text %> -->\n'
    },
    clean: [ 'dist', 'tmp'],
    compress: {
      debug: {
        options: {
          archive: 'dist/debug.tar.gz'
        },
        files: [
          {expand: true, cwd: 'tmp/debug', src: ['**/*'], dest: '<%= pkg.name %>-<%= meta.version %>'}
        ]
      },
      release: {
        options: {
          archive: 'dist/release.tar.gz'
        },
        files: [
          {expand: true, cwd: 'tmp/release', src: ['**/*'], dest: '<%= pkg.name %>-<%= meta.version %>'}
        ]
      }
    },
    concat: {
      css: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: ['css/**/*.css'],
        dest: 'tmp/debug/css/styles.css'
      },
      index: {
        options: {
          banner: '<%= meta.html_banner %>'
        },
        src: ['index.html'],
        dest: 'tmp/debug/index.html'
      },
      test: {
        options: {
          banner: '<%= meta.html_banner %>'
        },
        src: ['test.html'],
        dest: 'tmp/debug/test.html'
      }
    },
    copy: {
      images: {
        files: [
          {expand: true, cwd: 'images', src: ['**'], dest: 'tmp/debug/images/'}
        ]
      },
      libs: {
        files: [
          {expand: true, cwd: 'libs', src: ['**'], dest: 'tmp/debug/libs/'}
        ]
      },
      release: {
        files: [
          {expand: true, cwd: 'tmp/debug', src: ['**'], dest: 'tmp/release/'}
        ]
      }
    },
    cssmin: {
      release: {
        files: {
          "tmp/release/styles.css": ["tmp/release/styles.css"]
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'main',
          mainConfigFile: 'js/main.js',
          out: 'tmp/debug/js/main.js',
          paths: {
            jquery: 'empty:',
            handlebars: 'empty:',
            ember: 'empty:'
          },
          exclude: ['jquery','handlebars', 'ember', 'text']
        }
      }
    },
    uglify: {
      release: {
        files: [
          {
            expand: true,
            cwd: 'tmp/release/js/',
            src: ['**/*.js'],
            dest: 'tmp/release/js/'
          }
        ]
      }
    },
    watch: {
      js: {
        files: 'js/**/*.js',
        tasks: ['jshint', 'concat:js']
      },
      css: {
        files: 'css/**/*.css',
        tasks: ['concat:css']
      },
      html: {
        files: 'html/**/*.html',
        tasks: ['copy:html']
      },
      images: {
        files: 'images/**',
        tasks: ['copy:images']
      }
    },
    jshint: {
      files: ['js/**/*.js'],
      options: {
        globals: {
          $: false,
          App: true,
          console: false
        }
      }
    }
  });

  // load dependencies
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // default task
  grunt.registerTask('default', [
    'clean',
    'jshint',
    'concat',
    'requirejs',
    'copy',
    'uglify',
    'cssmin',
    'compress'
  ]);
  grunt.registerTask('test', []);
};
