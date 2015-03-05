module.exports = function(grunt){
    //Project configuration
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        uglify: {
            options:{
                banner:"/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %>*/\n"
            },
            build:{
                src: ['app/**/*.js','config/*.js'],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', function(){
        console.log('running the default task');
    });

    grunt.registerTask('default', ['uglify']);
};