((app) => {
    'use strict'
    app.component('game', {
        templateUrl: 'js/components/game/game.html',
        controller: ['usersService', '$state', 'socket', '$scope', function(usersService, $state, socket, $scope) {
            angular.extend(this, {
                $onInit() {

                    var table = [
                        [{
                            player: "",
                            value: ""
                        }, {
                            player: "",
                            value: ""
                        }, {
                            player: "",
                            value: ""
                        }],
                        [{
                            player: "",
                            value: ""
                        }, {
                            player: "",
                            value: ""
                        }, {
                            player: "",
                            value: ""
                        }],
                        [{
                            player: "",
                            value: ""
                        }, {
                            player: "",
                            value: ""
                        }, {
                            player: "",
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

                    // receive new table
                    socket.on('playValue', (socket) => {
                        this.tic = socket.tic
                    })
                },
                //emit on click
                click(ptidx, idx) {
                    let tic = this.tic
                    tic[ptidx][idx].value = 'x'
                    socket.emit('play', {
                        ptidx,
                        idx,
                        tic
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
