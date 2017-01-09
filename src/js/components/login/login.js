((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: [function() {
            angular.extend(this, {
                $onInit() {

                },
                connect() {
                    usersService.connect(this.user).then((res) => {
                        $state.go('app.game').then(() => {
                            $state.reload()
                        })
                    })
                }
            })
        }]
    })
})(angular.module('app.login'))
