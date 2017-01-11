((app) => {
    'use strict'
    app.factory('socket', function($rootScope) {
        var socket = io.connect('http://localhost:9000/tictactoe');
        return {
            on(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    });
})(angular.module('app.services'))
