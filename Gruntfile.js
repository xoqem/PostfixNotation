module.exports = function(grunt) {

  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      version: '<%= pkg.version %>',
      banner_text: 'Postfix Notation v<%= meta.version %> - ' +
        'https://github.com/sinfree/PostfixNotation - <%= grunt.template.today("isoDateTime") %>',
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
          {expand: true, cwd: 'tmp/debug', src: ['*'], dest: '<%= pkg.name %>-<%= meta.version %>'}
        ]
      },
      release: {
        options: {
          archive: 'dist/release.tar.gz'
        },
        files: [
          {expand: true, cwd: 'tmp/release', src: ['*'], dest: '<%= pkg.name %>-<%= meta.version %>'}
        ]
      }
    },
    concat: {
      css: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: ['css/**/*.css'],
        dest: 'tmp/debug/styles.css'
      },
      js: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: ['js/**/*.js'],
        dest: 'tmp/debug/main.js'
      }
    },
    copy: {
      images: {
        files: [
          {expand: true, cwd: 'images', src: ['**'], dest: 'tmp/debug/images/'}
        ]
      },
      html: {
        files: [
          {expand: true, cwd: 'html', src: ['**'], dest: 'tmp/debug/'}
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
    ember_templates: {
      compile: {
        options: {
          templateName: function(sourceFile) {
            return sourceFile.replace(/templates\//, '');
          }
        },
        files: {
          "tmp/debug/templates.js": "templates/*.hbs",
        }
      }
    },
    qunit: {
      release: {
        src: ['tmp/release/test.html']
      },
      debug: {
        src: ['tmp/debug/test.html']
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'tmp/release/main.js': ['tmp/release/main.js']
        }
      }
    },
    watch: {
      templates: {
        files: 'templates/*.hbs',
        tasks: ['ember_templates']
      },
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
          console: false,
          Ember: false
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
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');

  // default task
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'ember_templates', 'copy', 'uglify', 'cssmin', 'compress', 'sleep']);
  grunt.registerTask('test', []);

  // HACK: add sleep task that we call after compress, because grunt compress plugin is saying its done before the compress completes
  grunt.registerTask('sleep', function() {
    setTimeout(this.async(), 2000);
  });
};
