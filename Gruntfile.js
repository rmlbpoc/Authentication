module.exports = function(grunt){
    //Project configuration

    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        express: 'grunt-express-server',
        useminPrepare: 'grunt-usemin',
        //ngtemplates: 'grunt-angular-templates',
        //cdnify: 'grunt-google-cdn',
        //protractor: 'grunt-protractor-runner',
        //injector: 'grunt-asset-injector',
        buildcontrol: 'grunt-build-control',
        //ngconstant: 'grunt-ng-constant',
        rsync: 'grunt-rsync',
        gitinfo: 'grunt-gitinfo',
        replace: 'grunt-text-replace'
        //maven: 'grunt-maven-tasks'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Build information functions
    var gitinfo = grunt.config('gitinfo');
    function generateBuildInfo(extended) {
        var current = gitinfo.local.branch.current;
        var info = {
            version: '<%= pkg.version %>',
            timestamp: (new Date()).toString()
            // branch: current.name,
            // recent: gitinfo.commits.split("\n")
        };
        if (extended) {
            info.branch = current.name;
            info.recent = gitinfo.commits.split("\n");
        }

        return JSON.stringify(info, null, 4);
    }

    grunt.initConfig({

        pkg:grunt.file.readJSON('package.json'),
        yeoman: {
            // configurable paths
            client: require('./bower.json').appPath || 'client',
            dist: 'dist'
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
                        '!<%= yeoman.dist %>/.openshift',
                        '!<%= yeoman.dist %>/Procfile'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                // 'sass',
            ],
            test: [
                // 'sass',
            ],
            debug: {
                tasks: [
                    'nodemon',
                    'node-inspector'
                ],
                options: {
                    logConcurrentOutput: true
                }
            },
            dist: [
                // 'sass',
                'imagemin',
                'svgmin'
            ]
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/public/img'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/public/img'
                }]
            }
        },
        uglify: {
            options:{
                banner:"/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %>*/\n"
            },
            build:{
                src: ['app/**/*.js','config/*.js'],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        gitinfo: {
            commands: {
                'commits': [ 'log', '-5', '--no-merges', '--pretty=format:%s | %ad | %an | %h' ]
            }
        },

        "file-creator": {//use this to generate the authConfig file at runtime
            "development": {
                "server/config/authConfig.json": function(fs, fd, done) {
                    var openIdAuth = {
                        openIdAuth: {
                            'facebookAuth': {
                                'clientID': '911617848888518', // your App ID
                                'clientSecret': 'f170a7bc8d2e5fbd0779dc4932773e92', // your App Secret
                                'callbackURL': 'http://localhost:3000/auth/facebook/callback'
                            },
                            'twitterAuth': {
                                'consumerKey': 'ktgbyPp9mZg4q4liOT6pvZ6LL',
                                'consumerSecret': 'c1qOQVcCJHs0QDweyviwOf7jzDETykyCdFBcrItbKd0L117ugW',
                                'callbackURL': 'http://localhost:3000/auth/twitter/callback'
                            },
                            'googleAuth': {
                                'clientID': '291365835393-k5ctu5a5rfo1roj6vkuukbeoogpbujrb.apps.googleusercontent.com',
                                'clientSecret': 'HeZVef7X1lmb_LYW8J15rwJx',
                                'callbackURL': 'http://127.0.0.1:3000/auth/google/callback'
                        }}};
                    fs.writeSync(fd, JSON.stringify(openIdAuth));
                    done();
                }
            },
            "qat2": {
                "<%= yeoman.dist %>/server/config/authConfig.json": function(fs, fd, done) {
                    var openIdAuth = {
                        openIdAuth: {
                            'facebookAuth': {
                                'clientID': '911617848888518', // your App ID
                                'clientSecret': 'f170a7bc8d2e5fbd0779dc4932773e92', // your App Secret
                                'callbackURL': 'http://localhost:3000/auth/facebook/callback'
                            },
                            'twitterAuth': {
                                'consumerKey': 'ktgbyPp9mZg4q4liOT6pvZ6LL',
                                'consumerSecret': 'c1qOQVcCJHs0QDweyviwOf7jzDETykyCdFBcrItbKd0L117ugW',
                                'callbackURL': 'http://localhost:3000/auth/twitter/callback'
                            },
                            'googleAuth': {
                                'clientID': '291365835393-k5ctu5a5rfo1roj6vkuukbeoogpbujrb.apps.googleusercontent.com',
                                'clientSecret': 'HeZVef7X1lmb_LYW8J15rwJx',
                                'callbackURL': 'http://127.0.0.1:3000/auth/google/callback'
                            }}};
                    fs.writeSync(fd, JSON.stringify(openIdAuth));
                    done();
                }
            },
            "production": {
                "server/config/authConfig.json": function(fs, fd, done) {
                    var openIdAuth = {
                        openIdAuth: {
                            'facebookAuth': {
                                'clientID': '762491043847196', // your App ID
                                'clientSecret': '6883f89345f10a0e8187449a9fcf6cf0', // your App Secret
                                'callbackURL': 'https://rmlbfunproject.herokuapp.com/auth/facebook/callback'
                            },

                            'twitterAuth': {
                                'consumerKey': 'gjS6iEvpA9h5RoqgBqqFPyh5e',
                                'consumerSecret': 'Y8sLzxsrmvpeqBj22A76OOBYFM8IDqGKD4XAR8FlD1RahSxkQE',
                                'callbackURL': 'https://rmlbfunproject.herokuapp.com/auth/twitter/callback'
                            },

                            'googleAuth': {
                                'clientID': '804893419219-q8sr2h35jtpl398teu1kg9m2ubg1mktt.apps.googleusercontent.com',
                                'clientSecret': '9Q71Z7q8BBFsElTwgYVzV6cW',
                                'callbackURL': 'https://rmlbfunproject.herokuapp.com/auth/google/callback'
                            }
                        }};
                    fs.writeSync(fd, JSON.stringify(openIdAuth));
                    done();
                }
            }
        },
        express: {
            options: {
                port: process.env.PORT || 3000
            },
            dev: {
                options: {
                    script: 'server/bin/www',
                    serverreload: true
                }
            },
            prod: {
                options: {
                    script: 'server/bin/www'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {

            express: {
                files:  [ 'server/**/*.{js,json}' ],
                tasks:  [ 'express:dev' ],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-file-creator');

    // Default task(s).
    grunt.registerTask('default', function(){
        console.log('running the default task');
    });

    grunt.registerTask('uglify', ['uglify']);
    grunt.registerTask('config', function(target){
        return grunt.task.run(['file-creator:' + target])
    });

    grunt.registerTask('serve',function(target){

        return grunt.task.run([
            'file-creator:' + target ,
            'express:dev' ,
            'open',
            'watch'
        ])
    });

    grunt.registerTask('createAuthConfig',function(target){

        return grunt.task.run([
            'file-creator:' + target
        ])
    });

    grunt.registerTask('printgit', function() {
        grunt.task.requires('gitinfo');
        grunt.log.writeln('gitinfo: ' + JSON.stringify(grunt.config('gitinfo')));
    });

    grunt.registerTask('testgit', ['gitinfo', 'printgit']);
};