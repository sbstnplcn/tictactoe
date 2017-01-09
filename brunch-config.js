'use strict'
exports.config = {
    paths: {
        watched: ['public'],
        public: 'public'
    },
    files: {
        javascripts: {
            joinTo: {
                'js/vendor.min.js': /^node_modules/,
                'js/app.min.js': /^public\/js/
            },
            order: {
                before: [
                    'public/js/app.js',
                    'public/js/**/*.md.js',
                    'public/js/components/**/*.js'
                ]
            }
        },
        stylesheets: {
            joinTo: {
                'css/app.min.css': /^public\/scss/
            }
        },
        // templates: {
        //     joinTo: {
        //         'js/templates.js': /^src\/js/
        //     }
        // }
    },
    npm: {
        enabled: true,
        compilers: ['angular', 'angular-ui-router', 'angular-cookies']
    },
    conventions: {
        assets: /static[\\/]/
    },
    modules: {
        wrapper: false,
        definition: 'commonjs'
    },
    plugins: {
        copycat: {
            // "js": [ 'node_modules/angular/angular.min.js',
            //         'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            //         'node_modules/angular-cookies/angular-cookies.min.js',
            //         'node_modules/socket.io/lib/socket.js',
            //         'node_modules/socket.io-client/dist/socket.io.min.js'
            // ],
            "css":'node_modules/bootstrap/dist/css/bootstrap.min.css',
            verbose: true,
            onlyChanged: true
        },
        babel: {
            ignore: [
                /^(node_modules)/
            ]
        },
        autoReload: {
            match: {
                stylesheets: ['*.scss', '*.jpg', '*.png'],
                javascripts: ['*.js']
            }
        },
        sass: {
            sourceMapEmbed: true
        },
        /*jshint -W106 */
        // angular_templates: {
        //     module: 'app.views',
        //     path_transform: (path) => path.replace('src/', '')
        // }
        /*jshint +W106 */
    },
    overrides: {
        production: {
            sourceMaps: true,
            plugins: {
                autoReload: {
                    enabled: true
                }
            }
        }
    },
    server: {
        command: 'node server.js',
        port: 8000,
        run: true
    }
}
