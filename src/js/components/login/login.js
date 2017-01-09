((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: ['usersService', '$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

                },
                connect() {
                    usersService.connect(this.user).then((res) => {
                        $state.go('app.game').then(() => {
                            $state.reload()
                        })
                    })
                },
                // add User
                add() {
                    usersService.add(this.newUser).then((res) => {
                        usersService.connect(this.newUser).then((res) => {
                            $state.go('app.game').then(() => {
                                $state.reload()
                            })
                        })
                    })
                }
            })
        }]
    })
})(angular.module('app.login'))
