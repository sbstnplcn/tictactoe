((app) => {
    'use strict'
    app.component('game', {
        templateUrl: 'js/components/game/game.html',
        controller: ['usersService', '$state', 'socket', function(usersService, $state, socket) {
            angular.extend(this, {
                $onInit() {

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

                    // Play
                    socket.on('playValue', function() {
                        console.log(ptidx, idx)
                    })

                    this.click = (ptidx, idx) => {
                        socket.emit('play', {
                            ptidx,
                            idx
                        })
                        this.tic[ptidx][idx].value = 'x'
                    }

                    this.tic = [
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
