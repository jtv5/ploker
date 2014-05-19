module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: {
                    'public/javascripts/index.min.js': ['public/javascripts/*']
                }
            }
        },
        jasmine: {
            controllers: {
                src: [
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-mocks/angular-mocks.js',
                    'public/javascripts/helper.js',
                    'public/javascripts/controllers.js'
                ],
                options: {
                    specs: 'tests/js/spec/controllersSpec.js'
                }
            }
        }
    });

    grunt.registerTask('min', ['uglify']);

    grunt.registerTask('test', ['jasmine:controllers']);

};