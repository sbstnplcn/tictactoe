((app) => {
    'use strict'
    app.component('game', {
        templateUrl: 'js/components/game/game.html',
        controller: ['usersService','$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {

                    //if disconnect, go to login page
                    usersService.getCurrent().then((user) => {
                        this.currentUser = user
                    }).catch(() => {
                        $state.go('app.login')
                    })

                    //
                    this.tic = [
                        [{value: ""}, {value: ""}, {value: ""}],
                        [{value: ""}, {value: ""}, {value: ""}],
                        [{value: ""}, {value: ""}, {value: ""}]
                    ]

                    this.click = (ptidx, idx) => {
                        this.tic[ptidx][idx].value = 'x'
                    }

                },
                disconnect() {
                    usersService.disconnect().then((res) => {
                        $state.go('app.login').then(() => {
                            $state.reload()
                        })
                    })
                }
            })
        }]
    })
})(angular.module('app.game'))
