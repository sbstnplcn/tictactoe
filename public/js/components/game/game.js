((app) => {
    'use strict'
    app.component('game', {
        templateUrl: 'js/components/game/game.html',
        controller: ['usersService', '$state', 'socket', '$scope', function(usersService, $state, socket, $scope) {
            angular.extend(this, {
                $onInit() {

                    var table = [
                        [{
                            value: ""
                        }, {
                            value: ""
                        }, {
                            value: ""
                        }],
                        [{
                            value: ""
                        }, {
                            value: ""
                        }, {
                            value: ""
                        }],
                        [{
                            value: ""
                        }, {
                            value: ""
                        }, {
                            value: ""
                        }]
                    ]
                    this.tic = table

                    //if disconnect, go to login page
                    usersService.getCurrent().then((user) => {
                        this.currentUser = user
                        socket.emit('userInfos', this.currentUser)
                    }).catch(() => {
                        $state.go('app.login')
                    })

                    // Get Player 2
                    socket.on('allUsers', (OtherUser) => {
                        this.otherUser = OtherUser.filter((a) => {
                            return a._id !== this.currentUser._id
                        })
                    })

                    //emit on click
                    this.click = (ptidx, idx) => {
                        let tic = table
                        tic[ptidx][idx].value = 'x'
                        socket.emit('play', {
                            ptidx,
                            idx,
                            tic
                        })
                    }

                    // Play
                    socket.on('playValue', function(socket) {
                        table = socket.tic
                        console.log(table);
                    })

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
