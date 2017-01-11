((app) => {
    'use strict'
    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/')
        $stateProvider.state('app', {
            url: '',
            abstract: true,
            template: '<ui-view></ui-view>'
        })
        .state('app.game', {
            url: '/',
            template: '<game></game>'
        })
        .state('app.login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('callback', {
            url: '/auth/callback/:token',
            template: '',
            controller: ['usersService', '$stateParams', '$state', function(usersService, $stateParams, $state) {
                if ($stateParams.token) {
                    usersService.setToken($stateParams.token).then((user) => {
                        $state.go('app.login')
                    })
                } else {
                    $state.go('app.login')
                }
            }]
        })
    }])

})(angular.module('app.config'))
