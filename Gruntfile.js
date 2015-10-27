module.exports = function (grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'public/'
        }
      }
    },
    watch: {
      project: {
        files: ['public/*.appcache','public/**/*.js', 'public/**/*.html', 'public/**/*.json', 'public/**/*.css'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-daemon');
  
  grunt.registerTask('default', ['connect','daemonize', 'watch']);

};
