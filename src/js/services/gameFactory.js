((app) => {
    'use strict'
    app.factory('gameFactory', [function() {
        return {
            "table": [
                [{
                    "player": "",
                    "value": ""
                }, {
                    "player": "",
                    "value": ""
                }, {
                    "player": "",
                    "value": ""
                }],
                [{
                    "player": "",
                    "value": ""
                }, {
                    "player": "",
                    "value": ""
                }, {
                    "player": "",
                    "value": ""
                }],
                [{
                    "player": "",
                    "value": ""
                }, {
                    "player": "",
                    "value": ""
                }, {
                    "player": "",
                    "value": ""
                }]
            ]

        }
    }])
})(angular.module('app.services'))
