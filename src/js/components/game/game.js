((app) => {
    'use strict'
    app.component('game', {
        templateUrl: 'js/components/game/game.html',
        controller: ['usersService', '$state', 'socket', '$scope', 'gameFactory', function(usersService, $state, socket, $scope, gameFactory) {
            angular.extend(this, {
                $onInit() {

                    //init table
                    let table = gameFactory.table
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
                        socket.tic.forEach((row) => {
                            // console.log(socket.tic, row)
                            console.log(socket.tic[socket.ptidx][socket.idx].value);
                            return row[socket.idx].player == this.currentUser.name ?
                                socket.tic[socket.ptidx][socket.idx].value = "x" :
                                socket.tic[socket.ptidx][socket.idx].value = "o"
                        })
                        this.tic = socket.tic
                    })
                    //emit on click
                    this.click = (ptidx, idx) => {
                        let tic = this.tic
                        tic[ptidx][idx].player = this.currentUser.name
                        socket.emit('play', {
                            ptidx,
                            idx,
                            tic
                        })
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
