module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'lib/styles/main.min.css': 'src/assets/styles/main.scss'
                }
            }
        },

        uglify: {
            options: {
                preserveComments: false
            },
            my_target: {
                files: {
                    'lib/js/app.min.js': ['lib/js/app.js'],
                    'lib/js/vendor.min.js': ['lib/js/vendor.js']
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    'lib/js/app.js': ['src/app/*.js'],
                    'lib/js/vendor.js': ['src/app/vendor/*.js']
                }
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/assets/images/',
                        src: ['**/*.{png,jpg,gif,svg}'],
                        dest: 'src/assets/images/'
                    }
                ]
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/*.js', 'test/*.js']
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'test/results.txt',
                    quiet: false,
                    clearRequireCache: false,
                    noFail: false
                },
                src: ['test/**/*.js']
            }
        },

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'src/app/main.js': 'src/app/main.js'
                }
            }
        },

        watch: {
            css: {
                files: ['src/assets/styles/**/*'],
                tasks: ['sass']
            },

            javascript: {
                files: [
                    'src/app/**/*', 'test/*.js'
                ],
                tasks: ['mochaTest', 'jshint', 'concat', 'uglify']
            },

            img: {
                files: ['src/assets/images/**/*'],
                tasks: ['imagemin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('default', [
        'sass',
        'watch',
        'imagemin',
        'concat',
        'uglify',
        'jshint',
        'mochaTest',
        'babel'
    ]);
};
