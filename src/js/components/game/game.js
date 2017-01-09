((app) => {
    'use strict'
    app.component('game', {
        templateUrl: 'js/components/game/game.html',
        controller: ['usersService','$state', function(usersService, $state) {
            angular.extend(this, {
                $onInit() {
                    usersService.getCurrent().then((user) => {
                        this.currentUser = user
                    }).catch(() => {
                        $state.go('app.login')
                    })

                }
            })
        }]
    })
})(angular.module('app.game'))
