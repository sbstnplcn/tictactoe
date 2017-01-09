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
                        socket.emit('userInfos', (this.currentUser))
                    }).catch(() => {
                        $state.go('app.login')
                    })

                    socket.on('stats', (data) => {
                        console.log('Joueurs:', data.numClients)
                        if (this.currentUser) socket.emit('userInfos', this.currentUser)
                    })

                    socket.on('allUsers', (OtherUser) => {
                        console.log(`Infos :   ${OtherUser.name} ${OtherUser.socketId}`)
                        console.log(OtherUser);
                    })

                    this.click = (ptidx, idx) => {
                        socket.on('play', (data) => {
                            console.log(data)
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
