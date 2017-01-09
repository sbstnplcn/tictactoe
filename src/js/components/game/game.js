((app) => {
    'use strict'
    app.component('game', {
        templateUrl: 'js/components/game/game.html',
        controller: [function() {
            angular.extend(this, {
                $onInit() {

                }
            })
        }]
    })
})(angular.module('app.game'))
