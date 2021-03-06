module.exports = function(grunt) {
  path = require('path');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      jquery: {
        src: 'src/js/jquery-1.8.3.min.js',
        dest: 'assets/js/jquery-1.8.3.min.js',
      },
      favicon: {
        src: 'src/img/favicon.ico',
        dest: 'assets/img/favicon.ico',
      },
      fontawesome_ie7: {
        src: 'src/css/font-awesome-ie7.min.css',
        dest: 'assets/css/font-awesome-ie7.min.css',
      },
      font: {
        expand: true,
        cwd: 'src/font/',
        src: '*',
        dest: 'assets/font/',
      },
      gifs: {
        expand: true,
        cwd: 'src/img/',
        src: '*.gif',
        dest: 'assets/img',
      }
    },
    uglify: {
      //options: { beautify: true, mangle: false, compress: false, }, // <-- DEBUG MODE 
      dgu_drupal_js: {
        src: 'src/js/dgu-drupal.js',
        dest: 'assets/js/dgu-drupal.min.js',
      },
      respondjs: {
        src: 'src/js/respond.src.js',
        dest: 'assets/js/respond.min.js',
      },
      vendor: {
        src: [ /* Order of resources is important */
          'src/js/jquery-ui-1.10.2.custom.js',
          'src/js/jquery.tagcloud.js',
          'src/js/spin.min.js',
          'src/js/jquery.chosen-0.9.7.js',
          'src/js/jquery.dotdotdot-1.5.9.js',
          'src/js/jquery.placeholder.js',
          'src/js/bootstrap-2.0.3.min.js',
          'src/js/bootstrap-hashchange.js',
          'src/js/jquery.fancybox.js'
        ],
        dest: 'assets/js/vendor.min.js'
      }
    },
    less: {
      options: {
        banner: '/* dgu-less compiled <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        yuicompress: true
      },
      shared: {
        src: [  /* Order of resources is important. */
          'src/css/bootstrap.css',
          'src/css/bootstrap-responsive.css',
          'src/css/jquery-ui-1.10.2.custom.css',
          'src/css/jquery.chosen.css',
          'src/css/jquery.fancybox.css',
          'src/css/font-awesome.css',
          'src/css/dgu-shared.less',
        ],
        dest: 'assets/css/datagovuk.min.css'
      },
      drupal: {
        src:  'src/css/dgu-drupal.less',
        dest: 'assets/css/dgu-drupal.min.css',
      },
      less_than_ie9: {
        src:  'src/css/less-than-ie9.less',
        dest:  'assets/css/less-than-ie9.min.css',
      },
    },
    watch: {
      styles: {
        files: 'src/css/**.less',
        tasks: 'styles'
      },
      scripts: {
        files: 'src/js/dgu-drupal.js',
        tasks: 'uglify:dgu_drupal_js',
      }
    },
    imagemin: {
      build: {
        options: { 
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            src: '*.jpg',
            cwd: 'src/img/',
            dest: 'assets/img/'
          },
          {
            expand: true,
            src: '*.png',
            cwd: 'src/img/',
            dest: 'assets/img/'
          }
        ]
      },
    },
    timestamp: {
      build: {
        dest: 'assets/timestamp'
      }
    }
  });

  grunt.registerMultiTask('timestamp', 'Write timestamp to a file', function(myName, myTargets) {
    grunt.file.write(this.files[0].dest, Date.now());
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('styles', ['less','timestamp']);
  grunt.registerTask('scripts', ['copy:jquery','uglify','timestamp']);
  grunt.registerTask('images', ['copy:gifs','imagemin',]);
  grunt.registerTask('default', ['styles','scripts','copy','imagemin','timestamp']);
};
